import React from "react";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartIsLoading, setCartIsLoading] = useState(true);
  const user = 11;
  //const user = Math.floor(Math.random() * 20 + 1);

  function getQuantityInCart(productId) {
    return cart.find((cartItem) => cartItem.id === productId)?.quantity ?? 0;
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
          //fetch product per cart item id
          Promise.all(
            data.products.map(
              (cartItem) =>
                fetch(`https://dummyjson.com/products/${cartItem.id}`)
                  .then((res) => res.json())
                  .then((product) => ({ ...product, ...cartItem })) // transformation, merged product and cart
            )
          ).then((cartItems) => {
            setCart((cart) =>
              //function to remove product duplicates
              [...cartItems, ...cart].filter(
                (product, index, array) =>
                  array.findIndex((p) => p.id === product.id) === index
              )
            );
            setCartIsLoading(false);
          });
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
        if (p.id === product.id) {
          return { ...p, quantity: p.quantity - 1 };
        }
        return p;
      })
    );
    const updatedQuantity = product.quantity - 1;
    updateCart(product, updatedQuantity);
  }

  function updateNewQuantity(productId, newQuantity) {
    setCart(
      cart.map((p) => {
        if (p.id === productId) {
          return { ...p, quantity: newQuantity };
        }
        return p;
      })
    );
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
    setCart,
    addToCart,
    isInCart,
    removeFromCart,
    resetCart,
    addQuantity,
    decreaseQuantity,
    getQuantityInCart,
    updateNewQuantity,
  }; //data to be used in other components
  return (
    <CartContext.Provider value={ContextValue}>{children}</CartContext.Provider>
  );
};
export default CartContextProvider;
