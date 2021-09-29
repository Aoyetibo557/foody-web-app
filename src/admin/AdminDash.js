/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import "./AdminDash.css";
import {IoBagHandle, IoPeople } from 'react-icons/io5';
import { RiPieChart2Fill } from 'react-icons/ri';
import { IoIosCart } from 'react-icons/io';
import { BsDot } from 'react-icons/bs'
import Paper from '@material-ui/core/Paper';
import { Progress } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { db } from '../backend/firebase';
import { calculatePercentage, calculateRevenue } from '../utils/util';




function AdminDash() {
    const [charData, setData] = useState();
    const [paidOrders, setPaidOrders] = useState([]);

    const [allOrders, setOrdersLen] = useState(0);
    const [paidOrdersLen, setPaidLen] = useState(0);

    const [pendingLength, setPendingLength] = useState(0);
    const[cancelledLength, setCancelledLength] = useState(0);
    const[approvedLength, setApprovedLength] = useState(0);


    const [salesPercentage, setSalesPercentage] = useState(0);
    const [revenue, setRevenue] = useState(0);

    const ordersRef = db.collection("Admin").doc("adminOrders").collection("orders");


    useEffect(() => {
        console.clear()
        getPaidOrder()
        getAllOrders();
        setSalesPercentage(calculatePercentage(paidOrdersLen, allOrders))
        
    },[charData])

    const getAllOrders = async() => {
        return await ordersRef.onSnapshot((snap) => {
            if(snap.empty) {
                console.log("No document Found. All orders function")
            }else {
                console.log("All orders Length", snap.size);
                // console.log("AllOrders", snap.docs.filter(snap => snap.data().status === "pending").length)
                
                // Set the the length of the orders with the status pending in the database
                setPendingLength( snap.docs.filter(snap => snap.data().status === "pending").length)
                setCancelledLength( snap.docs.filter(snap => snap.data().status === "declined").length)
                setApprovedLength(snap.docs.filter(snap => snap.data().status === "approved").length)

                
                setOrdersLen(snap.size);
            }
        })
    }


    const getPaidOrder = async() => {

        return await ordersRef.where("status" , "==", "paid").onSnapshot((doc) => {
            const newArr = [];

            if(doc.empty){
                console.log("No Paid orders Available");
            }
            else {
                console.log("Length of:", doc.size);
                setPaidLen(doc.size)

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

                setRevenue(calculateRevenue(newArr))
                setPaidOrders(newArr);
            }
        })
    };



    return (
        <div className="admindash">
            <div className="dash__header">
                <h5>Dashboard</h5>
            </div>
            <h2>Overview</h2>

           <section className="dash__section">
                <div className="dashtop__container">
                    <div data-aos="zoom-in-down" data-aos-duration="1000" className="info-div">
                        <p>
                            <span><IoBagHandle /></span>
                            <span>+{salesPercentage}%</span>
                        </p>
                        <h4>${revenue}</h4>
                        <h6>Total Sales</h6>
                    </div>

                    <div data-aos="zoom-in-down" data-aos-duration="1500" className="info-div">
                        <p>
                            <span><RiPieChart2Fill /></span>
                            <span>+11%</span>
                        </p>
                        <h4>$890.00</h4>
                        <h6>Total Expenses</h6>
                    </div>

                    <div data-aos="zoom-in-down" data-aos-duration="2000" className="info-div">
                        <p>
                            <span><IoIosCart /></span>
                            <span>+{salesPercentage}%</span>
                        </p>
                        <h4>{allOrders}</h4>
                        <h6>Total Orders</h6>
                    </div>

                    <div data-aos="zoom-in-down" data-aos-duration="2500" className="info-div">
                        <p>
                            <span><IoPeople /></span>
                            <span>{calculatePercentage(allOrders, allOrders)}%</span>
                        </p>
                        <h4>{allOrders}</h4>
                        <h6>Total Visitors</h6>
                    </div>

                </div>

                <h2>Orders Summary</h2>
                <div className="order__summary">
                    <div>
                        <div className="order__summary-order">
                            <p>
                                <span className="num-lg">{paidOrdersLen}</span>
                                <span> <BsDot className="dot-icon" /> Paid</span>
                            </p>

                            <p>
                                <span className="num-lg">{approvedLength}</span>
                                <span> <BsDot className="dot-icon" />Approved</span>
                            </p>

                            <p>
                                <span  className="num-lg">{pendingLength}</span>
                                <span> <BsDot className="dot-icon" /> Pending</span>
                            </p>

                            <p>
                                <span  className="num-lg">{cancelledLength}</span>
                                <span> <BsDot className="dot-icon" /> Cancelled</span>
                            </p>
                        </div>

                        <div className="order__summary-progress">
                            <Progress strokeColor="midnightblue" data-aos="zoom-in-down" data-aos-duration="1000" type="circle" percent={calculatePercentage(paidOrdersLen, allOrders)} />
                            <Progress strokeColor="blue" status="success" data-aos="zoom-in-down" data-aos-duration="1500" type="circle" percent={calculatePercentage(approvedLength, allOrders)} />
                            <Progress strokeColor="orange" data-aos="zoom-in-down" data-aos-duration="2000" type="circle" percent={calculatePercentage(pendingLength, allOrders)} />
                            <Progress strokeColor="red" status="exception" data-aos="zoom-in-down" data-aos-duration="2000" type="circle" percent={calculatePercentage(cancelledLength, allOrders)} />

                        </div>


                    </div>

                    <div>
                        <h2>Order Status</h2>
                        <div style={{ width: 400 }}>
                            <span>Paid</span> <Progress data-aos="zoom-in-down" data-aos-duration="1000" percent={calculatePercentage(paidOrdersLen, allOrders)} strokeColor="midnightblue" size="large" status="active" />
                            <span>Approved</span> <Progress data-aos="zoom-in-down" data-aos-duration="1500" strokeColor="" percent={calculatePercentage(approvedLength, allOrders)} size="large" status="active" />
                            <span>Pending</span> <Progress data-aos="zoom-in-down" data-aos-duration="2000" strokeColor="orange" percent={calculatePercentage(pendingLength, allOrders)} size="large" status="active" />
                            <span>Cancelled</span> <Progress data-aos="zoom-in-down" data-aos-duration="2500" strokeColor="red" percent={calculatePercentage(cancelledLength, allOrders)} size="large" status="active" />

                        </div>
                    </div>

                </div>
           </section>
        </div>
    )
}

export default AdminDash
