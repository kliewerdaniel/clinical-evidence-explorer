'use client';
import Link from 'next/link';
import { Stethoscope, Pill, AlertTriangle, History, Database } from 'lucide-react';
const items = [
  { href: '/', label: 'Overview', icon: Stethoscope },
  { href: '/treatments', label: 'Treatments', icon: Pill },
  { href: '/conflicts', label: 'Conflicts', icon: AlertTriangle },
  { href: '/guideline', label: 'Guideline Evolution', icon: History },
  { href: '/sources', label: 'Sources', icon: Database },
];
export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-card">
      <div className="px-5 py-5">
        <div className="text-sm font-semibold tracking-tight">Clinical Evidence</div>
        <div className="text-xs text-muted-foreground">compiled knowledge artifact</div>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <it.icon className="h-4 w-4" /> {it.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
