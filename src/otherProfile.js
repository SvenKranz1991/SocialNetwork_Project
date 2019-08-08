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
                <h3>
                    Profile of {this.state.firstname} {this.state.lastname}
                </h3>
                <br />
                <div className="ProfileCard BioEditor">
                    <Profilepic
                        url={this.state.picurl}
                        first={this.state.firstname}
                        last={this.state.lastname}
                    />
                    <p className="NoWrap">{`${this.state.firstname} ${
                        this.state.lastname
                    }`}</p>
                    <p className="BioEditor">
                        <strong className="BioEditor">Bio:</strong>{" "}
                        {this.state.bio}
                    </p>
                    {!this.state.bio && (
                        <div className="BioEditor">
                            <p className="BioEditor">no Info</p>
                        </div>
                    )}
                </div>
                <Friendbutton otherProfileId={this.props.match.params.id} />
                {this.state.showFriends && (
                    <div>
                        <br />
                        <FriendsOfFriends
                            otherProfileId={this.props.match.params.id}
                            nameOfUser={`${this.state.firstname} ${
                                this.state.lastname
                            }`}
                        />
                    </div>
                )}
                {!this.state.showFriends && (
                    <div>
                        <br />
                        <p>You would never guess who he is friends with!</p>
                    </div>
                )}
            </div>
        );
    }
}
