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
import FindPeople from "./findPeople";
import OtherProfile from "./otherProfile";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Friends from "./friends";
import DeleteAccount from "./deleteAccount";
import Chat from "./chat";

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
        console.log("This.state in Home: ", this.state.id);
    }
    logout() {}

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <header className="navigation">
                            <Logonav />
                            <h3>something something</h3>
                            <div className="navigation-links">
                                <Link to="/">Home</Link>
                                <Link to="/friends">Friends</Link>
                                <Link to="/users">Find Users</Link>
                                <Link to="/chat">Chat</Link>
                                <Link to="/logout">Logout</Link>
                                <Link to="/deleteAccount">Delete Account</Link>
                            </div>
                            <Profile
                                url={this.state.picurl}
                                firstname={this.state.firstname}
                                lastname={this.state.lastname}
                                onClick={() =>
                                    this.setState({
                                        uploaderIsVisible: true
                                    })
                                }
                            />
                        </header>

                        <div className="mainbody">
                            <div>
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
                            </div>
                            <Route exact path="/friends" component={Friends} />
                            <Route exact path="/users" component={FindPeople} />
                            <Route path="/user/:id" component={OtherProfile} />
                            <Route path="/logout" component={Logout} />
                            <Route
                                path="/deleteAccount"
                                component={DeleteAccount}
                            />
                            <Route path="/chat" component={Chat} />
                        </div>
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
