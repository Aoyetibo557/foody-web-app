/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { db } from '../backend/firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';
import "./Cart.css";
import CartCard from './CartCard';
import { Link } from 'react-router-dom';

function Cart() {
    const [{user, userEmail}] = useStateValue();

    const [cartItems, setCart] = useState([]);
    const [cartLen, setCartLen] = useState(0);

    let { id } = useParams();
    var newId = id;

    useEffect(() => {
        console.clear();
       
        // decider();
        getUserCart();
        console.log("user", user, userEmail)
    },[]);

    
    const decider = () => {
        if(sessionStorage.getItem("userEmail") !== null) {
            getUserCart();
            console.log("Done")
        }else{
            getEmptyCart()
        }
    }

   
    const createSessionId = (days) => {
        const ID = '_'+Math.random().toString(36).substr(0,100);
        var date, expires;
        if(days) {
            date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toGMTString();
        }else{
            expires = "";
        }
        return document.cookie = "foody-sess_id" + "=" + ID + expires + "; path=/";
    }

    const addToCart = async(sessionId) => {
        var valId = newId.slice(3, 23);
        var sessionCartRef = db.collection("sessionCart").doc(sessionId);
        
        return await db.runTransaction((transaction) => {
            return transaction.get(sessionCartRef).then((doc) => {
                const newCart = doc.get('ids');
                if(newCart.includes(valId)) {                    
                }
                else {
                    newCart.push(valId);
                    transaction.update(sessionCartRef, 'ids', newCart);

                }
            })
        })

    }


    const getEmptyCart = () => {
        const newCart = []
        setCart(cartItems.length)
    }


    const getUserCart = async() => {
        // check if there is a session user
        var currentUser = sessionStorage.getItem("userEmail");
        if(userEmail !== null) {
            await db.collection("users").doc(user).get().then((doc) => {
                console.log(doc.data().cart)
                setCart(doc?.data()?.cart)
            })
        }
    }

   
    return (
        <div className="cart">

            {cartItems?.length !== 0 ?(
                <div className="cart__container">
                    <div className="cart__header">
                        <h3 className="cart__h3"> Your Cart <span className="cart__span"> {cartItems.length} Items</span></h3>
                        <Link to="/shop">Continue shopping</Link>
                    </div>

                    <div>
                        {cartItems.map(itm => (
                            <CartCard val={itm} />
                        ))}
                    </div>
                    
                </div>
            ):(
                <div>
                    <h4>Your Shopping Cart</h4>
                    <p>It seems there isn't anything here as of right now.</p>
                    <Link to="/shop">
                        Go Shop
                    </Link>
                </div>
            ) }
          

          
        </div>
    )
}

export default Cart