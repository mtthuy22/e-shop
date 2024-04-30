import React, { useContext, useState } from "react";
import Button from "./Button";
import { CartContext } from "./CartContext";
import CheckoutForm from "./CheckoutForm";

function Cart({ orderComplete, setOrderComplete }) {
  const [checkOut, setCheckOut] = useState(false);
  const { resetCart, cartIsLoading, cart, removeFromCart, addQuantity, decreaseQuantity } =
    useContext(CartContext);

  function toComplete() {
    setOrderComplete(true);
  }

  function toCheckOut() {
    setCheckOut(true);
  }

  function totalPrice() {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }

  function resetShop() {
    setOrderComplete(false);
    setCheckOut(false);
    resetCart();
  }

  return (
    <>
      <div className="cart bg-secondary bg-opacity-75 text-white mb-5 py-4">
        <div className="container">
          {cartIsLoading ? (
            <p className="text-center fw-semibold">Your cart is loading</p>
          ) : checkOut ? (
            <p className="text-center fw-semibold">
              {orderComplete
                ? "Your order has been completed."
                : "Your order summary"}
            </p>
          ) : (
            <p className="text-center fw-semibold">
              {cart.length ? "Currently in cart" : "Your cart is empty"}
            </p>
          )}

          <ul className="list-group">
            {cart.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span>
                  <span className="fw-semibold">{item.quantity}x</span>{" "}
                  {item.title} - {item.price * item.quantity} EUR
                </span>
                <div className="btn-group ms-2">
                  <Button
                    btnVariant="btn-outline-primary"
                    type="button"
                    text="+"
                    addedClass="btn-circle"
                    onClick = {() => addQuantity(item)}
                  ></Button>
                  <Button
                    btnVariant="btn-outline-danger"
                    type="button"
                    text="-"
                    addedClass="btn-circle"
                    disabled = {item.quantity === 1}
                    onClick={()=>decreaseQuantity(item)}
                  ></Button>
                </div>

                {!checkOut && (
                  <Button
                    type="button"
                    onClick={() => removeFromCart(item)}
                    btnVariant="btn-danger"
                    addedClass="btn-sm ms-3"
                    text="Remove"
                  >
                  </Button>
                )}
              </li>
            ))}
          </ul>
          {cart.length > 0 && (
            <div className="text-start">
              <p className="text-uppercase fw-bold">
                <span>total</span>: {totalPrice()} EUR
              </p>
              {checkOut ? (
                !orderComplete && (
                  <CheckoutForm toComplete={toComplete}></CheckoutForm>
                )
              ) : (
                <Button
                  onClick={() => toCheckOut()}
                  btnVariant="btn-dark"
                  type="button"
                  text="Check-out"
                ></Button>
              )}
            </div>
          )}
          {orderComplete && (
            <Button
              type="button"
              btnColor="primary"
              text="Go back to shop"
              onClick={() => resetShop()}
            ></Button>
          )}
        </div>
      </div>
    </>
  );
}
export default Cart;
