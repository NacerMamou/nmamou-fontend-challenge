import { getStringDateInverted } from "../../utils/date.utils";

const CurrentCategory = ({title, startingDate, endingDate}) => {
  return (
    <div className="current-category-container">
      <h2 className="category-title">
        Category :
        <span className="category-name">"{title}"</span> , Period :
        <span className="date" >{getStringDateInverted(startingDate)} </span> -
        <span className="date" >{getStringDateInverted(endingDate)} </span>
      </h2>
    </div>
  );
}

export default CurrentCategory;
