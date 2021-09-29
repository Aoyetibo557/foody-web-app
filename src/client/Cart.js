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
    const [cartItems, setCart] = useState([]);
    const [cartLen, setCartLen] = useState(0);

    let { id } = useParams();
    var newId = id;

    useEffect(() => {
        console.clear();
        // id ? (
        //     createSessionCart(getSessionId())
        // ):(
        //     getUserCart(getSessionId())
        // )
        // if(getSessionId() === "")
        // console.log("here", createSessionId(4));
      setDirection();
    },[]);

    const setDirection = () => {
        console.log("sessid", getSessionId())

        
        if(newId === undefined) {
            console.log("Empty", id);
            if(getSessionId() === false) {
                createSessionId(20)
                createSessionCart(getSessionId());
                console.log("session id empty")
            }
            // getUserCart(getSessionId());

        }else{
            console.log("Not Empty!!", id)
            if(getSessionId() === false) {
                createSessionId(20)
                console.log("session id empty")
                createSessionCart(getSessionId());
            }else{
                createSessionCart(getSessionId());
                getUserCart(getSessionId());
            }
           
        }
    }

    const getSessionId = () => {
        var session_id = /SESS\w*ID=([^;]+)/i.test(document.cookie) ? RegExp.$1 : false;
        return session_id;
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

    const createSessionCart = async(sessionId) => {
        const dbRef = db.collection("sessionCart").doc(sessionId);
        const doc = await dbRef.get()

        if(!doc.exists) {
            dbRef.set({
                ids: [],
            }).then(() => {
                console.log("Documnet Created!");
                addToCart(sessionId)
            })
        }else{
            addToCart(sessionId);
        }
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


    const getUserCart = (sess_id) => {
        const newCart = []
        db.collection("sessionCart").doc(sess_id).onSnapshot((doc) => {
            // console.log(doc.data().ids);            
            newCart?.push(doc.data().ids);
            setCart(doc.data().ids);
            setCartLen(cartItems.length)

        })
    }

    const getEmptyCart = () => {
        const newCart = []
        setCart(cartItems.length)
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