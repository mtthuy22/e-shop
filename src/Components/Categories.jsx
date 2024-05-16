import React, { useEffect, useState } from "react";
import { textTransform } from "./helpers";

function Categories({ chooseCategory, selectedCategory }) {
  const [allCategories, setAllCategories] = useState(["All products"]);

  function getCategories() {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setAllCategories([...allCategories, ...data]);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
  
      allCategories.map((category) => (
        <button
          className={`list-group-item list-group-item-action w-auto ${
            category === selectedCategory ? "active" : ""
          }`}
          onClick={() => chooseCategory(category)}
          key={category}
        >
          {textTransform(category)}
        </button>
      ))

  );
}

export default Categories;
