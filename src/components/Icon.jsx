import {
 Person24Filled, Folder24Filled, Code24Regular, Briefcase24Filled, HatGraduation24Filled,
 DocumentText24Filled, Mail24Filled, Desktop24Filled, WindowConsole20Filled,
 Globe24Filled, Settings24Filled, Delete24Regular, Pulse24Regular,
 Search20Regular, Dismiss20Regular, Subtract20Regular, Maximize20Regular,
 SquareMultiple20Regular, ChevronRight20Regular, ChevronLeft20Regular, ChevronDown20Regular,
 ArrowRight20Regular, ArrowLeft20Regular, ArrowDownload20Regular, ArrowClockwise20Regular,
 Open20Regular, Copy20Regular, Checkmark20Regular, Location20Regular,
 WeatherSunny20Regular, WeatherMoon20Regular, Wifi120Regular, Speaker220Regular,
 BatteryCharge20Regular, Alert20Regular, Power20Regular, Grid20Regular,
 List20Regular, MoreHorizontal20Regular, Calendar20Regular, Clock20Regular,
 Heart24Filled, PeopleCommunity24Filled, HandWave24Regular, ScanPerson24Regular,
 Color24Filled, Image24Regular, Print20Regular, ArrowSort20Regular, Info20Regular,
 Accessibility20Regular, Shield20Regular, Bluetooth20Regular, Window20Regular,
 ArrowExpand20Regular, Link20Regular, Keyboard20Regular, Home20Regular
} from '@fluentui/react-icons'
const icons = { person:Person24Filled, folder:Folder24Filled, code:Code24Regular, briefcase:Briefcase24Filled, education:HatGraduation24Filled, document:DocumentText24Filled, mail:Mail24Filled, computer:Desktop24Filled, terminal:WindowConsole20Filled, browser:Globe24Filled, settings:Settings24Filled, delete:Delete24Regular, activity:Pulse24Regular, search:Search20Regular, close:Dismiss20Regular, minimize:Subtract20Regular, maximize:Maximize20Regular, restore:SquareMultiple20Regular, right:ChevronRight20Regular, left:ChevronLeft20Regular, down:ChevronDown20Regular, arrow:ArrowRight20Regular, back:ArrowLeft20Regular, download:ArrowDownload20Regular, refresh:ArrowClockwise20Regular, external:Open20Regular, copy:Copy20Regular, check:Checkmark20Regular, location:Location20Regular, sun:WeatherSunny20Regular, moon:WeatherMoon20Regular, wifi:Wifi120Regular, volume:Speaker220Regular, battery:BatteryCharge20Regular, notification:Alert20Regular, power:Power20Regular, grid:Grid20Regular, list:List20Regular, more:MoreHorizontal20Regular, calendar:Calendar20Regular, clock:Clock20Regular, health:Heart24Filled, people:PeopleCommunity24Filled, hand:HandWave24Regular, scan:ScanPerson24Regular, design:Color24Filled, image:Image24Regular, print:Print20Regular, sort:ArrowSort20Regular, info:Info20Regular, accessibility:Accessibility20Regular, shield:Shield20Regular, bluetooth:Bluetooth20Regular, window:Window20Regular, expand:ArrowExpand20Regular, link:Link20Regular, keyboard:Keyboard20Regular, home:Home20Regular }
export default function Icon({ name, size = 20, className = '', ...props }) {
  const Component = icons[name] || icons.window
  return <Component width={size} height={size} className={className} aria-hidden="true" {...props} />
}
export function AppIcon({ app, size = 38, plain = false }) {
  return <span className={`app-icon ${app?.color || 'blue'} ${plain ? 'plain' : ''}`} style={{ '--icon-size': `${size}px` }}><Icon name={app?.icon || 'window'} size={size * .64} /></span>
}
export function Brand({ small = false }) {
  return <span className={`brand ${small ? 'small' : ''}`} aria-hidden="true"><i/><i/><i/><i/></span>
}
