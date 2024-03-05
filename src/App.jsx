import { useState, useEffect } from "react";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import Button from "./Components/Button";

function App() {
  const [cart, setCart] = useState([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [products, setProducts] = useState([]);
  const productsPerPage = 60;

  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState(false);

  useEffect(() => {
    //fetchData();
    console.log(2)
  }, []);

function fetchData() {
      fetch(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${products.length}`
      )
        .then((res) => res.json())
        .then((data) => {
          setProducts((products) => [...products, ...data.products]);
          if ([...products, ...data.products].length === 100){
            setAllProducts(true)
          }
        });
  }

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function isInCart(product) {
    return cart.includes(product);
  }

  function removeFromCart(product) {
    setCart(cart.filter((item) => item !== product));
  }

  function resetCart() {
    setCart([]);
  }

  return (
    <div className="App">
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        orderComplete={orderComplete}
        setOrderComplete={setOrderComplete}
        resetCart={resetCart}
      />
      <ProductList
        products={products}
        addToCart={addToCart}
        isInCart={isInCart}
        orderComplete={orderComplete}
      ></ProductList>
      <Button
        text="Load more items"
        disabled={allProducts}
        btnColor={allProducts ? "primary-outline" : "primary"}
        onClick={fetchData}
      />
    </div>
  );
}

export default App;
