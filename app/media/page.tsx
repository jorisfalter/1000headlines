import HeadlineGrid from '@/components/HeadlineGrid';
import SearchSection from '@/components/SearchSection';
import { Metadata } from 'next';

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}

function formatMediaType(type: string = '') {
  return type.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ searchParams = Promise.resolve({}) }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const type = params.type || '';
  const title = type ? `${formatMediaType(type)} Headlines - 1000Headlines` : '1000Headlines';
  return {
    title,
    description: type 
      ? `Collection of the best ${formatMediaType(type)} headlines and advertising examples.`
      : 'Discover and get inspired by the most compelling headlines across different platforms and industries.'
  };
}

export default function MediaPage({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const mediaType = searchParams.type;

  return (
    <div className="page-container">
      <div className="content-area">
        {/* <h1 className="text-2xl font-bold mb-4">
          {mediaType} Headlines
        </h1> */}
        <HeadlineGrid />
      </div>
    </div>
  );
} 