import React from 'react';
import './ShopBanner.css';

function ShopBanner({size}) {
    return size === "large" ? (
        <div className="shopbanner large-banner">
           <div className="large__info">
                <h3>Safe And Fast Grocery Delivery Service At Your Fingertips</h3>
                <p>No need to Journey to the store, get all your shopping needs while at the comfort of your home</p>
                <button className="shopbanner__btn" >Shop Now</button>
           </div>
        </div>
    ): (
        <div className="shopbanner small-banner">
            <div className="small__info">
                <h3>20% SALE OFF</h3>
                <p>Get 20% off all purchase over $60.00. Valid thru 10/14/21</p>
                <button className="shopbanner__btn">Shop Now</button>
            </div>
        </div>
    )
}

export default ShopBanner
