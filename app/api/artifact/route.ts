import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';
export async function GET() {
  try {
    const p = path.join(process.cwd(), 'data', 'clinical-knowledge-artifact.json');
    const data = JSON.parse(readFileSync(p, 'utf-8'));
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
