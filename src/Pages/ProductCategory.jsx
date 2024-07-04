import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Components/Product";
import { textTransform } from "../Components/helpers";

const ProductCategory = () => {
  const [productsInCategory, setProductsInCategory] = useState([]);
  const [categoryIsLoading, setCategoryIsLoading] = useState(true);

  let { categoryId } = useParams();

  const getCategory = (id) => {
    try {
      setCategoryIsLoading(true);
      fetch(`https://dummyjson.com/products/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProductsInCategory(data.products);
          setCategoryIsLoading(false);
        });
    } catch (error) {
      setCategoryIsLoading(false);
    }
  };

  useEffect(() => {
    getCategory(categoryId);
  }, [categoryId]);

  if (categoryIsLoading) {
    return <p>Category is loading...</p>;
  }

  return (
    <>
    <h2>{textTransform(categoryId)}</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-3">
        {productsInCategory.map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>
    </>
  );
};

export default ProductCategory;
