import React from "react";
import { Image } from "react-bootstrap";
import { discountCalculation } from "./helpers";

const CartSummary = ({ order }) => {
  function totalPrice() {
    return order
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }

  function totalDiscountPrice() {
    return order
      .reduce(
        (total, item) =>
          total +
          discountCalculation(item.price, item.discountPercentage) *
            item.quantity,
        0
      )
      .toFixed(2);
  }
  return (
    <>
      <p className="text-center text-uppercase fw-semibold">
        Your order summary:
      </p>
      <div className="list-group list-group-flush mb-2">
        {order.map((item) => (
          <div
            key={item.id}
            className="d-flex list-group-item row column-gap-2 pt-2"
          >
            <div className="col-4 col-sm-1">
              <Image src={item.thumbnail} fluid />
            </div>

            <div className="row row-gap-2 col-7 col-sm-10">
              <div className=" col col-sm-4 col-9">{item.title}</div>
              <div className=" col col-sm-3 col-9 px-0">{item.quantity}</div>
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
          </div>
        ))}
        {order.length > 0 && (
          <div className="list-group-item row">
            <div className="text-end">
              <p className="text-secondary fs-6">
                Total before discount: {totalPrice()} EUR
              </p>
              <p className="fs-6">
                Discount: {(totalPrice() - totalDiscountPrice()).toFixed(2)} EUR
              </p>
              <p className="fw-bold">Total: {totalDiscountPrice()} EUR</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSummary;
