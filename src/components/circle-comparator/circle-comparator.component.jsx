const CircleComparator = ({ title, percentage, className }) => {
  return (
    <div className={className}>
      <span className="title">{title}</span>
      {percentage >= 0 && (
        <div className="percentage">
          <span className="sign positive">+</span>
          <span className="number positive">{percentage}</span>
          <span className="symbol positive">%</span>
        </div>
      )}
      {percentage < 0 && (
        <div className="percentage">
          <span className="sign negative">-</span>
          <span className="number negative">{Math.abs(percentage)}</span>
          <span className="symbol negative">%</span>
        </div>
      )}
    </div>
  );
}

export default CircleComparator;
