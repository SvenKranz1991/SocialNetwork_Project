import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

// let elem;
//
// if (location.pathname == "/welcome") {
//     // they are logged out
//     elem = <Welcome />;
// } else {
//     // they are logged in
//     elem = <img src="/logo.png" />;
// }

// after registration reload the page - redirect
// ReactDOM.render can only render one

ReactDOM.render(<App />, document.querySelector("main"));
