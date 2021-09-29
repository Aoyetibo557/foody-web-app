/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import './Home.css';
import {db} from '../backend/firebase';
import { Link } from 'react-router-dom';
import GrocereyImageOne from '../images/image1.jpg';
import GrocereyImageTwo from '../images/Image2.jpg';
import GrocereyImageThree from '../images/Image3.jpg';
import GrocereyImageFour from '../images/Image4.jpg';
import AOS from 'aos';
import "aos/dist/aos.css";



function Home() {
    const [storeState, setStoreState] = useState();
    const [firebaseErr, setFireErr] = useState();


    useEffect(() => {
        console.clear()
        getStoreState();

        AOS.init({
            duration:1000,
            easing: 'ease',
        })

        
    },[])
    /**
     * This function retuns the store strate onMount
     */
    const getStoreState = () => {
        var dbRef = db.collection("Admin").doc("store");

        try{
            dbRef.onSnapshot((doc) => {
                doc.data();
                console.log(doc.data());
                setStoreState(doc.data().storeState);
            })
            console.log("Get Transaction Successfull!")
            
        }catch(error) {
            setFireErr(error);
        }
    }

    return (
        <div className="home">
            {/* <p>{firebaseErr}</p>
            {storeState === false ? <p>Store is Closed</p> : <p> Store is Open</p>} */}

           <section className="home__section">
                <div className="home__banner">
                    <article data-aos="fade-left" data-aos-duration="2000" className="home__article">
                        <h4>African Grocerey delivery made easy for all.</h4>
                        <p>We are a trusted african grocery shop where you can buy your necessary produce and african items.</p>
                        <Link className="article__link" to="/shop" >Shop Now</Link>
                    </article>

                    <div className="home__banner-images">
                        <img data-aos="flip-up" data-aos-duration="1000" className="home__banner-img" src={GrocereyImageOne} alt="grocery" />
                        <img data-aos="flip-right" data-aos-duration="1500" className="home__banner-img" src={GrocereyImageTwo} alt="grocery" />
                        <img data-aos="flip-down" data-aos-duration="2000" className="home__banner-img" src={GrocereyImageThree} alt="grocery" />
                        <img data-aos="flip-left" data-aos-duration="2500" className="home__banner-img" src={GrocereyImageFour} alt="grocery" />
                    </div>
                </div>
           </section>
        </div>
    )
}

export default Home
