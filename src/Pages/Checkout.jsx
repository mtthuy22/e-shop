import { useContext } from "react";
import { CartContext } from "../Components/CartContext";
import CheckoutForm from "../Components/CheckoutForm";


const Checkout = () => {
    const {cart} = useContext(CartContext)
   
    return(
        <CheckoutForm/>
    )
}

export default Checkout;