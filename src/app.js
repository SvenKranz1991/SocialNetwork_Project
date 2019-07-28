// src/App.js
// will be used to render all Components, link them and send to start.js

import React from "react";
import axios from "./axios";
// in order to use axios we need to import
import Logonav from "./logonav";
// things I need to add
import Profile from "./profilepic";
import Uploader from "./uploader";
import ProfileCard from "./profileCard";

console.log("axios", axios);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
    }
    async componentDidMount() {
        const { data } = await axios.get("/user");
        console.log("Data: ", { data });

        console.log("data.user", data.user);

        this.setState(data.user);
        console.log("This.state.bio", this.state.bio);
    }

    render() {
        return (
            <div>
                <header className="navigation">
                    <Logonav />
                    <h3>something something</h3>
                    <Profile
                        url={this.state.picurl}
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        onClick={() =>
                            this.setState({ uploaderIsVisible: true })
                        }
                    />
                </header>
                <div className="mainbody">
                    <ProfileCard
                        bio={this.state.bio}
                        doneBio={bio => {
                            this.setState({ bio: bio });
                        }}
                        url={this.state.picurl}
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                    />
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        url={this.state.picurl}
                        firstname={this.state.firstname}
                        onClick
                        done={picurl =>
                            this.setState({ picurl, uploaderIsVisible: false })
                        }
                        close={() =>
                            this.setState({ uploaderIsVisible: false })
                        }
                    />
                )}
            </div>
        );
    }
}

// {myArray.length && <Something />}      --> example Something you can add

// Information we need to get
// id
// firstname
// lastname
// email // except
// password // except
// profilepicurl
// bio

// if no picture -- placeholder image
//  or <p>Loading...</p>

// componentDidMount is the React version of "mounted"
