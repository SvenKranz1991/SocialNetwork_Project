// registration component needs state
// if something goes wrong it needs to show an error message, which will be done with state

import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import "./scss/main.scss";

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
            <div className="logindashboard__form">
                <div className="u-margin-bottom-medium u-margin-top-big">
                    <h2 className="heading-tertiary text-white">
                        Join us - create an Account
                    </h2>
                </div>
                <div className="form__group">
                    <input
                        type="text"
                        name="first"
                        placeholder="First Name"
                        onChange={this.handleChange}
                        className="form__input"
                        id="first"
                    />
                    <label htmlFor="first" className="form__label">
                        First
                    </label>
                </div>
                <div className="form__group">
                    <input
                        type="text"
                        name="last"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                        className="form__input"
                        id="last"
                    />
                    <label htmlFor="last" className="form__label">
                        Last
                    </label>
                </div>
                <div className="form__group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form__input"
                        onChange={this.handleChange}
                        id="email"
                    />
                    <label htmlFor="email" className="form__label">
                        E-Mail
                    </label>
                </div>

                <div className="form__group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form__input"
                        onChange={this.handleChange}
                        id="password"
                    />
                    <label htmlFor="password" className="form__label">
                        Password
                    </label>
                </div>

                {this.state.error && (
                    <div className="error BioEditor">Oops!</div>
                )}

                <div className="form__group">
                    <button
                        className="btn btn--green"
                        onClick={this.handleSubmit}
                    >
                        Register
                    </button>
                </div>

                <h5 className="paragraph u-margin-top-medium text-white">
                    Already a member?{" "}
                    <Link to="/login" className="btn-text">
                        Login &rarr;
                    </Link>
                </h5>
                <br />
            </div>
        );
    }
}

// you can only return one containing div / wrapping element
// {e => this.handleSubmit()} --> David Advice - way faster
// use location.replace('myloggedinlocation')
