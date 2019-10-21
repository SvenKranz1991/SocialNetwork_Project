import React from "react";
import axios from "./axios";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

import "./scss/main.scss";

import Registration from "./registration";

export default function Welcome(props) {
    return (
        <HashRouter>
            <div className="logindashboard">
                <div className="card__heading u-position-top-right">
                    <h2 className="heading-secondary--animated text-white">
                        <span className="card__heading-span">
                            Hitchhikers Network
                        </span>
                    </h2>
                    <p className="paragraph--animated text-white">
                        We discover the world.
                    </p>
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
