import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Telephone, Envelope, GeoAlt } from "react-bootstrap-icons";

const bgimage = "/images/bg2.jpg";

function ContactUs() {
  const containerStyle = {
    width: "100%",
    height: "100vh",
    position: "relative",
  };
  const contactUsContainerStyle = {
    backgroundImage: `url(${bgimage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    filter: "blur(0px)",
    zIndex: -1,
  };

  const formControlStyle = {
    marginBottom: "15px",
    width: "100%",
  };

  const btnPrimaryStyle = {
    backgroundColor: "gold",
    border: "none",
  };

  const picStyle = {
    position: "relative",
    width: "100px",
    height: "100px",
  };

  return (
    <div style={containerStyle} className="background-div">
      <div style={contactUsContainerStyle} className="contact-us-container">
        <Container style={{ marginRight: "60%", marginBottom: "10%" }}>
          <Row>
            <Col xs={1} md={12} className="contact-form">
              <h2 style={{ color: "gold" }}>
                <br />
                <center>Get in Touch</center>
              </h2>
              <Form>
                <Form.Group controlId="name">
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    style={formControlStyle}
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Your Email"
                    style={formControlStyle}
                  />
                </Form.Group>
                <Form.Group controlId="message">
                  <Form.Control
                    as="textarea"
                    placeholder="Your Message"
                    rows={4}
                    style={formControlStyle}
                  />
                </Form.Group>
                <center>
                  <Button
                    variant="primary"
                    type="submit"
                    style={btnPrimaryStyle}
                  >
                    Send Message
                  </Button>
                </center>
              </Form>
              <br />
            </Col>
          </Row>
          <hr />
          <br />
          <Row>
            <center>
              <Telephone size={30}></Telephone>
              <span style={{ marginRight: "20px" }}></span>
              <Envelope size={30}></Envelope>
              <span style={{ marginRight: "20px" }}></span>
              <GeoAlt size={30}></GeoAlt>
              <br />
              <br />
              <Col>Contact: +91- 999-999-9999</Col>
              <br />
              <Col>Email: nutritiffdelivery@gmail.com</Col>
              <br />
              <Col>Address: Hinjewadi Phase I, Pune, 411057</Col>
            </center>
          </Row>
          <br />
          <hr />
          <br />
          <center>
            <h2 style={{ color: "gold" }}>Our Team</h2>
            <img src="/images/mrunal.jpeg" alt="mrunal" style={picStyle} />
            <span style={{ marginRight: "20px" }}></span>
            <img src="/images/rashmi.jpg" alt="rashmi" style={picStyle} />
            <span style={{ marginRight: "20px" }}></span>
            <img src="/images/swaroop.png" alt="swaroop" style={picStyle} />
            <span style={{ marginRight: "20px" }}></span>
            <img src="/images/tejas.jpg" alt="tejas" style={picStyle} />
            <br />
          </center>

          <br />
        </Container>
      </div>
    </div>
  );
}

export default ContactUs;
