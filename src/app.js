// src/App.js
// will be used to render all Components, link them and send to start.js

import React from "react";

// in order to use axios we need to import
import Welcome from "./welcome";
import axios from "axios";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    // componentDidMount is the React version of "mounted"
    componentDidMount() {
        console.log("this.state: ", this.state);
    }
    render() {
        return (
            <div>
                <Welcome />
            </div>
        );
    }
}

// other event onClick

// check index.js for getting response

// logging e is just null

// log location.pathname just to check

// if (location.pathname == "/welcome") {
//     // they are logged out
// } else {
//     // they are logged in
// }
