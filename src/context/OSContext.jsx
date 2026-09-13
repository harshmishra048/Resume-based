import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { defaults, getApp } from '../data/apps'
const OSContext = createContext(null)
export const useOS = () => useContext(OSContext)
function readPreferences() {
  try { const value = JSON.parse(localStorage.getItem('harshos-preferences')); return { ...defaults, ...(value && typeof value === 'object' ? value : {}) } } catch { return defaults }
}
const windowGeometry = () => {
  const width = Math.min(1040, window.innerWidth - 180)
  const height = Math.min(680, window.innerHeight - 145)
  return { x: Math.max(12, (window.innerWidth - width) / 2 + 35), y: Math.max(30, (window.innerHeight - height - 56) / 2), width, height }
}
export function OSProvider({ children }) {
  const [preferences, setPreferences] = useState(readPreferences)
  const [windows, setWindows] = useState([{ id: 'about', ...windowGeometry(), z: 1, minimized: false, maximized: false, data: null }])
  const [active, setActive] = useState('about')
  const [overlay, setOverlay] = useState(null)
  const [contextMenu, setContextMenu] = useState(null)
  const [notifications, setNotifications] = useState([{ id: 1, title: 'Make yourself at home', message: 'Explore my work. Open an app. Make this desktop yours.', time: Date.now(), icon: 'person' }])
  const [toast, setToast] = useState(null)
  const [recent, setRecent] = useState(['about', 'projects', 'resume'])
  const [booting, setBooting] = useState(!preferences.skipBoot)
  const [locked, setLocked] = useState(false)
  const zRef = useRef(2)
  const audioRef = useRef(null)
  const [systemDark, setSystemDark] = useState(matchMedia('(prefers-color-scheme: dark)').matches)
  const [systemReduced, setSystemReduced] = useState(matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const dark = matchMedia('(prefers-color-scheme: dark)'), reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const a = e => setSystemDark(e.matches), b = e => setSystemReduced(e.matches)
    dark.addEventListener('change', a); reduced.addEventListener('change', b)
    return () => { dark.removeEventListener('change', a); reduced.removeEventListener('change', b) }
  }, [])
  const reducedMotion = preferences.motion !== 'full' || systemReduced
  useEffect(() => {
    try { localStorage.setItem('harshos-preferences', JSON.stringify(preferences)) } catch { setToast({ title: 'Preference storage unavailable', message: 'Changes work for this session. Your browser may have storage disabled.', icon: 'info' }) }
    document.documentElement.dataset.theme = preferences.theme === 'system' ? (systemDark ? 'dark' : 'light') : preferences.theme
    document.documentElement.dataset.motion = reducedMotion ? 'reduced' : 'full'
    document.documentElement.style.setProperty('--accent', preferences.accent)
    document.documentElement.style.setProperty('--radius', preferences.cornerRadius + 'px')
    document.documentElement.style.setProperty('--surface-opacity', preferences.transparency + '%')
    document.documentElement.style.setProperty('--blur', preferences.blur + 'px')
    document.documentElement.style.setProperty('--font', preferences.font)
    document.documentElement.style.fontSize = preferences.fontSize + 'px'
    document.documentElement.dataset.density = preferences.density
  }, [preferences, systemDark, reducedMotion])
  useEffect(() => { if (booting) { const t = setTimeout(() => setBooting(false), reducedMotion ? 250 : 1600); return () => clearTimeout(t) } }, [booting, reducedMotion])
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 4200); return () => clearTimeout(t) } }, [toast])
  const updatePreferences = useCallback((value) => setPreferences(p => ({ ...p, ...value })), [])
  const notify = useCallback((title, message, icon = 'notification') => {
    const n = { id: crypto.randomUUID(), title, message, icon, time: Date.now() }
    setNotifications(prev => [n, ...prev].slice(0, 30)); if (!preferences.focus) setToast(n)
  }, [preferences.focus])
  const playSound = () => {
    if (!preferences.sound) return
    try { const Ctx = window.AudioContext || window.webkitAudioContext; audioRef.current ||= new Ctx(); const ctx = audioRef.current; ctx.resume(); const o = ctx.createOscillator(), gain = ctx.createGain(); o.connect(gain); gain.connect(ctx.destination); o.frequency.setValueAtTime(520, ctx.currentTime); o.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + .08); gain.gain.setValueAtTime(preferences.volume / 1600, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .12); o.start(); o.stop(ctx.currentTime + .13) } catch { /* Audio is an optional enhancement. */ }
  }
  const focusWindow = useCallback((id) => { setActive(id); setWindows(ws => ws.map(w => w.id === id ? { ...w, minimized: false, z: zRef.current++ } : w)) }, [])
  const openApp = (id, data = null) => {
    if (!getApp(id)) return
    playSound(); setOverlay(null); setContextMenu(null); setActive(id)
    setRecent(r => [id, ...r.filter(x => x !== id)].slice(0, 5))
    setWindows(ws => {
      const found = ws.find(w => w.id === id)
      if (found) return ws.map(w => w.id === id ? { ...w, minimized: false, z: zRef.current++, data: data ?? w.data } : w)
      const g = windowGeometry(), offset = (ws.length % 4) * 18
      return [...ws, { id, ...g, x: Math.max(8, Math.min(g.x + offset, window.innerWidth - g.width - 8)), y: Math.max(8, Math.min(g.y + offset, window.innerHeight - g.height - 64)), z: zRef.current++, minimized: false, maximized: false, data }]
    })
  }
  const closeWindow = (id) => { setWindows(ws => ws.filter(w => w.id !== id)); setActive(a => a === id ? null : a) }
  const updateWindow = useCallback((id, update) => setWindows(ws => ws.map(w => w.id === id ? { ...w, ...update } : w)), [])
  const minimize = (id) => { updateWindow(id, { minimized: true }); setActive(null) }
  const maximize = (id) => { setWindows(ws => ws.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w)); focusWindow(id) }
  const taskClick = (id) => { const w = windows.find(w => w.id === id); if (!w) openApp(id); else if (active === id && !w.minimized) minimize(id); else focusWindow(id) }
  const showDesktop = () => { const visible = windows.some(w => !w.minimized); setWindows(ws => ws.map(w => ({ ...w, minimized: visible }))); setActive(null); setOverlay(null) }
  useEffect(() => {
    const resize = () => setWindows(ws => ws.map(w => ({ ...w, width: Math.max(320, Math.min(w.width, innerWidth - 16)), height: Math.max(260, Math.min(w.height, innerHeight - 72)), x: Math.max(8, Math.min(w.x, innerWidth - Math.min(w.width, innerWidth - 16) - 8)), y: Math.max(8, Math.min(w.y, innerHeight - 100)) })))
    window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize)
  }, [])
  return <OSContext.Provider value={{ preferences, updatePreferences, resetPreferences: () => setPreferences(defaults), windows, active, openApp, closeWindow, focusWindow, updateWindow, minimize, maximize, taskClick, showDesktop, overlay, setOverlay, contextMenu, setContextMenu, notifications, setNotifications, notify, toast, setToast, recent, reducedMotion, booting, setBooting, locked, setLocked }}>{children}</OSContext.Provider>
}
