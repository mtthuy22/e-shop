import React from "react";

function StarsRating({ productRating }) {
  const rating = Math.round(productRating / 0.5) * 0.5;
  const stars = Array(Math.floor(rating)).fill("star-fill");
  const emptyStars = Array(5 - Math.ceil(rating)).fill("star");
  rating - stars.length && stars.push("star-half");
  stars.push(...emptyStars);

  return (
    stars.map((rating, index) => (
      <i key={index} className={`bi bi-${rating} text-warning`}></i>
    ))
  );
}

export default StarsRating;
