import React from "react";
import Product from "./Product";

function ProductList({ products, addToCart, isInCart, orderComplete }) {
  return (
    !orderComplete && (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-3">
        {products.map((product) => (
          <Product
            key={product.id}
            name={product.title}
            imgSrc={product.thumbnail}
            description={product.description}
            price={product.price}
            addToCart={() => addToCart(product)}
            isInCart={isInCart(product)}
          ></Product>
        ))}
      </div>
    )
  );
}

export default ProductList;
