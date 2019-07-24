// registration component needs state
// if something goes wrong it needs to show an error message, which will be done with state

import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e) {
        // this.setState({
        //     whatever: "something"
        // });
        // console.log("Check: ", this.state.whatever);
        console.log("e: ", e);

        axios
            .post("/registration", {
                first_name: this.state.first,
                last_name: this.state.last,
                email: this.state.email,
                password: this.state.password // was "" before
            })
            .then(({ data }) => {
                console.log({ data });
                if (data.success) {
                    console.log("Success - redirect");
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                }
            });
    }
    handleChange(e) {
        // this[e.target.name] = e.target.value; // davids method
        this.setState({
            [e.target.name]: e.target.value
        }); // ivanas
    }
    render() {
        return (
            <div className="Registration">
                {this.state.error && <div className="error">Oops!</div>}
                <h3 className="TitleWelcome">Registration</h3>
                <h4>First</h4>
                <input type="text" name="first" onChange={this.handleChange} />
                <h4>Last</h4>
                <input type="text" name="last" onChange={this.handleChange} />
                <h4>E-Mail</h4>
                <input type="text" name="email" onChange={this.handleChange} />
                <h4>Password</h4>
                <input
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit} className="submitButton">
                    Register
                </button>
                <h5>
                    Already a member? <Link to="/login">Login!</Link>
                </h5>
            </div>
        );
    }
}

// you can only return one containing div / wrapping element
// {e => this.handleSubmit()} --> David Advice - way faster
// use location.replace('myloggedinlocation')
