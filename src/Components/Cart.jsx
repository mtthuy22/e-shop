import React, { useState } from "react";
import "./Cart.css";

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
      <div className="cart bg-secondary text-white mb-5 mx-5 mt-2 py-3 px-3">
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
                <form>
                  <label for="email" className="form-label">
                    Send order to:
                  </label>
                  <input
                    type="email"
                    className="form-control w-25"
                    id="email"
                    placeholder="name@example.com"
                    required
                  />
                  <button
                    onClick={() => toComplete()}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
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
