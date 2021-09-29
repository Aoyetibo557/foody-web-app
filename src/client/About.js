import React from 'react';
import "./About.css";
import AboutBannerOne from '../images/Image2.jpg';
import AboutBannerTwo from '../images/AboutIamage2.jpg';
import AboutBannerThree from '../images/AboutImage3.jpg';
import AboutBannerFour from '../images/AboutImage4.jpg';
import AboutBannerFive from '../images/AboutImage5.jpg';



import { Carousel } from 'antd';
import Footer from './Footer';



function About() {
    return (
        <div className="about">
            <section className="about__topsection">
                <article className="about__article">
                    <h3>Dedicated Personel for an Enjoyable Experience.</h3>
                </article>
                <Carousel className="about__carousel" autoplay effect="scrollx" dotPosition="right">
                    <div>
                        <img className="contentStyle" src={AboutBannerOne} alt="aboutpic" />

                    </div>

                    <div>
                        <img className="contentStyle" src={AboutBannerTwo} alt="aboutpic" />
                    </div>

                    <div>
                        <img className="contentStyle" src={AboutBannerThree} alt="aboutpic" />
                    </div>

                    <div>
                        <img className="contentStyle" src={AboutBannerFour} alt="aboutpic" />
                    </div>

                     <div>
                        <img className="contentStyle" src={AboutBannerFive} alt="aboutpic" />
                    </div>
                </Carousel>
            </section>
            <section className="about__midsection">
                <article className="about__article-mid">
                    <h5>What we offer</h5>
                    <p>
                        we offer a wide variety of consumer friendly produce and products. 
                        Our store holds a collection of produce from countries on the african continent.
                        we also sell non consumable items; come check us out.
                    </p>
                </article>

                <article className="about__article-mid">
                    <h5>How we Operate</h5>
                    <p>
                        Our delivery system is simple and efficient. We approve all orders than can 
                        be delivered within 20-30 mins. We also offer order pick up from our store location or your 
                        prefered delivery location.
                    </p>
                </article>

                <article className="about__article-mid">
                    <h5>Hours of Operation</h5>
                    <ul>
                        <li>Monday: 9:00am - 7:00pm</li>
                        <li>Tuesday: 9:00am - 7:00pm</li>
                        <li>Wednesday: 9:00am - 7:00pm</li>
                        <li>Thursday: 9:00am - 7:00pm</li>
                        <li>Friday: 9:00am - 7:00pm</li>
                        <li>Saturday: 9:00am - 7:00pm</li>
                        <li>Sunday: 9:00am - 7:00pm</li>
                    </ul>
                </article>

            </section>

            <Footer />
        </div>
    )
}

export default About
