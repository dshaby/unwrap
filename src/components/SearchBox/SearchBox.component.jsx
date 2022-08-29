import "./SearchBox.styles.css";
const SearchBox = ({ className, placeholder, value, onChangeHandler }) => {
  return (
    <div>
      <input
        className={`search-box ${className}`}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default SearchBox;
