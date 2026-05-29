import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import bgImage from '../assets/catering-bg.jpg';

const Home = () => {
  return (
    <div className="home-page">
      {/* ===== NEW HERO (full-screen dark image) ===== */}
      <section 
        className="home-hero" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${bgImage})`
        }}
      >
        <h1 className="brand-name">Mon<span>real</span></h1>
        
        <div className="hero-body">
          <div className="hero-title">
            <span className="catering">CATERING</span>
            <span className="services">SERVICES</span>
          </div>
          
          <p className="hero-description">
            Delicious food. Seamless service. Memorable events.<br />
            We provide premium catering for weddings, corporate events, and private parties—crafted with fresh ingredients and attention to every detail.<br />
            Let us handle the food while you enjoy the moment.<br />
            Book your catering today!
          </p>
          
          <div className="hero-buttons">
            <Link to="/about" className="order-btn">About Us</Link>
            <Link to="/menu" className="order-btn">Explore the Menu</Link>
            <Link to="/order" className="order-btn">Order Now!</Link>
          </div>
        </div>
      </section>

      <section className="home-testimonials">

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
    </div>
  );
};

export default Home;
