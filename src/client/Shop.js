import React, {useEffect, useState } from 'react';
import CategoryCard from '../frontend/CategoryCard';
import ShopBanner from '../frontend/ShopBanner';
import './Shop.css';
import Fruits from '../images/altFruits.jpg';
import Bread from '../images/bread.jpg';
import Milk from '../images/milk.jpg';
import Seafood from '../images/seafood.jpg';
import RawMeat from '../images/altMeat.jpg';
import Coffee from '../images/coffee.jpg';
import Spices from '../images/spices.jpg';
import OtherProducts from '../images/otherProducts.jpg';
import AllProducts from '../images/salebanner.jpg'
import Aos from 'aos';
import 'aos/dist/aos.css';
import ProductCollection from './ProductCollection';
import SkeletonCard from '../skeleton/SkeletonCard';



function Shop() {
    const [selCat, setCat] = useState("all");
    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease'
        })
        console.log("Cat", selCat)
    }, [selCat])

    return (
        <div className="shop">
           <div className="shop__container">
                <div data-aos="zoom-in-up" data-aos-duration = "2000" className="banner">
                    <ShopBanner 
                        size="large"
                    />
                    
                    <ShopBanner 
                        size="small"
                    />
                </div>

                <div className="category">
                    <h3>Browse by Category</h3>
                    <div className="category__container">
                        <CategoryCard onClick = {() => setCat("all")} src="/all" img={AllProducts} name="All Products" />
                        <CategoryCard onClick = {() => setCat("fruits and vegetables")} src="/fruits" img={Fruits} name="Fruits & Vegetables" />
                        <CategoryCard onClick = {() => setCat("bread")} src="/bread" img={Bread} name="Breads & Sweets" />
                        <CategoryCard onClick = {() => setCat("seafood")} src="/seafoods" img={Seafood} name="Frozen Seafoods" />
                        <CategoryCard onClick = {() => setCat("produce")} src="/" img={RawMeat} name="Raw Meats" />
                        <CategoryCard onClick = {() => setCat("coffee")} src="/" img={Coffee} name="Coffe and Teas" />
                        <CategoryCard onClick = {() => setCat("spices")} src="/" img={Spices} name="Spices and Condiments" />
                        <CategoryCard onClick = {() => setCat("dairy")} src="/" img={Milk} name="Milk and Dairies" />
                        <CategoryCard onClick = {() => setCat("others")} src="/" img={OtherProducts} name="Others" />
                    </div>

                </div>

                <div className="products">
                    <ProductCollection cat={selCat} />
                </div>

                <div>
                </div>
           </div>
        </div>
    )
}

export default Shop
