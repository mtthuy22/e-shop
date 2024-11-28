import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormContext } from "./FormContext";
import { CartContext } from "./CartContext";

const CheckoutForm2 = ({ inputIsDisabled }) => {
  //context data
  const { formData, setFormData } = useContext(FormContext);
  const { cart, resetCart } = useContext(CartContext);
  const orderData = cart.map(({ id, title, quantity }) => ({
    id,
    title,
    quantity,
  }));

  //form states
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const FORMSPARK_FORM_URL = "https://submit-form.com/GxG2xLB2F";

  //useEffect
  useEffect(() => {
    const storedFormData = sessionStorage.getItem("checkoutData");
    if (storedFormData) {
      const formData = JSON.parse(storedFormData);
      setFormData(formData);
    }
  }, [setFormData]);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    setValidated(true);
    if (form.checkValidity()) {
      const checkoutData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.checkoutEmail,
        address: `${formData.address1}, ${formData.address2}, ${formData.city}, ${formData.zipCode}`,
        order: orderData,
      };
      try {
        await fetch(FORMSPARK_FORM_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            checkoutData,
          }),
        });
        sessionStorage.removeItem("checkoutData");
        resetCart();
        navigate("/order-finished");
      } catch (error) {
        console.log("Error occured");
      }

      setFormData({
        firstName: "",
        lastName: "",
        checkoutEmail: "",
        address1: "",
        address2: "",
        city: "",
        zipCode: "",
      });
      setValidated(false);
    }
  };

  const toCheckOut = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);

    if (form.checkValidity()) {
      sessionStorage.setItem("checkoutData", JSON.stringify(formData));
      setValidated(true);
      navigate("/order-summary");
    }

    sessionStorage.setItem("checkoutData", JSON.stringify(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const goBack = () => {
    navigate(-1);
  };

  const isOrderSummaryPage = location.pathname === "/order-summary";
  const buttonText = isOrderSummaryPage ? "Submit" : "Next";

  return (
    <div className="pt-0 px-2 pb-1">
      <h2 className="text-uppercase fw-semibold h5">Shipping</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={isOrderSummaryPage ? handleSubmit : toCheckOut}
      >
        <Row className="mb-2">
          <Form.Group as={Col}>
            <Form.Label className="mb-0">First Name</Form.Label>
            <Form.Control
              placeholder="First name"
              value={formData.firstName}
              name="firstName"
              onChange={handleChange}
              required
              disabled={inputIsDisabled}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="mb-0">Last name</Form.Label>
            <Form.Control
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
              required
              disabled={inputIsDisabled}
            />
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col}>
            <Form.Label className="mb-0">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="checkoutEmail"
              required
              value={formData.checkoutEmail}
              onChange={handleChange}
              disabled={inputIsDisabled}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col}>
            <Form.Label className="mb-0">Shipping address</Form.Label>
            <Form.Control
              name="address1"
              placeholder="1234 Main St"
              value={formData.address1}
              onChange={handleChange}
              required
              disabled={inputIsDisabled}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="mb-0">Shipping address 2</Form.Label>
            <Form.Control
              name="address2"
              placeholder="Apartment, studio, or floor"
              value={formData.address2}
              onChange={handleChange}
              required
              disabled={inputIsDisabled}
            />
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col}>
            <Form.Label className="mb-0">City</Form.Label>
            <Form.Control
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              disabled={inputIsDisabled}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="mb-0">Zip</Form.Label>
            <Form.Control
              name="zipCode"
              placeholder="Zip"
              value={formData.zipCode}
              onChange={handleChange}
              required
              disabled={inputIsDisabled}
            />
          </Form.Group>
        </Row>

        <div className="text-end">
          <Button
            variant="secondary"
            type="button"
            className="me-2"
            onClick={goBack}
          >
            Go back
          </Button>
          <Button variant="primary" type="submit">
            {buttonText}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CheckoutForm2;
