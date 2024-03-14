import React from "react";

function Categories({ categories, chooseCategory, selectedCategory, display }) {
  return (
    <ul className={`${!display && 'd-none'} list-group list-group-flush flex-row flex-md-column flex-wrap flex-md-nowrap`}>
      {categories.map((category) => (
        <li
          className={`list-group-item ${
            category === selectedCategory ? "active" : ""
          }`}
          onClick={() => chooseCategory(category)}
          key={category}
        >
          {category}
        </li>
      ))}
    </ul>
  );
}

export default Categories;
