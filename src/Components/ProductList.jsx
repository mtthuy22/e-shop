import React from "react";
import Product from "./Product";

function ProductList({ products, addToCart, isInCart, orderComplete }) {
  return (
    !orderComplete && (
    <div className="container mx-auto">
      <div className="row row-cols-4">
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
    </div>
    )
  );
}

export default ProductList;
