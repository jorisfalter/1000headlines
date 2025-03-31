interface HeadlineCardProps {
  headline: string
  brand: string
  categories: string[]
  date: string
  views: string
  saves: string
}

export default function HeadlineCard({
  headline,
  brand,
  categories,
  date,
  views,
  saves,
}: HeadlineCardProps) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-3">{headline}</h2>
      {brand && <p className="text-gray-600 mb-3">{brand}</p>}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <span
            key={category}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
          >
            {category}
          </span>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{date}</span>
        <div className="flex gap-4">
          <span>👁️ {views}</span>
          <span>💾 {saves}</span>
        </div>
      </div>
    </div>
  )
} 