export const apps = [
  { id: 'about', name: 'About Me', icon: 'person', color: 'blue', description: 'Meet the person behind the pixels', group: 'Portfolio' },
  { id: 'projects', name: 'Projects', icon: 'folder', color: 'yellow', description: 'A collection of things I have built', group: 'Portfolio' },
  { id: 'skills', name: 'Skills', icon: 'code', color: 'purple', description: 'My development toolkit', group: 'Portfolio' },
  { id: 'experience', name: 'Experience', icon: 'briefcase', color: 'orange', description: 'My professional journey', group: 'Portfolio' },
  { id: 'education', name: 'Education', icon: 'education', color: 'teal', description: 'Education, certifications & achievements', group: 'Portfolio' },
  { id: 'resume', name: 'Resume', icon: 'document', color: 'blue', description: 'Harsh_Mishra_Resume.pdf', group: 'Portfolio' },
  { id: 'contact', name: 'Contact', icon: 'mail', color: 'blue', description: 'Let’s build something together', group: 'Portfolio' },
  { id: 'explorer', name: 'This PC', icon: 'computer', color: 'blue', description: 'Explore portfolio files and folders', group: 'System' },
  { id: 'terminal', name: 'Terminal', icon: 'terminal', color: 'dark', description: 'A different way to explore', group: 'System' },
  { id: 'browser', name: 'Browser', icon: 'browser', color: 'teal', description: 'Portfolio links & web shortcuts', group: 'System' },
  { id: 'settings', name: 'Settings', icon: 'settings', color: 'gray', description: 'Make this desktop your own', group: 'System' },
  { id: 'recycle', name: 'Recycle Bin', icon: 'delete', color: 'gray', description: 'A few things I have left behind', group: 'System' },
  { id: 'tasks', name: 'Task Manager', icon: 'activity', color: 'teal', description: 'Manage running portfolio apps', group: 'System' }
]
export const getApp = (id) => apps.find(a => a.id === id)
export const desktopApps = ['explorer', 'about', 'projects', 'resume', 'terminal', 'contact', 'recycle']
export const pinnedApps = ['explorer', 'about', 'projects', 'browser', 'terminal', 'settings']
export const defaults = { theme: 'light', accent: '#087cef', wallpaper: 'bloom', wallpaperFit: 'cover', customWallpaper: '', solid: '#143a61', iconSize: 46, iconSpacing: 12, showIcons: true, cornerRadius: 12, transparency: 96, blur: 20, motion: 'full', font: 'DM Sans', fontSize: 13, density: 'comfortable', brightness: 100, focus: false, sound: false, volume: 35, skipBoot: false, autoHide: false, taskbarPosition: 'bottom' }
export const wallpapers = [{ id: 'bloom', name: 'Blue hour', color: '#195d9c' }, { id: 'dusk', name: 'Afterglow', color: '#655486' }, { id: 'forest', name: 'Evergreen', color: '#1a675b' }, { id: 'midnight', name: 'Midnight', color: '#10233b' }]
