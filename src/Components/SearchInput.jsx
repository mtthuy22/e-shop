import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [searchItem, setSearchItem] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  
  const navigate = useNavigate();
  
  function handleSearchInput(e) {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    setSearchParams({search: searchTerm})
    navigate(`products?search=${searchTerm}`)
  }

  return (
    <form className="d-flex" role="search">
      <input
        value={searchItem}
        onChange={(e) => handleSearchInput(e)}
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      {/* <button class="btn btn-outline-primary" type="submit">
        Search
      </button> */}
    </form>
  );
};

export default SearchInput;
