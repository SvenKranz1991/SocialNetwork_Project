import * as io from "socket.io-client";

import { chatMessages, chatMessage, showUsers } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));

        socket.on("NewUser", newUser => store.dispatch(showUsers(newUser)));
    }
};
