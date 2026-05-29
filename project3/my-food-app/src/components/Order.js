import React, { useState, useEffect, useRef } from 'react';
import './Order.css';
import InteractiveMap from './Map';

function Order() {
  const mapSectionRef = useRef(null);
  const [form, setForm] = useState({
    eventName: '',
    eventAddress: '',
    email: '',
    guests: '',
    message: '',
    date: '',
    time: ''
  });

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressSelected = (address) => {
    setForm((prevForm) => ({
      ...prevForm,
      eventAddress: address
    }));
  };

  const scrollToMap = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();

    const handleCartUpdated = () => loadCart();
    const handleStorageChange = (event) => {
      if (event.key === 'cart') {
        loadCart();
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdated);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdated);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
  };

  const dispatchCartUpdate = () => {
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    dispatchCartUpdate();
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    dispatchCartUpdate();
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
    dispatchCartUpdate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order submitted for ${form.eventName} at ${form.eventAddress} on ${form.date} ${form.time}`);
  };

  return (
    <div className="order" id="order">
      <h1>Place Your Order</h1>

      <div className="order-content">
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={form.eventName}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
            <div className="form-group-label-row">
              <label htmlFor="eventAddress">Venue Address</label>
              <button type="button" className="map-scroll-btn" onClick={scrollToMap}>
                Search on Map
              </button>
            </div>
            <input
              type="text"
              id="eventAddress"
              name="eventAddress"
              value={form.eventAddress}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            min="1"
            value={form.guests}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleFormChange}
            rows="4"
            placeholder="Add any special requests or event details"
          />
        </div>

        <div className="form-group">
            <input
              type="time"
              id="time"
              name="time"
              value={form.time}
              onChange={handleFormChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Submit Order</button>
        </form>

        <div className="cart-container">
          <h2>Your Cart</h2>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty. Add items from the menu!</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p className="cart-item-price">₱{item.price}</p>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="cart-item-total">₱{item.price * item.quantity}</div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total">
                  <h3>Total: ₱{getTotalPrice().toFixed(2)}</h3>
                </div>
                <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="map-section" ref={mapSectionRef}>
        <h2>Find Your Event Location</h2>
        <InteractiveMap onAddressSelect={handleAddressSelected} />
      </div>
    </div>
  );
}

export default Order;