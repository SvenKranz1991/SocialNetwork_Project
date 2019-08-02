import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import Logo from "./logo";
import Welcome from "./welcome";
import axios from "./axios";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux"; // make a file?
import reducer from "./reducers";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname == "/welcome") {
    // they are logged out
    elem = <Welcome />;
} else {
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
