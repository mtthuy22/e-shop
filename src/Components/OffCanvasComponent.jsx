import { useState, useContext } from "react";
import { CartContext } from "./CartContext";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

function OffCanvasComponent({children}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { cart } = useContext(CartContext);
  console.log(cart);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-cart"></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" scroll>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasComponent;
