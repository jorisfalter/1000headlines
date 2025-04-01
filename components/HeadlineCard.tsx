interface HeadlineCardProps {
  platform: string;
  title: string;
  industry: string;
  date: string;
}

const HeadlineCard = ({ platform, title, industry, date }: HeadlineCardProps) => {
  return (
    <div className="headline-card">
      <div className="platform-badge">{platform}</div>
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