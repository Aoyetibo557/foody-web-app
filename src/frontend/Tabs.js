/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import './Tabs.css';
import { FaPen } from 'react-icons/fa';
import {IoNotifications} from 'react-icons/io5';
import { RiLockPasswordFill, RiAccountCircleFill } from 'react-icons/ri';
import { db } from '../backend/firebase';
import Aos from 'aos';
import 'aos/dist/aos.css'


function Tabs() {
    const [tabState, setTabState] = useState(1);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [acctEmail, setAcctEmail] = useState("");
    const [acctPwd, setAcctPwd] = useState("");
    const [confAcctPwd, setConfPwd] = useState("")

    const [err, setErr] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [pwdSucMsg, setPwdSucMsg] = useState("");

    const [masterAcct, setMasterAcct] = useState(false);

    /**
     * New profile state managers
    */
   const[newName, setNewName] = useState("");
   const[newFirstName, setNewFirstName] = useState("");
   const[newLastName, setNewLastName] = useState("");
   const[newEmail, setNewEmail] = useState("");
   const[newPhone, setNewPhone] = useState("");
   const[newPwd, setNewPwd] = useState("");


    const acctRef = db.collection("Admin").doc("admin-acct");


    useEffect(() => {
        console.log(confAcctPwd)
        console.clear();
        Aos.init({
            duration: 1000,
            easing: 'ease'
        })
        getAdminAcct();
        console.log("tabState:", tabState);
       
    },[])

    const toggleTab = (tabIndex) => {
        setTabState(tabIndex);
    }

    const getAdminAcct = () => {
        return db.collection("Admin").doc("admin-acct").onSnapshot((doc) => {
           if(doc.data() == null || !doc.data()) {
                setErr("Error retrieving account details!");
           }
           else{
               console.log(doc.data().email);
                setAcctEmail(doc.data().email);
                setFirstName(doc.data().firstname);
                setLastName(doc.data().lastname);
                setPhone(doc.data().phNo);
                setAcctPwd(doc.data().password);
                setMasterAcct(doc.data().masterAcct);
           }
        })
    }
    
    const handleClick = (e) => {
        e.preventDefault()

        if(tabState === 1) {
            updateAcct();
        }
        else if(tabState === 4) {
            setNewName(newFirstName + " " + newLastName);
            createNewAcct();
        }
    }

    const updateAcct = () => {
        return db.runTransaction((transaction) => {
            return transaction.get(acctRef).then((doc) => {
                if(!doc.exists){
                    console.log("Document does not exist!");
                    setErr("Error retrieving account details")
                }
                else if(tabState === 1) {
                    console.log("Perfoming this");

                    return transaction.update(acctRef, {
                        email: acctEmail, firstname: firstName, lastname: lastName, password: acctPwd , phNo: phone
                    });
                    
                }
                else if(tabState === 3) {
                    transaction.update(acctRef, {password: acctPwd});
                    setPwdSucMsg("Password Update Successfully Completed!")
                }
            });
        }).then(() => {
            // console.log("Account Update Successfully Completed!")
            setSuccessMsg("Account Update Successfully Completed!");

        }).catch((error) => {
            // console.log("An error occured while updating password!", error.message);
            setErr("An error occured while updating!", error.message)
        })
    };

    const createNewAcct = async() => {
        const newAcctRef = await db.collection("Admin").doc(newEmail).get();

        if(newAcctRef === null || !newAcctRef.exists){
            db.collection("Admin").doc(newEmail).set({
                Name: newName,
                email: newEmail,
                firstname: newFirstName,
                lastname: newLastName,
                password: newPwd,
                phNo: newPhone
            }).then(() => {
                console.log("New Admin Profile created!");
                setNewName("");
                setNewFirstName("");
                setNewLastName("");
                setNewEmail("");
                setNewPwd("");
                setNewPhone("");
            }).catch((error) => {
                console.log("Error Creating new Profile!");
                alert("Error Creating new Profile!", error.message);
            })
        }else{
            console.log("A Profile with that email already exists!");
        }
    }


    return (
        <div className="tab">
            <div data-aos ="fade-in-left" data-aos-duration="2000" className="tab__header">
                <button className = {tabState === 1 ? "contentTab active-tabs" : "contentTab"} onClick = {() => toggleTab(1)}> <FaPen className="tab-icon" /> Edit Profile</button>
                <button className = {tabState === 2 ? "contentTab active-tabs" : "contentTab"} onClick = {() => toggleTab(2)}> <IoNotifications /> Notifications</button>
                <button className = {tabState === 3 ? "contentTab active-tabs" : "contentTab"} onClick = {() => toggleTab(3)}> <RiLockPasswordFill/> Password & Security</button>
                <button className = {tabState === 4 ? "contentTab active-tabs" : "contentTab"} onClick = {() => toggleTab(4)}> <RiAccountCircleFill /> Create New Admin Profile</button>
            </div>

            <div data-aos = "zoom-in-up" className="tab__contents">
                <div className = {tabState === 1 ? "content active-content" : "content"}>
                    <h5>Edit Profile</h5>
                    {successMsg ? <p>{successMsg}</p> : <p>{err}</p>}

                    <div className="tabform__div">
                    
                        <form className="tab-form" method="POST">
                            <div>
                                <label htmlFor="firstname">First Name</label>
                                <input type="text" name="firstname" onChange = {(e) => setFirstName(e.target.value)} value={firstName} required />
                            </div>

                            <div>
                                <label htmlFor="lastname">Last Name</label>
                                <input type="text" name="lastname" onChange={(e) => setLastName(e.target.value)} value={lastName} required />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" onChange = {(e) => setAcctEmail(e.target.value)} value={acctEmail} />
                            </div>

                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" maxLength="10" min="10" name="phone" onChange = {(e) => setPhone(e.target.value)} value={phone} />
                            </div>

                            <div>
                                <label htmlFor="user-pwd">Password</label>
                                <input type="password" name="user-pwd" onChange = {(e) => setAcctPwd(e.target.value)} value={acctPwd} />
                            </div>

                            <div>
                                <button onClick = {handleClick} className="btn">Update</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Notification */}
                <div className = {tabState === 2 ? "content active-content" : "content"} >
                    <p>No Notification setting found</p>
                </div>

                {/* password & security */}
                <div className = {tabState === 3 ? "content active-content" : "content"} >
                    {pwdSucMsg ? <p>{pwdSucMsg}</p> : <p>{err}</p>}

                    <form className="tab-form" method="POST">
                        <div>
                            <label htmlFor="user-pwd">Password</label>
                            <input type="password" onChange = {(e) => setAcctPwd(e.target.value)} name="user-pwd" value={acctPwd} />
                        </div>

                        <div>
                            <label htmlFor="conf-pwd">Confirm Password</label>
                            <input type="password" name="conf-pwd" onChange ={(e) => setConfPwd(e.target.value)} value={acctPwd} />
                        </div>

                        <div>
                            <button onClick = {handleClick} className="btn">Update</button>
                        </div>
                    </form>
                </div>

                {/* Create new Account */}
                <div className = {tabState === 4 ? "content active-content tabform__div" : "content"}>
                   {masterAcct === true ? (
                        <form className="tab-form" method="POST">
                            <div>
                                <label htmlFor="firstname">First Name</label>
                                <input type="text" name="firstname" onChange = {(e) => setNewFirstName(e.target.value)} value={newFirstName} required />
                            </div>

                            <div>
                                <label htmlFor="lastname">Last Name</label>
                                <input type="text" name="lastname" onChange={(e) => setNewLastName(e.target.value)} value={newLastName} required />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" onChange = {(e) => setNewEmail(e.target.value)} value={newEmail} />
                            </div>

                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" maxLength="10" min="10" name="phone" onChange = {(e) => setNewPhone(e.target.value)} value={newPhone} />
                            </div>

                            <div>
                                <label htmlFor="user-pwd">Password</label>
                                <input type="password" name="user-pwd" onChange = {(e) => setNewPwd(e.target.value)} value={newPwd} />
                            </div>

                            <div>
                                <button onClick = {handleClick} className="btn">Create New Profile</button>
                            </div>

                    </form>


                   ):(
                       <h3>Sorry this Profile cant create a new Admin Account!</h3>
                   )}
                </div>

            </div>

        </div>
    )
}

export default Tabs
