interface HeadlineCardProps {
  platform: string;
  title: string;
  industry: string;
  date: string;
}

const platformColors: { [key: string]: string } = {
  'Print': 'var(--color-purple)',
  'Facebook Ad': 'var(--color-blue)',
  'Blog': 'var(--color-green)',
  'Billboard': 'var(--color-orange)',
  'YouTube': 'var(--color-red)',
  'Magazine': 'var(--color-pink)',
  'Long Form': 'var(--color-indigo)',
  'Google Ad': 'var(--color-yellow)'
};

const getTagColor = (platform: string): string => {
  return platformColors[platform] || 'var(--primary-color)'; // fallback to default
};

const HeadlineCard = ({ platform, title, industry, date }: HeadlineCardProps) => {
  return (
    <div className="headline-card">
      <div 
        className="platform-badge"
        style={{ background: getTagColor(platform) }}
      >
        {platform}
      </div>
      <div className="headline-content">
        <h3>{title}</h3>
        <div className="metadata">
          <span className="industry">{industry}</span>
          <span className="date">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default HeadlineCard; 