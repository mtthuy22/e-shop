import { useContext } from "react";
import { CartContext } from "../Components/CartContext";
import CheckoutForm2 from "../Components/CheckoutForm2";
import CartSummary from "../Components/CartSummary";

const Checkout2 = () => {
  const cart = useContext(CartContext);
  const order = cart.cart;
  const orderData = order.map(({ id, title, quantity }) => ({
    id,
    title,
    quantity,
  }));
 
  return (
    <>
    <CartSummary order={order} />
    <CheckoutForm2 orderData={orderData} />
    </>
  );
};

export default Checkout2;
