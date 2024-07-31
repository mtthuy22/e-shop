import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [searchItem, setSearchItem] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  function handleSearchInput(e) {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    setSearchParams({ search: searchTerm });
    navigate(`products?search=${searchTerm}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    const searchTerm = searchParams.get("search");
    if (searchTerm === null) {
      setSearchItem("");
    } else {
      setSearchItem(searchTerm);
    }
  }, [searchParams.get("search")]);

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        value={searchItem}
        onChange={(e) => handleSearchInput(e)}
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
    </form>
  );
};

export default SearchInput;
