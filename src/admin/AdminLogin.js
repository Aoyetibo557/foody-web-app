/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import './AdminLogin.css';
import { BiKey } from 'react-icons/bi';
import { GoMail } from 'react-icons/go';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { auth, db } from '../backend/firebase';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';





function AdminLogin({setToken }) {
    
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPwd, setAdminPwd]= useState("");


    const history = useHistory();

    // error state handlers
    const [emailErr, setEmailErr] = useState("");
    const [pwdErr, setPwdErr] = useState("");

    const [loginErr, setLoginErr] = useState("");
    
    const adminEmailRef = useRef()
    const adminPasswordRef = useRef();

    // firestore ref
    const adminRef = db.collection("Admin").doc("admin-acct");

    
    useEffect(() => {

        console.clear();
        AOS.init({
            duration: 1000,
            easing: 'ease'
        });

    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        validateForm();
        getAdminAccount();
    }

    const getAdminAccount = async() => {
        setAdminEmail(adminEmail)
        
        try{
            const snapAcct = await db.collection("Admin").doc("admin-acct").get();
            console.log("snap:", snapAcct.data());

            if(snapAcct !== null || snapAcct.exists){
                if(snapAcct.data().email === adminEmail && snapAcct.data().password === adminPwd) {

                   
                    /**
                     * This is using the loginUser function built to retrieve
                     * data  from a local server in the app.
                     * refer to 'server.js' for more info.
                     * The token is gotten from the server.
                     * 
                     * Don't need it cause i created a doc in firebase to hold
                     * a special token.
                     * 
                     *  const token = await loginUser({
                            adminEmail,
                            adminPwd
                        })
                        setToken(token)
                     */
                    

                    /**
                     * Function below is called after the form has been validated in handleSubmit
                     * 
                     */
                    altLoginUser();

                    /**
                     * don't really need this line, i am rendering the components using a tenary operation
                     * but as a fail safe, let's leave it there for now.
                     */
                    history.push('/admin/dash'); 

                }else{
                    setLoginErr("Login Info Incorrect!")
                }
            }else{
                console.log("Couldn't find the data");
                setLoginErr("Could not find an Account with that email and password!")
            }
            
        }catch(err) {
            console.log(err);
            alert(err);
        }
    }


    /**
     *  this is working with a server file 'server.js' to get the token.
     *  Note server must be running for this work properly.
     * to start sever cd to server.js file location and enter node server.js
     * @param {*} credentials -{adminEmail, adminPwd}
     * @returns 
     */
    const loginUser = async (credentials) => {
        return fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then((data) => {
            console.log(">>", data.token);
            return data.token;
        })
        .catch((err) => {
            console.log("Error:", err)
        })

    }

    /**
     * trying to get Token from firestore database rather express server
     * access the collection 'Admin', then the doc 'appToken' then the value is save in token
     */
    const altLoginUser = () => {
        return db.collection("Admin").doc("appToken").onSnapshot((doc) => {
            
            doc.data();
            if(doc.data() !== null || doc.data()) {
                console.log("Admin Token Function Return", doc.data().token)
                
                // setting the token we got from  firestore in here as opposed to the login function for the express server
                setToken(doc.data().token); 
                return doc.data();
            }
        })
    }

    /**
     * This function is to validate the form.
     * It checks that the email is in the right format.
     * it also checks that the input fields aren't empty
     */
    const validateForm = () =>  {
        const reg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if(reg.test(adminEmail) === false) {
            setEmailErr("Email Field is Invalid!");
        }
        if(adminPwd.length === 0) {
            setPwdErr("Field can not be Empty!")
        }

    }

    return (
        <div className="adminlogin">
            <div className= "adminlogin__container" >
                <div>
                    <h5 className="h5">Admin Login Portal</h5>
                    <p className="formErr">{loginErr}</p>
                </div>
            <div>

            <form className="loginform-form" method = "POST">
                <div className="form__div">
                    <label className="label" htmlFor="email">Email*</label>
                    <div className="input__div">
                        <GoMail className="input-icon" />
                        <input 
                            type="text" 
                            name="email"
                            placeholder = "mail@website.com"
                            onChange = {(e) => setAdminEmail(e.target.value)}
                            ref = {adminEmailRef}
                            className="input"  
                            value = {adminEmail}
                            required
                        />
                    </div>
                   <p className="formErr">{emailErr}</p>

                </div>

                <div className="form__div">
                    <label className="label" htmlFor="user-pwd">Password*</label>
                    <div className="input__div">
                        <BiKey className="input-icon" />
                        <input 
                            type="password" 
                            name="user-pwd"
                            placeholder = "Min. 8 character"
                            onChange = {(e) => setAdminPwd(e.target.value)}
                            ref = {adminPasswordRef}  
                            className="input"
                            minLength="8"
                            value = {adminPwd}
                            required
                        
                        />
                    </div>
                    <p className="formErr">{pwdErr}</p>

                </div>

                <div className= "form__div-btm">
                    <div>
                        <input className="checkbox" type="checkbox" name="remember" />
                        <label className="label" htmlFor="checkbox">Remember Me</label>
                    </div>
                    <button className="formLink" to = "">Forgot Password</button>
                </div>

                <div>
                    <button onClick = {handleSubmit} className="formPri-btn">Login</button>
                </div>
            </form>
                </div>
           </div>
        </div>
    )
}

AdminLogin.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default AdminLogin
