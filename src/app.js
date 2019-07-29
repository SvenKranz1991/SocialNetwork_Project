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
import Logout from "./logout";
import OtherProfile from "./otherProfile";
import { Route, BrowserRouter, Link } from "react-router-dom";

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
    logout() {
        axios.post("/logout").then(() => {
            console.log("LoggedOut");
            history.pushState({}, "", "/welcome");
        });
    }

    render() {
        return (
            <div>
                <header className="navigation">
                    <Logonav />
                    <h3>something something</h3>
                    <Logout logout={() => this.logout()} />
                    <Profile
                        url={this.state.picurl}
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        onClick={() =>
                            this.setState({ uploaderIsVisible: true })
                        }
                    />
                </header>
                <BrowserRouter>
                    <div className="mainbody">
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return (
                                    <ProfileCard
                                        bio={this.state.bio}
                                        doneBio={bio => {
                                            this.setState({ bio: bio });
                                        }}
                                        url={this.state.picurl}
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname}
                                    />
                                );
                            }}
                        />

                        <Route path="/user/:id" component={OtherProfile} />
                        <Route path="/logout" component={Logout} />
                        <Link to="/">Home</Link>
                    </div>
                </BrowserRouter>

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

// <Route exact path="/" component={ProfileCard} render={props => {
//
// }}/>

// <Route
//     exact
//     path="/"
//     component={ProfileCard}
//     render={props => {}}
// />

// <ProfileCard
//     bio={this.state.bio}
//     doneBio={bio => {
//         this.setState({ bio: bio });
//     }}
//     url={this.state.picurl}
//     firstname={this.state.firstname}
//     lastname={this.state.lastname}
// />

// In Inspector
// history.pushState({}, '', '/')   -- Object, something Unnessecary, Path
// history.back()
// history.popState() -- place
// addEventListener('popState', e => console.log(e));
// window.onpopstate = e => console.log(e);

// BrowserRouter uses history.pushState / call pushState
// must use Link in import
// Link is simply an "a href" tag

// additional route for chat
// <Route path="/chat" component={Chat} />

// Logout
// <Link to="/logout" logout={() => this.logout()}>
//     Logout
// </Link>

////////////// dont forget to call /user/numberOfId
