import React, { useEffect, useState } from "react";
import { textTransform } from "./helpers";
import { Link } from "react-router-dom";

function Categories({ chooseCategory, selectedCategory }) {
  const [allCategories, setAllCategories] = useState(["All products"]);

  function getCategories() {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => {
        setAllCategories([...allCategories, ...data]);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  return allCategories.map((category) => (
    <Link
      key={category}
      className={`list-group-item list-group-item-action w-auto ${
        category === selectedCategory ? "active" : ""
      }`}
      to={`/categories/${category}`}
      onClick={() => chooseCategory(category)}
    >
      {textTransform(category)}
    </Link>
  ));
}

export default Categories;
