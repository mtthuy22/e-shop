import React from "react";
import Product from "./Product";
import Button from "./Button";

function ProductList({ products, isLoading, allProductsLoaded, onLoadMore }) {
  if (isLoading) {
    return <p>Items are loading...</p>;
  }

  if (products.length === 0) {
    return <p>No products have been found</p>;
  }

  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-3">
        {products.map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>

      {!allProductsLoaded && (
        <Button
          text="Load more items"
          btnVariant="btn-primary"
          onClick={onLoadMore}
        />
      )}
    </>
  );
}

export default ProductList;
