'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
function sevcls(s:string){ if(s==='high') return 'bg-red-100 text-red-800 border-red-300'; if(s==='medium') return 'bg-amber-100 text-amber-800 border-amber-300'; return 'bg-slate-100 text-slate-700 border-slate-300'; }
export default function ConflictsView() {
  const [a, setA] = useState<any>(null);
  useEffect(() => { fetch('/api/artifact').then(r => r.json()).then(setA); }, []);
  if (!a) return (<div className="text-sm text-muted-foreground">Loading...</div>);
  const cons = a.treatment_conflicts || [];
  return (
    <div className="space-y-3">
      {cons.map((c:any,i:number)=>(
        <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1 p-5">
            <h3 className="flex items-center gap-2 text-base font-semibold leading-none tracking-tight"><Badge className={sevcls(c.severity)}>{c.kind}</Badge><span className="text-xs text-muted-foreground">severity: {c.severity}</span></h3>
          </div>
          <div className="space-y-2 p-5 pt-0 text-sm">
            <div className="rounded-md border-l-2 border-red-400 bg-red-50/40 p-2"><span className="font-medium">{c.treatment_a}</span>{c.treatment_b && <span> <span className="text-muted-foreground">vs</span> <span className="font-medium">{c.treatment_b}</span></span>}</div>
            {c.detail && <div className="text-xs text-muted-foreground">{c.detail}</div>}
            {(c.side_a_source_ids||[]).length>0 && <div className="text-xs text-muted-foreground">side A: {c.side_a_source_ids.join(', ')} · side B: {(c.side_b_source_ids||[]).join(', ')}</div>}
          </div>
        </div>
      ))}
      {cons.length===0 && <div className="text-sm text-muted-foreground">No treatment conflicts detected — sources appear consistent on this topic.</div>}
    </div>
  );
}
