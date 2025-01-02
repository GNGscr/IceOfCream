import Image from "next/image";

export default function Header({ showNavBg, logo, isNavMenuVisible, hideNavbarOnClickSmallMedia, toggleCart, shoppingCartIcon, isCartStatusVisible, resizeCartStatus, toggleMenu, hamburgerIcon, falvorCount }) {
    return (
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
    )
}