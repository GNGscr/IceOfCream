'use client';
import Head from "next/head";
// import Lenis from 'lenis';
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import data from './public/data/data.json';
import logo from './public/images/cream-from-ice.svg';
import arrowIcon from './public/images/arrow-icon.svg';
import shoppingCartIcon from './public/images/shopping-cart.svg';
import hamburgerIcon from './public/images/hamburger.svg';
import greenConeIceCream from './public/images/green-cone-ice-cream-on-transparent-background.png';
import vanillaImg from './public/images/PikPng.com_vanilla-png_1412043.png';
import chocolateImg from './public/images/PikPng.com_chocolate-png_534590.png';
import coconutImg from './public/images/PikPng.com_coconut-png_533200.png';
import pistachiosImg from './public/images/Pistachio-Nut-Transparent-PNG.png';
import sideViewWomen from './public/images/side-view-smiley-women-eating-ice-cream.jpg';
import beautifulWoman from './public/images/beautiful-young-women-having-fun-with-ice-cream-park.jpg';
import womenEatIceCream from './public/images/women-eating-ice-cream-near-sea.jpg';
import chocolateIceCreameCircle from './public/images/chocolate-ice-cream-circle.png';
import shoppingCartOrange from './public/images/shopping-cart-orange.svg';
import starIconRating from './public/images/star-icon-rating.png';
import chocolataBall from './public/images/chocolate_ice_cream_scoop.png';


