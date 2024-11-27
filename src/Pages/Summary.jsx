import CartSummary from "../Components/CartSummary";
import CheckoutForm2 from "../Components/CheckoutForm2";

const Summary = () => {
  return (
    <>
      <h2 className="alert alert-secondary text-center text-uppercase fw-semibold h4">
        Check your order
      </h2>
      <CartSummary />
      <CheckoutForm2 inputIsDisabled={true} />
    </>
  );
};

export default Summary;
