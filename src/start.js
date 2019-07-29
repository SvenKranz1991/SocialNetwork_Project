import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import Logo from "./logo";
import Welcome from "./welcome";
import axios from "./axios";

let elem;

if (location.pathname == "/welcome") {
    // they are logged out
    elem = <Welcome />;
} else {
    // they are logged in
    elem = <App />;
}

// after registration reload the page - redirect
// ReactDOM.render can only render one

ReactDOM.render(elem, document.querySelector("main"));

// actually it should render <App />
