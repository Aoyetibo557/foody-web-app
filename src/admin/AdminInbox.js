/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect } from 'react';
import { db } from '../backend/firebase';
import { Message, MessageBox } from '../utils';
import './AdminInbox.css';
import MessageImage from '../images/message.png';
import Aos from 'aos';
import 'aos/dist/aos.css';




function AdminInbox() {
    const [allDocsObj, setDocsObj] = useState([]);;
    const [msgObj, setObj] = useState({});
    const [done, setDone] = useState(false);


    const docIds = [];

    let newObj = {
        date: new Date().toUTCString(),
        sender: 'lgadmin@gmail.com',
        read: false,
        name: 'Admin Account',
        message: `Welcome to Store Name, you can access messages from your users here, and recieve complaints or order issues. Goodluck and have a good shift. `,
        subject: 'Welcome Message'
    };


    useEffect(() => {
        console.clear();
        retrieveMessages();

        Aos.init({
            duration: 1000,
            easing: 'ease'
        })
        

    }, [])

    // const retrieveMessages = async() => {
    //     await db.collection("Admin").doc("messages").collection("adminMessages").onSnapshot((doc) => {
    //         doc.docs.map(collection => (
    //             // console.log(collection.id)
    //             docIds.push(collection.data())
    //         ))
    //         setDocsObj(docIds)
    //         console.log(docIds)
    //     })

    // }

    const retrieveMessages = async() => {
        return await db.collection("Admin").doc("messages").collection("adminMessages").onSnapshot((doc) => {
                 const newArr = [];

            if(doc.empty) {
                console.log("No Message in db!");
            }else {
                doc.forEach(coll => {
                    const {date, message, name, read, sender, subject } = coll.data()

                    newArr.push({
                        key:coll.id,
                        coll,
                        date, message, name, read, sender, subject
                    });
                });
                setDocsObj(newArr)
            }
        
        })
    
    }

    const setMsg = (e) => {
        console.log(allDocsObj[e]);
        setDone(true)
        setObj(allDocsObj[e])
        console.clear()
        setReadState();

    }

    const setReadState = async() => {
       
        const readRef = db.collection("Admin").doc("messages").collection("adminMessages").doc(msgObj?.sender);
        return await db.runTransaction((transaction) => {
            return transaction.get(readRef).then((doc) => {
                if(!doc.exists) {
                    console.log("Document does not exist!");
                }
                if(msgObj.read === false){
                    transaction.update(readRef, {read: true});
                    retrieveMessages()
                }
            })
        })
    }

    return (
        <div className="admin__inbox">
            <div className="inbox__header">
                <h5>Inbox</h5>
            </div>

            <section className="inbox__section"> 
                <div  className="inbox__section-left">
                
                    {allDocsObj.map(( item, idx) => (
                        <div data-aos="zoom-in" data-aos-duration="1500" onClick={() => setMsg(idx)}>
                            <Message key={idx}
                                id ={idx}
                                subject = {item.subject}
                                sender={item.sender}
                                date={item.date}
                                read={item.read}
                                msg= {item.message}
                            />
                        </div>
                    ))}
                </div>

                <div className="inbox__section-right" >
                   {done === true ? (
                        <MessageBox 
                            msgSender = {msgObj.sender}
                            msgName = {msgObj.name}
                            msgSubject = {msgObj.subject}
                            message = {msgObj.message}
                            msgDate = {msgObj.date}
                        />
                   ): (
                   <div className="emptyMsgState">
                       <img className="msg-img" src = {MessageImage} alt="messagePng" />
                        <p >Click on Message</p>
                   </div>
                   )}
                </div>
            </section>
        </div>
    )
}

export default AdminInbox
