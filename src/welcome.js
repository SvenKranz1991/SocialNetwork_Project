import React from "react";
import axios from "axios";
import Logo from "./logo";

import Registration from "./registration";

export default function Welcome(props) {
    return (
        <div>
            <h1>Welcome to...</h1>
            <Logo />
            <Registration />
        </div>
    );
}
