'use client';
import Link from 'next/link';
import { SideNav, SideNavItem } from '@astryxdesign/core';
const items = [
  { href: '/', label: 'Overview', d: 'M3 12h4l3 8 4-16 3 8h4' },
  { href: '/treatments', label: 'Treatments', d: 'M12 2v20M2 12h20' },
  { href: '/conflicts', label: 'Conflicts', d: 'M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L14.4 3.9a2 2 0 0 0-3.4 0z' },
  { href: '/guideline', label: 'Guideline Evolution', d: 'M3 3v18h18M7 16l4-4 3 3 5-6' },
  { href: '/sources', label: 'Sources', d: 'M4 7h16M4 12h16M4 17h16' },
];
function Ico({d}: {d: string}) {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>);
}
export default function Sidebar() {
  return (
    <SideNav style={{height:'100vh', borderRight:'1px solid var(--color-border, #e3e6ea)'}}>
      <div style={{padding:'20px 16px'}}>
        <div style={{fontWeight:600, fontSize:15}}>Clinical Evidence</div>
        <div style={{fontSize:12, color:'var(--color-text-secondary, #687076)'}}>compiled knowledge artifact</div>
      </div>
      <nav style={{display:'flex', flexDirection:'column', gap:4, padding:'0 12px'}}>
        {items.map((it) => (
          <SideNavItem key={it.href} href={it.href} label={it.label} icon={<Ico d={it.d} />} />
        ))}
      </nav>
    </SideNav>
  );
}
