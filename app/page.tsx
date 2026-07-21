'use client';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
function gcls(g:string){ if(g==='A') return 'bg-green-100 text-green-800 border-green-300'; if(g==='B') return 'bg-blue-100 text-blue-800 border-blue-300'; if(g==='C') return 'bg-amber-100 text-amber-800 border-amber-300'; return 'bg-red-100 text-red-800 border-red-300'; }
export default function Page() {
  const [a, setA] = useState<any>(null);
  useEffect(() => { fetch('/api/artifact').then(r => r.json()).then(setA); }, []);
  if (!a) return (<div className="flex min-h-screen"><Sidebar /><main className="flex-1 p-8 text-sm text-muted-foreground">Loading artifact...</main></div>);
  const cs = a.clinical_summary || {}; const cq = a.citation_quality || {};
  const ev = a.evidence || []; const topA = ev.filter((e:any)=>e.grade==='A').slice(0,6);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="grid-bg flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Clinical Evidence Overview</h1>
        <p className="mb-2 text-sm text-muted-foreground">Objective:</p>
        <p className="mb-6 rounded-md border bg-card p-3 text-sm">{cs.objective || a.objective || '—'}</p>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Sources" value={cs.sources ?? '—'} sub="discovered" />
          <StatCard label="Treatments" value={cs.treatments_total ?? '—'} sub="extracted" />
          <StatCard label="Evidence grade A" value={cs.treatments_graded_A ?? 0} sub="strong" />
          <StatCard label="Treatment conflicts" value={cs.treatment_conflicts ?? 0} sub="detected" />
          <StatCard label="Guideline events" value={cs.guideline_events ?? 0} sub="timeline" />
          <StatCard label="Grade D (weak)" value={cs.treatments_graded_D ?? 0} sub="insufficient" />
          <StatCard label="Corpus confidence" value={cq.corpus_confidence != null ? Math.round(cq.corpus_confidence*100)+'%' : '—'} sub="evidence quality" />
          <StatCard label="Compiled passes" value={(a.stats||{}).compiled_passes?.length ?? 0} sub="artifacts" />
        </div>
        {topA.length>0 && (
          <Card className="mt-8"><CardHeader><CardTitle>Strongest-evidence treatments (Grade A)</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {topA.map((e:any,i:number)=>(
                <div key={i} className="flex items-center justify-between rounded-md border p-2 text-sm">
                  <span>{e.name}</span><Badge className={gcls(e.grade)}>{e.grade} · {Math.round((e.score||0)*100)}%</Badge>
                </div>
      ))}
            </CardContent></Card>)}
        <div className="mt-6 text-xs text-muted-foreground">This app is a renderer of the compiled Clinical Knowledge Artifact. The artifact (not this UI) is the product.</div>
      </main>
    </div>
  );
}
