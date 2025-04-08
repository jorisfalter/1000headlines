import HeadlineGrid from '@/components/HeadlineGrid';
import SearchSection from '@/components/SearchSection';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

function formatMediaType(type: string) {
  return type.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ searchParams }: PageProps) {
  const type = String(searchParams.type || '');
  const title = formatMediaType(type);
  return {
    title: `${title} Headlines - 1000Headlines`,
    description: `Collection of the best ${title} headlines and advertising examples.`
  };
}

export default function MediaPage({ searchParams }: PageProps) {
  const type = String(searchParams.type || '');
  const mediaType = formatMediaType(type);
  
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