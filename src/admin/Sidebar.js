/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import './Sidebar.css';
import { Link, useHistory } from 'react-router-dom';
import { GrAnalytics, GrTasks, GrInbox, GrTransaction, GrCart } from 'react-icons/gr';
import { MdDashboard } from 'react-icons/md';
import { IoMdMore } from 'react-icons/io';
import { IoWarning, IoSettingsOutline } from 'react-icons/io5'
import { Avatar } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import {db} from '../backend/firebase';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { signOut } from '../utils/util';
import Aos from 'aos';
import 'aos/dist/aos.css';




function Sidebar() {
    const [stState, setStState] = useState();
    const [selected, setSelected] = useState();
    const [adminErr, setAdminErr] = useState("");
    
    const [currName, setCurrName] = useState("");
    const [userEmail, setUserEmail] = useState("");


    // this is for the active feature on the links
    const location = useLocation();
    const { pathname } = location; //deconstructing pathname from lcation
    const splitLocation = pathname.split('/');


    var adminRef = db.collection("Admin").doc("store");
    const history = useHistory();

    useEffect(() =>{
        console.clear();
       
        getAcctDetail();

        Aos.init({
            duration: 1000,
            easing: 'ease'
        })
    },[])

    const linkFunction = () => {

    }

    const getStoreState = () => {
        try{

            adminRef.onSnapshot((doc) => {

                if(doc.exists) {
                    setStState(doc.data().storeState);
                    setSelected(doc.data().storeState);

                    console.log("Get Transaction Successfull!")
                }else{
                    console.log("Document No Longer Exists!")
                }
               
            })
            
        }catch(error) {
            console.log(error)
            setAdminErr(error);
        }
    }



    /**
     * This is to set the store state in the database
     */
    const setStoreState = async() => {
        console.clear();
        setStState(!stState);

        return await db.runTransaction((transaction) => {
            return transaction.get(adminRef).then((doc) => {
                if(!doc.exists) {
                    console.log( "Document does not exist!");
                }else if(doc.exists){
                    console.log(">>", doc.data().storeState, stState); 

                        /**
                         * if state true, store is open, else if the storeState, the store is set to closed
                         */

                    if(stState === true) { 
                        transaction.update(adminRef, {storeState: false});
                    }
                    else{
                        transaction.update(adminRef, {storeState: true});
                    }
                }

            });
        }).then(() => {
            console.log("Transaction Successfully completed!");
        }).catch((error) => {
            console.log("Transaction Failed!", error);
            setAdminErr(error);
        });


    }

    const getAcctDetail = () => {
        getStoreState();

        const adminuserRef = db.collection("Admin").doc("admin-acct");

        adminuserRef.onSnapshot((doc) => {
            doc.data();

            if(doc.data() == null || doc.data()){
                setCurrName(doc.data().Name)
                setUserEmail(doc.data().email)
                console.log("Current User", currName)

            }
        })
    }


    return (
        <div className="sidebar">
            <p>{adminErr}</p>
            <div  className="sidebar-top">
                    <Link onClick = {linkFunction}  className={splitLocation[2] === "dash" ? "sidebar__link active " : "sidebar__link "} to="/admin/dash"> <MdDashboard /> Dashboard</Link>
                    <Link onClick = {linkFunction}  className={splitLocation[2] === "inbox" ? "sidebar__link active" : "sidebar__link"} to="/admin/inbox"> <GrInbox /> Inbox</Link>
                    <Link onClick = {linkFunction}  className={splitLocation[2] === "orders" ? "sidebar__link active" : "sidebar__link"} to="/admin/orders"> <GrCart /> Orders</Link>
                    <Link onClick = {linkFunction}  className={splitLocation[2] === "transc" ? "sidebar__link active" : "sidebar__link"} to="/admin/transc"> <GrTransaction /> Transactions</Link>
                    <Link onClick = {linkFunction}  className={splitLocation[2] === "tasks" ? "sidebar__link active" : "sidebar__link"} to="/admin/tasks"> <GrTasks /> Tasks</Link>
                    <Link onClick = {linkFunction}  className={splitLocation[2] === "ana" ? "sidebar__link active" : "sidebar__link"} to="/admin/ana">  <GrAnalytics /> Analytics</Link>
                    <button onClick = {() => signOut("admin")} className="sidebar-btn">Log Out</button>
            </div>
            <div className="sidebar-mid__container">
                    <div className="status__div">
                        <HiOutlineStatusOnline className="status-icon" />
                        <p className="storeState">Store Status - {stState === true ? "Open" : "Closed"}</p>
                    </div>
                    <span className="mid-span">Double Click Toggle button below to set the store status</span>
                    
                    <div onClick = {setStoreState} >
                        <Switch onClick = {setStoreState} checkedChildren={stState === false ? "open" : "close"} unCheckedChildren={stState === true ? "close" : "open"} defaultChecked />
                    </div>
                    
                    <div className="sidebar-mid">
                        <h5> <IoWarning /> Admin Notes </h5>
                        <p>
                            Store items need to be updated. New items also need to be added to the store.
                        </p>
                    </div>
            </div>
            <div className="sidebar-user">
            {/* user info */}
            {/* Using an api call to create src for avatars */}
                <Avatar src= {`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${currName}`} />
                <p className = "adminName"> 
                    <span className="adminName__name">
                        {currName}
                        </span> 
                        <span className="adminName__email">
                            {userEmail}
                        </span>
                    </p>
                    <Link onClick = {linkFunction}  className={splitLocation[2] === "sett" ? "sidebar__link active" : "sidebar__link"} to="/admin/sett">  <IoSettingsOutline /></Link>
            </div>
        </div>
    )
}

export default Sidebar
