import { useState } from "react";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import testProducts from "./data";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function isInCart(product) {
    return cart.includes(product);
  }

  function removeFromCart(product) {
    setCart(cart.filter((item) => item !== product));
  }

  return (
    <div className="App">
      <Cart cart={cart} removeFromCart={removeFromCart} />
      <ProductList
        className="mx-auto"
        products={testProducts}
        addToCart={addToCart}
        isInCart={isInCart}
      ></ProductList>
    </div>
  );
}

export default App;
