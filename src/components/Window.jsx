import React, { Suspense, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { useOS } from '../context/OSContext'
import { getApp } from '../data/apps'
import Icon, { AppIcon } from './Icon'
import AppContent from '../apps/AppContent'
class AppBoundary extends React.Component {
  state = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  render() { return this.state.error ? <div className="empty-state"><Icon name="info" size={40}/><h2>This app needs a fresh start</h2><p>Your desktop and other applications are still available.</p><button className="button" onClick={() => this.setState({ error: false })}>Try again</button></div> : this.props.children }
}
export default function Window({ win }) {
  const { active, focusWindow, closeWindow, minimize, maximize, updateWindow, reducedMotion } = useOS()
  const app = getApp(win.id), drag = useRef(null), frame = useRef(null)
  const mobile = innerWidth < 700
  useEffect(() => {
    const move = e => {
      const d = drag.current; if (!d) return
      const dx = e.clientX - d.clientX, dy = e.clientY - d.clientY
      if (d.type === 'move') updateWindow(win.id, { x: Math.max(0, Math.min(d.x + dx, innerWidth - d.width)), y: Math.max(0, Math.min(d.y + dy, innerHeight - 96)) })
      else updateWindow(win.id, { width: Math.min(innerWidth - d.x, Math.max(430, d.width + dx)), height: Math.min(innerHeight - d.y - 56, Math.max(330, d.height + dy)) })
    }
    const end = () => { drag.current = null; document.body.style.userSelect = '' }
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', end); window.addEventListener('pointercancel', end)
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', end); window.removeEventListener('pointercancel', end) }
  }, [win.id, updateWindow])
  const begin = (e, type) => {
    if (mobile || win.maximized || e.button !== 0 || e.target.closest('button')) return
    e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { type, clientX: e.clientX, clientY: e.clientY, x: win.x, y: win.y, width: win.width, height: win.height }
    document.body.style.userSelect = 'none'; focusWindow(win.id)
  }
  return <motion.section ref={frame} role="dialog" aria-label={app.name} className={`os-window ${active === win.id ? 'active' : ''} ${win.maximized ? 'maximized' : ''} ${win.minimized ? 'minimized' : ''}`} onPointerDown={() => active !== win.id && focusWindow(win.id)} style={{ left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.z, pointerEvents: win.minimized ? 'none' : undefined }} initial={{ opacity: 0, scale: reducedMotion ? 1 : .97, y: reducedMotion ? 0 : 10 }} animate={{ opacity: win.minimized ? 0 : 1, scale: win.minimized && !reducedMotion ? .9 : 1, y: win.minimized && !reducedMotion ? 80 : 0 }} exit={{ opacity: 0, scale: reducedMotion ? 1 : .97 }} transition={{ duration: reducedMotion ? 0 : .17 }} inert={win.minimized ? true : undefined}>
    <header className="window-titlebar" onPointerDown={e => begin(e, 'move')} onDoubleClick={e => !e.target.closest('button') && maximize(win.id)}>
      <div className="window-title"><AppIcon app={app} size={22} plain/><span>{app.name}</span><span className="title-separator">/</span><span className="title-muted">harshOS</span></div>
      <div className="window-controls"><button aria-label={`Minimize ${app.name}`} title="Minimize" onClick={() => minimize(win.id)}><Icon name="minimize" size={17}/></button><button aria-label={`Maximize ${app.name}`} title="Maximize / Restore" onClick={() => maximize(win.id)}><Icon name={win.maximized ? 'restore' : 'maximize'} size={15}/></button><button aria-label={`Close ${app.name}`} title="Close" className="close-window" onClick={() => closeWindow(win.id)}><Icon name="close" size={19}/></button></div>
    </header>
    <div className="window-body"><AppBoundary><Suspense fallback={<div className="app-loading"><div className="skeleton"/><div className="skeleton"/><div className="skeleton"/><p>Opening {app.name}…</p></div>}><AppContent id={win.id} data={win.data}/></Suspense></AppBoundary></div>
    {!mobile && !win.maximized && <div className="window-resizer" onPointerDown={e => begin(e, 'resize')} title="Drag to resize"/>}
  </motion.section>
}
