import React from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import { OSProvider, useOS } from './context/OSContext'
import Desktop from './components/Desktop'
import './styles.css'
import './responsive.css'
function Workspace() { const { reducedMotion } = useOS(); return <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}><Desktop/></MotionConfig> }
createRoot(document.getElementById('root')).render(<OSProvider><Workspace/></OSProvider>)
