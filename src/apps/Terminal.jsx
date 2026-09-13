import { useEffect, useRef, useState } from 'react'
import { useOS } from '../context/OSContext'
import { profile, skills, experience } from '../data/profile'
import { projects } from '../data/projects'
import { apps } from '../data/apps'
const commands = ['help', 'about', 'projects', 'skills', 'experience', 'education', 'contact', 'resume', 'clear', 'whoami', 'theme', 'date', 'neofetch', 'open', 'version', 'sudo hire-me']
const intro = 'harshOS Terminal [Version 1.0.0]\nA little closer to the source.\n\nType “help” to see what you can do.'
export default function Terminal() {
  const os = useOS(), [lines, setLines] = useState([{ text: intro, type: 'intro' }]), [input, setInput] = useState(''), [history, setHistory] = useState([]), [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null), scrollRef = useRef(null)
  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight) }, [lines])
  useEffect(() => { inputRef.current?.focus() }, [])
  const run = raw => {
    const text = raw.trim(), [cmd, ...rest] = text.split(/\s+/), arg = rest.join(' '), lower = cmd.toLowerCase()
    if (!text) return
    setHistory(h => [...h, text]); setHistoryIndex(-1); setInput('')
    if (lower === 'clear') { setLines([]); return }
    let output = '', error = false
    switch (lower) {
      case 'help': output = 'Explore\n  about       The person behind the portfolio\n  projects    A selection of my work\n  skills      My technology toolkit\n  experience  Professional journey\n  education   University & certifications\n  contact     Get in touch\n  resume      Open my resume\n\nWorkspace\n  open <app or project>     Launch an application\n  theme <light|dark|system> Set appearance\n  whoami / neofetch         A quick introduction\n  date / version           System information\n  clear                    Clear this terminal\n\n↑ ↓ History  ·  Tab Autocomplete  ·  Ctrl+L Clear'; break
      case 'about': output = `${profile.name}\n${profile.title}\n\n${profile.bio}\n\n${profile.focus}`; break
      case 'whoami': output = `${profile.name} — ${profile.title}\n${profile.specialties.join(' · ')}\n${profile.locationLabel}`; break
      case 'projects': output = projects.map((p,i) => `${i + 1}. ${p.name}\n   ${p.description}\n   Stack: ${p.tags.join(', ')}`).join('\n\n') + '\n\nTry: open Medample'; break
      case 'skills': output = Object.entries(skills).map(([k,v]) => `${k}\n  ${v.join(' · ')}`).join('\n\n'); break
      case 'experience': output = experience.map(e => `${e.role}\n${e.company} — ${e.duration}\n${e.description}`).join('\n\n'); break
      case 'education': output = `${profile.education.degree}\n${profile.education.university}\n${profile.education.graduation} · CGPA ${profile.education.cgpa}\n\n${profile.certifications.join('\n')}`; break
      case 'contact': output = `Let's build something great.\n\nEmail: ${profile.email}\nGitHub: ${profile.github}\n\nTry: open contact`; break
      case 'resume': os.openApp('resume'); output = 'Opening the original resume PDF…'; break
      case 'date': output = new Date().toLocaleString(); break
      case 'version': output = 'harshOS 1.0.0\nReact + Hono + Vite\nA personal portfolio, not a real operating system.'; break
      case 'neofetch': output = `  ▄▄▄   ▄▄▄     ${profile.name}\n  ███   ███     ──────────────────────────\n                OS: harshOS 1.0\n  ▀▀▀   ▀▀▀     Role: Full Stack Developer\n  ███   ███     Stack: React · Node · MongoDB\n                Focus: AI & Automation\n                Education: A.K.S. University\n                Theme: ${os.preferences.theme}\n                Apps: ${os.windows.length} running`; break
      case 'theme': if (['light','dark','system'].includes(arg)) { os.updatePreferences({ theme: arg }); output = `Appearance changed to ${arg}.` } else output = `Current theme: ${os.preferences.theme}\nUsage: theme light | dark | system`; break
      case 'open': { const a = apps.find(a => a.id.toLowerCase() === arg.toLowerCase() || a.name.toLowerCase() === arg.toLowerCase()), p = projects.find(p => p.name.toLowerCase() === arg.toLowerCase() || p.id === arg.toLowerCase()); if (a) { os.openApp(a.id); output = `Opening ${a.name}…` } else if (p) { os.openApp('projects', p.id); output = `Opening ${p.name}…` } else { output = `No app or project named “${arg}”. Type help to explore.`; error = true } break }
      case 'sudo': if (arg === 'hire-me') { os.openApp('contact'); output = 'Permission granted. Great collaborations start with a hello.' } else { output = 'This terminal is a safe portfolio simulation. No system commands are executed.'; error = true } break
      default: output = `Command not found: ${cmd}\nType “help” for available commands.`; error = true
    }
    setLines(l => [...l, { text, type: 'command' }, { text: output, type: error ? 'error' : 'output' }])
  }
  return <div className="terminal-app"><header className="terminal-tab"><span className="status-dot"/>harsh@workspace: ~<span>PORTFOLIO SHELL</span></header><div className="terminal-scroll" ref={scrollRef} onClick={e => { if (!window.getSelection()?.toString()) inputRef.current?.focus() }}>{lines.map((l,i) => <div key={i} className={`terminal-line ${l.type}`}>{l.type === 'command' && <span className="terminal-prompt">harsh@workspace ~ $ </span>}{l.text}</div>)}<form className="terminal-input-row" onSubmit={e => { e.preventDefault(); run(input) }}><label htmlFor="terminal-command" className="terminal-prompt">harsh@workspace <span>~</span> $</label><input id="terminal-command" ref={inputRef} aria-label="Terminal command" autoComplete="off" spellCheck="false" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.ctrlKey && e.key.toLowerCase() === 'l') { e.preventDefault(); setLines([]) } if (e.key === 'ArrowUp') { e.preventDefault(); const i = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1); setHistoryIndex(i); setInput(history[i] || '') } if (e.key === 'ArrowDown') { e.preventDefault(); const i = historyIndex + 1; setHistoryIndex(i >= history.length ? -1 : i); setInput(history[i] || '') } if (e.key === 'Tab') { e.preventDefault(); const options = input.startsWith('open ') ? [...apps.map(a => 'open '+a.name), ...projects.map(p => 'open '+p.name)] : commands; const matches = options.filter(c => c.toLowerCase().startsWith(input.toLowerCase())); if (matches.length === 1) setInput(matches[0]); else if (matches.length > 1) setLines(l => [...l, { text: matches.join('   '), type: 'output' }]) } }}/></form></div><footer className="terminal-footer"><span>JavaScript portfolio shell · No real system access</span><span>UTF-8</span></footer></div>
}
