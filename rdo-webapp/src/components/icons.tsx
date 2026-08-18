import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>;
}

export function HomeIcon(props: IconProps) { return <IconBase {...props}><path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9"/><path d="M9 21v-7h6v7"/></IconBase>; }
export function ProjectsIcon(props: IconProps) { return <IconBase {...props}><path d="M3 6h7l2 2h9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M3 10h18"/></IconBase>; }
export function ClipboardIcon(props: IconProps) { return <IconBase {...props}><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2"/><path d="M9 10h6M9 14h6M9 18h4"/></IconBase>; }
export function ClockIcon(props: IconProps) { return <IconBase {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></IconBase>; }
export function SettingsIcon(props: IconProps) { return <IconBase {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></IconBase>; }
export function PlusIcon(props: IconProps) { return <IconBase {...props}><path d="M12 5v14M5 12h14"/></IconBase>; }
export function ArrowIcon(props: IconProps) { return <IconBase {...props}><path d="M5 12h14M14 7l5 5-5 5"/></IconBase>; }
export function ShieldIcon(props: IconProps) { return <IconBase {...props}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 7.8 7.5 9.5 4.3-1.7 7.5-4.9 7.5-9.5V6Z"/><path d="m9 12 2 2 4-4"/></IconBase>; }
export function UsersIcon(props: IconProps) { return <IconBase {...props}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20v-2a5 5 0 0 1 10 0v2M14 16a4 4 0 0 1 7 3"/></IconBase>; }
export function DatabaseIcon(props: IconProps) { return <IconBase {...props}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></IconBase>; }
export function LogoutIcon(props: IconProps) { return <IconBase {...props}><path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10"/></IconBase>; }
export function SearchIcon(props: IconProps) { return <IconBase {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></IconBase>; }
export function CheckIcon(props: IconProps) { return <IconBase {...props}><path d="m5 12 4 4L19 6"/></IconBase>; }
export function WarningIcon(props: IconProps) { return <IconBase {...props}><path d="M10.3 3.6 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></IconBase>; }
export function CloudIcon(props: IconProps) { return <IconBase {...props}><path d="M17.5 19H7a5 5 0 1 1 1.1-9.9A6 6 0 0 1 19.5 11 4 4 0 0 1 17.5 19Z"/></IconBase>; }
export function SunIcon(props: IconProps) { return <IconBase {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></IconBase>; }
export function RainIcon(props: IconProps) { return <IconBase {...props}><path d="M17.5 15H7a5 5 0 1 1 1.1-9.9A6 6 0 0 1 19.5 7 4 4 0 0 1 17.5 15Z"/><path d="m8 18-1 2M13 18l-1 2M18 18l-1 2"/></IconBase>; }
export function WindIcon(props: IconProps) { return <IconBase {...props}><path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a2 2 0 1 1-2 2M3 16h9a3 3 0 1 1-3 3"/></IconBase>; }
export function MenuIcon(props: IconProps) { return <IconBase {...props}><path d="M4 7h16M4 12h16M4 17h16"/></IconBase>; }
export function CloseIcon(props: IconProps) { return <IconBase {...props}><path d="m6 6 12 12M18 6 6 18"/></IconBase>; }
