import HeadlineGrid from '@/components/HeadlineGrid';
import { Metadata } from 'next';

function formatMediaType(type: string = '') {
  return type.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Update the type definition for the page props
type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
  params: { slug?: string }
}

export async function generateMetadata({ searchParams = {} }: Props): Promise<Metadata> {
  const type = typeof searchParams.type === 'string' ? searchParams.type : '';
  const title = type ? `${formatMediaType(type)} Headlines - 1000Headlines` : '1000Headlines';
  
  return {
    title,
    description: type 
      ? `Collection of the best ${formatMediaType(type)} headlines and advertising examples.`
      : 'Discover and get inspired by the most compelling headlines across different platforms and industries.'
  };
}

export default function MediaPage({ searchParams = {} }: Props) {
  const type = typeof searchParams.type === 'string' ? searchParams.type : '';
  const formattedType = formatMediaType(type);

  return (
    <div className="page-container">
      <div className="content-area">
        {/* <h1 className="text-2xl font-bold mb-4">
          {formattedType} Headlines
        </h1> */}
        <HeadlineGrid />
      </div>
    </div>
  );
} 