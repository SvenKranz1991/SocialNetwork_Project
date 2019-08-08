import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

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
        socket.emit("getLatestChat");
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight + elemRef.current.scrollHeight;
    }, []);

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
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight + elemRef.current.scrollHeight;

            e.target.value = "";
        }
    };
    return (
        <div className="chatbox">
            <h1> HUGE Chatroom </h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(msg => (
                        <div key={msg.id}>
                            <div className="ImageandnameInChat">
                                <img
                                    src={msg.picurl}
                                    height="50px"
                                    width="50px"
                                />
                                <p>
                                    Name: {msg.firstname} {msg.lastname}
                                </p>
                            </div>
                            <div className="users-container" ref={usersRef}>
                                <div className="MessageAndDateInChat">
                                    <p>{msg.message}</p>
                                    <p className="dateformatinchat">
                                        Date: {msg.date}
                                    </p>
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
                <h4>Users who are Online</h4>
                {usersOnline &&
                    usersOnline.map(online => (
                        <div key={online.id}>
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
