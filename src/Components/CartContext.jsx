import React from "react";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartIsLoading, setCartIsLoading] = useState(true);
  const user = 10;
  //const user = Math.floor(Math.random() * 20 + 1);

  function getQuantityInCart(productId) {
    if (isInCart(productId)) {
      return cart.find((cartItem) => cartItem.id === productId).quantity;
    } else {
      return 0;
    }
  }

  function updateCart(product, updatedQuantity) {
    fetch(`https://dummyjson.com/carts/${user}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge: true,
        products: [
          {
            id: product.id,
            quantity: updatedQuantity,
          },
        ],
      }),
    })
      .then((res) => res.json)
      .then(console.log);
  }

  function getCartData() {
    try {
      setCartIsLoading(true);
      fetch(`https://dummyjson.com/carts/${user}`)
        .then((res) => res.json())
        .then((data) => {
          setCart((cart) =>
            //function to remove product duplicates
            [...data.products, ...cart].filter(
              (product, index, array) =>
                array.findIndex((p) => p.id === product.id) === index
            )
          );
          console.log(data);
          setCartIsLoading(false);
        });
    } catch (err) {
      setCartIsLoading(false);
    }
  }

  function addToCart(product) {
    if (isInCart(product.id)) {
      addQuantity(product);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      updateCart(product, 1);
    }
  }

  function isInCart(productId) {
    return cart.some((cartItem) => cartItem.id === productId);
  }

  function removeFromCart(product) {
    setCart(cart.filter((item) => item !== product));
    updateCart(product, 0);
  }

  function addQuantity(product) {
    setCart(
      cart.map((p) => {
        if (p.id === product.id) {
          return { ...p, quantity: p.quantity + 1 };
        }
        return p;
      })
    );
    const updatedQuantity = cart.find((p) => p.id === product.id).quantity + 1;
    updateCart(product, updatedQuantity);
  }

  function decreaseQuantity(product) {
    setCart(
      cart.map((p) => {
        if (p.id === product.id && p.quantity > 0) {
          return { ...p, quantity: p.quantity - 1 };
        }
        return p;
      })
    );
    const updatedQuantity = product.quantity - 1;
    updateCart(product, updatedQuantity);
  }

  function resetCart() {
    setCart([]);
  }

  useEffect(() => {
    getCartData();
  }, []);

  const ContextValue = {
    cart,
    cartIsLoading,
    addToCart,
    isInCart,
    removeFromCart,
    resetCart,
    addQuantity,
    decreaseQuantity,
    getQuantityInCart,
  }; //data to be used in other components
  return (
    <CartContext.Provider value={ContextValue}>{children}</CartContext.Provider>
  );
}
export default CartContextProvider;