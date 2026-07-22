'use client';
import { useEffect, useState } from 'react';
import { Card, Heading, Text, Badge, Grid } from '@astryxdesign/core';
export default function GuidelineView() {
  const [a, setA] = useState(null);
  useEffect(() => { fetch('/api/artifact').then(r => r.json()).then(setA); }, []);
  if (!a) return (<Text type="supporting">Loading...</Text>);
  const evs = [...(a.guideline_timeline||[])].sort((x,y)=>String(x.date||'').localeCompare(String(y.date||'')));
  const chs = a.guideline_changes || [];
  return (
    <Grid columns={2} gap={6}>
      <div>
        <Heading level={2} style={{marginBottom:12}}>Timeline of recommendations</Heading>
        <div style={{borderLeft:'2px solid var(--color-border,#e3e6ea)', paddingLeft:20, display:'flex', flexDirection:'column', gap:12}}>
          {evs.map((e,i)=>(
            <div key={i} style={{position:'relative'}}>
              <span style={{position:'absolute', left:-26, top:6, height:10, width:10, borderRadius:'50%', background:'var(--color-background-accent,#3b82f6)'}} />
              <Card variant="default" style={{padding:12}}>
                <div style={{display:'flex', justifyContent:'space-between', gap:8}}>
                  <Text>{e.body}</Text>
                  <div style={{display:'flex', alignItems:'center', gap:8, flexShrink:0}}><Badge variant="neutral" label={e.type} /><Text type="supporting" color="secondary" style={{fontSize:12}}>{e.date||'n.d.'}</Text></div>
                </div>
                {e.guideline_ref && <Text type="supporting" color="secondary" style={{fontSize:12}}>{e.guideline_ref}</Text>}
              </Card>
            </div>
          ))}
          {evs.length===0 && <Text type="supporting">No dated guideline events extracted.</Text>}
        </div>
      </div>
      <div>
        <Heading level={2} style={{marginBottom:12}}>What changed between editions</Heading>
        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          {chs.map((c,i)=>(
            <Card key={i} variant="default" style={{padding:16}}>
              <Heading level={3}>{c.topic}</Heading>
              <div style={{marginTop:8, borderLeft:'3px solid var(--color-border-error,#ef4444)', background:'var(--color-background-error,#2a1416)', color:'var(--color-text-primary,#fafafa)', padding:8, borderRadius:6}}>From: {c.from}</div>
              <div style={{marginTop:6, borderLeft:'3px solid var(--color-border-success,#22c55e)', background:'var(--color-background-success,#10251a)', color:'var(--color-text-primary,#fafafa)', padding:8, borderRadius:6}}>To: {c.to}</div>
              {c.rationale && <Text type="supporting" color="secondary" style={{display:'block', marginTop:8}}>{c.rationale}</Text>}
            </Card>
          ))}
          {chs.length===0 && <Text type="supporting">No explicit edition changes detected.</Text>}
        </div>
      </div>
    </Grid>
  );
}
