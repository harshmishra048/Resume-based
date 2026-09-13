import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useOS } from '../context/OSContext'
import { desktopApps, getApp } from '../data/apps'
import { profile } from '../data/profile'
import Icon, { AppIcon, Brand } from './Icon'
import Wallpaper from './Wallpaper'
import Window from './Window'
import Taskbar from './Taskbar'
import SystemPanels from './SystemPanels'
export default function Desktop() {
  const os = useOS(), [selected, setSelected] = useState(null), [positions, setPositions] = useState({})
  const iconDrag = useRef(null)
  useEffect(() => {
    const key = e => {
      const editing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)
      if (e.key === 'Escape') { os.setOverlay(null); os.setContextMenu(null); setSelected(null) }
      if (!editing && e.ctrlKey && e.key === ' ') { e.preventDefault(); os.setOverlay(os.overlay === 'start' ? null : 'start') }
      if (!editing && e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'f') { e.preventDefault(); os.setOverlay('search') }
      if (!editing && e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') { e.preventDefault(); os.showDesktop() }
      if (!editing && e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'k') { e.preventDefault(); os.openApp('tasks') }
    }
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key)
  })
  return <main id="desktop" className={`desktop taskbar-${os.preferences.taskbarPosition} ${os.preferences.autoHide ? 'autohide' : ''}`} style={{ filter: `brightness(${os.preferences.brightness}%)` }} onContextMenu={e => {
    if (e.target.closest('.os-window,.system-panel,.taskbar')) return
    e.preventDefault(); os.setContextMenu({ x: Math.min(e.clientX, innerWidth - 240), y: Math.min(e.clientY, innerHeight - 250), app: e.target.closest('[data-app]')?.dataset.app })
  }}>
    <Wallpaper/>
    <header className="desktop-brand"><Brand small/><span>harsh<span className="brand-os">OS</span></span><span className="desktop-edition">PERSONAL WORKSPACE</span></header>
    <div className="desktop-presence"><span className="status-dot"/>Open to new possibilities<Icon name="external" size={14}/></div>
    {os.preferences.showIcons && <nav className="desktop-icons" aria-label="Desktop applications" style={{ '--desktop-icon-size': os.preferences.iconSize + 'px', gap: os.preferences.iconSpacing }}>
      {desktopApps.map((id, index) => <button key={id} data-app={id} className={`desktop-icon ${selected === id ? 'selected' : ''}`} style={{ transform: positions[id] ? `translate(${positions[id].x}px,${positions[id].y}px)` : undefined }} onPointerDown={e => { if (innerWidth < 700) return; iconDrag.current = { id, sx: e.clientX, sy: e.clientY, ...positions[id] }; e.currentTarget.setPointerCapture(e.pointerId) }} onPointerMove={e => { const d = iconDrag.current; if (!d || d.id !== id || !e.buttons) return; const x = e.clientX - d.sx, y = e.clientY - d.sy; if (Math.abs(x) + Math.abs(y) > 6) setPositions(p => ({ ...p, [id]: { x: Math.max(-24, Math.min((d.x || 0) + x, innerWidth - 140)), y: Math.max(-index * 84, Math.min((d.y || 0) + y, innerHeight - 180 - index * 84)) } })) }} onPointerUp={() => { iconDrag.current = null }} onClick={() => { setSelected(id); if (innerWidth < 700) os.openApp(id) }} onDoubleClick={() => os.openApp(id)} onKeyDown={e => { if (e.key === 'Enter') os.openApp(id); if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); const next = e.key === 'ArrowDown' ? e.currentTarget.nextElementSibling : e.currentTarget.previousElementSibling; next?.focus() } }}><AppIcon app={getApp(id)} size={os.preferences.iconSize}/><span>{getApp(id).name}</span></button>)}
    </nav>}
    <div className="desktop-note"><span>A little curious?</span><h2>Good. You're in<br/>the right place.</h2><p>My work, my world.<br/>Go ahead. Click around.</p></div>
    <div className="desktop-footer"><span>DESIGNED TO BE EXPLORED</span><p>harshOS <span>1.0</span></p></div>
    <AnimatePresence>{os.windows.map(w => <Window key={w.id} win={w}/>)}</AnimatePresence>
    <Taskbar/>
    <SystemPanels/>
    <AnimatePresence>{os.booting && <motion.div className="boot-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}><div className="boot-brand"><Brand/><h1>harshOS</h1><p>A different kind of personal workspace.</p><div className="boot-progress"><i/></div><span>Making room for possibilities</span></div><button onClick={() => os.setBooting(false)}>Skip intro <Icon name="arrow" size={17}/></button></motion.div>}</AnimatePresence>
    {os.locked && <div className="lock-screen"><div className="avatar">HM</div><h1>{profile.name}</h1><p>This portfolio is taking a little break.</p><button className="button primary" onClick={() => os.setLocked(false)}>Enter workspace <Icon name="arrow"/></button></div>}
  </main>
}
