import React from "react";
import { textTransform } from "./helpers";

function Categories({ categories, chooseCategory, selectedCategory}) {
  return (
   <>
      {categories.map((category) => (
        <button
          className={`list-group-item list-group-item-action w-auto ${
            category === selectedCategory ? "active" : ""
          }`}
          onClick={() => chooseCategory(category)}
          key={category}
        >
          {textTransform(category)}
        </button>
      ))}
   </>
 
  );
}

export default Categories;
