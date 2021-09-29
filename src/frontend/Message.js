import React from 'react';
import './Message.css';
import { BsDot, BsCheckAll } from 'react-icons/bs';

function Message({subject, sender, date, msg, read, id}) {
    


    const dateFormat = (val) => {
        var date = new Date(val.seconds);

        date =(((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear())
        return date;
    }

    return (
        <div className= { read === true ? "message read" : "message" } key={id}>
            <div className="message__left">
                <img className="message__img" src= {`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${sender}`}  alt={sender} />
                
                {read === false ? <BsDot className="dotIcon" /> : <BsCheckAll className="checkIcon" />}

                <div>
                    <h4><span className="sender">{sender}</span> <span className="subject">{subject}</span>  <span className="date">{dateFormat(date)}</span></h4>

                </div>

            </div>

           
        </div>
    )
}

export default Message
