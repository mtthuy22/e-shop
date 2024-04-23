import React, { useContext } from "react";
import Button from "./Button";
import { CartContext } from "./CartContext";

function Product({ product }) {
  const {isInCart, addToCart} = useContext(CartContext)
  
  return (
    <>
      <div className="col">
        <div className="card h-100">
          <div className="ratio ratio-1x1">
            <img
              src={product.thumbnail}
              className="card-img-top img-fluid object-fit-cover"
              alt={product.title}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text mb-3">{product.description}</p>
          </div>
          <div className="card-footer px-2">
            <div className="d-flex justify-content-between align-items-center column-gap-2 row-gap-2 flex-wrap">
              <p className="card-text fw-bold mb-0 ">{product.price} EUR</p>
              {/* {isInCart(product) ? (
                <Button
                  type="button"
                  btnVariant="btn-primary-outline"
                  disabled={isInCart(product)}
                  text="Already in cart"
                ></Button>
              ) : (
                <Button
                  type="button"
                  onClick={()=>addToCart(product)}
                  btnVariant="btn-primary"
                  text="Add to cart"
                ></Button>
              )} */}
              <Button
                  type="button"
                  onClick={()=>addToCart(product)}
                  btnVariant="btn-primary"
                  text="Add to cart"
                ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
