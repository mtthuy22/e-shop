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
  const [cartIsLoading, setCartIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState(false);
  const user = Math.floor(Math.random() * 20 + 1);
  //const user = 3;

  useEffect(() => {
    //setTimeout(getCartData, 5000);
    getCartData();
    fetchData();
  }, []);

  function fetchData() {
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

  function updateCart(product, number) {
    fetch(`https://dummyjson.com/carts/${user}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge: true,
        products: [
          {
            id: product.id,
            quantity: number,
          },
        ],
      }),
    })
    .then(res => res.json)
    .then(console.log)
  }

  function getCartData() {
    try {
      setCartIsLoading(true);
      fetch(`https://dummyjson.com/carts/${user}`)
        .then((res) => res.json())
        .then((data) => {
          setCart(
           cart => [...data.products, ...cart].filter(
              (product, index, array) =>
                array.findIndex((p) => p.id === product.id) === index
            )
          );
          setCartIsLoading(false);
        });
    } catch (err) {
      setCartIsLoading(false);
    }
  }

  function addToCart(product) {
    setCart([...cart, product]);
    updateCart(product, 1);
  }

  function isInCart(product) {
    return cart.some((cartItem) => cartItem.id === product.id);
  }

  function removeFromCart(product) {
    setCart(cart.filter((item) => item !== product));
    updateCart(product, 0);
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
        cartIsLoading={cartIsLoading}
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
