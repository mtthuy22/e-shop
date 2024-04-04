import React from "react";
import Product from "./Product";

function ProductList({ products, orderComplete, isLoading }) {
  return (
    !orderComplete && (products.length) ? (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-3">
        {products.map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>
    )
    :
    (!isLoading) && <p>No products have been found</p>
  );
}

export default ProductList;
