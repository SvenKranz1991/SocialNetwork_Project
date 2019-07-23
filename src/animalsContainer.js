// src/animalsContainer.js

// every single component needs this
import React from "react";

// class components:
// have state!
// have lifecycle methods!
//
// function components:
// dont!

// Class needs to be called with capital letter
export default class AnimalsContainer extends React.Component {
    constructor(props) {
        super(props); // needs super if we need to use this of React.Component
    }
    render() {
        console.log("this.props.name: ", this.props.name); // will log twice, one with props, one with it
        // the child component - in this case animalsContainer can't change the name directly
        return (
            // inside is the JSX - return div
            <div>
                <h1>Animals Container is up and running!</h1>
                <h1>
                    This section is empty, but will contain something when I
                    fixed my bug: {this.props.name} and
                    {this.props.cutenessScore}
                </h1>
            </div>
        );
    }
}
