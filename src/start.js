import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import Welcome from "./welcome";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux"; // make a file?
import reducer from "./reducers";
// import axios from "./axios";
// for Socket
import { init } from "./socket";
import "./scss/main.scss";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname == "/welcome") {
    // they are logged out
    elem = <Welcome />;
} else {
    init(store);
    // they are logged in
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

// after registration reload the page - redirect
// ReactDOM.render can only render one

ReactDOM.render(elem, document.querySelector("main"));

// actually it should render <App />
