import React, { useContext } from "react";
import Button from "./Button";
import { CartContext } from "./CartContext";
import { discountCalculation } from "./helpers";

function Product({ product }) {
  const { addToCart, getQuantityInCart } = useContext(CartContext);
  const rating = Math.round(product.rating / 0.5) * 0.5;
  const stars = Array(Math.floor(rating)).fill(1);
  const emptyStars = Array(5 - Math.ceil(rating)).fill(0);
  rating - stars.length && stars.push(0.5);
  stars.push(...emptyStars);
  const stock = product.stock - getQuantityInCart(product.id);
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
            <div className="rating mb-2">
              {stars.map((rating, index) => {
                if (rating === 1) {
                  return (
                    <i
                      key={index}
                      className="fa-solid fa-star text-warning"
                    ></i>
                  );
                } else if (rating === 0.5) {
                  return (
                    <i
                      key={index}
                      className="fa-solid fa-star-half-stroke text-warning"
                    ></i>
                  );
                } else {
                  return (
                    <i
                      key={index}
                      className="fa-regular fa-star text-warning"
                    ></i>
                  );
                }
              })}

              <span className="fs-6 fw-semibold">
                <small> {product.rating}</small>
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center column-gap-2 row-gap-2 flex-wrap">
              <p
                className={`card-text mb-0 text-secondary ${
                  product.discountPercentage === 0 && `invisible`
                } text-decoration-line-through`}
              >{`${product.price} EUR`}</p>
              <p className="card-text fw-bold mb-0">
                {discountCalculation(
                  product.price,
                  product.discountPercentage
                ).toFixed(2)}{" "}
                EUR
              </p>
              {stock ? (
                <Button
                  type="button"
                  onClick={() => addToCart(product)}
                  btnVariant="btn-primary"
                  text="Add to cart"
                ></Button>
              ) : (
                <Button
                  type="button"
                  btnVariant="btn-primary-outline"
                  disabled={true}
                  text="Out of stock"
                ></Button>
              )}
              {product.discountPercentage !== 0 && (
                <p className="card-text fw-bold text-bg-warning mb-0 p-1">
                  -{product.discountPercentage}%
                </p>
              )}
            </div>
            <p className="card-text">
              <small>{stock ? `In stock: ${stock}` : `Unavailable`}</small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
