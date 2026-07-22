'use client';
import { useEffect, useState } from 'react';
import { Card, Heading, Text, Badge, Grid } from '@astryxdesign/core';
function confVariant(v){ if(v>=0.75) return 'success'; if(v>=0.5) return 'warning'; return 'error'; }
export default function SourcesView() {
  const [a, setA] = useState(null);
  useEffect(() => { fetch('/api/artifact').then(r => r.json()).then(setA); }, []);
  if (!a) return (<Text type="supporting">Loading...</Text>);
  const docs = a.documents_index || [];
  const cq = (a.citation_quality || {}).source_reports || [];
  const byId = Object.fromEntries(cq.map((r)=>[r.source_id, r]));
  return (
    <Grid columns={3} gap={3}>
      {docs.map((d,i)=>{
        const q = byId[d.source_id] || {};
        return (
        <Card key={i} variant="default" style={{padding:16}}>
          <Heading level={3}>{d.title}</Heading>
          <div style={{marginTop:8, display:'flex', flexDirection:'column', gap:4}}>
            <a href={d.url} style={{color:'var(--color-text-link,#2563eb)', textDecoration:'underline'}} target="_blank" rel="noreferrer">{d.domain || d.url}</a>
            <div style={{display:'flex', flexWrap:'wrap', gap:6, marginTop:4}}>
              <Badge variant="neutral" label={d.word_count + ' words'} />
              {d.authority!=null && <Badge variant={confVariant(d.authority)} label={'authority ' + Math.round(d.authority*100) + '%'} />}
              {q.quality!=null && <Badge variant={confVariant(q.quality)} label={'quality ' + Math.round(q.quality*100) + '%'} />}
            </div>
            {q.corroboration!=null && <Text type="supporting" color="secondary" style={{fontSize:12, marginTop:4}}>corroboration {Math.round(q.corroboration*100)}% · contradiction rate {Math.round((q.contradiction_rate||0)*100)}%</Text>}
          </div>
        </Card>
        );})
      }
      {docs.length===0 && <Text type="supporting">No documents.</Text>}
    </Grid>
  );
}
