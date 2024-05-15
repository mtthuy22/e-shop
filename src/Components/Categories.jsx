import React from "react";
import { textTransform } from "./helpers";

function Categories({ categories, chooseCategory, selectedCategory, display }) {
  return (
    <div
      className={`${
        !display && "d-none"
      } list-group list-group-flush flex-row flex-md-column flex-wrap flex-md-nowrap`}
    >
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
    </div>
  );
}

export default Categories;
