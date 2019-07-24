import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
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
            .post("/login", {
                email: this.state.email,
                password: this.state.password // was "" before
            })
            .then(({ data }) => {
                if (data.success) {
                    console.log("Success - redirect");
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                }
            });
    }
    handleChange(e) {
        this[e.target.name] = e.target.value; // davids method
        this.setState({
            [e.target.name]: e.target.value
        }); // ivanas
    }
    render() {
        return (
            <div className="Registration">
                {this.state.error && <div className="error">Oops!</div>}
                <h3>Login</h3>
                <h4>E-Mail</h4>
                <input type="text" name="email" onChange={this.handleChange} />
                <h4>Password</h4>
                <input
                    type="text"
                    name="password"
                    onChange={this.handleChange}
                />
                <br />
                <button onClick={this.handleSubmit} className="submitButton">
                    Login
                </button>
            </div>
        );
    }
}
