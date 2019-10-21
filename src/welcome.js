import React from "react";
import axios from "./axios";
import Logo from "./logo";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

import "./scss/main.scss";

import Registration from "./registration";

export default function Welcome(props) {
    return (
        <HashRouter>
            <div className="logindashboard">
                <div className="u-position-top-right">
                    <h2 className="heading-secondary">Hitchhikers Network</h2>
                </div>
                <div className="logindashboard__registration">
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </div>
        </HashRouter>
    );
}

// can wrap Route paths in switch component

// A bit of option 2

// {
//     location.hash == "#/login" ? <Registration /> : <Login />;
// }
