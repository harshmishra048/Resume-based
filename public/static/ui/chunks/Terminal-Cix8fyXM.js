import{a as e,c as t,f as n,l as r,m as i,o as a,p as o,s,t as c}from"../app.js";var l=i(o(),1),u=n(),d=[`help`,`about`,`projects`,`skills`,`experience`,`education`,`contact`,`resume`,`clear`,`whoami`,`theme`,`date`,`neofetch`,`open`,`version`,`sudo hire-me`],f=`harshOS Terminal [Version 1.0.0]
A little closer to the source.

Type “help” to see what you can do.`;function p(){let n=t(),[i,o]=(0,l.useState)([{text:f,type:`intro`}]),[p,m]=(0,l.useState)(``),[h,g]=(0,l.useState)([]),[_,v]=(0,l.useState)(-1),y=(0,l.useRef)(null),b=(0,l.useRef)(null);(0,l.useEffect)(()=>{b.current?.scrollTo(0,b.current.scrollHeight)},[i]),(0,l.useEffect)(()=>{y.current?.focus()},[]);let x=t=>{let i=t.trim(),[l,...u]=i.split(/\s+/),d=u.join(` `),f=l.toLowerCase();if(!i)return;if(g(e=>[...e,i]),v(-1),m(``),f===`clear`){o([]);return}let p=``,h=!1;switch(f){case`help`:p=`Explore
  about       The person behind the portfolio
  projects    A selection of my work
  skills      My technology toolkit
  experience  Professional journey
  education   University & certifications
  contact     Get in touch
  resume      Open my resume

Workspace
  open <app or project>     Launch an application
  theme <light|dark|system> Set appearance
  whoami / neofetch         A quick introduction
  date / version           System information
  clear                    Clear this terminal

↑ ↓ History  ·  Tab Autocomplete  ·  Ctrl+L Clear`;break;case`about`:p=`${a.name}\n${a.title}\n\n${a.bio}\n\n${a.focus}`;break;case`whoami`:p=`${a.name} — ${a.title}\n${a.specialties.join(` · `)}\n${a.locationLabel}`;break;case`projects`:p=c.map((e,t)=>`${t+1}. ${e.name}\n   ${e.description}\n   Stack: ${e.tags.join(`, `)}`).join(`

`)+`

Try: open Medample`;break;case`skills`:p=Object.entries(s).map(([e,t])=>`${e}\n  ${t.join(` · `)}`).join(`

`);break;case`experience`:p=e.map(e=>`${e.role}\n${e.company} — ${e.duration}\n${e.description}`).join(`

`);break;case`education`:p=`${a.education.degree}\n${a.education.university}\n${a.education.graduation} · CGPA ${a.education.cgpa}\n\n${a.certifications.join(`
`)}`;break;case`contact`:p=`Let's build something great.\n\nEmail: ${a.email}\nGitHub: ${a.github}\n\nTry: open contact`;break;case`resume`:n.openApp(`resume`),p=`Opening the original resume PDF…`;break;case`date`:p=new Date().toLocaleString();break;case`version`:p=`harshOS 1.0.0
React + Hono + Vite
A personal portfolio, not a real operating system.`;break;case`neofetch`:p=`  ▄▄▄   ▄▄▄     ${a.name}\n  ███   ███     ──────────────────────────\n                OS: harshOS 1.0\n  ▀▀▀   ▀▀▀     Role: Full Stack Developer\n  ███   ███     Stack: React · Node · MongoDB\n                Focus: AI & Automation\n                Education: A.K.S. University\n                Theme: ${n.preferences.theme}\n                Apps: ${n.windows.length} running`;break;case`theme`:[`light`,`dark`,`system`].includes(d)?(n.updatePreferences({theme:d}),p=`Appearance changed to ${d}.`):p=`Current theme: ${n.preferences.theme}\nUsage: theme light | dark | system`;break;case`open`:{let e=r.find(e=>e.id.toLowerCase()===d.toLowerCase()||e.name.toLowerCase()===d.toLowerCase()),t=c.find(e=>e.name.toLowerCase()===d.toLowerCase()||e.id===d.toLowerCase());e?(n.openApp(e.id),p=`Opening ${e.name}…`):t?(n.openApp(`projects`,t.id),p=`Opening ${t.name}…`):(p=`No app or project named “${d}”. Type help to explore.`,h=!0);break}case`sudo`:d===`hire-me`?(n.openApp(`contact`),p=`Permission granted. Great collaborations start with a hello.`):(p=`This terminal is a safe portfolio simulation. No system commands are executed.`,h=!0);break;default:p=`Command not found: ${l}\nType “help” for available commands.`,h=!0}o(e=>[...e,{text:i,type:`command`},{text:p,type:h?`error`:`output`}])};return(0,u.jsxs)(`div`,{className:`terminal-app`,children:[(0,u.jsxs)(`header`,{className:`terminal-tab`,children:[(0,u.jsx)(`span`,{className:`status-dot`}),`harsh@workspace: ~`,(0,u.jsx)(`span`,{children:`PORTFOLIO SHELL`})]}),(0,u.jsxs)(`div`,{className:`terminal-scroll`,ref:b,onClick:e=>{window.getSelection()?.toString()||y.current?.focus()},children:[i.map((e,t)=>(0,u.jsxs)(`div`,{className:`terminal-line ${e.type}`,children:[e.type===`command`&&(0,u.jsx)(`span`,{className:`terminal-prompt`,children:`harsh@workspace ~ $ `}),e.text]},t)),(0,u.jsxs)(`form`,{className:`terminal-input-row`,onSubmit:e=>{e.preventDefault(),x(p)},children:[(0,u.jsxs)(`label`,{htmlFor:`terminal-command`,className:`terminal-prompt`,children:[`harsh@workspace `,(0,u.jsx)(`span`,{children:`~`}),` $`]}),(0,u.jsx)(`input`,{id:`terminal-command`,ref:y,"aria-label":`Terminal command`,autoComplete:`off`,spellCheck:`false`,value:p,onChange:e=>m(e.target.value),onKeyDown:e=>{if(e.ctrlKey&&e.key.toLowerCase()===`l`&&(e.preventDefault(),o([])),e.key===`ArrowUp`){e.preventDefault();let t=_<0?h.length-1:Math.max(0,_-1);v(t),m(h[t]||``)}if(e.key===`ArrowDown`){e.preventDefault();let t=_+1;v(t>=h.length?-1:t),m(h[t]||``)}if(e.key===`Tab`){e.preventDefault();let t=(p.startsWith(`open `)?[...r.map(e=>`open `+e.name),...c.map(e=>`open `+e.name)]:d).filter(e=>e.toLowerCase().startsWith(p.toLowerCase()));t.length===1?m(t[0]):t.length>1&&o(e=>[...e,{text:t.join(`   `),type:`output`}])}}})]})]}),(0,u.jsxs)(`footer`,{className:`terminal-footer`,children:[(0,u.jsx)(`span`,{children:`JavaScript portfolio shell · No real system access`}),(0,u.jsx)(`span`,{children:`UTF-8`})]})]})}export{p as default};