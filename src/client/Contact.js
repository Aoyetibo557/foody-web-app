import React from 'react';
import '../client/Contact.css';
import { GrMail } from 'react-icons/gr';
import { FaPhone, FaAddressCard, FaInstagramSquare, FaTwitterSquare, FaSnapchatSquare } from 'react-icons/fa';
import Footer from './Footer';
import ContactImage from '../images/contact.jpg';


function Contact() {
    return (
        <div className="contact">

            <div className="contact__contanier">

                <div>
                    <img className="contact__img" src={ContactImage} alt="" />
                </div>

                <form className="contact__form" method="POST">
                    <div>
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" name="fullname" required placeholder="Enter Full Name" />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" required placeholder="mail@website.com" />
                    </div>

                    <div>
                        <label htmlFor="message">Message</label>
                        <textarea className="contact__textarea" rows="2" cols="10" required></textarea>

                    </div>

                    <div>
                        <button className="contact__btn" type="submit">Send</button>
                    </div>
                </form>
            </div>

            <div className="contact__btm">
                <div>
                    <FaAddressCard className="contact__icon" />
                    <p>98 Canal Street, Staten Island, New York, 10304</p>
                </div>

                <div>
                    <FaPhone className="contact__icon" />
                    <p>+(347)-891-0138</p>
                </div>

                <div>
                    <GrMail  className="contact__icon" />
                    <a href="mailto:aoyetibo@gmail.com">Aoyetibo@gmail.com</a>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Contact
