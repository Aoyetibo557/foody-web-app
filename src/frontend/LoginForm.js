/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './LoginForm.css';
import { BiKey } from 'react-icons/bi';
import { GoMail } from 'react-icons/go';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { db } from '../backend/firebase';
import { FcGoogle } from 'react-icons/fc';
import Image from '../images/loginImage.jpg';
import {auth, provider} from '../backend/firebase';
import PropTypes from 'prop-types';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';



function LoginForm({setUToken}) {
    const [{userEmail}, dispatch] = useStateValue();


    const [email, setEmail] = useState();
    const [pwd, setPwd]= useState("");

    const history = useHistory();


    // error state handlers
    const [emailErr, setEmailErr] = useState("");
    const [pwdErr, setPwdErr] = useState("");

    const [loginErr, setLoginErr] = useState("");
    
    const emailRef = useRef()
    const passwordRef = useRef();

    useEffect(() => {
        console.clear();
        AOS.init({
            duration: 1000,
            easing: 'ease'
        });
    },[])

 
    const validateForm = () =>  {
        const reg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if(reg.test(email) === false) {
            setEmailErr("Email Field is Invalid!");
        }
        if(pwd.length === 0) {
            setPwdErr("Field can not be Empty!")
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        validateForm();
        getAccount();
    }

    const signInWithGoogle = (ev) => {
        ev.preventDefault();

        auth.signInWithPopup(provider)
        .then((result) => {
            console.log(result);
        }).catch((error) => {
            alert(error.message)
        });
    }

    // login function
    const getAccount = async() => {

        try{
            const snap = await db.collection("users").doc(email).get();
            if(snap !== null || snap.exists) {
                if(snap.data().UserPwd === pwd) {
                    // alert("User and Password Match!");
                    
                    userLogiin();
                    sessionStorage.setItem("userEmail", email); //save userEmail in session storage

                    dispatch({
                        type: actionTypes.SET_USER,
                        userEmail: email,
                    })

                    history.push("/")
                }
                else{
                    setLoginErr("Wrong Password or Email Entered!");
                }
            }else{
                setLoginErr("Account with that email doesn't exist!");
            }
        }catch(error) {
            setLoginErr("Error Logging Into Account!");
        }
        
    }


    const userLogiin = () => {
        // console.clear();
        return db.collection("Admin").doc("userToken").onSnapshot((doc) => {
            doc.data();

            if(doc.data() !== null || doc.data()) {
                console.log("The user token return:", doc.data().token);
                
                setUToken(doc.data().token);
                
                return doc.data();
            }
        })
    }

    return (
        <div className="login">
           <div className="login__container">
                <div data-aos="fade-right" data-aos-duration="3000">
                    <img className="login__img" src= {Image} alt ="loginpic" />
                </div>

                <div data-aos ="fade-left" data-aos-duration="3000" className="login__right">
                    <h5>Login</h5>
                        <p>Choose account type and continue shopping!</p>
                        <div>
                            <button onClick = { signInWithGoogle} type="button" className="formSec-btn"><FcGoogle className="google-icon" />Sign in with Google</button>
                        </div>
                    <form className="loginform-form" method = "POST">
                        <div className="form__div">
                            <label className="label" htmlFor="email">Email*</label>
                            <div className="input__div">
                                <GoMail className="input-icon" />
                                <input 
                                    type="text" 
                                    name="email"
                                    placeholder = "mail@website.com"
                                    onChange = {(e) => setEmail(e.target.value)}
                                    ref = {emailRef}
                                    className="input"  
                                    value = {email}
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
                                    onChange = {(e) => setPwd(e.target.value)}
                                    ref = {emailRef}  
                                    className="input"
                                    minLength="8"
                                    value = {pwd}
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
                            <Link className="formLink" to = "">Forgot Password</Link>
                        </div>

                        <div>
                            <button  onClick = {handleSubmit} className="formPri-btn">Login</button>
                        </div>

                        <span>Not registered yet? </span>
                        <Link to="/register" className="formLink" >Create an Account</Link>
                    </form>
                </div>
           </div>
        </div>
    )
}

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginForm
