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
        e.preventDefault();
        console.log("e: ", e);
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password // was "" before
            })
            .then(({ data }) => {
                console.log("myData: ", { data });
                if (data.success) {
                    console.log("Success - redirect");
                    location.replace("/");
                } else {
                    console.log("Not correct response!");
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
                    <h2 className="heading-tertiary text-white">Login</h2>
                </div>
                <div className="form__group">
                    <input
                        type="text"
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
                {this.state.error && (
                    <div className="error BioEditor">Oops!</div>
                )}
                <br />
                <button
                    onClick={this.handleSubmit}
                    href="#"
                    className="btn btn--green"
                >
                    Login
                </button>
                <div className="">
                    <h5 className="paragraph u-margin-top-huge text-white">
                        Already a member?{" "}
                        <Link to="/" className="btn-text">
                            Create Account &rarr;
                        </Link>
                    </h5>
                </div>
            </div>
        );
    }
}
