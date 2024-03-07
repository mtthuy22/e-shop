import { useState, useEffect } from "react";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import Button from "./Components/Button";

function App() {
  const [cart, setCart] = useState([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [products, setProducts] = useState([]);
  const productsPerPage = 60;

  const [isLoading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      fetch(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${products.length}`
      )
        .then((res) => res.json())
        .then((data) => {
          setProducts([...products, ...data.products]);
          if ([...products, ...data.products].length === data.total) {
            setAllProducts(true);
          }
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
      <h1 className="text-center">Products store</h1>
      <div className="container mb-3">
        <ProductList
          products={products}
          addToCart={addToCart}
          isInCart={isInCart}
          orderComplete={orderComplete}
        ></ProductList>
        <Button
          text={isLoading ? "Items are loading..." : "Load more items"}
          disabled={allProducts || isLoading}
          btnColor={allProducts ? "primary-outline" : "primary"}
          onClick={fetchData}
        />
      </div>
    </div>
  );
}

export default App;
