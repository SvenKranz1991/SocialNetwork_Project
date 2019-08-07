import React from "react";
import axios from "./axios";
import Profilepic from "./profilepic";
import Friendbutton from "./friendbutton";
import FriendsOfFriends from "./friendsOfFriends";

// export default function OtherProfile(props) {
//     return (
//         <div>
//             <img src={props.image} alt="picture" />
//             {props.first}
//             {props.last}
//             {props.bio}
//         </div>
//     );
// }

// just reuse profileCard

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        // const userId = this.props.match.params.id;
        const { data } = await axios.get(`/user/${id}.json`);
        // const friendstatus = await axios.get(`/friendstatus/${userId}.json`);
        // console.log(
        //     "Log My FriendstatusDataforFun: ",
        //     friendstatus.data.friendstatus.rows[0].accepted
        // );
        // console.log("Data in other Profile as Object: ", data.user);
        if (data.LoggedInUser) {
            this.props.history.push("/");
        } else {
            this.setState(data.user);
        }
        console.log("This.state.bio", this.state.bio);
        console.log("this.state: ", this.state);
    }
    render() {
        return (
            <div>
                <h3>Other Profile</h3>
                <br />
                <div className="ProfileCard">
                    <Profilepic
                        url={this.state.picurl}
                        first={this.state.firstname}
                        last={this.state.lastname}
                    />
                    <p className="NoWrap">{`${this.state.firstname} ${
                        this.state.lastname
                    }`}</p>
                    <p>
                        <strong>Bio:</strong> {this.state.bio}
                    </p>
                </div>
                <Friendbutton otherProfileId={this.props.match.params.id} />
                <FriendsOfFriends
                    otherProfileId={this.props.match.params.id}
                    isAccepted={this.state.accepted}
                />
            </div>
        );
    }
}
