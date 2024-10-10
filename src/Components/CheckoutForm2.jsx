import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";

const CheckoutForm2 = ({ toComplete, orderData }) => {
  const [validated, setValidated] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const FORMSPARK_FORM_URL = "https://submit-form.com/GxG2xLB2F";

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    setValidated(true);
    if (form.checkValidity()) {
      const checkOutData = {
        name: `${firstName} ${lastName}`,
        email: checkoutEmail,
        address: `${address1}, ${address2}, ${zipCode}`,
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
            checkOutData,
          }),
        });
        toComplete();
      } catch (error) {
        console.log("Error occured");
      }
      setFirstName("");
      setLastName("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setZipCode("");
      setCheckoutEmail("");
      setValidated(false);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-2" >
        <Form.Group as={Col}>
          <Form.Label className="mb-0">First Name</Form.Label>
          <Form.Control
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label className="mb-0">Last name</Form.Label>
          <Form.Control
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-2" >
        <Form.Group as={Col}>
          <Form.Label className="mb-0">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            required
            value={checkoutEmail}
            onChange={(e) => setCheckoutEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-2">
        <Form.Group as={Col} >
          <Form.Label className="mb-0">Shipping address</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group as={Col} >
          <Form.Label className="mb-0">Shipping address 2</Form.Label>
          <Form.Control
            placeholder="Apartment, studio, or floor"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-2" >
        <Form.Group as={Col}>
          <Form.Label className="mb-0">City</Form.Label>
          <Form.Control
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label className="mb-0">Zip</Form.Label>
          <Form.Control
            placeholder="Zip"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CheckoutForm2;
