import { useState, useEffect } from 'react'
import { useOS } from '../context/OSContext'
import { pinnedApps, getApp } from '../data/apps'
import Icon, { AppIcon, Brand } from './Icon'
export default function Taskbar() {
  const os = useOS(), [now, setNow] = useState(new Date()), [online, setOnline] = useState(navigator.onLine)
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 1000); const status = () => setOnline(navigator.onLine); window.addEventListener('online', status); window.addEventListener('offline', status); return () => { clearInterval(timer); window.removeEventListener('online', status); window.removeEventListener('offline', status) } }, [])
  const ids = [...pinnedApps, ...os.windows.map(w => w.id).filter(id => !pinnedApps.includes(id))]
  const toggle = name => os.setOverlay(os.overlay === name ? null : name)
  return <footer className="taskbar">
    <button className="workspace-button" title="About this workspace" onClick={() => os.openApp('about')}><span className="workspace-mark">HM</span><span><b>Harsh's workspace</b><small>Let's make something great.</small></span></button>
    <nav className="taskbar-apps" aria-label="Taskbar">
      <button className={`taskbar-button start-button ${os.overlay === 'start' ? 'selected' : ''}`} title="Start (Ctrl + Space)" aria-label="Start" onClick={() => toggle('start')}><Brand small/></button>
      <button className="taskbar-search" aria-label="Search apps, projects and more" onClick={() => toggle('search')}><Icon name="search" size={20}/><span>Search anything</span></button>
      <span className="taskbar-divider"/>
      {ids.map(id => <button key={id} aria-label={`Taskbar ${getApp(id).name}`} title={getApp(id).name} className={`taskbar-button ${os.active === id ? 'active' : ''} ${os.windows.some(w => w.id === id) ? 'running' : ''}`} onClick={() => os.taskClick(id)}><AppIcon app={getApp(id)} size={32} plain/></button>)}
    </nav>
    <div className="system-tray">
      <button className="tray-expand" aria-label="Quick settings" onClick={() => toggle('quick')}><Icon name="down" size={15}/></button>
      <button className="tray-controls" aria-label="Network, sound and brightness" title={online ? 'Browser is online · Quick settings' : 'Browser is offline · Quick settings'} onClick={() => toggle('quick')}><Icon name="wifi" size={18}/><Icon name="volume" size={18}/><Icon name="battery" size={19}/></button>
      <button className="tray-clock" aria-label="Calendar and notifications" onClick={() => toggle('notifications')}><time>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time><span>{now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}</span></button>
      <button className="notification-button" aria-label="Notifications" onClick={() => toggle('notifications')}><Icon name="notification" size={18}/>{os.notifications.length > 0 && <i/>}</button>
      <button className="show-desktop" aria-label="Show desktop" title="Show desktop" onClick={os.showDesktop}/>
    </div>
  </footer>
}
