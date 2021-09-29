/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import "./Login.css";
import LoginForm from './LoginForm';
import { FcGoogle } from 'react-icons/fc';
import Image from '../images/loginImage.jpg';
import AOS from 'aos';
import "aos/dist/aos.css";
import RegisterForm from './RegisterForm';
import { auth, provider } from '../backend/firebase';




function Login( {setUserToken} ) {
    
    const [formType, setFormType] = useState("login");

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease'
        },[])

        
    },[])

    const signInWithGoogle = (ev) => {
        ev.preventDefault();

        auth.signInWithPopup(provider)
        .then((result) => {
            console.log(result);
        }).catch((error) => {
            alert(error.message)
        });
    }

    

    return (
        <div className = 'login'>
           <div data-aos="zoom-in-down" data-aos-duration ="2000" className="login__container">
                <div data-aos="fade-right" data-aos-duration="3000">
                    <img className="login__img" src= {Image} alt ="loginpic" />
                </div>
                
                <div data-aos ="fade-left" data-aos-duration="3000" className="login__right">
                    <div>
                        {formType === "login" ? (
                            <div>
                                <h5>Login</h5>
                                <p>Choose account type and continue shopping!</p>
                                <div>
                                    <button onClick = { signInWithGoogle} type="button" className="formSec-btn"><FcGoogle className="google-icon" />Sign in with Google</button>
                                </div>
                                <LoginForm setUserToken = {setUserToken} />
                                <span>Not registered yet? </span>
                                <button onClick = {() => setFormType("register")} className="formLink" >Create an Account</button>

                            </div>
                        ): (
                            <div>
                                <h5>Register</h5>
                                <p>Let's get you all set up so you can join a shopping experience like never before.</p>
                                <RegisterForm setUserToken = {setUserToken}/>
                                <span>Already have an account?</span>
                                <button className="formLink" onClick = {() => setFormType("login")}>Log in</button>

                            </div>
                        )}
                    </div>
                </div>
           </div>

        </div>
    )
}

export default Login
