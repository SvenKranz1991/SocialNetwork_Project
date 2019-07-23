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
        this.handleChange = this.handleChange.bind(this); // have to bind event to object
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // componentDidMount is the React version of "mounted"
    componentDidMount() {
        axios.get("/get-animal").then(resp => {
            console.log("resp: ", resp);
            this.setState({
                name: resp.data.name,
                cutenessScore: resp.data.cutenessScore
            });
        });
        console.log("this.state: ", this.state);
        console.log("Maaaaaaaaaaan");
    }
    // e get access to handle object
    handleChange(e) {
        console.log("handleChange running!");
        console.log("e.target.name: ", e.target.name);
        console.log("e.target.value: ", e.target.value);

        this.setState({
            [e.target.name]: e.target.value // everything inside brackets should be understood as variable name
        });
    }
    handleSubmit(e) {
        console.log("handleSubmit click running!");
        console.log("this.state: ", this.state);
        console.log("e: ", e);
        e.preventDefault();

        // from here you could make a POST request with axios... just like we did with Vue!

        // this.setState({});
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
