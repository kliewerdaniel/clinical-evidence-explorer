'use client';
import GuidelineView from '../../components/GuidelineView';
import Sidebar from '../../components/Sidebar';
export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="grid-bg flex-1 overflow-auto p-8">
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">Guideline Evolution</h1>
        <p className="mb-6 text-sm text-muted-foreground">Compiled from your clinical corpus.</p>
        <GuidelineView />
      </main>
    </div>
  );
}
