import HeadlineGrid from '@/components/HeadlineGrid';

interface PageProps {
  params: {
    type: string;
  };
}

function formatMediaType(type: string) {
  return type.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: PageProps) {
  const title = formatMediaType(params.type);
  return {
    title: `${title} Headlines - 1000Headlines`,
    description: `Collection of the best ${title} headlines and advertising examples.`
  };
}

export default function MediaPage({ params }: PageProps) {
  const mediaType = formatMediaType(params.type);
  
  return (
    <div>
      {/* <h1 className="text-3xl font-bold mb-8 px-8 pt-8">
        {mediaType} Headlines
      </h1> */}
      <HeadlineGrid platform={mediaType} />
    </div>
  );
}

// This generates static pages for each media type at build time
export function generateStaticParams() {
  return [
    { type: 'billboard' },
    { type: 'facebook-ad' },
    { type: 'print' },
    { type: 'blog' },
    { type: 'youtube' },
    { type: 'magazine' },
    { type: 'long-form' },
    { type: 'google-ad' }
  ];
} 