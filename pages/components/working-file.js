

'use client';
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import data from './public/data/data.json';
import logo from './public/images/cream-from-ice.svg';
import shoppingCartIcon from './public/images/shopping-cart.svg';
import hamburgerIcon from './public/images/hamburger.svg';
import greenConeIceCream from './public/images/green-cone-ice-cream-on-transparent-background.png';

export default function Home() {
  // State variables for managing cart, popup, menu visibility, and scroll behavior
  const [cart, setCart] = useState([]);
  const [cartItemIds, setCartItemIds] = useState([]);
  const [cartStatusVisible, setCartStatusVisible] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isNavMenuVisible, setIsNavMenuVisible] = useState(false);
  const [showNavBg, setShowNavBg] = useState(false);
  const [goToTopBtn, setGoToTopBtn] = useState(false);
  const [typingText, setTypingText] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const navBgHeight = 5;
  const typingTextHeight = 1325;

  // Effect to handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setShowNavBg(window.scrollY > navBgHeight);
      setGoToTopBtn(window.scrollY > navBgHeight);
      setTypingText(window.scrollY > typingTextHeight);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle adding item to cart
  const addToCart = (id) => {
    if (cartItemIds.includes(id)) {
      const currentFlavor = cart.find(item => item.id === id).name;
      setPopupText(`${currentFlavor} flavor is already in Cart`);
      setIsPopupOpen(true);
      return;
    }

    setCartItemIds((prev) => [...prev, id]);

    const product = data.find((item) => item.id === id);
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Handle removing item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    setCartItemIds(cartItemIds.filter((itemId) => itemId !== id));
  };

  // Handle updating quantity of items in the cart
  const updateQuantity = (id, change) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, quantity: item.quantity + change };
        return updatedItem.quantity <= 0 ? null : updatedItem;
      }
      return item;
    }).filter(item => item !== null);

    setCart(updatedCart);
  };

  // Render cart items and calculate total price
  const renderCart = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    renderCart();
  }, [cart]);

  return (
    <>
      <Head>
        <title>Cream from Ice</title>
        <meta name="description" content="Cream from Ice - Indulge in Fresh Ice Cream" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Header Section */}
        <header className={showNavBg ? 'show-nav-bg' : ''}>
          <a href="#" className="logo">
            <Image className="logo-image" src={logo} alt="logo" />
          </a>

          <div className={`shoping-cart-container ${isNavMenuVisible ? 'show-menu-container' : ''}`} />
          <ul className={`navbar ${isNavMenuVisible ? 'show-menu-navbar' : ''}`}>
            <li><a onClick={() => setIsNavMenuVisible(false)} href="#home">Home</a></li>
            <li><a onClick={() => setIsNavMenuVisible(false)} href="#about">About</a></li>
            <li><a onClick={() => setIsNavMenuVisible(false)} href="#menu">Menu</a></li>
            <li><a onClick={() => setIsNavMenuVisible(false)} href="#contact">Contact</a></li>
          </ul>

          <div className="h-icons">
            <Image onClick={() => setIsCartVisible(!isCartVisible)} src={shoppingCartIcon} alt="shopping cart" />
            <div className={`cart-status ${cart.length > 0 ? 'show-cart-status' : ''}`}>
              {cart.length}
            </div>
            <div onClick={() => setIsNavMenuVisible(!isNavMenuVisible)} className="hamburger">
              <Image id="hamburger" src={hamburgerIcon} alt="hamburger icon" />
            </div>
          </div>
        </header>

        {/* Popup for Cart Messages */}
        <div className="popup-wrapper">
          <div className={`popup ${isPopupOpen ? 'show-popup' : ''}`}>
            {popupText}
            <div className="close-popup" onClick={() => setIsPopupOpen(false)}>OK</div>
          </div>
        </div>

        {/* Home Section */}
        <section className="home" id="home">
          <div className="home-text">
            <h1><span>Welcome</span> to The world of Taste & Fresh Ice Cream</h1>
            <p>Discover the ultimate indulgence of our fresh and flavorful ice cream.<br />Each scoop is crafted with the finest ingredients to ensure a delightful taste experience.</p>
            <a href="#menu" className="btn">Choose a Flavor</a>
          </div>
          <div className="home-img">
            <Image className="green-cone-ice-cream" src={greenConeIceCream} alt="home" width="50" height="50" />
          </div>
        </section>

        {/* Menu Section */}
        <section className="menu" id="menu">
          <div className="main-text">
            <h2>Our Menu</h2>
            <p>Choose Your Favorite Flavors</p>
          </div>
          <div className="menu-items">
            {data.map((item) => (
              <div key={item.id} className="menu-item">
                <Image src={item.image} alt={item.name} width="50" height="50" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="price">${item.price}</p>
                <button onClick={() => addToCart(item.id)} className="add-to-cart-btn">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        {/* Cart Section */}
        <section className={`cart ${isCartVisible ? 'show-cart' : ''}`} id="cart">
          <div className="cart-header">
            <h2>Your Cart</h2>
            <button onClick={() => setIsCartVisible(false)} className="close-cart-btn">X</button>
          </div>
          <div className="cart-items">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="cart-item-quantity">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <p className="cart-item-price">${item.price * item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-item-btn">Remove</button>
                </div>
              ))
            )}
          </div>
          <div className="cart-total">
            <p>Total: ${totalPrice}</p>
            <button className="checkout-btn">Checkout</button>
          </div>
        </section>

        {/* About Section */}
        <section className="about" id="about">
          <div className="about-text">
            <h2>About Us</h2>
            <p>We are passionate about bringing you the freshest, most delicious ice cream. With a wide variety of flavors made from the finest ingredients, we aim to make every bite unforgettable.</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <div className="contact-text">
            <h2>Contact Us</h2>
            <p>If you have any questions or want to get in touch, feel free to reach out to us!</p>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </section>

      </main>
    </>
  );
}
