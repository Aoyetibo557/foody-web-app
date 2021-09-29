/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { db } from '../backend/firebase';
import Rating from '@mui/material/Rating';
import './ProductDetails.css';
import firebase from 'firebase';
import  { FiPlus } from 'react-icons/fi';
import SkeletonDetailCard from '../skeleton/SkeletonDetailCard';
import Loader from '../frontend/Loader';





function ProductDetails() {
    const [details, setDetails] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [firstState, setFirstState] = useState(false);
    const [secondState, setSecondState] = useState(false);
    const [thirdState, setThirdState] = useState(false);

    const [tempState, setTempState] = useState(false);

    const [load, setLoader ] = useState(false);

    let { id }  = useParams();
    const newId = id;
    const history = useHistory();

    const productRef = db.collection("products");

    useEffect(() => {
        if(id === null) {
            history.push("/shop")
        }else{
            setTimeout(() => {
                setTempState(true)
                getProductDetails();

            },3000)
        }

        if(load === true) {
            setTimeout(() => {
                setLoader(false)
            },5000)
        }
    }, [load])

    const getProductDetails = () => {
        productRef.where(firebase.firestore.FieldPath.documentId(), "==", newId.slice(3, 23)).onSnapshot((doc) => {
            if(doc.empty) {
                console.log("No Documnet found !")
            }else {
                doc.forEach(coll => {
                    console.log(coll.data())
                    setDetails(coll.data())
                })
            }
        })
    }

    const addToCart = () => {
        setLoader(true)
        history.push(`/cart/${id}`)
    }



    return (
        <div className="productdetails" >
            {load && (
                <Loader />
            )}
            {tempState ===false ? (
                <SkeletonDetailCard />
            ): (
                <div className="productdetails__container">
                    <img className="details__img" src={details.img} alt={details.name} />
                    
                    <div className="details">
                        <h4 className="details__title">{details.name} <span className="details__size">{details.size}</span> </h4>
                        <div className="line"></div>
                        <p className="details__price">${details.price}</p>
                        <p className="details__rating"> 
                        <Rating name="product-rating" value={`${details.rating}`} readOnly />
                            {/* 8 reviews */}
                        </p>
                        <p className="details__descp">{details.descp}</p>
                        <div className="details__div">
                            <label htmlFor="detail-input">Quantity</label>
                            <input className="details__input" name="detail-imput" value={quantity} onChange={(e)=> setQuantity(e.target.value)} type="number" placeholder="1" />
                        </div>
                        <p className="details__storequantity">{details.quantity} left in store</p>

                        <div className="details__btns-container">
                            <button onClick={addToCart} className="details__btn">Add to Cart</button>
                            <button className="details__btn">Buy Now</button>
                        </div>


                        <div className="details__info">
                            <div>
                                <p>Ingredients <span onClick = {() => setFirstState(!firstState)}> <FiPlus /> </span> </p>
                                {firstState && (
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                )}
                            </div>

                            <div>
                                <p>Benefits & How To Use <span onClick = {() => setSecondState(!secondState)}> <FiPlus /> </span> </p>
                                {secondState && (
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                )}
                            </div>

                            <div>
                                <p>Nutritional Value <span onClick = {() => setThirdState(!thirdState)}> <FiPlus /> </span> </p>
                                {thirdState && (
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
            </div>
            )}
           
        </div>
    )
}

export default ProductDetails
