import { lazy } from 'react'
const Portfolio = lazy(() => import('./Portfolio'))
const Projects = lazy(() => import('./Projects'))
const Settings = lazy(() => import('./Settings'))
const Terminal = lazy(() => import('./Terminal'))
const Utilities = lazy(() => import('./Utilities'))
export default function AppContent({ id, data }) {
  if (id === 'projects') return <Projects data={data}/>
  if (id === 'settings') return <Settings data={data}/>
  if (id === 'terminal') return <Terminal/>
  if (['explorer', 'browser', 'recycle', 'tasks', 'resume'].includes(id)) return <Utilities id={id} data={data}/>
  return <Portfolio page={id} data={data}/>
}
