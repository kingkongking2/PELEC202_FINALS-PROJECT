import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-page">
      <div className="about-hero">
        <div className="about-copy">
          <span className="eyebrow">About Monreal</span>
          <h1>Crafting elegant culinary experiences for every milestone</h1>
          <p>
            Monreal Catering blends refined gastronomy with thoughtful service to create memorable events that feel effortless and elevated.
            We partner with each client to design menus, service, and presentation that reflect their unique style.
          </p>
        </div>
        <div className="about-stats">
          <div className="stat-card">
            <strong>15+</strong>
            <span>Years of catering excellence</span>
          </div>
          <div className="stat-card">
            <strong>500+</strong>
            <span>Events served with a premium touch</span>
          </div>
        </div>
      </div>

      <section className="about-values">
        <div className="value-card">
          <h2>Our Promise</h2>
          <p>Beautiful cuisine, reliable service, and a refined guest experience delivered with care from concept to cleanup.</p>
        </div>
        <div className="value-card">
          <h2>Our Approach</h2>
          <p>Every event receives thoughtful planning, premium ingredients, and service executed with calm precision.</p>
        </div>
        <div className="value-card">
          <h2>Our Commitment</h2>
          <p>We create moments where food brings people together, and every detail contributes to an exceptional celebration.</p>
        </div>
      </section>

      <section className="about-story">
        <div className="story-copy">
          <h2>Why choose Monreal?</h2>
          <p>We combine a deep passion for hospitality with refined culinary expertise. Every menu is custom-designed, every event is treated as a true occasion, and every guest leaves satisfied.</p>
          <ul>
            <li>Personalized menu consultation and tasting</li>
            <li>Experienced service teams with premium presentation</li>
            <li>Flexible catering solutions for weddings, corporate events, and private celebrations</li>
          </ul>
        </div>
        <blockquote className="about-motto">
          “Good food. Good mood. Delivered with care.”
        </blockquote>
      </section>
    </section>
  );
};

export default About;
