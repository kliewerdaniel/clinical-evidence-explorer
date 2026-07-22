'use client';
import { useEffect, useState } from 'react';
import { Card, Heading, Text, Badge } from '@astryxdesign/core';
function sevVariant(s){ if(s==='high') return 'error'; if(s==='medium') return 'warning'; return 'info'; }
export default function ConflictsView() {
  const [a, setA] = useState(null);
  useEffect(() => { fetch('/api/artifact').then(r => r.json()).then(setA); }, []);
  if (!a) return (<Text type="supporting">Loading...</Text>);
  const cons = a.treatment_conflicts || [];
  return (
    <div style={{display:'flex', flexDirection:'column', gap:12}}>
      {cons.map((c,i)=>(
        <Card key={i} variant="default" style={{padding:16}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <Badge variant={sevVariant(c.severity)} label={c.kind} />
            <Text type="supporting" color="secondary" style={{fontSize:12}}>severity: {c.severity}</Text>
          </div>
          <div style={{marginTop:8, borderLeft:'3px solid var(--color-border-error,#ef4444)', background:'var(--color-background-error,#fef2f2)', padding:8, borderRadius:6}}>
            <span style={{fontWeight:600}}>{c.treatment_a}</span>{c.treatment_b && <span> <span style={{color:'var(--color-text-secondary,#687076)'}}>vs</span> <span style={{fontWeight:600}}>{c.treatment_b}</span></span>}
          </div>
          {c.detail && <Text type="supporting" color="secondary" style={{display:'block', marginTop:8}}>{c.detail}</Text>}
          {(c.side_a_source_ids||[]).length>0 && <Text type="supporting" color="secondary" style={{fontSize:12, marginTop:8}}>side A: {c.side_a_source_ids.join(', ')} · side B: {(c.side_b_source_ids||[]).join(', ')}</Text>}
        </Card>
      ))}
      {cons.length===0 && <Text type="supporting">No treatment conflicts detected — sources appear consistent on this topic.</Text>}
    </div>
  );
}
