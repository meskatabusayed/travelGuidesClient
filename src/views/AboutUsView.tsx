"use client"
import React from 'react';

const AboutUsView: React.FC = () => {
  return (
    <div className="about-us-container">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Welcome to PH Travels</h1>
          <p>
            Connecting people, building communities, and empowering voices around the globe.
          </p>
        </div>
      </section>
      <section className="about-content">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            We aim to create an inclusive, open, and vibrant social space where people can share, inspire, and grow
            together. Our mission is to bring you closer to the things and people that matter to you most.
          </p>
        </div>
        <div className="values">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Community:</strong> Together, we create a powerful support system.</li>
            <li><strong>Creativity:</strong> We value expression, innovation, and uniqueness.</li>
            <li><strong>Inclusivity:</strong> We welcome diverse voices, stories, and experiences.</li>
          </ul>
        </div>
      </section>
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <p>
          Our dedicated team of creatives, developers, and community managers is committed to providing an enjoyable,
          safe, and meaningful experience for all of our users.
        </p>
      </section>
      <section className="cta-section">
        <h2>Join Us Today</h2>
        <p>
          Become a part of our growing community, share your voice, and make meaningful connections.
        </p>
        <button className="join-button">Join Now</button>
      </section>
      <style jsx>{`
        .about-us-container {
          max-width: 1200px;
          margin: auto;
          padding: 2rem;
          color: #fff;
          font-family: Arial, sans-serif;
        }
        .hero-section {
          background: linear-gradient(to right, #1e3c72, #2a5298);
          padding: 3rem;
          text-align: center;
          border-radius: 12px;
        }
        .hero-text h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .about-content {
          margin-top: 3rem;
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .mission, .values {
          flex: 1;
          background-color: #2c2c2c;
          padding: 2rem;
          border-radius: 8px;
        }
        .mission h2, .values h2, .team-section h2, .cta-section h2 {
          color: #66b3ff;
        }
        .values ul {
          list-style-type: none;
          padding: 0;
        }
        .values li {
          margin-bottom: 1rem;
        }
        .team-section {
          margin-top: 3rem;
          padding: 2rem;
          background-color: #333;
          border-radius: 8px;
        }
        .cta-section {
          margin-top: 3rem;
          text-align: center;
        }
        .join-button {
          background: #1877F2;
          color: #fff;
          padding: 0.8rem 2rem;
          font-size: 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .join-button:hover {
          background: #558acc;
        }
      `}</style>
    </div>
  );
};

export default AboutUsView;
