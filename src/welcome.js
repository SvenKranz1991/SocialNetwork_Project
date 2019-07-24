import React from "react";
import axios from "./axios";
import Logo from "./logo";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

import Registration from "./registration";

export default function Welcome(props) {
    return (
        <HashRouter>
            <div>
                <h1>Welcome to somethingsomething</h1>
                <Logo />

                <div>
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
