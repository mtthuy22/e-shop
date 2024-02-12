import React, { useState } from "react";
import "./Cart.css";
import CheckoutForm from "./CheckoutForm";

function Cart({
  cart,
  removeFromCart,
  orderComplete,
  setOrderComplete,
  resetCart,
}) {
  const [checkOut, setCheckOut] = useState(false);

  function toComplete() {
    setOrderComplete(true);
  }

  function toCheckOut() {
    setCheckOut(true);
  }

  function totalPrice() {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  }

  function resetShop() {
    setOrderComplete(false);
    setCheckOut(false);
    resetCart();
  }
  return (
    <>
      <div className="cart bg-secondary bg-opacity-75 text-white mb-5 mx-5 mt-2 py-3 px-3">
        {checkOut ? (
          <p className="text-center">
            {orderComplete
              ? "Your order has been completed."
              : "Your order summary"}
          </p>
        ) : (
          <p className="text-center">
            {cart.length ? "Currently in cart" : "Your cart is empty"}
          </p>
        )}
        <ul className="list-group">
          {cart.map((item) => (
            <li className="list-group-item" key={item.id}>
              <span>
                {item.name} - {item.price} EUR
              </span>

              {!checkOut && (
                <button
                  type="button"
                  onClick={() => removeFromCart(item)}
                  className="btn btn-danger btn-sm ms-3"
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
        {cart.length > 0 && (
          <div className="text-end">
            <p className="text-uppercase fw-bold">
              <span>total</span>: {totalPrice()} EUR
            </p>

            {checkOut ? (
              !orderComplete && (
                <CheckoutForm toComplete = {toComplete}></CheckoutForm>
              )
            ) : (
              <button onClick={() => toCheckOut()} className="btn btn-dark">
                Check-out
              </button>
            )}
          </div>
        )}
        {orderComplete && <button type="button" className="btn btn-primary" onClick={() => resetShop()}>Go back to shop</button>}
      </div>
    </>
  );
}
export default Cart;
