import React from "react";
import { useContext, useState, useEffect } from "react";
import Button from "./Button";
import { CartContext } from "./CartContext";


function QuantityInput({ item, orderComplete }) {
  const [cartQuantity, setCartQuantity] = useState(item.quantity);
  const { addQuantity, decreaseQuantity, updateNewQuantity } =
    useContext(CartContext);

  function inputQuantity(e) {
    let input = e.target.value;
    let numInput = Math.abs(parseInt(input));
    if (isNaN(numInput)) {
      setCartQuantity(input);
      updateNewQuantity(item.id, 1);
    } else if (numInput === 0) {
      setCartQuantity("");
      updateNewQuantity(item.id, 1);
    } else {
      setCartQuantity(numInput);
      updateNewQuantity(item.id, numInput);
    }
  }

  useEffect(() => {
    setCartQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <div className="button-group ms-2 d-flex">
      <Button
        btnVariant="btn-outline-primary"
        type="button"
        addedClass="bi bi-plus rounded-0 btn-sm p-1"
        disabled={orderComplete || item.quantity === item.stock}
        onClick={() => addQuantity(item)}
      ></Button>
      <input
        type="text"
        className="form-control text-center rounded-0 p-0"
        onChange={inputQuantity}
        onBlur={() =>
          updateNewQuantity(item.id, Math.min(item.quantity, item.stock))
        }
        value={cartQuantity}
      />
      <Button
        btnVariant="btn-outline-danger"
        type="button"
        addedClass="bi bi-dash rounded-0 btn-sm p-1"
        disabled={orderComplete || item.quantity === 1}
        onClick={() => decreaseQuantity(item)}
      ></Button>
    </div>
  );
}
export default QuantityInput;
