import { Suspense } from 'react';
import HeadlineGrid from '@/components/HeadlineGrid';
import { Metadata } from 'next';

function formatMediaType(type: string = '') {
  return type
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ✅ Use static metadata export for static routes
export const metadata: Metadata = {
  title: '1000Headlines',
  description:
    'Discover and get inspired by the most compelling headlines across different platforms and industries.',
};

// Add dynamic flag to prevent static prerendering
export const dynamic = 'force-dynamic';

export default function MediaPage() {
  return (
    <div className="page-container">
      <div className="content-area">
        <Suspense fallback={<div>Loading...</div>}>
          <HeadlineGrid />
        </Suspense>
      </div>
    </div>
  );
}
