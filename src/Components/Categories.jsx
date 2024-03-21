import React from "react";

function Categories({
  categories,
  chooseCategory,
  selectedCategory,
  display,
  textTransform,
}) {
  return (
    <div
      className={`${
        !display && "d-none"
      } list-group list-group-flush flex-row flex-md-column flex-wrap flex-md-nowrap`}
    >
      {categories.map((category) => (
        <button
          className={`list-group-item list-group-item-action ${
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