export default function Home() {

  const myRef = useRef(null);

  const [ showNavBg, setShowNavBg ] = useState(false);
  const [ isNavMenuVisible, setIsNavMenuVisible ] = useState(false);
  const [ isCartVisible, setIsCartVisible ] = useState(false);
  const [ isCartStatusVisible, setIsCartStatusVisible ] = useState(false);
  const [ isSlidingCartVisible, setIsSlidingCartVisible ] = useState(false);
  const [ resizeCartStatus, setResizeCartStatus ] = useState(false);
  const [ goToTopBtn, setGoToTopBtn ] = useState(false);
  const [ typingText, setTypingText ] = useState(false);
  const [ isPopupOpen, setIsPopupOpen ] = useState(false);
  const [ buttonDistanceFromFooter, setButtonDistanceFromFooter ] = useState(false);
  const [ falvorCount, setFalvorCount ] = useState(0);
  const [ cartId, setCartId ] = useState(0);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const [ cartItem, setCartItem ] = useState({});
  const [ cartItemCount, setCartItemCount ] = useState(0);
  const [ navBgHeight, setNavBgHeight ] = useState(5);
  const [ typingTextHeight, setTypingTextHeight ] = useState(1325);
  const [ popupText, setPopupText ] = useState('');
  const [ cart, setCart ] = useState([]);
  const [ count, setCount ] = useState(0);
  const [ arrItemIds, setArrItemIds ] = useState([]);
  const [ scrollHandler, setScrollHandler ] = useState();
  const [ handleScroll, setHandleScroll ] = useState();
  const [ totalPriceScore, setTotalPriceScore ] = useState(0);
  const [ shopingCartItems, setShopingCartItems ] = useState('');
  const [ cartStatus, setCartStatus ] = useState('');
  const [ cartStatusCount, setCartStatusCount ] = useState('');
  const [ cartTitle, setCartTitle ] = useState('');
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  // Lenis
  // const lenis = new Lenis();
  //     function raf(time) {
  //         lenis.raf(time);
  //         requestAnimationFrame(raf);
  //     }
  //     requestAnimationFrame(raf);

  useEffect(() => {
    const handleScroll = window.addEventListener('scroll', () => {
        setShowNavBg(setGoToTopBtn(window.innerHeight > navBgHeight));
        setTypingText(window.scrollY > typingTextHeight);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    });
    
    const sectionToIntersect = ["#home", "#about", "#menu", "#contact"];
    const navbarList = [...document.querySelectorAll("ul.navbar > li > a")];
    setCart(cart);
    
    const intersections = document.querySelectorAll(sectionToIntersect);
    
    const intersectionsIterator = (entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navbarList.map(listItem => {
                  listItem.setAttribute('active',
                    listItem.hash.replace('#', '') !== entry.target.id ? false : true);
                });
            }
        });
    };
    
    const observer = new IntersectionObserver(intersectionsIterator);
    [...intersections].forEach(intersection => observer.observe(intersection));
      return () => observer.disconnect(); // Cleanup observer
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const toggleCartStatus = () => {
    setIsCartStatusVisible(totalPrice >= 0);
    this.isCartStatusVisible = this.totalPrice >= 0;
  }
  
  const cleanCart = () => {
    setArrItemIds([]);
    setCart([]);
    renderCart();
  }
  
  const updateQuantity = (id, change) => {
    setCartItem(cart.find(item => item.id === id));

      const cartItem = cart.find(item => item.id === id);
      if (cartItem) {
          cartItem.quantity += change;
          if (cartItem.quantity <= 0) removeFromCart(id);
          else renderCart();
      }
  };
  
  const addToCart = id => {

    if (arrItemIds && arrItemIds.includes(id)) {
        let currentFlavor = cart.find(item => item.id === id).name;
        setPopupText(`${currentFlavor} flavor is already in Cart`);
        setIsPopupOpen(true);
        setIsSlidingCartVisible(false);
        return;
      }
      setArrItemIds([...arrItemIds, id]);
      const product = data.find(p => p.id === id);
      setCartId(0);
      setCartId(id);
      const productId = data.find(p => p.id === id);
      
      setCart([...cart, {...productId}]);
      
      setResizeCartStatus(true);
      setIsSlidingCartVisible(true);
      setTimeout(() => {
          setResizeCartStatus(false);
          setIsSlidingCartVisible(false);
      }, 800);
  
      if (cartItem.length) {
        setCartItem(cartItem.quantity + 1);
      } else {
        setCart([...cart, product ]);
      }
      renderCart();
      setIsCartStatusVisible(totalPrice >= 0);
  };
  
  const renderCart = () => {
    setTotalPrice(0);
    setCount(0);
    setShopingCartItems(cart.map((item, index) => {        
    setCount(count + 1);
    setTotalPrice(item.price * item.quantity);
    return (
        <li key={index} className="cart-item">
        <div className="cart-content">
            <h4>{item.name}</h4>
            <div className="cart-item-buttons"> 
            <button className="button left" onClick={() => updateQuantity(item.id, -1)}><Image src={arrowIcon} alt="arrow icon left" /></button>
            <div className="quantity">{item.quantity}</div>
            <button className="button right" onClick={() => updateQuantity(item.id, 1)}><Image src={arrowIcon} alt="arrow icon right" /></button>
            </div>
            <button className="remove-button" onClick={() => removeFromCart(item.id)}>X</button>
            <p className="price">${item.price}</p>
        </div>
        </li>
    )
    }));
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPriceScore(`$${total}`);
    setCartStatusCount(count);
    setFalvorCount(cart.length);
    setCartItemCount(count);
  }
  
  const removeFromCart = id => {
    setCart(cart.filter(item => item.id !== id));
    renderCart();
    setArrItemIds(arrItemIds.pop(id));
    setIsCartStatusVisible(totalPrice >= 0);
  };
  
  const hideNavbarOnClickSmallMedia = () => setIsNavMenuVisible(false);
  
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
    setIsNavMenuVisible(false);
  }

  const toggleMenu = () => {
    setIsNavMenuVisible(!isNavMenuVisible);
    setIsCartVisible(false);
  }

  const orderNowModal = () => {
    return (
        <div className="order-now-modal">
            <div>
                This is a demo site for illustration purpuses Only
                If you would like to use my services go to this site
                Or send Email
                Phone
                Message
            </div>
            
            <div className="back-to-site-btn">Go back to site to play some more..</div>
        </div>
    )
  }

  useEffect(() => {
    renderCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);


  return (
      <>
        <Head>
          <title>Cream from Ice</title>
          <meta name="description" content="Generated by cream from ice" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main>
          {/* header section */}
          <header className={`${showNavBg === true ? "show-nav-bg" : ''}`}>
            
            <a href="#" className="logo">
              <Image className="logo-image" src={logo} alt="logo" />
            </a>
            <div className={`shoping-cart-container ${isNavMenuVisible ? 'show-menu-container' : ''}`}></div>
            <ul className={`navbar ${isNavMenuVisible ? 'show-menu-navbar' : ''}`}>
                <li><a onClick={hideNavbarOnClickSmallMedia} href="#home">Home</a></li>
                <li><a onClick={hideNavbarOnClickSmallMedia} href="#about">About</a></li>
                <li><a onClick={hideNavbarOnClickSmallMedia} href="#menu">Menu</a></li>
                <li><a onClick={hideNavbarOnClickSmallMedia} href="#contact">Contact</a></li>
            </ul>
  
            <div className="h-icons">
               <Image onClick={toggleCart} src={shoppingCartIcon} alt="shopping cart" />
               <div className={`cart-status ${isCartStatusVisible ? 'show-cart-status' : ''}
                  ${resizeCartStatus ? 'resize-cart-status' : ''}`}>
                    {falvorCount}
               </div>
                <div onClick={toggleMenu} className="hamburger">
                    <Image id="hamburger" src={hamburgerIcon} alt="hamburger icon" />
                </div>
            </div>
          </header>
          <div className="popup-wrapper">
              <div className={`popup ${isPopupOpen ? 'show-popup' : ''}`}>
                {popupText}
                <div className="close-popup" onClick={() => setIsPopupOpen(false)}>OK</div>
              </div>
          </div>
          <div className="wrapper">
  
            {/* <!-- home section --> */}
            <section className="home" id="home">
                <div className="home-text">
                    <h1><span>Welcome</span> to The world of Taste & Fresh Ice Cream</h1>
                    <p>Discover the ultimate indulgence of our fresh and flavorful ice cream.<br/> Each scoop is crafted with the finest ingredients to ensure a delightful taste experience.</p>
                    <a href="#menu" className="btn">Choose a Flavor</a>
                </div>
                <div className="home-img">
                    <Image className="green-cone-ice-cream" src={greenConeIceCream} alt="home" />
                </div>
            </section>
  
            <section className="container">
          
              <div className="main-text">
                  <h2>Our Ingredients</h2>
                  <p>Only the Best for You</p>
              </div>
              <div className="container-box">
  
                  <div className="c-mainbox">
                      <div className="container-img">
                          <Image className="ingredient" src={vanillaImg} alt="box1" />
                      </div>
                      <div className="container-text">
                          <p>Vanilla sticks</p>
                      </div>
                  </div>
                  <div className="c-mainbox">
                      <div className="container-img">
                          <Image className="ingredient" src={chocolateImg} alt="box2" />
                      </div>
                      <div className="container-text">
                          <p>Belgian Chocolate</p>
                      </div>
                  </div>
                  <div className="c-mainbox">
                      <div className="container-img">
                          <Image className="ingredient" src={coconutImg} alt="box3" />
                      </div>
                      <div className="container-text">
                          <p>Fresh Coconuts</p>
                      </div>
                  </div>
                  <div className="c-mainbox">
                      <div className="container-img">
                          <Image className="ingredient" src={pistachiosImg} alt="box4" />
                      </div>
                      <div className="container-text">
                          <p>Ripe Pistachios</p>
                      </div>
                  </div>
  
              </div>
  
              <div className="enjoy-our-vaction">
                  <div className="vacation-photos-title">The Customers</div>
                  <div className="slider" style={{"--width": "300px", "--height": "85px", "--quantity": "6"}}>
                      <div className="list">
                          <div className="item" style={{"--position": "1"}}><Image src={beautifulWoman} alt="" /></div>
                          <div className="item" style={{"--position": "2"}}><Image src={womenEatIceCream} alt="" /></div>
                          <div className="item" style={{"--position": "3"}}><Image src={sideViewWomen} alt="" /></div>
                          <div className="item" style={{"--position": "4"}}><Image src={womenEatIceCream} alt="" /></div>
                          <div className="item" style={{"--position": "5"}}><Image src={beautifulWoman} alt="" /></div>
                          <div className="item" style={{"--position": "6"}}><Image src={sideViewWomen} alt="" /></div>
                      </div>
                  </div>
              </div>
            </section>
  
            {/* <!-- about section --> */}
            <section className="about" id="about">
                <div className="about-img">
                    <Image src={chocolateIceCreameCircle} alt="about-img" />
                </div>
                <div 
                  // ref={this.myRef} 
                  className="about-text">
                    <h2>The Necessary Food <br/> For a Good Mood</h2>
                    <p>While ice cream might not be a daily staple, it can certainly boost your mood in moderation.</p>
                    <p>The pleasure of enjoying a sweet treat like ice cream can release endorphins, giving you a momentary happiness boost. Choosing flavors with fruits or nuts can add a nutritional benefit while still indulging. Remember, while it is okay to enjoy ice cream as a treat, balancing it with nutrient-rich foods like fruits and vegetables is key to maintaining overall well-being and a consistently positive mood.</p>
                    <a href="#menu" className="btn">Choose a Flavor</a>
                </div>
            </section>
  
            {/* <!-- menu section --> */}

            <section className="menu" id="menu">
              <div className="main-text">
                <div className="main-text-header-wrapper">
                  <h2 className={`text ${typingText ? 'type-text' : ''}`}>Our Popular Flavors</h2>
                </div>
                <p>We have selected for You <br/> the most exquisite tastes from Our Store</p>
              </div>

              <div className="menu-content">
                  {data.map((item, index) => {
                      return (
                        <div key={index} className="row"
                            style={{ 
                                backgroundImage: `url(${item.image.src})`,
                                backgroundSize: "cover",
                                backgroundSize: "75vw",
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: "center",
                            }}>
                                <Image id="hamburger" src={chocolataBall} alt="hamburger icon" />
                            <div className="menu-text">
                                <div className="menu-left">
                                    <h4>{item.name}</h4>
                                </div>
                                <div className="menu-right">
                                    <h5>${item.price}.00</h5>
                                </div>
                            </div>
                            <p>{item.text}</p>
                            <div className="stars-wrapper">
                                <div className="atc-button-wrapper">
                                    <div className="add-to-cart" onClick={() => addToCart(item.id)}>Add</div>
                                    <Image className={`hidden-shopping-cart ${isSlidingCartVisible && cartId === item.id ? 'show-hidden-shopping-cart' : ''}`} src={shoppingCartOrange} width={10} height={10} alt="" />
                                </div>
                                <div className="star">
                                    {Array.apply(null, { length: item.stars }).map((star, index) => {
                                        return (<a href="#" key={index}><Image src={starIconRating} alt="" height={10} width={10} /></a>);
                                    })}
                                </div>
                            </div>
                        </div>
                      )
                  }) || ''}
              </div>
          </section>
  
            <a href="#home">
                <div
                  className={`go-to-top-button ${goToTopBtn ? 'show-go-top-btn' : ''}`}>
                    <Image src={arrowIcon} alt="arrow icon" />
                </div>
            </a>
  
            {/* <!-- contact section --> */}
            <section className="contact" id="contact">
                <div className="main-contact">
                    <div className="contact-content">
                        <h4>Services</h4>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#menu">Menu</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </div>
  
                    <div className="contact-content">
                        <h4>Delivery</h4>
                        <li><a href="#contact">Uber Eats</a></li>
                        <li><a href="#contact">Wolt</a></li>
                        <li><a href="#contact">10Bis</a></li>
                        <li><a href="#contact">Mishloha</a></li>
                    </div>
  
                    <div className="contact-content">
                        <h4>Contact</h4>
                        <li><a href="#contact">Blog</a></li>
                        <li><a href="#contact">Careers</a></li>
                        <li><a href="#contact">FAQ</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </div>
  
                    <div className="contact-content">
                        <h4>Follow</h4>
                        <li><a href="https://tiktok.com">TikTok</a></li>
                        <li><a href="https://twitter.com">Twitter</a></li>
                        <li><a href="https://facebook.com">Facebook</a></li>
                        <li><a href="https://instagram.com">Instagram</a></li>
                    </div>
                </div>
            </section>
  
            <div className="last-text">
                <p>@ Developed 2024 by Daniel Ehrlich</p>
            </div>
          </div>
  
          <div className={`shoping-cart-container ${isCartVisible ? 'show-menu-container' : ''}`} onClick={() => setIsCartVisible(false)}></div>
          <div className={`shoping-cart ${isCartVisible ? 'show-shoping-cart' : ''}`}>
              <div className="cart-title-wrapper">
                <div className="cart-title">{totalPrice >  0 ? '' : 'No'} Items in cart</div>
                <div className={`tooltip ${totalPrice > 0 ? 'display-tooltip' : ''}`}>
                  <span id="tooltip-text">Clear Cart</span>
                  <span className="clean-all-cart-button" onClick={cleanCart}>X</span>
                </div>
              </div>
              <ul className={`shoping-cart-items ${cartItemCount > 5 ? 'cart-overflow' : ''}`}>{shopingCartItems || ''}</ul>
              <div className="total-price">
                  <div className="total-price-title">Total Price:</div>
                  <div className="total-price-score">{totalPriceScore || 0}</div>
              </div>
              <div className="cta" onClick={() => setIsModalOpen(true)}>Order Now</div>
          </div>
        </main>
        {isModalOpen
            ? <div className="order-now-modal">
            <div className="explaination">
                This is a website for demonstration purpuses Only
            </div>
            
            <div className="pitch">
                If you would like to use my services go to this site
                Or send Email
                Phone
                Message
            </div>
            
            <div className="back-to-site-btn" onClick={() => setIsModalOpen(false)}>Go back to site to play some more..</div>
        </div>
            : ''}
      </>
    );
}