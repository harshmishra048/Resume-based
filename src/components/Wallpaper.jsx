import { useOS } from '../context/OSContext'
export default function Wallpaper({ preview = false, variant }) {
  const { preferences: p } = useOS()
  const type = variant || p.wallpaper
  if (!preview && (type === 'custom' || type === 'solid')) return <div className="wallpaper" style={{ backgroundColor: p.solid, backgroundImage: type === 'custom' && p.customWallpaper ? `url("${p.customWallpaper}")` : undefined, backgroundSize: p.wallpaperFit, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}/>
  return <div className={`wallpaper wallpaper-${type} ${preview ? 'wallpaper-preview' : ''}`}>
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`bg-${type}`} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#082c68"/><stop offset=".52" stopColor="#185492"/><stop offset="1" stopColor="#79aac4"/></linearGradient>
        <linearGradient id={`fold-${type}`} x1="0" y1=".8" x2=".7" y2=".1"><stop stopColor="#051e50"/><stop offset=".46" stopColor="#125faf"/><stop offset=".76" stopColor="#459ed8"/><stop offset=".94" stopColor="#a4d8ef"/><stop offset="1" stopColor="#428abe"/></linearGradient>
        <linearGradient id={`ribbon-${type}`} x1=".2" y1=".8" x2=".75" y2=".2"><stop stopColor="#103271"/><stop offset=".36" stopColor="#2170b8"/><stop offset=".74" stopColor="#68b5df"/><stop offset=".94" stopColor="#c5e4ef"/><stop offset="1" stopColor="#679fca"/></linearGradient>
        <linearGradient id={`edge-${type}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#93d0ef"/><stop offset=".42" stopColor="#2c8fcd"/><stop offset="1" stopColor="#06337e"/></linearGradient>
        <filter id={`shadow-${type}`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="-15" dy="32" stdDeviation="30" floodColor="#001d48" floodOpacity=".35"/></filter>
      </defs>
      <rect width="1600" height="1000" fill={`url(#bg-${type})`}/>
      <g filter={`url(#shadow-${type})`}>
        <path d="M400 1140C500 950 580 1010 620 680S880 150 1200 160c170 8 370 230 545 72V1000Z" fill={`url(#fold-${type})`}/>
        <path d="M460 1120c150-170 110-390 285-470s290 50 300-120S1000 150 1230 82c210-60 290 78 530 15v190c-160 180-390-28-505 91s60 296-76 403-318-36-417 143-18 162-18 162Z" fill={`url(#ribbon-${type})`}/>
        <path d="M670 1140c-60-260 200-268 210-473s-10-209 88-247c150-60 210 210 404 63 150-114 175-20 300-45v562Z" fill={`url(#edge-${type})`}/>
        <path d="M756 1100c-9-208 303-309 290-440s-87-197 32-269c-164 27-107 216-177 283-118 113-273 199-240 426Z" fill={`url(#ribbon-${type})`}/>
        <path d="M939 1100c72-116 160-204 352-181s285-67 376-134v315Z" fill={`url(#fold-${type})`}/>
      </g>
    </svg>
    <div className="wallpaper-grain"/>
  </div>
}
