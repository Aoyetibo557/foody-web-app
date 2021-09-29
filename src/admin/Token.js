import { useState } from 'react';

export default function Token (){
    const getToken = () => {
        const tokenString = sessionStorage.getItem('userToken');
        const userToken = JSON.parse(tokenString);
        return userToken
    };

    const [token, setUToken] = useState(getToken());

    const saveUserToken = uToken => {
        sessionStorage.setItem('userToken', JSON.stringify(uToken));
        setUToken(uToken);
    };

    return {
        setUToken: saveUserToken,
        token
    }
}