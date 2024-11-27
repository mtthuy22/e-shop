import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderFinished = () => {
  const navigate = useNavigate();
  return (
    <Alert variant="primary">
      <Alert.Heading>Your order has been completed</Alert.Heading>
      <p>Thank you for your purchase!</p>
      <div className="text-end">
        <Button variant="primary" onClick={() => navigate("/")}>
          Go back to shop
        </Button>
      </div>
    </Alert>
  );
};

export default OrderFinished;
