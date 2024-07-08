import React, { useEffect, useState } from "react";
import { textTransform } from "./helpers";
import { Link } from "react-router-dom";

function Categories() {
  const [allCategories, setAllCategories] = useState([]);

  function getCategories() {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => {
        setAllCategories([...data]);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);

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
