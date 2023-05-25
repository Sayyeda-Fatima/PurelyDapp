import React, { useContext } from 'react';
import './UserCard.css';
import { InscribleContext } from '../../Context/Context';

const UserCard = ({username, address}) => {

    const {setMessangerName, setMessangerAddress, readMessage} = useContext(InscribleContext);

    return (
        <div className="user-card">
            <div className="user-card-header">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" />
                <div className="user-card-info" onClick={async ()=>{
                    setMessangerAddress(address);
                    setMessangerName(username);
                    await readMessage(address);
                }}>
                    <h5>{username}</h5>
                    <small>{address}</small>
                </div>
            </div>
        </div>
    );
};

export default UserCard;