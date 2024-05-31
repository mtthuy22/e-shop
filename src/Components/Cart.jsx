import React, { useContext, useState } from "react";
import Button from "./Button";
import { CartContext } from "./CartContext";
import CheckoutForm from "./CheckoutForm";
import { discountCalculation } from "./helpers";
import QuantityInput from "./QuantityInput";

function Cart({ orderComplete, setOrderComplete }) {
  const [checkOut, setCheckOut] = useState(false);
  const { resetCart, cartIsLoading, cart, removeFromCart } =
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

  let checkOutComponent;

  if (orderComplete) {
    checkOutComponent = (
      <Button
        type="button"
        btnVariant="btn-primary"
        text="Go back to shop"
        onClick={() => resetShop()}
      ></Button>
    );
  } else if (checkOut) {
    checkOutComponent = <CheckoutForm toComplete={toComplete}></CheckoutForm>;
  } else if (cart.length !== 0) {
    checkOutComponent = (
      <Button
        onClick={() => toCheckOut()}
        btnVariant="btn-dark"
        type="button"
        text="Check-out"
      ></Button>
    );
  } else {
    checkOutComponent = "";
  }

  return (
    <>
      <div className="cart text-secondary-emphasis">
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

        <div className="list-group list-group-flush mb-2">
          {cart.map((item) => (
            <div className="d-flex list-group-item row pt-2" key={item.id}>
              <div className="col-5">{item.title}</div>
              <div className="col">
                {!orderComplete && (
                  <QuantityInput orderComplete={orderComplete} item={item} />
                )}
              </div>

              <div className="col">
                <div className="text-decoration-line-through text-secondary-emphasis">
                  {(item.price * item.quantity).toFixed(2)} EUR
                </div>
                <div>
                  {(
                    discountCalculation(item.price, item.discountPercentage) *
                    item.quantity
                  ).toFixed(2)}{" "}
                  EUR
                </div>
              </div>
              <div className="col d-flex">
                {!orderComplete && (
                  <Button
                    type="button"
                    onClick={() => removeFromCart(item)}
                    btnVariant="btn"
                    addedClass="ms-auto btn-sm bi bi-x-lg"
                  ></Button>
                )}
              </div>
            </div>
          ))}
          {cart.length > 0 && (
            <div className="list-group-item row">
              <div className="text-end">
                <p className="text-secondary fs-6">
                  Total before discount: {totalPrice()} EUR
                </p>
                <p className="fs-6">
                  Discount: {(totalPrice() - totalDiscountPrice()).toFixed(2)}{" "}
                  EUR
                </p>
                <p className="fw-bold">Total: {totalDiscountPrice()} EUR</p>
              </div>
            </div>
          )}
        </div>
        {checkOutComponent}
      </div>
    </>
  );
}
export default Cart;
