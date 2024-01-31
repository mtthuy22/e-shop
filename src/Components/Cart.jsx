import React from "react";
import "./Cart.css";

function Cart({ cart, removeFromCart }) {
  return (
    <>
      <div className="cart bg-secondary text-white mb-5 mx-5 mt-2 py-3 px-3">
        <p className="text-center">Currently in cart:</p>
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
      </div>
    </>
  );
}
export default Cart;
