import React from 'react';
import './MessageBox.css';
import { MdDelete } from 'react-icons/md';
import { ImPrinter } from 'react-icons/im';
import { BsBoxArrowUpRight } from 'react-icons/bs';

function MessageBox({message, msgSender, msgDate, msgName, msgSubject}) {

    const dateFormat = (val) => {
        var date = new Date(val?.seconds);

        date =(((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear())
        return date;
    }

    return (
        <div className="messagebox">
            <div className="messagebox__header">
                <img className="messagebox__img" src ={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${msgSender}`} alt={msgName} />
                
                <div className="msg__header-left">
                    <h4>{msgName}</h4>
                    <p> {`<${msgSender}> `} </p>
                </div>

                <p className="sub">{msgSubject}</p>
                <p className= "date">{dateFormat(msgDate)}</p>
                
                <div className="msg__header-right">
                    <MdDelete title="delete" className="msgIcon" />
                    <ImPrinter title="print" className ="msgIcon" />
                    <BsBoxArrowUpRight title="in new window" className="msgIcon" />
                </div>

            </div>

            <div className="messagebox__msg">
                <p>
                    {message}
                </p>
            </div>
            
        </div>
    )
}

export default MessageBox
