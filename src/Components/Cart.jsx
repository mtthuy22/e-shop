import React, { useContext, useState } from "react";
import Button from "./Button";
import { CartContext } from "./CartContext";
import { discountCalculation } from "./helpers";
import QuantityInput from "./QuantityInput";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = ({ onCheckout }) => {
  const [orderIsCompleted, setOrderIsCompleted] = useState(false);
  const { resetCart, cartIsLoading, cart, removeFromCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  function toCheckOut() {
    if (onCheckout) {
      onCheckout();
      navigate("/cart");
    } else {
      navigate("/checkout2");
    }
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
    setOrderIsCompleted(false);
    resetCart();
  }

  let checkOutComponent = null;

  if (orderIsCompleted) {
    checkOutComponent = (
      <Button
        type="button"
        btnVariant="btn-primary"
        text="Go back to shop"
        onClick={() => resetShop()}
      ></Button>
    );
  } else if (cart.length !== 0) {
    checkOutComponent = (
      <Button
        onClick={() => toCheckOut()}
        btnVariant="btn-dark"
        type="button"
        text="Check-out"
      ></Button>
    );
  }

  return (
    <>
      <div className="cart text-secondary-emphasis">
        {cartIsLoading ? (
          <p className="text-center text-uppercase fw-semibold alert alert-warning">
            Your cart is loading
          </p>
        ) : (
          <p className="text-center text-uppercase fw-semibold alert alert-primary">
            {cart.length ? "Currently in cart" : "Your cart is empty"}
          </p>
        )}

        <div className="list-group list-group-flush mb-2">
          {cart.map((item) => (
            <div
              className="d-flex list-group-item row column-gap-2 pt-2"
              key={item.id}
            >
              <div className="col-4 col-sm-1">
                <Image src={item.thumbnail} fluid />
              </div>

              <div className="row row-gap-2 col-7 col-sm-10">
                <div className=" col col-sm-4 col-9">{item.title}</div>
                <div className=" col col-sm-3 col-9 px-0">
                  {!orderIsCompleted && (
                    <QuantityInput
                      orderComplete={orderIsCompleted}
                      itemId={item.id}
                    />
                  )}
                </div>
                <div className="col col-sm-3 col-9 text-sm-end">
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
              </div>
              <div className="col col-1">
                {!orderIsCompleted && (
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
        <div className="list-group-item d-flex justify-content-end">
          {checkOutComponent}
        </div>
      </div>
    </>
  );
};
export default Cart;
