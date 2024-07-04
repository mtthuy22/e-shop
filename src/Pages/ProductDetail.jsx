import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarsRating from "../Components/StarsRating";
import { discountCalculation } from "../Components/helpers";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [productIsLoading, setProductIsLoading] = useState(true);
  const [errorMessage, showErrorMessage] = useState(false);

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
        <div class="card-header"><i class="bi bi-exclamation-triangle-fill"></i>Error</div>
        <div class="card-body">
          <p class="card-text">
            Unexpected error while loading product. Please check your internet connection.
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
              <img
                src={product.thumbnail}
                className="img-fluid"
                alt={product.title}
              />
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
                    <button type="button" class="btn btn-primary">
                      Add to cart
                    </button>
                  </div>
                  <div className="list-group-item ps-0">
                    <small>In stock: {product.stock}</small>
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
                  <small class="text-body-secondary">{review.date}</small>
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
