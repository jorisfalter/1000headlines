import HeadlineGrid from '@/components/HeadlineGrid';
import { Metadata } from 'next';

function formatMediaType(type: string = '') {
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Properly typed page props
type PageProps = {
  params?: {}; // You don't need it, but Next expects this field
  searchParams?: { [key: string]: string | string[] };
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const type = typeof props.searchParams?.type === 'string' ? props.searchParams.type : '';
  const title = type ? `${formatMediaType(type)} Headlines - 1000Headlines` : '1000Headlines';

  return {
    title,
    description: type
      ? `Collection of the best ${formatMediaType(type)} headlines and advertising examples.`
      : 'Discover and get inspired by the most compelling headlines across different platforms and industries.',
  };
}

export default function MediaPage(props: PageProps) {
  const type = typeof props.searchParams?.type === 'string' ? props.searchParams.type : '';
  const formattedType = formatMediaType(type);

  return (
    <div className="page-container">
      <div className="content-area">
        <HeadlineGrid />
      </div>
    </div>
  );
}
