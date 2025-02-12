// HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Innov from '../assets/innovation.jpg';
import Community from '../assets/community.webp';
import Excellence from '../assets/excellence.avif';
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/about");
  };

  const handleContactUs = () => {
    navigate("/contact");
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-header">
        <div className="header-content">
          <h1 className="site-title">Welcome to EarlyBirds Schools</h1>
          <p className="site-description">
            Empowering students to achieve excellence through innovation,
            dedication, and community.
          </p>
          <div className="cta-buttons">
            <button className="cta-button" onClick={handleLearnMore}>
              Learn More
            </button>
            <button className="secondary-button" onClick={handleContactUs}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="highlights-section">
        <h2>Why Choose Us?</h2>
        <div className="highlights-grid">
          <div className="highlight">
            <img src={Innov} alt="Innovation" />
            <h3>Innovative Learning</h3>
            <p>Experience a modern curriculum designed for the future.</p>
          </div>
          <div className="highlight">
            <img src={Community} alt="Community" />
            <h3>Strong Community</h3>
            <p>Join a supportive network of educators and peers.</p>
          </div>
          <div className="highlight">
            <img src={Excellence} alt="Excellence" />
            <h3>Commitment to Excellence</h3>
            <p>We aim for the highest standards in education.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
