'use client';
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
function gcls(g:string){ if(g==='A') return 'bg-green-100 text-green-800 border-green-300'; if(g==='B') return 'bg-blue-100 text-blue-800 border-blue-300'; if(g==='C') return 'bg-amber-100 text-amber-800 border-amber-300'; return 'bg-red-100 text-red-800 border-red-300'; }
function evLookup(a:any, txId:string){ return (a.evidence||[]).find((e:any)=>e.id===txId) || {}; }
export default function TreatmentsView() {
  const [a, setA] = useState<any>(null);
  const [q, setQ] = useState(''); const [fg, setFg] = useState('all');
  useEffect(() => { fetch('/api/artifact').then(r => r.json()).then(setA); }, []);
  const txs = useMemo(()=>{ const t=(a?.treatments||[]); return t.filter((x:any)=> (fg==='all'||(evLookup(a,x.id).grade||'').toUpperCase()===fg) && (q===''|| (x.name||'').toLowerCase().includes(q.toLowerCase()) || (x.indication||'').toLowerCase().includes(q.toLowerCase())) ); }, [a,q,fg]);
  if (!a) return (<div className="text-sm text-muted-foreground">Loading...</div>);
  const grades = ['A','B','C','D'];
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Input placeholder="search treatments..." value={q} onChange={e=>setQ(e.target.value)} className="max-w-xs" />
        <button onClick={()=>setFg('all')} className={fg==='all'?'rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground':'rounded-full border px-3 py-1 text-xs'}>all</button>
        {grades.map((g:any)=>(<button key={g} onClick={()=>setFg(g)} className={fg===g?'rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground':'rounded-full border px-3 py-1 text-xs'}>{g}</button>
      ))}
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {txs.map((t:any,i:number)=>{
          const ev = evLookup(a, t.id); const grade = (ev.grade||'').toUpperCase();
          return (
          <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1 p-5">
              <h3 className="flex items-center gap-2 text-base font-semibold leading-none tracking-tight">{t.name}<Badge className={gcls(grade)}>{grade||'—'}{ev.score!=null && ' · '+Math.round(ev.score*100)+'%'}</Badge></h3>
            </div>
            <div className="space-y-1 p-5 pt-0 text-sm">
              {t.class && <div><span className="text-muted-foreground">Class: </span>{t.class}</div>}
              {t.indication && <div><span className="text-muted-foreground">Indication: </span>{t.indication}</div>}
              {t.population && <div><span className="text-muted-foreground">Population: </span>{t.population}</div>}
              {ev.recommendation && <div className="rounded-md border-l-2 border-accent bg-muted/40 p-2">{ev.recommendation}</div>}
              {t.guideline_refs?.length>0 && <div className="flex flex-wrap gap-1">{t.guideline_refs.map((r:any,k:number)=><Badge key={k}>{r}</Badge>)}</div>}
              {t.source_ids?.length>0 && <div className="text-xs text-muted-foreground">sources: {t.source_ids.join(', ')}</div>}
            </div>
          </div>
          );
        })}}
        {txs.length===0 && <div className="text-sm text-muted-foreground">No treatments.</div>}
      </div>
    </div>
  );
}
