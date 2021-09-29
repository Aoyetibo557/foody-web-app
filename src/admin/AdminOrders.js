import React, {useState, useEffect} from 'react';
import './AdminOrders.css';
import { BsSearch,BsArrowDown } from 'react-icons/bs';
import { Orders } from '../utils';
import { db } from '../backend/firebase';



function AdminOrders() {
    const [clickState, setClickState] = useState(false);
    const [paidOrders, setPaidOrders] = useState([]);
    const [declinedOrders, setDeclinedOrders] = useState([]);




    useEffect(() => {
        getAllOrders();
        getDeclinedOrders();
    },[])

    const getAllOrders = async() => {
        return await db.collection("Admin").doc("adminOrders").collection("orders").where("status", "==", "paid").onSnapshot((doc) => {
            const newArr = [];

            if(doc.empty){
                console.log("No Paid orders in DB")
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
                setPaidOrders(newArr);
            }
        })
    }

    const getDeclinedOrders = async() => {
        return await db.collection("Admin").doc("adminOrders").collection("orders").where("status", "==", "declined").onSnapshot((doc) => {
            const newArr = [];
            if(doc.empty){
                console.log("No declined orders in DB")
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
                setDeclinedOrders(newArr)
            }
        })
    }

    return (
        <div className="adminorders">
            <div className="orders__header">
                <h5>Orders</h5>
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

            <div className="sub__header">
                <input type="checkbox" name="orderCheck" />
                
                <label htmlFor="orderCheck" >#</label>

                <p>Date<BsArrowDown /></p>

                <p>Status</p>

                <p>Customer</p>

                <p>Purchased</p>

                <p>OrderType</p>
                
                <p>Revenue</p>

            </div>

            <div className = "orders__div">

                {paidOrders.map((data, idx) => (
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

                {declinedOrders.map((data, idx) => (
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
        </div>
    )
}

export default AdminOrders
