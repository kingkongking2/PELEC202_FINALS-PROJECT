import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <section className="home-page">
      <div className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Luxury Catering</span>
          <h1>Elevate every event with unforgettable culinary excellence</h1>
          <p>
            Monreal Catering creates premium dining experiences with elegant presentation,
            seamless service, and menus designed for weddings, corporate celebrations, and private gatherings.
          </p>
          <div className="hero-actions">
            <Link to="/order" className="hero-button hero-button-primary">Book an Event</Link>
            <Link to="/menu" className="hero-button hero-button-secondary">Explore the Menu</Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-card hero-visual-card--top">
            <h2>Curated menus</h2>
            <p>Signature dishes crafted for your style, season, and guest count.</p>
          </div>
          <div className="hero-visual-card hero-visual-card--bottom">
            <h2>Full-service planning</h2>
            <p>From tasting to execution, our team manages the details so you can enjoy the event.</p>
          </div>
        </div>
      </div>

      <section className="home-highlights">
        <div className="section-heading">
          <p>Premium service, expertly delivered</p>
          <h2>Refined catering tailored for memorable moments</h2>
        </div>

        <div className="highlight-grid">
          <article className="highlight-card">
            <h3>Fine Dining Presentation</h3>
            <p>Professional plating, upscale station displays, and elegant event styling designed to impress.</p>
          </article>
          <article className="highlight-card">
            <h3>Personalized Menus</h3>
            <p>Unique menu planning based on dietary preferences, cultural tradition, and seasonal ingredients.</p>
          </article>
          <article className="highlight-card">
            <h3>Dedicated Event Support</h3>
            <p>Experienced staff ensures smooth service, punctual delivery, and an effortless client experience.</p>
          </article>
        </div>
      </section>

      <section className="home-testimonials">
        <div className="section-heading">
          <p>Client Stories</p>
          <h2>Trusted by hosts who expect exceptional results</h2>
        </div>

        <div className="testimonial-grid">
          <article className="testimonial-card">
            <p>“Monreal Catering transformed our wedding into a culinary celebration. Every guest raved about the food and the service was impeccable.”</p>
            <div className="testimonial-author">
              <strong>John Michael</strong>
              <span>Wedding Reception</span>
            </div>
          </article>
          <article className="testimonial-card">
            <p>“The team handled our corporate gala flawlessly. The menu was luxurious, and the entire evening felt effortless.”</p>
            <div className="testimonial-author">
              <strong>Kurt Jonwel</strong>
              <span>Corporate Event</span>
            </div>
          </article>
          <article className="testimonial-card">
            <p>“Every detail was thoughtfully curated. Their private tasting and event execution were truly first class.”</p>
            <div className="testimonial-author">
              <strong>Elton Mart</strong>
              <span>Private Celebration</span>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
};

export default Home;
