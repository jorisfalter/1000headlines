'use client';

interface CategoryCount {
  name: string;
  count: number;
  href: string;
}

const sourceTypes: CategoryCount[] = [
  { name: 'Facebook Ads', count: 340, href: '/ads/facebook' },
  { name: 'Google Ads', count: 209, href: '/ads/google' },
  { name: 'Blog Headlines', count: 140, href: '/blog-titles' },
  { name: 'YouTube Titles', count: 116, href: '/youtube' },
  { name: 'Magazine Headlines', count: 85, href: '/magazine' },
  { name: 'Long Form Copy', count: 78, href: '/longform' },
];

const industries: CategoryCount[] = [
  { name: 'SaaS', count: 120, href: '/industry/saas' },
  { name: 'E-commerce', count: 95, href: '/industry/ecommerce' },
  { name: 'Finance', count: 82, href: '/industry/finance' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 py-8 px-6">
      <div className="mb-8">
        <h2 className="font-bold mb-4">SOURCE TYPES</h2>
        <ul className="space-y-2">
          {sourceTypes.map((category) => (
            <li key={category.href}>
              <a href={category.href} className="hover:underline">
                {category.name}({category.count})
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-bold mb-4">INDUSTRIES</h2>
        <ul className="space-y-2">
          {industries.map((industry) => (
            <li key={industry.href}>
              <a href={industry.href} className="hover:underline">
                {industry.name}({industry.count})
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
} 