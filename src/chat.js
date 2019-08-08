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

    useEffect(
        () => {
            console.log("chat hooks mounted!");
            console.log("elemRef: ", elemRef);
            console.log("scrolltop: ", elemRef.current.scrollTop);
            console.log("scrollheight: ", elemRef.current.scrollHeight);
            console.log("clientheight: ", elemRef.current.clientHeight);
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight + elemRef.current.scrollHeight;
            socket.emit("getLatestChat");
        },
        [chatMessages]
    );
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
        <div className="chatbox">
            <h1> Chatroom </h1>
            <br />
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(msg => (
                        <div key={msg.id} className="ChatWrapper">
                            <div className="ImageandnameInChat chatwrappercolor">
                                <hr />

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
                            </div>

                            <div
                                className="users-container BioEditor"
                                ref={usersRef}
                            >
                                <p className="NameInChat">
                                    {msg.firstname} {msg.lastname}
                                </p>
                                <p className="MessageInChat">{msg.message}</p>
                                <div className="MessageAndDateInChat">
                                    <div className="dateformatinchat">
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
                        </div>
                    ))}
            </div>
            <br />
            <textarea
                placeholder="Add your message here."
                onKeyDown={keyCheck}
                className="ChatTextarea"
            />

            <div className="UsersOnlineInChat">
                <br />
                <h4>Users who are Online</h4>
                {usersOnline &&
                    usersOnline.map(online => (
                        <div key={online.id}>
                            <br />
                            <img
                                src={online.picurl}
                                height="50px"
                                width="50px"
                            />
                            <p>
                                {online.firstname} {online.lastname}
                            </p>
                        </div>
                    ))}
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
