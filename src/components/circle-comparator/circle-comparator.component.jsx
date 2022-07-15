function CircleComparator({ title, value, percentage }) {
  return (
    <div className="circle-comparator">
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
