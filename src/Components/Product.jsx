import React from "react";
import Button from "./Button";

function Product({ name, imgSrc, description, price, addToCart, isInCart }) {
  return (
    <>
      <div className="col">
        <div className="card h-100">
          <div className="ratio ratio-1x1">
            <img
              src={imgSrc}
              className="card-img-top img-fluid object-fit-cover"
              alt={name}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text mb-3">{description}</p>
          </div>
          <div className="card-footer px-2">
            <div className="d-flex justify-content-between align-items-center column-gap-2 row-gap-2 flex-wrap">
              <p className="card-text fw-bold mb-0 ">{price} EUR</p>
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
        </div>
      </div>
    </>
  );
}

export default Product;
