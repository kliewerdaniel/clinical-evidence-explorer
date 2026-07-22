'use client';
import { useEffect, useMemo, useState } from 'react';
import { Card, Heading, Text, Badge, Button, TextInput, Grid } from '@astryxdesign/core';
function gradeVariant(g){ if(g==='A') return 'success'; if(g==='B') return 'info'; if(g==='C') return 'warning'; return 'error'; }
function evLookup(a, txId){ return (a.evidence||[]).find((e)=>e.id===txId) || {}; }
export default function TreatmentsView() {
  const [a, setA] = useState(null);
  const [q, setQ] = useState(''); const [fg, setFg] = useState('all');
  useEffect(() => { fetch('/api/artifact').then(r => r.json()).then(setA); }, []);
  const txs = useMemo(()=>{ const t=(a?.treatments||[]); return t.filter((x)=> (fg==='all'||(evLookup(a,x.id).grade||'').toUpperCase()===fg) && (q===''|| (x.name||'').toLowerCase().includes(q.toLowerCase()) || (x.indication||'').toLowerCase().includes(q.toLowerCase())) ); }, [a,q,fg]);
  if (!a) return (<Text type="supporting">Loading...</Text>);
  const grades = ['A','B','C','D'];
  return (
    <div>
      <div style={{display:'flex', flexWrap:'wrap', alignItems:'center', gap:8, marginBottom:16}}>
        <TextInput label="Search treatments" value={q} onChange={(e)=>setQ(e.target.value)} isLabelHidden />
        <Button variant={fg==='all'?'primary':'secondary'} size="sm" onClick={()=>setFg('all')}>all</Button>
        {grades.map((g)=>(<Button key={g} variant={fg===g?'primary':'secondary'} size="sm" onClick={()=>setFg(g)}>{g}</Button>
      ))}
      </div>
      <Grid columns={2} gap={3}>
        {txs.map((t,i)=>{
          const ev = evLookup(a, t.id); const grade = (ev.grade||'').toUpperCase();
          return (
          <Card key={i} variant="default" style={{padding:16}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
              <Heading level={3}>{t.name}</Heading>
              <Badge variant={gradeVariant(grade)} label={grade||'—'} />
            </div>
            <div style={{marginTop:8, display:'flex', flexDirection:'column', gap:4}}>
              {t.class && <Text type="supporting"><span style={{color:'var(--color-text-secondary,#687076)'}}>Class: </span>{t.class}</Text>}
              {t.indication && <Text type="supporting"><span style={{color:'var(--color-text-secondary,#687076)'}}>Indication: </span>{t.indication}</Text>}
              {t.population && <Text type="supporting"><span style={{color:'var(--color-text-secondary,#687076)'}}>Population: </span>{t.population}</Text>}
              {ev.recommendation && <div style={{borderLeft:'3px solid var(--color-border-accent,#3b82f6)', background:'var(--color-background-muted,#f1f3f5)', padding:8, borderRadius:6, marginTop:4}}>{ev.recommendation}</div>}
              {ev.score!=null && <Text type="supporting" color="secondary" style={{marginTop:4}}>Evidence score: {Math.round(ev.score*100)}%</Text>}
              {t.guideline_refs?.length>0 && <div style={{display:'flex', flexWrap:'wrap', gap:4, marginTop:4}}>{t.guideline_refs.map((r,k)=><Badge key={k} variant="neutral" label={r} />)}</div>}
              {t.source_ids?.length>0 && <Text type="supporting" color="secondary" style={{fontSize:12, marginTop:4}}>sources: {t.source_ids.join(', ')}</Text>}
            </div>
          </Card>
          );})
        }
        {txs.length===0 && <Text type="supporting">No treatments.</Text>}
      </Grid>
    </div>
  );
}
