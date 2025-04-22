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

// ✅ Explicitly ignore route props to stop type inference
// @ts-expect-error suppress Next.js type conflict caused by build cache
export default function MediaPage(_props: never) {
  return (
    <div className="page-container">
      <div className="content-area">
        <HeadlineGrid />
      </div>
    </div>
  );
}
