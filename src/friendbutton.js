import React from "react";
import axios from "./axios";

export default class Friendbutton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accepted: false,
            pending: false,
            mightAccept: false
        };
    }
    async componentDidMount() {
        // console.log("This props: ", this.props);
        console.log("This otherProfileId: ", this.props.otherProfileId);
        const userId = this.props.otherProfileId;
        // console.log("Reassuring this.props.otherProfileId", userId);
        const friendstatus = await axios.get(`/friendstatus/${userId}.json`);
        console.log("myFriendstatus Object: ", friendstatus);
        console.log("myFriendstatusRowcount: ", friendstatus.data.rowCount);
        console.log(
            "myFriendStatus Value Boolean: ",
            friendstatus.data.rows[0].accepted
        );

        if (friendstatus.data.rowCount == 0) {
            this.setState({
                accepted: false
            });
        } else {
            this.setState(friendstatus.data.rows[0]);
        }

        console.log("Log this.state.accepted: ", this.state.accepted);
        console.log("Log my definitive State: ", this.state);
    }
    submitFriendRequest(e) {
        console.log("Got a Friend Request!", e);
        const id = this.props.otherProfileId;
        console.log("Reassuring it is the correct Id in front: ", id);
        axios.post(`/user/sendFriendData/${id}.json`).then(result => {
            console.log("Results from sendFriendData at Front", result);
        });
    }
    declineOrDeleteFriendRequest(e) {
        console.log("Decline a Friend Request!", e);
    }
    acceptFriendRequest(e) {
        console.log("I accepted a Friend!", e);
    }
    render() {
        return (
            <div>
                {this.state.accepted == false && (
                    <div>
                        <button onClick={e => this.submitFriendRequest(e)}>
                            Friendoffer
                        </button>
                    </div>
                )}

                {this.state.pending && (
                    <div>
                        <button
                            onClick={e => this.declineOrDeleteFriendRequest(e)}
                        >
                            Pending
                        </button>
                    </div>
                )}

                {this.state.mightAccept && (
                    <div>
                        <button onClick={e => this.acceptFriendRequest(e)}>
                            Accept it already
                        </button>
                    </div>
                )}

                {this.state.accepted && (
                    <div>
                        <button
                            onClick={e => this.declineOrDeleteFriendRequest(e)}
                        >
                            Already Friends
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

// this.props.otherProfileId --> works
