import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarsRating from "../Components/StarsRating";
import { CartContext } from "../Components/CartContext";
import { discountCalculation } from "../Components/helpers";
import Button from "../Components/Button";
import ImageGallery from "../Components/ImageGallery";
import QuantityInput from "../Components/QuantityInput";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [productIsLoading, setProductIsLoading] = useState(true);
  const [errorMessage, showErrorMessage] = useState(false);
  const { addToCart, getQuantityInCart, isInCart } = useContext(CartContext);
  const stock = product.stock - getQuantityInCart(product.id);
  let { productId } = useParams();

  const getProduct = (id) => {
    try {
      setProductIsLoading(true);
      showErrorMessage(false);
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setProductIsLoading(false);
        });
    } catch (error) {
      setProductIsLoading(false);
      showErrorMessage(true);
    }
  };

  let reviews = product.reviews;

  useEffect(() => {
    getProduct(productId);
  }, []);

  if (productIsLoading) {
    return <p>Product is loading...</p>;
  }

  if (errorMessage) {
    return (
      <div class="card text-bg-danger mb-3">
        <div class="card-header">
          <i class="bi bi-exclamation-triangle-fill"></i>Error
        </div>
        <div class="card-body">
          <p class="card-text">
            Unexpected error while loading product. Please check your internet
            connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="card mb-3 border-0">
          <div className="row g-0">
            <div className="col-md-4">
              <ImageGallery images={product.images} alt={product.title} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <div className="list-group list-group-flush">
                  <div className="list-group-item ps-0 ">
                    <StarsRating productRating={product.rating} />
                    <small> {product.reviews.length} reviews</small>
                  </div>
                  <div className="list-group-item ps-0">
                    <p>{product.description}</p>
                  </div>
                  <div className="list-group-item ps-0">
                    <p className="fs-3 fw-semibold">
                      {discountCalculation(
                        product.price,
                        product.discountPercentage
                      ).toFixed(2)}{" "}
                      EUR
                    </p>
                   {isInCart(product.id) ? (
                      <QuantityInput itemId = {product.id}/>
                    ) : 
                    stock ? (
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
                  </div>
                  <div className="list-group-item ps-0">
                    <small className={stock ? "" : "text-danger"}>
                      {stock ? `In stock: ${stock}` : `Unavailable`}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h2>Product reviews:</h2>
          {reviews.map((review, index) => (
            <div className="card border-secondary mb-3" key={index}>
              <div className="card-body">
                <div className="card-title">{review.reviewerName}</div>
                <div className="card-subtitle">
                  <StarsRating productRating={review.rating}></StarsRating>
                </div>
                <p className="card-text">{review.comment}</p>
                <p class="card-text">
                  <small class="text-body-secondary">
                    {new Date(review.date).toLocaleTimeString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
