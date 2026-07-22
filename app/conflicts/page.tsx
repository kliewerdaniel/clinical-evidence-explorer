'use client';
import { Heading, Text } from '@astryxdesign/core';
import ConflictsView from '../../components/ConflictsView';
import Sidebar from '../../components/Sidebar';
export default function Page() {
  return (
    <div style={{display:'flex', minHeight:'100vh'}}>
      <Sidebar />
      <main style={{flex:1, overflow:'auto', padding:'32px', maxWidth:1200, margin:'0 auto', width:'100%'}}>
        <Heading level={1} style={{marginBottom:4}}>Treatment Conflicts</Heading>
        <Text type="supporting" color="secondary">Compiled from your clinical corpus.</Text>
        <div style={{marginTop:24}}>
          <ConflictsView />
        </div>
      </main>
    </div>
  );
}
