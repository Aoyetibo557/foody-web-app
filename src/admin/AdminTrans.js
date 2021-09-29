/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import './AdminTrans.css';
import { BsSearch } from 'react-icons/bs';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Orders } from '../utils';
import { db } from '../backend/firebase';
import { IoMdCart } from 'react-icons/io'


function AdminTrans() {
    const [clickState, setClickState] = useState(false);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [paidOrders, setPaidOrders] = useState([]);
    const [approvedOrders, setApprovedOrders] = useState([]);

    const ordersRef = db.collection("Admin").doc("adminOrders").collection("orders");

    useEffect(() => {
        console.clear();
        Aos.init({
            duration: 1000,
            easing: 'ease'
        })

        getPendingOrders();
        getPaidOrder();
        getApprovedOrders();
        
    }, []);

    const getPendingOrders = async() => {
        return await ordersRef.where("status", "==", "pending").onSnapshot((doc) => {
            const newArr = [];

            if(doc.empty) {
                console.log("No Pending Orders!")
            }
            else{
                doc.forEach(coll => {
                const {address, customer, date, orderId, orderItems, orderType, revenue, status} = coll.data();

                newArr.push({
                    key: coll.id,
                    coll,
                    address,
                    customer,
                    date,
                    orderId, orderItems, orderType, revenue, status

                });
            });
                setPendingOrders(newArr);
            }

        })
    }

    const getApprovedOrders = async() => {
        return await ordersRef.where("status", "==", "approved").onSnapshot((doc) => {
            const newArr = [];

            if(doc.empty) {
                console.log("No Approved Orders!")
            }else {
                doc.forEach(coll => {
                    const {address, customer, date, orderId, orderItems, orderType, revenue, status} = coll.data();

                    newArr.push({
                        key: coll.id,
                        coll,
                        address,
                        customer,
                        date,
                        orderId, orderItems, orderType, revenue, status

                    });
                });
            setApprovedOrders(newArr);
            }
        })
    }

    

    const getPaidOrder = async() => {
        console.log("Paid Ordersb4 function call", paidOrders)
        return await ordersRef.where("status" , "==", "paid").onSnapshot((doc) => {
            const newArr = [];

            if(doc.empty){
                console.log("No Paid orders Available")
            }
            else {
                doc.forEach(coll => {
                    const {address, customer, date, orderId, orderItems, orderType, revenue, status} = coll.data();

                    newArr.push({
                        key: coll.id,
                        coll,
                        address,
                        customer,
                        date,
                        orderId, orderItems, orderType, revenue, status

                    });
                });

                setPaidOrders(newArr);
            }
        })

    }


 

    return (
        <div className="transc">
            <div className="transc__header">
                <h5>Transactions</h5>
                <div>
                    {clickState === true ? (
                        <div  className="search__sett" >
                            <input className="search-input" type="text" name="search" placeholder="Search Orders, Order Status" />
                            <BsSearch  className="searchIcon" onClick = {() => setClickState(!clickState)} />
                        </div>
                    ):(
                        <BsSearch className="searchIcon" onClick = {() => setClickState(!clickState)} />
                    )}
                </div>
            </div>

            <section className="transc__section"> 
                <div className="transc__div">
                    <h4>Pending Orders</h4>

                   {pendingOrders.length !== 0 ? 
                        <div>
                            {pendingOrders.map((data, idx) => (
                                <Orders 
                                    key={idx}
                                    orderNo = {data.orderId}
                                    date = {new Date(data?.date?.seconds).toLocaleDateString()}
                                    status = {data.status}
                                    customer = {data.customer}
                                    address = {data.address}
                                    orderType= {data.orderType}
                                    revenue = {data.revenue}
                                    orderItems = {data.orderItems.join(", ")}
                                />
                            ))}
                        </div>
                   :(
                       <div  data-aos="zoom-in-up" data-aos-duration="1000" className="empty-transc__div">
                           <IoMdCart className="cart-icon" />
                           <p>No Pending Orders Found!</p>
                       </div>
                   )
                   
                }

                </div>

                <div className="transc__div">
                    <h4>Approved Orders </h4>
                    
                   {approvedOrders.length !== 0 ? 
                        <div>
                            {approvedOrders.map((data, idx) => (
                                <Orders 
                                    key={idx}
                                    orderNo = {data.orderId}
                                    date = {new Date(data?.date?.seconds).toLocaleDateString()}
                                    status = {data.status}
                                    customer = {data.customer}
                                    address = {data.address}
                                    orderType= {data.orderType}
                                    revenue = {data.revenue}
                                    orderItems = {data.orderItems.join(", ")}
                                />
                            ))}

                        </div> : 
                        <div data-aos="zoom-in-down" data-aos-duration="1000" className="empty-transc__div">
                            <IoMdCart className="cart-icon"/> 
                            <p>No Approved Orders!</p>
                        </div>
                    }
                </div>

            </section>
            
        </div>
    )
}

export default AdminTrans
