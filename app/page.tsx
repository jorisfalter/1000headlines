import { Suspense } from 'react';
import SearchSection from '@/components/SearchSection';
import HeadlineGrid from '@/components/HeadlineGrid';

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchSection />
        <HeadlineGrid />
      </Suspense>
    </main>
  );
} 