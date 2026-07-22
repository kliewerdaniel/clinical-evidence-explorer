'use client';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { Card, Heading, Text, Badge, Grid } from '@astryxdesign/core';
function gradeVariant(g){ if(g==='A') return 'success'; if(g==='B') return 'info'; if(g==='C') return 'warning'; return 'error'; }
export default function Page() {
  const [a, setA] = useState(null);
  useEffect(() => { fetch('/api/artifact').then(r => r.json()).then(setA); }, []);
  if (!a) return (<div style={{display:'flex', minHeight:'100vh'}}><Sidebar /><main style={{flex:1, padding:32}}><Text type="supporting">Loading artifact...</Text></main></div>);
  const cs = a.clinical_summary || {}; const cq = a.citation_quality || {};
  const ev = a.evidence || []; const topA = ev.filter((e)=>e.grade==='A').slice(0,6);
  return (
    <div style={{display:'flex', minHeight:'100vh'}}>
      <Sidebar />
      <main style={{flex:1, overflow:'auto', padding:'32px', maxWidth:1200, margin:'0 auto', width:'100%'}}>
        <Heading level={1}>Clinical Evidence Overview</Heading>
        <Text type="supporting" color="secondary" style={{marginTop:4}}>Objective:</Text>
        <Card variant="default" style={{marginTop:8, padding:12}}><Text>{cs.objective || a.objective || '—'}</Text></Card>
        <Grid columns={4} gap={3} style={{marginTop:24}}>
          <StatCard label="Sources" value={cs.sources ?? '—'} sub="discovered" />
          <StatCard label="Treatments" value={cs.treatments_total ?? '—'} sub="extracted" />
          <StatCard label="Evidence grade A" value={cs.treatments_graded_A ?? 0} sub="strong" />
          <StatCard label="Treatment conflicts" value={cs.treatment_conflicts ?? 0} sub="detected" />
          <StatCard label="Guideline events" value={cs.guideline_events ?? 0} sub="timeline" />
          <StatCard label="Grade D (weak)" value={cs.treatments_graded_D ?? 0} sub="insufficient" />
          <StatCard label="Corpus confidence" value={cq.corpus_confidence != null ? Math.round(cq.corpus_confidence*100)+'%' : '—'} sub="evidence quality" />
          <StatCard label="Compiled passes" value={(a.stats||{}).compiled_passes?.length ?? 0} sub="artifacts" />
        </Grid>
        {topA.length>0 && (
          <Card variant="default" style={{marginTop:32, padding:16}}>
            <Heading level={3} style={{marginBottom:12}}>Strongest-evidence treatments (Grade A)</Heading>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {topA.map((e,i)=>(
                <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', border:'1px solid var(--color-border,#e3e6ea)', borderRadius:8, padding:8}}>
                  <span>{e.name}</span><Badge variant={gradeVariant(e.grade)} label={e.grade + ' · ' + Math.round((e.score||0)*100) + '%'} />
                </div>
      ))}
            </div>
          </Card>)}
        <Text type="supporting" color="secondary" style={{marginTop:24, fontSize:12}}>This app is a renderer of the compiled Clinical Knowledge Artifact. The artifact (not this UI) is the product.</Text>
      </main>
    </div>
  );
}
