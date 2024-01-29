import React from "react";
import Product from "./Product";

function ProductList({ products, addToCart }) {
  return (
    <div className="d-flex flex-row mx-5">
      {products.map((product) => (
        <Product
          key={product.id}
          name={product.name}
          imgSrc={product.image}
          description={product.description}
          price={product.price}
          addToCart={() => addToCart(product)}
        ></Product>
      ))}
    </div>
  );
}

export default ProductList;
