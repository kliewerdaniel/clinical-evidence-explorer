'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
function conf(v:number){ if(v>=0.75) return 'text-green-600'; if(v>=0.5) return 'text-amber-600'; return 'text-red-600'; }
export default function SourcesView() {
  const [a, setA] = useState<any>(null);
  useEffect(() => { fetch('/api/artifact').then(r => r.json()).then(setA); }, []);
  if (!a) return (<div className="text-sm text-muted-foreground">Loading...</div>);
  const docs = a.documents_index || [];
  const cq = (a.citation_quality || {}).source_reports || [];
  const byId = Object.fromEntries(cq.map((r:any)=>[r.source_id, r]));
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {docs.map((d:any,i:number)=>{
        const q = byId[d.source_id] || {};
        return (
        <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1 p-5">
            <h3 className="text-base font-semibold leading-none tracking-tight">{d.title}</h3>
          </div>
          <div className="space-y-2 p-5 pt-0 text-sm">
            <div className="truncate"><a href={d.url} className="text-accent hover:underline" target="_blank" rel="noreferrer">{d.domain || d.url}</a></div>
            <div className="flex flex-wrap gap-2">
              <Badge>{d.word_count} words</Badge>
              {d.authority!=null && <Badge className={conf(d.authority)}>authority {Math.round(d.authority*100)}%</Badge>}
              {q.quality!=null && <Badge className={conf(q.quality)}>quality {Math.round(q.quality*100)}%</Badge>}
            </div>
            {q.corroboration!=null && <div className="text-xs text-muted-foreground">corroboration {Math.round(q.corroboration*100)}% · contradiction rate {Math.round((q.contradiction_rate||0)*100)}%</div>}
          </div>
        </div>
        );}
      )}
      {docs.length===0 && <div className="text-sm text-muted-foreground">No documents.</div>}
    </div>
  );
}
