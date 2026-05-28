import React from 'react';
import './About.css';
import heroImage from '../assets/about.png';
import featureImage from '../assets/about-bottom.png';
import benefitOne from '../assets/whychooseus1.png';
import benefitTwo from '../assets/whychooseus2.png';
import benefitThree from '../assets/whychooseus3.png';

const About = () => {
  return (
    <section className="about-page">
      <div className="about-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-panel">
          <span className="eyebrow">About Us</span>
          <h1>Welcome to the Best Catering Company</h1>
          <p>
            At Monreal, we believe every great occasion begins with an exceptional meal.
            Named with a commitment to quality and elegance, our catering service is dedicated to turning your milestones into unforgettable culinary experiences.
          </p>
        </div>
      </div>

      <section className="about-intro">
        <div className="intro-copy">
          <h2>About Us</h2>
          <p>
            Whether you are hosting an intimate family gathering, a corporate event, or a grand celebration, we bring a passion for flavor and a sharp eye for detail to every plate.
            Our team focuses on blending traditional hospitality with modern culinary trends, ensuring that your guests are not just fed, but truly inspired.
          </p>
          <p>
            From menu planning and presentation to flawless execution, Monreal Catering delivers polished service and exceptional food tailored to your budget, preferences, and vision.
          </p>
        </div>
        <div className="intro-image">
          <img src={featureImage} alt="Chef preparing a dish" />
        </div>
      </section>

      <section className="about-benefits">
        <span className="eyebrow">Why Choose Us</span>
        <h2>Why Choose Us?</h2>
        <div className="benefits-grid">
          <article className="benefit-card">
            <img src={benefitOne} alt="Attentive catering service" />
            <h3>Attention to Detail</h3>
            <p>From food styling to portioning, we take care of every detail to create a polished and memorable dining experience.</p>
          </article>

          <article className="benefit-card">
            <img src={benefitTwo} alt="Customers enjoying event" />
            <h3>Customer Satisfaction</h3>
            <p>Your happiness is our priority, and we go the extra mile to exceed expectations every time.</p>
          </article>

          <article className="benefit-card">
            <img src={benefitThree} alt="Fresh catering ingredients" />
            <h3>Customized Menus</h3>
            <p>From classic comfort food to contemporary gourmet selections, we tailor our service to match your unique vision.</p>
          </article>
        </div>
      </section>
    </section>
  );
};

export default About;
