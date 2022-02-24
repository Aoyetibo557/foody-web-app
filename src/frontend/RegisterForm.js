/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './RegisterForm.css';
import Image from '../images/loginImage.jpg';
import "aos/dist/aos.css";
import Aos from 'aos';
import { auth, db } from '../backend/firebase';
import PropTypes from 'prop-types';




function RegisterForm({setUToken}) {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfPwd] = useState("");

    // Error state handlers
    const [fnameErr, setFnameErr] = useState("");
    const [lnameErr, setLnameErr] = useState("");
    const [phNoErr, setPhNoErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [pwdErr, setPwdErr] = useState("");

    const[ registerError, setRegisterError] = useState("");

    const history = useHistory();

    // for email test
    const reg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease'
        });
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        errorHandler();
    }

    const errorHandler = () => { 
        firstname.length === 0 ? setFnameErr("Field cannot be Empty!") : setFnameErr("");
        lastname.length === 0 ? setLnameErr("Field cannot be Empty!") : setLnameErr("");
        email.length === 0 ? setEmailErr("Field can not be empty!") : setEmailErr("")
        reg.test(email) === false ? setEmailErr("wrong Email Format") : setEmailErr("");
        confirmPwd !== pwd ? setPwdErr("Passwords does not match!") : setPwdErr("");
    
        if(fnameErr.length === 0 && lnameErr.length === 0 && emailErr.length === 0 && phNoErr.length === 0 && pwdErr.length === 0) {
            altCreateNewAccount();
        }
        else {
            setRegisterError("An Error was discovered!")
        }
    
    }

    // reset the form 
    const resetForm = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhoneNumber("");
        setPwd("");
        setConfPwd("")
    }

    /**
     * CREATE ACCOUNT FUNCTION
     * this function creates an account using firebase email and password functionality
     * It then reroutes to the home page after creating an account
     */
    const altCreateNewAccount = async() => {
        auth.createUserWithEmailAndPassword(email, pwd).then(cred => {
            return db.collection('users').doc(cred.user.uid).set({
                EmailAddress: email,
                FirstName: firstname,
                LastName: lastname,
                Phone: phoneNumber,
                UserPwd: pwd,
            }).then(() => {
                console.log("Transaction was A Success!");
                sessionStorage.setItem("userEmail", email); //save userEmail in session storage
                history.push("/")
                resetForm();
            }).catch((error) => {
                console.log(error)
                setRegisterError("Sorry an Account with that email already exists")
            })
        })
    }


    return (
        <div className="register">
            <div data-aos="zoom-in-down" data-aos-duration ="2000" className="register__container">
                <div data-aos="fade-right" data-aos-duration="3000">
                    <img className="register__img" src= {Image} alt ="loginpic" />
                </div>

                <div className="register__right">
                    <h5>Register</h5>
                    <p>Let's get you all set up so you can join a shopping experience like never before.</p>
                    <h5 className="formErr">{registerError}</h5>
                    <form className="register__form" method = "POST">
                        <div className="inner__div">
                                <div>
                                    <label className="label" htmlFor="firstname">First Name</label>
                                    <input 
                                        type="text" 
                                        name="firstname"  
                                        value= {firstname}
                                        required
                                        placeholder ="First Name"
                                        className= "register__input"
                                        onChange = {(e) => setFirstname(e.target.value)}
                                    />
                                <p className="formErr">{fnameErr}</p>
                                </div>

                                <div>
                                    <label className="label" htmlFor="lastname">Last Name</label>
                                    <input 
                                        type="text" 
                                        name="lastname"
                                        value= {lastname}
                                        required
                                        placeholder = "Last Name"
                                        className= "register__input"
                                        onChange = {(e) => setLastname(e.target.value)}
                                    />
                                    <p className="formErr">{lnameErr}</p>
                                </div>
                        </div>

                        <div className="inner__div">
                            <div>
                                <label className="label" htmlFor="phone">Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value = {phoneNumber}
                                    required
                                    placeholder = "Phone Number"
                                    className= "register__input"
                                    onChange = {(e) => setPhoneNumber(e.target.value)}  
                                />
                                <p className="formErr">{phNoErr}</p>
                            </div>

                            <div>
                                <label className="label" htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value = {email}
                                    required
                                    placeholder="mail@website.com"
                                    className= "register__input"
                                    onChange = {(e) => setEmail(e.target.value)}  
                                />
                                <p className="formErr">{emailErr}</p>
                            </div>
                        </div>

                        <div className="inner__div">    
                            <div>
                                <label className="label" htmlFor="user-pwd">Password</label>
                                <input 
                                    type="password" 
                                    name="user-pwd"
                                    value = {pwd}
                                    required
                                    className= "register__input"
                                    placeholder = "*Password"
                                    onChange = {(e) => setPwd(e.target.value)} 
                                />
                                <p className="formErr">{pwdErr}</p>
                                </div>

                            <div>
                                <label className="label" htmlFor="conf-pwd">Confirm Password</label>
                                <input 
                                    type="password" 
                                    name="conf-pwd"
                                    value = {confirmPwd}
                                    required
                                    className= "register__input"
                                    placeholder = "*Confirm Password"
                                    onChange = {(e) => setConfPwd(e.target.value)}
                                />
                                <p className="formErr">{pwdErr}</p>
                            </div>
                        </div>

                        <div>
                            <input type = "checkbox" name ="terms" required />
                            <label className="label" htmlFor = "terms">I aggree to all <Link>Terms, Privacy Policy</Link> and <Link>Fees</Link></label>
                        </div>


                        <div>
                            <button className="formPri-btn" onClick = {handleSubmit}>Create Account</button>
                        </div>
                        <span>Already have an account? <Link className="formLink" to="/login">Log in</Link></span>
                    </form>

                   
                </div>
            </div>

        </div>
    )
}

RegisterForm.propTypes = {
  setUserToken: PropTypes.func.isRequired
}

export default RegisterForm
