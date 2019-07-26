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

                <ProfileCard
                    bio={this.state.bio}
                    changeBio={bio => {}}
                    url={this.state.picurl}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    onClick={() => this.setState({ uploaderIsVisible: true })}
                />

                {this.state.uploaderIsVisible && (
                    <Uploader
                        url={this.state.url}
                        firstname={this.state.firstname}
                        onClick
                        done={url =>
                            this.setState({ url, uploaderIsVisible: false })
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

// other event onClick

// check index.js for getting response

// logging e is just null

// {myArray.length && <Something />}      --> example Something you can add

// maybe add dedicated <Profilepic />

// Information we need to get
// id
// firstname
// lastname
// email // except
// password // except
// profilepicurl
// bio

// go find a default user image - done

// update users row for profile picture

// My Get Request

//  {image => this.setState({image})}

// if no picture -- placeholder image
//  or <p>Loading...</p>

// Option two

// For placing a placeholder img

// if (!this.state.id) {
// return <img src="placeholder.img" alt="Wait">
// }

// componentDidMount is the React version of "mounted"

// async componentDidMount() {
//     console.log("this.state: ", this.state);
//
//     const { data } = await axios.get("/user");
//     console.log("My Data in user Request: ", data);
//     this.setState({ data });
// }

// exports.updateBio = ({bio}) => {
//     db.update()
// }
//
// db.updateBio(req.body)

// const profilePic = (
//     <ProfilePic
//         image={this.state.image}
//         first={this.state.first}
//         last={this.state.last}
//
// )
