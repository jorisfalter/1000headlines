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

export default async function MediaPage({ searchParams = Promise.resolve({}) }: PageProps) {
  const params = await searchParams;
  const type = params.type || '';
  const mediaType = type ? formatMediaType(type) : '';
  
  return (
    <div>
      <SearchSection />
      <div className="content-section">
        {/* <h1 className="text-3xl font-bold mb-8 px-8 pt-8">
          {mediaType} Headlines
        </h1> */}
        <HeadlineGrid platform={mediaType} />
      </div>
    </div>
  );
} 