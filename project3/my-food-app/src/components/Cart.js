import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const closeCart = () => {
    setIsOpen(false);
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

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
    dispatchCartUpdate();
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalItems = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <>
      <button className="cart-toggle-button" onClick={toggleCart} aria-label="Toggle cart">
        <span className="cart-icon">🛒</span>
        <span className="cart-label">Cart</span>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>

      {isOpen && (
        <div className="cart-overlay" onClick={closeCart}>
          <div className="cart-panel" onClick={(event) => event.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart">
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <p>Your cart is empty.</p>
                <p>Browse the menu and add items to see them here.</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p className="cart-item-price">₱{item.price}</p>
                        <div className="cart-item-controls">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total</span>
                    <strong>₱{getTotalPrice().toFixed(2)}</strong>
                  </div>
                  <div className="cart-actions">
                    <button className="cart-clear-btn" onClick={clearCart}>
                      Clear Cart
                    </button>
                    <Link to="/order" className="cart-checkout-btn" onClick={closeCart}>
                      Go to Order
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
