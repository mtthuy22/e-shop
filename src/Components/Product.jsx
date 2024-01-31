import React from "react";

function Product({ name, imgSrc, description, price, addToCart, isInCart }) {
  return (
    <>
      <div className="card mx-2">
        <img src={imgSrc} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">{price} EUR</p>
          {isInCart ? (
            <button
              type="button"
              className="btn btn-primary-outline"
              disabled
            >
              Already in cart
            </button>
          ) : (
            <button
              type="button"
              onClick={addToCart}
              className="btn btn-primary"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
