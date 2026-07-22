'use client';
import { Card, Heading, Text } from '@astryxdesign/core';
export function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <Card variant="muted" style={{padding:16}}>
      <Heading level={2} style={{marginBottom:4}}>{value}</Heading>
      <Text type="supporting" color="secondary">{label}</Text>
      {sub && <Text type="supporting" color="secondary" style={{marginTop:4, fontSize:12}}>{sub}</Text>}
    </Card>
  );
}
