import Image from "next/image";

export default function ShopingCart({ isCartVisible, totalPrice, cleanCart, cartItemCount, shopingCartItems, totalPriceScore, setIsModalOpen }) {
    return (
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
    )
}