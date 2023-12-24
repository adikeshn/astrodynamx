import Offcanvas from "react-bootstrap/Offcanvas";
import "../styleSheets/contactUs.css";
import { useState } from "react";

function ContactUs({ showContact, setContact }) {
  const [status, setStatus] = useState("Submit");

  const handleSubmit = (e) => {
    setStatus("Sending...");
    e.preventDefault();

    const { name, email, message } = e.target.elements;
    const details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    fetch("https://astrodynamx-backendservice.onrender.com/nodemailer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((response) => {
        alert("Successfully sent message!");
      })
      .catch((response) => {
        alert(response);
      });
    setStatus("Submit");
  };

  return (
    <Offcanvas
      show={showContact}
      onHide={() => {
        setContact(false);
      }}
      scroll={true}
    >
      <div className="offCanvas-bg">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Contact Us</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            If you have any questions regarding AstroDynamx, please type it in
            below, this message will be sent to example@gmail.com and we will
            get back to you.
            <form className="offCanvas-form" onSubmit={handleSubmit}>
              <label className="form-label">Name </label>
              <br />
              <input className="small-input" type="text" id="name" /> <br />
              <label className="form-label">Email </label>
              <br />
              <input className="small-input" type="text" id="email" /> <br />
              <label className="form-label">Message </label>
              <br />
              <textarea className="large-input" type="text" id="message" />
              <br />
              <button className="submit-button" type="submit">
                {status}
              </button>
            </form>
          </div>
        </Offcanvas.Body>
      </div>
    </Offcanvas>
  );
}

export default ContactUs;
