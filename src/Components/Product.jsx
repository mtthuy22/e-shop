import React from "react";
import Button from "./Button";

function Product({ name, imgSrc, description, price, addToCart, isInCart }) {
  return (
    <>
      <div className="card col mb-2">
        <img src={imgSrc} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">{price} EUR</p>
          {isInCart ? (
            <Button
              type="button"
              btnColor="primary-outline"
              disabled={isInCart}
              text="Already in cart"
            ></Button>
          ) : (
            <Button
              type="button"
              onClick={addToCart}
              btnColor="primary"
              text="Add to cart"
            ></Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
