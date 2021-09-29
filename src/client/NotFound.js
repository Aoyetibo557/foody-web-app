import React from 'react';
import './NotFound.css';
import NotFounImage from '../images/notfound.jpg';

function NotFound() {
    return (
        <div className="notfound">
            <img className="notfound__img" src= {NotFounImage} alt="not found" />
            <h3>Sorry for the Inconvinience. Please find your way back <a href="/" >Home</a>!</h3>
        </div>
    )
}

export default NotFound
