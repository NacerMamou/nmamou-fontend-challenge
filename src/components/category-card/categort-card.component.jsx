
const CategoryCard = ({ id, nbKeywords, name }) => {
  return (
    <div className="category-selector">
      <div className="category-id-container">
        <p>Id</p>
        <span>{id}</span>
      </div>
      <strong className="category-name-container">{name}</strong>
      <div className="category-keywords-container">
        <p>nbKeywords</p>
        <span> {nbKeywords}</span>
      </div>
    </div>
  );
}

export default CategoryCard;
