import React, { useContext, useState } from "react";
import Button from "./Button";
import { CartContext } from "./CartContext";
import CheckoutForm from "./CheckoutForm";
import { discountCalculation } from "./helpers";
import QuantityInput from "./QuantityInput"

function Cart({ orderComplete, setOrderComplete }) {
  const [checkOut, setCheckOut] = useState(false);
  const {
    resetCart,
    cartIsLoading,
    cart,
    removeFromCart
  } = useContext(CartContext);

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
  
  function totalDiscountPrice() {
    return cart
      .reduce(
        (total, item) =>
          total +
          discountCalculation(item.price, item.discountPercentage) *
            item.quantity,
        0
      )
      .toFixed(2);
  }

  function resetShop() {
    setOrderComplete(false);
    setCheckOut(false);
    resetCart();
  }

  return (
    <>
      <div className="cart bg-secondary bg-opacity-75 text-light mb-5 py-4">
        <div className="container">
          {cartIsLoading ? (
            <p className="text-center text-uppercase fw-semibold">
              Your cart is loading
            </p>
          ) : checkOut ? (
            <p className="text-center text-uppercase fw-semibold">
              {orderComplete
                ? "Your order has been completed"
                : "Your order summary"}
            </p>
          ) : (
            <p className="text-center text-uppercase fw-semibold">
              {cart.length ? "Currently in cart" : "Your cart is empty"}
            </p>
          )}

          <ul className="list-group mb-2">
            {cart.map((item) => (
              <li className="list-group-item" key={item.id}>
                {/* <span>
                  {item.title} - {(discountCalculation(item.price, item.discountPercentage) * item.quantity).toFixed(2)} EUR
                </span> */}
                <span>{item.title}</span>
                {!orderComplete && (
                 <QuantityInput orderComplete = {orderComplete} item={item}/>
                )}
                <span>
                  {(
                    discountCalculation(item.price, item.discountPercentage) *
                    item.quantity
                  ).toFixed(2)}{" "}
                  EUR
                </span>
                <span className="text-decoration-line-through">
                  {item.price * item.quantity} EUR
                </span>

                {!orderComplete && (
                  <Button
                    type="button"
                    onClick={() => removeFromCart(item)}
                    btnVariant="btn-danger"
                    addedClass="btn-sm ms-3"
                    text="Remove"
                  ></Button>
                )}
              </li>
            ))}
            {cart.length > 0 && (
              <li className="list-group-item">
                <div className="text-end">
                  <p className="text-secondary fs-6">
                    <span>Total before discount</span>: {totalPrice()} EUR
                  </p>
                  <p className="fs-6">
                    <span>Discount</span>:{" "}
                    {(totalPrice() - totalDiscountPrice()).toFixed(2)} EUR
                  </p>
                  <p className="fw-bold">
                    <span>Total</span>: {totalDiscountPrice()}{" "}
                    EUR
                  </p>
                </div>
              </li>
            )}
          </ul>
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

          {orderComplete && (
            <Button
              type="button"
              btnVariant="btn-primary"
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
