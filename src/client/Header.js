/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Badge, Avatar } from 'antd';
import Bag from '../images/shopping-bag.png';
import { useStateValue } from '../StateProvider';
import { signOut } from '../utils/util';
import { db } from '../backend/firebase';

function Header({userToke}) {
    const [{userEmail}] = useStateValue();
    const [cartLen, setCartLen] = useState(0);

    useEffect(() => {
        console.log("userEmail in Header:", userEmail);
        // getUserCart();
    }, []);

    const getUserCart = () => {
        return db.collection("users").doc(userEmail).get((doc) => {
            if(doc.exists) {
                setCartLen(doc.data().cart?.length);
                return doc.data().cart?.length;
            }
        })
    }



    return (
        <nav className="header">
            <Link className="home__link" to="/">F<span className="colorRed">oo</span>dy</Link>
            
            <div className="header__nav">
                <Link className="header__link" to="/">Home</Link>
                <Link className="header__link" to="/shop">Shop</Link>
                <Link className="header__link" to="/about">About Us</Link>
                <Link className="header__link" to="/contact">Contact</Link>
            </div>

            <div className="header__nav" >
                <Link to="/cart">
                    <Badge className="header__badge" count={cartLen} >
                        <Avatar shape="square" size="large" src= {Bag} />
                    </Badge>
                </Link>

                {userEmail === null ? (
                    <div>
                        <Link className="header__btn" to="/login">Log In</Link>
                        <Link className="header__btn" to="/register">Sign Up</Link>
                    </div>
                ) : (
                    <div>
                        <p>{userEmail}</p>
                        <button className="header__btn" onClick = {() => signOut("user")}>Log Out</button>
                    </div>    
                )}
                

            </div>
        </nav>
    )
}

export default Header
