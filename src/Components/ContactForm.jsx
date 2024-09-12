import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const ContactForm = ({onFormSubmit}) => {
  const [validated, setValidated] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject]=useState("");
  const [contactMessage, setContactMessage] = useState("");
  const FORMSPARK_FORM_URL = "https://submit-form.com/GxG2xLB2F";


  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
  
    setValidated(true);
    if (form.checkValidity()){
      const userMessage= {
        name: contactName,
        email: contactEmail,
        contactMessage: contactMessage,
        subject: contactSubject
      }
      await fetch(FORMSPARK_FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          userMessage,
        }),
      });
      alert("Form submitted");
    
      setContactEmail("");
      setContactMessage("");
      setContactName("");
      setContactSubject("");
      setValidated(false);
      onFormSubmit();
    }
  
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="email"
            placeholder="Email"
            value={contactEmail}
            required
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Subject
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="General enquiry"
              name="Subject"
              id="general"
              required
              checked= {contactSubject === 'general'}
              onChange = {()=>setContactSubject('general')}
            />
            <Form.Check
              type="radio"
              label="Collaboration"
              name="Subject"
              id="collaboration"
              required
              checked= {contactSubject === 'collaboration'}
              onChange = {()=>setContactSubject('collaboration')}
            />
            <Form.Check
              type="radio"
              label="Suggestion"
              name="Subject"
              id="Suggestion"
              required
              checked= {contactSubject === 'suggestion'}
              onChange = {()=>setContactSubject('suggestion')}
            />
          </Col>
        </Form.Group>
      </fieldset>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Message
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            rows={3}
            value={contactMessage}
            required
            onChange={(e) => setContactMessage(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Send</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default ContactForm;
