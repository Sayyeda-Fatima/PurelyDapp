import React, { useContext, useEffect, useState } from 'react';
import './Message.css';
import { InscribleContext } from '../../Context/Context';
import { useNavigate } from 'react-router';
import { Navbar, UserCard, Loader } from '../../Components/Index';
import { toast } from 'react-toastify';

const Message = () => {
    const { isLoading, userList, getAllAppUser, getSignInState, ConnectWallet, contract, connectedAccount, currentUsername, messangerName, messangerAddress, SendMessage, readMessage, friendMsg, GetUserName } = useContext(InscribleContext);

    const navigate = useNavigate();

    const [messageInput, setMessageInput] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const state = getSignInState();
        if (!state) {
            navigate('/');
        }
        else {
            const fetchdata = async () => {
                await getAllAppUser();
                await GetUserName(connectedAccount);
            };
            fetchdata();
        }
    }, [contract]);

    useEffect(() => {
        const fetchdata = async () => {
            await ConnectWallet();
            await getAllAppUser();
            await GetUserName(connectedAccount);
        };
        fetchdata()
    }, []);

    const handleMessage = (e) => {
        const value = e.target.value;
        setMessageInput(value);
    }

    return (
        <>
            <Navbar />
            <div className="msg-user-div">

                <div className="msg-user-search">
                    <span>Message</span>
                    <div className="msg-search-input">
                        <span className="material-symbols-outlined">search</span>
                        <input
                            className="msg-search-bar"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value.toLowerCase())}
                        />
                    </div>
                </div>

                <hr />

                {
                    userList.filter((user) =>
                        user.username.toLowerCase().includes(query.toLowerCase())
                    ).filter(
                        (user) =>
                            user.accountAddress.toLowerCase() !==
                            connectedAccount.toLowerCase()
                    ).map((item, i) => {
                        return <UserCard username={item.username} address={item.accountAddress} key={i} />
                    })
                }
            </div>

            {messangerName !== "" && messangerAddress !== "" &&

                <div className="msg-chat-div">
                    <div className="msg-chat-header">
                        <div className="user-card-header">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" />
                            <div className="user-card-info">
                                <h5>{messangerName}</h5>
                                <small>{messangerAddress}</small>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="msg-chat-container">

                        <div className="chat">
                            {
                                friendMsg.map((msg) => {
                                    return <div className={msg.sender === messangerAddress ? "friend-message" : "user-message"}>
                                        <div className={msg.sender === messangerAddress ? "user-data" : "user-data r-img"}>
                                            {msg.sender === messangerAddress ?
                                                (<>
                                                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" className='chat-img' />
                                                    <div className="info">
                                                        <span>{messangerName}</span>
                                                    </div>
                                                </>
                                                )
                                                :
                                                <>
                                                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" className='chat-img' />
                                                    <div className="info">
                                                        <span>{currentUsername}</span>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <p className="message-data">
                                            {msg.msg}
                                        </p>
                                    </div>
                                })
                            }
                        </div>

                        <div className="chat-input-div">
                            <input type="text" placeholder='Type your message...' className='chat-input' onChange={handleMessage} value={messageInput} />
                            {isLoading ? <Loader /> :
                                <span class="material-symbols-outlined"
                                    onClick={async () => {
                                        await SendMessage(messageInput, messangerAddress);
                                        await readMessage(messangerAddress);
                                        setMessageInput("");
                                    }}
                                >
                                    send
                                </span>
                            }

                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Message;