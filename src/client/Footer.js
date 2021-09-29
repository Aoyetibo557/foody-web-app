import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { GrFacebook, GrInstagram, GrSnapchat } from 'react-icons/gr';

function Footer() {
    return (
        <div className="footer">
            <div className="footer__container">
                <div>
                    {/* Social Media */}
                    <Link className="footer__link" to="/" >
                        <GrFacebook />
                    </Link>

                    <Link className="footer__link" to="/">
                        <GrInstagram />
                    </Link>

                    <Link className="footer__link" to="/">
                        <GrSnapchat />
                    </Link>
                </div>

                <div>
                    <p>&copy;  <strong>Foody</strong> African Store. All rights reserverd 2021.</p>
                </div>
            </div>

            
        </div>
    )
}

export default Footer
