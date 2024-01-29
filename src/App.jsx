import { useState } from "react";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import testProducts from "./data";

function App() {
  const [cart, setCart] = useState([]);
  function addToCart(product) {
    setCart([...cart, product]);
  }

  return (
    <div className="App">
      <Cart cart={cart} />
      <ProductList
        className="mx-auto"
        products={testProducts}
        addToCart={addToCart}
      ></ProductList>
    </div>
  );
}

export default App;
