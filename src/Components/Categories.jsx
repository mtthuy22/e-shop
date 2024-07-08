import React, { useEffect, useState } from "react";
import { textTransform } from "./helpers";
import { Link } from "react-router-dom";

function Categories() {
  const [allCategories, setAllCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  
  function getCategories() {
    setLoadingCategories(true);
    
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => {
        setAllCategories([...data]);
        setLoadingCategories(false);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);

  if(loadingCategories){
    return(
      <p className="list-group-item list-group-item-action w-auto">
      Loading categories...
    </p>
    )
  }

  return (
    <>
      <Link to={`/`} className="list-group-item list-group-item-action w-auto">
        All products
      </Link>

      {allCategories.map((category) => (
        <Link
          key={category}
          className={`list-group-item list-group-item-action w-auto`}
          to={`/categories/${category}`}
        >
          {textTransform(category)}
        </Link>
      ))}
    </>
  );
}

export default Categories;
