import React from "react";
import axios from "./axios";

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    clickLogout(e) {
        console.log("clicked", e);
        this.props.logout();
    }
    render() {
        return (
            <div>
                <p className="logout" onClick={e => this.clickLogout(e)}>
                    Logout
                </p>
            </div>
        );
    }
}
