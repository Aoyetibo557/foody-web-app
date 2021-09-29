/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import './AdminHome.css';
import {Sidebar} from '../utils';
 
function AdminHome() {

    useEffect(() => {

    },[])


    return (
        <div className="adminhome">
            {/* left */}
            <div className="admin__left">
                <Sidebar />
            </div>
            {/* Right */}
            
        </div>
    )
}

export default AdminHome
