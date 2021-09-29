/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import './Setting.css';
import { BsSearch } from 'react-icons/bs'
import Tabs from './Tabs';


function Setting() {
    const [clickState, setClickState] = useState(false);

    


    return (
        <div className="setting">
            <div className="setting__header">
                <h5>Settings</h5>
                <div>
                    {clickState === true ? (
                        <div  className="search__sett" >
                            <input className="search-input" type="text" name="search" placeholder="Search Settings, account info" />
                            <BsSearch  className="searchIcon" onClick = {() => setClickState(!clickState)} />
                        </div>
                    ):(
                        <BsSearch className="searchIcon" onClick = {() => setClickState(!clickState)} />
                    ) }
                </div>
            </div>

            <section className="setting__section">
                <div>
                        <Tabs />
                </div>
            </section>
            
        </div>
    )
}

export default Setting
