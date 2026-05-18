import React from 'react';
import './Services.css';

const Services = () => {
  const offerings = [
    {
      title: 'Signature Event Catering',
      description: 'Full-service catering for weddings, galas, and corporate receptions with elegant plating, premium staffing, and seamless delivery.',
    },
    {
      title: 'Curated Buffet Experiences',
      description: 'Beautifully designed buffet presentations featuring fresh seasonal ingredients and thoughtful menu pairings.',
    },
    {
      title: 'Executive Meal Packages',
      description: 'Convenient packed meals created for business lunches, team events, and private gatherings with a refined touch.',
    },
    {
      title: 'Luxury Tray Service',
      description: 'Ready-to-serve platters and gourmet trays delivered with professional setup for effortless guest enjoyment.',
    },
  ];

  return (
    <section className="services-page">
      <div className="services-hero">
        <div className="services-copy">
          <span className="eyebrow">Signature Services</span>
          <h1>Premium catering solutions crafted for unforgettable events</h1>
          <p>
            From intimate private celebrations to large-scale corporate functions, Monreal Catering delivers refined flavors,
            graceful presentation, and exceptional attention to detail for every occasion.
          </p>
        </div>
        <div className="services-callout">
          <div className="callout-card">
            <h3>Event Experts</h3>
            <p>Experienced planners and service staff ensure each detail is executed flawlessly.</p>
          </div>
          <div className="callout-card">
            <h3>Custom Menus</h3>
            <p>Menus tailored to your preferences, dietary needs, and seasonal availability.</p>
          </div>
        </div>
      </div>

      <section className="service-grid">
        {offerings.map((service) => (
          <article key={service.title} className="service-card">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </article>
        ))}
      </section>

      <section className="services-detail">
        <div className="detail-card">
          <h2>Dedicated planning</h2>
          <p>Every package includes personalized consultation and menu guidance so your event reflects your vision with precision.</p>
        </div>
        <div className="detail-card">
          <h2>Refined presentation</h2>
          <p>Beautiful plating, elegant decor accents, and stylish service elevate every moment from welcome to farewell.</p>
        </div>
      </section>
    </section>
  );
};

export default Services;
