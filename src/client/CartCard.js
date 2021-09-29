import React, {useEffect, useState } from 'react';
import './CartCard.css';
import { db } from '../backend/firebase';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import firebase from 'firebase';


function CartCard({ val }) {
    const [obj, setObj] = useState({})
    const [quant, setQuant] = useState(1);

    useEffect(() => {
       retrieveData();
    }, [])


        const getSessionId = () => {
            var session_id = /SESS\w*ID=([^;]+)/i.test(document.cookie) ? RegExp.$1 : false;
            return session_id;
        }

    const retrieveData = () => {
        db.collection("products").doc(val).onSnapshot((snap) => {
            setObj(snap.data());
        })
    }

    const removeData = () => {
        db.collection("sessionCart").doc(getSessionId()).update({
            ids: firebase.firestore.FieldValue.arrayRemove(val)
        })
    }

    return (
        <div className= "cartcard" >
            <div className="cartcard__container">
                <div className="left-div">
                    <img className="cartcard__img" src={obj.img} alt={obj.name} />
                    <div className="cartcard__info">
                        <h4 className="cartcard__name"> {obj?.name}</h4>
                        <p className="cartcard__cat">{obj.category}</p>
                        <Rating value={`${obj.rating}`} readOnly/>
                        <p className="cartcard__weight"><span className="weight__span">Weight</span>: {obj?.size}</p>
                        <p className="cartcard__weight"><span className="weight__span" >Quantity: </span> {quant }</p>
                        <p className="cartcard__links">
                            <span>
                                <Link className="cartcard__link" to="/">Edit</Link>
                            </span>
                                |
                            <span>
                                <button onClick={removeData} className="cartcard__link" type="button" >Delete</button>
                            </span>
                                |
                            <span>
                                <Link className="cartcard__link" to="/">Move to Wishlist</Link>
                            </span>
                        </p>
                    </div>
                </div>

                <div className="right-div">
                    <input className="cartcard__input" type="number" value={quant} onInput={(e) => setQuant(e.target.value)} placeholder="1" />
                    <p className="cartcard__price" > ${ obj.price} </p>
                </div>
            </div>
        </div>
    )
}

export default CartCard
