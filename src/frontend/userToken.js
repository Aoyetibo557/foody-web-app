// import { useState } from 'react';

// export default function userToken (){
//     const getUserToken = () => {
//         const tokenString = sessionStorage.getItem('token');
//         const userToken = JSON.parse(tokenString);
//         return userToken
//     };

//     const [userToken, setUserToken] = useState(getUserToken());

//     const saveUserToken = uToken => {
//         sessionStorage.setItem('userToken', JSON.stringify(uToken));
//         setUserToken(uToken);
//     };

//     return {
//         setUserToken: saveUserToken,
//         userToken
//     }
// }

import React from 'react'

function userToken() {
    const getUserToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    };

    const [userToken, setUserToken] = useState(getUserToken());

    const saveUserToken = uToken => {
        sessionStorage.setItem('userToken', JSON.stringify(uToken));
        setUserToken(uToken);
    };

    return {
        setUserToken: saveUserToken,
        userToken
    }
}

export default userToken
