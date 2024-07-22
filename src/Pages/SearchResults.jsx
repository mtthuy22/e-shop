import React, { useEffect, useState } from "react";
import ProductList from "../Components/ProductList";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const productsPerPage = 48;
  const [allSearchResults, setAllSearchResult] = useState(false);
  const [searchIsLoading, setSearchIsLoading] = useState(true);

  const [timerId, setTimerId] = useState();

  let [searchParams] = useSearchParams();
  let searchTerm = searchParams.get("search");

  function debounceSearch() {
    setSearchResults([]);
    let timerId = setTimeout(getSearchResults, 1500);
    setTimerId(timerId);
  }

  const getSearchResults = () => {
    try {
      setSearchIsLoading(true);
      fetch(
        `https://dummyjson.com/products/search?q=${searchTerm}&limit=${productsPerPage}&skip=${searchResults.length}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchResults([...searchResults, ...data.products]);
          if ([...searchResults, ...data.products].length === data.total) {
            setAllSearchResult(true);
          }
          setSearchIsLoading(false);
        });
    } catch (error) {
      setSearchIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      // getSearchResults();
      debounceSearch();
    }
    clearTimeout(timerId);
  }, [searchTerm]);

  if (searchIsLoading) {
    return <p>Searching for products...</p>;
  }

  return (
    <>
      <h2>Search results</h2>
      <ProductList
        products={searchResults}
        isLoading={searchIsLoading}
        onLoadMore={getSearchResults}
        isEverythingLoaded={allSearchResults}
      />
    </>
  );
};

export default SearchResults;
