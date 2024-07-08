import React, { useEffect, useState } from "react";
import ProductList from "../Components/ProductList";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const productsPerPage = 48;  
    const [allProductsLoaded, setAllProductsLoaded] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const getProducts = () => {
        try {
            setLoading(true);
            
            fetch (`https://dummyjson.com/products?limit=${productsPerPage}&skip=${products.length}`)
            .then((res) => res.json())
            .then((data) => {
              setProducts([...products, ...data.products]);
              if ([...products, ...data.products].length === data.total) {
                setAllProductsLoaded(true);
              }
              setLoading(false);
            });
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
      }, []);

    if (isLoading){
        return <p>Products are loading...</p>
    }

    return (
        <>
        <h2>All products</h2>
        <ProductList products={products} isLoading={isLoading} allProductsLoaded={allProductsLoaded}
        onLoadMore={getProducts}/>
        </>
    )

}

export default AllProducts;