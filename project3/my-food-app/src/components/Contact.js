import React, { useState } from 'react';
import './Contact.css';

const SPOONFED_API_KEY = "124dfeacc88844b19cdbfc7ed01848b7";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactAction = async (method) => {
    try {
      await fetch('https://api.getspoonfed.com/v1/contact', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SPOONFED_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: method, source: "Monreal Website" })
      });
      alert(`Contact request for ${method} sent!`);
    } catch (e) {
      console.log("Action logged.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We'll get back to you soon.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* Header Section */}
      <header className="contact-header">
        <div className="header-content">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Ready to create unforgettable culinary experiences? Let's discuss your vision.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="contact-main">
        <div className="container">
          <div className="contact-content">
            {/* Contact Information */}
            <section className="contact-info-section">
              <h2 className="section-title">Get In Touch</h2>
              <div className="contact-info-grid">
                <div className="contact-item" onClick={() => handleContactAction('Phone')}>
                  <div className="contact-icon">
                    <img src="/phone-icon.png" alt="Phone" />
                  </div>
                  <div className="contact-details">
                    <h3>Phone</h3>
                    <p>0995 798 2055</p>
                  </div>
                </div>

                <a className="contact-item contact-link" href="https://www.facebook.com/kurtjonwelvideoandphotography" target="_blank" rel="noopener noreferrer">
                  <div className="contact-icon">
                    <img src="/facebook-icon.png" alt="Facebook" />
                  </div>
                  <div className="contact-details">
                    <h3>Facebook</h3>
                    <p>Follow Us</p>
                  </div>
                </a>

                <a className="contact-item contact-link" href="https://www.instagram.com/nixxgrcs/" target="_blank" rel="noopener noreferrer">
                  <div className="contact-icon">
                    <img src="/instagram-icon.png" alt="Instagram" />
                  </div>
                  <div className="contact-details">
                    <h3>Instagram</h3>
                    <p>Follow Us</p>
                  </div>
                </a>

                <a className="contact-item contact-link" href="mailto:javierkurtjonwel@gmail.com">
                  <div className="contact-icon">
                    <img src="/gmail-icon.png" alt="Email" />
                  </div>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p>Send Message</p>
                  </div>
                </a>
              </div>
            </section>

            {/* Contact Form */}
            <section className="contact-form-section">
              <h2 className="section-title">Send Us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us about your event, dietary requirements, or any questions you have..."
                    rows="6"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="contact-footer">
        <div className="container">
          <div className="footer-content">
            <img src="/logo.png" alt="Monreal" className="footer-logo" />
            <p>© Copyright Monreal Catering Services 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;