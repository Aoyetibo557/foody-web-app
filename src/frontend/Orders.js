import React, { useState, useEffect } from 'react';
import './Orders.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import { db } from '../backend/firebase';



function Orders({orderNo, date, status, customer, orderItems, revenue, orderType, address}) {
    const [orderState,setOrderState] = useState();

    useEffect(() => {
        // console.clear();
        AOS.init({
            duration: 1000,
            easing: 'ease'
        })

        console.log("OrderState", orderState)

    },[orderState])

    const approveOrder = () => {
        // console.log("order Approved");
        setOrderState("approved");
        setApproveStatus();

    }

    const declineOrder = () => {
        // console.log("Orderdeclined")
        setOrderState("declined");
        setDeclineStatus()
    }

    const setApproveStatus = async() => {
        console.clear();
        const ordersRef = db.collection("Admin").doc("adminOrders").collection("orders").where("orderId", "==", orderNo);
        

        return await ordersRef.get().then((snap) => {
            snap.forEach((doc) => {
                if(doc.exists === false) {
                    console.log("Error Updating Status!")
                }
                doc.ref.update({status: "approved"})
               
            })
        }).then(() => {
            console.log("Approved Status Update Transaction Successfull!")
        }).catch((error) => {
            console.log("Error Updating Status!", error.message);
        })
    }

    const setDeclineStatus = async() => {
        console.clear();
        const ordersRef = db.collection("Admin").doc("adminOrders").collection("orders").where("orderId", "==", orderNo);
        

        return await ordersRef.get().then((snap) => {
            snap.forEach((doc) => {
                if(doc.exists === false) {
                    console.log("Error Updating Status!")
                }
               
                    doc.ref.update({status: "declined"})
            })
        }).then(() => {
            console.log("Decline Status Update Transaction Successfull!")
        }).catch((error) => {
            console.log("Error Updating Status!", error.message);
        })

    }

    return status === "paid" ||status ==="declined" ? (
        <div data-aos="fade-down" data-aos-duration="1000" className="orders">
            <input type="checkbox" name="ordercheck" />

            <p>#orderID-{orderNo}</p>

            <p>{date}</p>

            <p className="status">
                {status === "declined" ?   <span> <IoIosCloseCircleOutline className="declineIcon" /> {status} </span>: <span><IoIosCheckmarkCircleOutline className="order-checkIcon" /> {status} </span>}
            </p>

            <p>{customer}</p>

            <p>{orderItems}</p>

            <p>{orderType}</p>

            <p>${revenue}</p>
        </div>
    ) :(
        status === "pending" ? (
            <div data-aos="fade-up" data-aos-duration="1000" className="orders__pending">
                <p className="order-span">
                    <span className="span">orderID-{orderNo}</span>
                    <span>{customer}</span>
                </p>

                <p className="order-span">
                    <span className="span">order-date</span>
                    <span>{date}</span>
                </p>

                <p className="order-span">
                    <span className="span">{orderType}</span>
                    <span>{address}</span>
                </p>

                <p className="order-span">
                    <span className="span">order-items</span>
                    <span>{orderItems},</span>
                </p>

                <p className="orders__revenue">${revenue}</p>

                {!orderState ? (
                    <div>
                        <button type="submit" value="approved" onClick= {approveOrder} className="orders__btn">Accept Order</button>
                        <button type="submit" value="declined" onClick= {declineOrder} className="orders__btn">Decline Order</button>
                    </div>
                ):(
                    orderState === "approved" ? <p>Approved</p> : <p>Declined</p>
                )}

                
            </div>
        ):(

            // Approved State
           <div data-aos="zoom-in-down" data-aos-duration="1000" className="orders__pending">
                <p className="order-span">
                    <span className="span">orderId-{orderNo}</span>
                    <span>{customer}</span>
                </p>

                <p className="order-span">
                    <span className="span">order-date</span>
                    <span>{date}</span>
                </p>

                <p className="order-span">
                    <span className="span">{orderType}</span>
                    <span>{address}</span>
                </p>

                <p className="order-span">
                    <span className="span">order-items</span>
                    <span>{orderItems}</span>
                </p>

                <p className={status === "approved" ? "orders__revenue approved" : "orders__revenue" } >${revenue}</p>

                <p>Waiting on Payment</p>
                
            </div>
        )
        

    )
}

export default Orders
