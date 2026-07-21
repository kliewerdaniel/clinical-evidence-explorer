'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
export default function GuidelineView() {
  const [a, setA] = useState<any>(null);
  useEffect(() => { fetch('/api/artifact').then(r => r.json()).then(setA); }, []);
  if (!a) return (<div className="text-sm text-muted-foreground">Loading...</div>);
  const evs = [...(a.guideline_timeline||[])].sort((x:any,y:any)=>String(x.date||'').localeCompare(String(y.date||'')));
  const chs = a.guideline_changes || [];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <h2 className="mb-3 text-lg font-semibold">Timeline of recommendations</h2>
        <div className="relative space-y-3 border-l pl-6">
          {evs.map((e:any,i:number)=>(
            <div key={i} className="relative">
              <span className="absolute -left-[1.6rem] top-2 h-3 w-3 rounded-full bg-accent" />
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex items-start justify-between gap-3 p-3">
                  <div><div className="text-sm">{e.body}</div>{e.guideline_ref && <div className="text-xs text-muted-foreground">{e.guideline_ref}</div>}</div>
                  <div className="flex shrink-0 items-center gap-2"><Badge>{e.type}</Badge><span className="text-xs text-muted-foreground">{e.date||'n.d.'}</span></div>
                </div>
              </div>
            </div>
          ))}
          {evs.length===0 && <div className="text-sm text-muted-foreground">No dated guideline events extracted.</div>}
        </div>
      </div>
      <div>
        <h2 className="mb-3 text-lg font-semibold">What changed between editions</h2>
        <div className="space-y-3">
          {chs.map((c:any,i:number)=>(
            <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1 p-5">
                <h3 className="text-base font-semibold leading-none tracking-tight">{c.topic}</h3>
              </div>
              <div className="space-y-1 p-5 pt-0 text-sm">
                <div className="rounded-md border-l-2 border-red-400 bg-red-50/40 p-2">From: {c.from}</div>
                <div className="rounded-md border-l-2 border-green-400 bg-green-50/40 p-2">To: {c.to}</div>
                {c.rationale && <div className="text-xs text-muted-foreground">{c.rationale}</div>}
              </div>
            </div>
          ))}
          {chs.length===0 && <div className="text-sm text-muted-foreground">No explicit edition changes detected.</div>}
        </div>
      </div>
    </div>
  );
}
