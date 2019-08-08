import React from "react";
import axios from "./axios";
import Profilepic from "./profilepic";
import Friendbutton from "./friendbutton";
import FriendsOfFriends from "./friendsOfFriends";

// just reuse profileCard

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFriends: false
        };
    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        const userId = this.props.match.params.id;
        const { data } = await axios.get(`/user/${id}.json`);

        if (data.LoggedInUser) {
            this.props.history.push("/");
        } else {
            this.setState(data.user);
        }
        const friendstatus = await axios.get(`/friendstatus/${userId}.json`);

        // console.log(
        //     "Log My FriendstatusDataforFun: ",
        //     friendstatus.data.friendstatus.rows[0].accepted
        // );
        // console.log("Data in other Profile as Object: ", data.user);
        if (friendstatus.data.friendstatus.rows[0].accepted == true) {
            this.setState({ showFriends: true });
        } else {
            this.setState({ showFriends: false });
        }

        // this.setState({
        //     friends: friendstatus.data.friendstatus.rows[0].accepted
        // });

        // console.log("This.state.bio", this.state.bio);
        // console.log("this.state: ", this.state);
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
                    {!this.state.bio && (
                        <div>
                            <p>no Info</p>
                        </div>
                    )}
                </div>
                <Friendbutton otherProfileId={this.props.match.params.id} />
                {this.state.showFriends && (
                    <div>
                        <FriendsOfFriends
                            otherProfileId={this.props.match.params.id}
                        />
                    </div>
                )}
                {!this.state.showFriends && (
                    <div>
                        <p>You would never guess who he is friends with!</p>
                    </div>
                )}
            </div>
        );
    }
}
