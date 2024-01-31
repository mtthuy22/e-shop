import React from "react";
import "./Cart.css";

function Cart({ cart, removeFromCart }) {
  function totalPrice() {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  }
  return (
    <>
      <div className="cart bg-secondary text-white mb-5 mx-5 mt-2 py-3 px-3">
        {cart.length ? (
          <p className="text-center">Currently in cart:</p>
        ) : (
          <p className="text-center">Cart is empty</p>
        )}
        <ul className="list-group">
          {cart.map((item) => (
            <li className="list-group-item" key={item.id}>
              <span>
                {item.name} - {item.price} EUR
              </span>
              <button
                type="button"
                onClick={() => removeFromCart(item)}
                className="btn btn-danger btn-sm ms-3"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        {cart.length ? (
          <div className="text-end">
            <p className="text-uppercase fw-bold">
              {" "}
              <span>total</span>: {totalPrice()} EUR{" "}
            </p>
            <button className="btn btn-dark">Check-out</button>
          </div>
        ) : (
          <p className="d-none">
            {" "}
            <span>total</span>: {totalPrice()} EUR{" "}
          </p>
        )}
      </div>
    </>
  );
}
export default Cart;
