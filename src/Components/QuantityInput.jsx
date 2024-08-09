import React from "react";
import { useContext, useState, useEffect } from "react";
import Button from "./Button";
import { CartContext } from "./CartContext";


function QuantityInput({ itemId, orderComplete }) {
  const { addQuantity, decreaseQuantity, updateNewQuantity, cart } = useContext(CartContext);
  const item = cart.find((item)=> item.id === itemId)
  const [cartQuantity, setCartQuantity] = useState(item ? item.quantity : 1)


  function inputQuantity(e) {
    let input = e.target.value;
    let numInput = Math.abs(parseInt(input));
    if (isNaN(numInput)) {
      setCartQuantity(input);
      updateNewQuantity(itemId, 1);
    } else if (numInput === 0) {
      setCartQuantity("");
      updateNewQuantity(itemId, 1);
    } else {
      setCartQuantity(numInput);
      updateNewQuantity(itemId, numInput);
    }
  }

  useEffect(() => {
    setCartQuantity(item ? item.quantity : 1);
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
