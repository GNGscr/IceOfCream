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
import chocolateIceCreameCircle from './public/images/chocolate-ice-cream-circle.png';
import shoppingCartOrange from './public/images/shopping-cart-orange.svg';
import starIconRating from './public/images/star-icon-rating.png';
import chocolataBall from './public/images/chocolate_ice_cream_scoop.png';
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Header from "./components/Header";
import ShopingCart from "./components/ShopingCart";
import Ingredients from "./components/Ingredients";


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
  const [ totalPriceScore, setTotalPriceScore ] = useState(0);
  const [ shopingCartItems, setShopingCartItems ] = useState('');
  const [ cartStatusCount, setCartStatusCount ] = useState('');
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
            <button className="button left"
              onClick={() => updateQuantity(item.id, -1)}><Image src={arrowIcon} alt="arrow icon left" /></button>
            <div className="quantity">{item.quantity}</div>
            <button className="button right"
              onClick={() => updateQuantity(item.id, 1)}><Image src={arrowIcon} alt="arrow icon right" /></button>
            </div>
            <button className="remove-button"
              onClick={() => removeFromCart(item.id)}>X</button>
            <p className="price">${item.price}</p>
        </div>
        </li>
    )
    }));
    const total = cart.reduce((sum, item) => 
      sum + item.price * item.quantity, 0);
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

  useEffect(() => {
    renderCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);


  return (
      <>
        <Head>
          <title>Cream Of Ice</title>
          <meta name="description" content="Generated by cream from ice" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main>

          {/* header section */}

          <Header
            showNavBg={showNavBg}
            logo={logo}
            isNavMenuVisible={isNavMenuVisible}
            hideNavbarOnClickSmallMedia={hideNavbarOnClickSmallMedia}
            toggleCart={toggleCart} 
            shoppingCartIcon={shoppingCartIcon}
            isCartStatusVisible={isCartStatusVisible}
            resizeCartStatus={resizeCartStatus}
            toggleMenu={toggleMenu}
            hamburgerIcon={hamburgerIcon}
            falvorCount={falvorCount}
          />

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
  

            {/* <!-- Ingredients section --> */}
            <Ingredients />
  
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

          <Menu
            data={data}
            typingText={typingText}
            chocolataBall={chocolataBall}
            starIconRating={starIconRating}
            isSlidingCartVisible={isSlidingCartVisible}
            shoppingCartOrange={shoppingCartOrange}
            cartId={cartId}
            addToCart={addToCart}
          />
  
            <a href="#home">
                <div
                  className={`go-to-top-button ${goToTopBtn ? 'show-go-top-btn' : ''}`}>
                    <Image src={arrowIcon} alt="arrow icon" />
                </div>
            </a>
  
            {/* <!-- contact section --> */}

            <Contact />
  
            <div className="last-text">
                <p>@ Developed 2024 by Daniel Ehrlich</p>
            </div>
            
          </div>
        
            {/* <!--  shoping cart toggle bg --> */}

            <div className={`shoping-cart-container
                ${isCartVisible ? 'show-menu-container' : ''}`}
                onClick={() => setIsCartVisible(false)}
                />

            {/* <!--  shoping cart section --> */}

            <ShopingCart
                isCartVisible={isCartVisible}
                totalPrice={totalPrice}
                cleanCart={cleanCart}
                cartItemCount={cartItemCount}
                shopingCartItems={shopingCartItems}
                totalPriceScore={totalPriceScore}
                setIsModalOpen={setIsModalOpen}
            />
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