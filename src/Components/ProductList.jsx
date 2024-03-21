import React from "react";
import Product from "./Product";

function ProductList({ products, orderComplete}) {

  return (
    !orderComplete &&  (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-3">
        {products.map((product) => (
          <Product
            key = {product.id}
            product = {product}
          ></Product>
        ))}
      </div>)
  )

}

export default ProductList;
