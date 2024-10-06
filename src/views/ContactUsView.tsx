"use client";

import React from 'react';

const ContactUsView: React.FC = () => {
  return (
    <div className="contact-us-container">
      <section className="contact-hero-section">
        <div className="contact-hero-text">
          <h1>Get in Touch with Us</h1>
          <p>We are here to help and answer any questions you might have. We look forward to hearing from you!</p>
        </div>
      </section>
      <section className="contact-form-section">
        <div className="contact-form-wrapper">
          <h2>Contact Us</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} placeholder="Enter your message" required></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </section>
      <section className="contact-info-section">
        <h2>Contact Information</h2>
        <p>Email: support@ph-travels.com</p>
        <p>Phone: +8801767676544</p>
        <p>Address: 123 Banani, Dhaka, Bangladesh</p>
      </section>
      <style jsx>{`
        .contact-us-container {
          max-width: 800px;
          margin: auto;
          padding: 2rem;
          color: #fff;
          font-family: Arial, sans-serif;
        }
        .contact-hero-section {
          background: linear-gradient(to right, #1e3c72, #2a5298);
          padding: 3rem;
          text-align: center;
          border-radius: 12px;
          margin-bottom: 2rem;
        }
        .contact-hero-text h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .contact-form-section {
          background-color: #2c2c2c;
          padding: 2rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }
        .contact-form-wrapper {
          max-width: 600px;
          margin: auto;
        }
        .contact-form h2 {
          color: #66b3ff;
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
        }
        .submit-button {
          background: #1877F2;
          color: #fff;
          padding: 0.8rem 2rem;
          font-size: 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .submit-button:hover {
          background: #558acc;
        }
        .contact-info-section {
          background-color: #333;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
        }
        .contact-info-section h2 {
          color: #66b3ff;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default ContactUsView;
