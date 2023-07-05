import React, { useState } from "react";
// Icons
import { GoLocation } from "react-icons/go";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
// Components
import Card from "../../components/card/Card";
// React Toastify
import { toast } from "react-toastify";
// Axios
import axios from "axios";
// Styles
import "./Contact.scss";
// Services
import { BACKEND_URL } from "../../services/authServices";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };

  const sendEmail = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactus`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              placeholder="Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              cols="30"
              rows="10"
              required
            ></textarea>
            <button className="--btn --btn-primary">Send Message</button>
          </Card>
        </form>
        <div className="details">
          <Card cardClass="card2">
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>
            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>070123123123</p>
              </span>
              <span>
                <FaEnvelope />
                <p>support@invent.com</p>
              </span>
              <span>
                <GoLocation />
                <p>Buenos Aires, Argentina</p>
              </span>
              <span>
                <FaTwitter />
                <p>@roylopezdev</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
