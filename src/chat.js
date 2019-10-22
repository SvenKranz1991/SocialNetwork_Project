import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    const usersOnline = useSelector(state => state && state.usersOnline);
    console.log("Last 10 Messages", chatMessages);
    console.log("My Users Online in Chat", usersOnline);

    const elemRef = useRef("chat-container");
    const usersRef = useRef("users-container");

    useEffect(() => {
        console.log("chat hooks mounted!");
        console.log("elemRef: ", elemRef);
        console.log("scrolltop: ", elemRef.current.scrollTop);
        console.log("scrollheight: ", elemRef.current.scrollHeight);
        console.log("clientheight: ", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight + elemRef.current.scrollHeight;
        socket.emit("getLatestChat");
    }, [chatMessages]);
    // For getting Online Users
    useEffect(() => {
        console.log("Chat Users hooked!");
        socket.emit("getCurrentUsers");
    }, []);

    const keyCheck = e => {
        console.log("Message from textarea: ", e.target.value);
        console.log("e.key: ", e.key);

        if (e.key === "Enter") {
            e.preventDefault();
            console.log("Enter was presses!");
            socket.emit("MyNewChatMessage", e.target.value);

            e.target.value = "";
        }
    };
    return (
        <div className="chat-section">
            <div className="chat-wrapper">
                <h1 className="u-margin-bottom-small text-white"> Chatroom </h1>
                <div className="chat-container" ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map(msg => (
                            <div key={msg.id} className="chat-container__box">
                                <div className="chat-container__box__image">
                                    <Link
                                        to={`/user/${msg.sender_id}`}
                                        className="BioEditor"
                                    >
                                        <img
                                            src={msg.picurl}
                                            height="35x"
                                            width="35px"
                                            className="imageInChat"
                                        />
                                    </Link>
                                    <p className="chat-container__box__image__name">
                                        {msg.firstname} {msg.lastname}
                                    </p>
                                </div>

                                <div
                                    className="chat-container__box__text"
                                    ref={usersRef}
                                >
                                    <p className="chat-container__box__text__message">
                                        {msg.message}
                                    </p>
                                </div>

                                <div className="chat-container__box__date">
                                    <div className="chat-container__box__date__format">
                                        <p className="chatwrappercolor">
                                            Message send {msg.timeelapsed}{" "}
                                            seconds ago
                                        </p>
                                        <p className="chatwrappercolor">
                                            Date: {msg.date}{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <textarea
                    placeholder="Add your message here."
                    onKeyDown={keyCheck}
                    className="chat-container__bioEditor__textarea"
                />
            </div>

            <div className="users-online-wrapper">
                <div className="usersOnline-container">
                    <h4>Users who are Online</h4>
                    {usersOnline &&
                        usersOnline.map(online => (
                            <div className="usersOnline-card" key={online.id}>
                                <img
                                    src={online.picurl}
                                    height="50px"
                                    width="50px"
                                    className="usersOnline-card__image"
                                />
                                <p className="usersOnline-card__name">
                                    {online.firstname} {online.lastname}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

// SEARCH --> React Fragments

// <React.Fragment>
// <h1>Chat Room</h1>
// </React.Fragment>

// export default class Chat extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//
//     render() {
//         return (
//             <div>
//                 <h1>My Chat Room</h1>
//             </div>
//         );
//     }
// }

// Resets value
// pass something in the array above - event for sending message
