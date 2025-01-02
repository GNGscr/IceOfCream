import Image from "next/image";
import chocolataBall from '../public/images/chocolate_ice_cream_scoop.png';

export default function Menu({ data, typingText, starIconRating, isSlidingCartVisible, shoppingCartOrange, cartId, addToCart }) {
    return (
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
                          <Image id="hamburger" src={chocolataBall} alt="flavor img" />
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
    )
} 