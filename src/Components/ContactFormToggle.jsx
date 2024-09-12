import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import "./OffCanvasComponent.css";

const ContactFormToggle = ({children}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary"onClick={handleShow}>
       Contact us
      </Button>

      <Offcanvas show={show} className="contactform-offcanvas" onHide={handleClose} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Contact us</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         {children(handleClose)}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ContactFormToggle;

