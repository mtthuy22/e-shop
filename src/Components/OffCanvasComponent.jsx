import { useState, useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./OffCanvasComponent.css";

function OffCanvasComponent({ children }) {
  const [show, setShow] = useState(false);
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { cart, badgeBg } = useContext(CartContext);
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-cart"></i>
        <span className="ms-2">
          <Badge bg={badgeBg}>{cart.length}</Badge>
        </span>
      </Button>

      <Offcanvas
        className="custom-offcanvas"
        show={show}
        onHide={handleClose}
        placement="end"
        scroll={true}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasComponent;
