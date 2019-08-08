import React from "react";
import axios from "./axios";

export default class Friendp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accepted: false,
            pending: false,
            mightAccept: false,
            noRowsOrNoRequest: false
        };
    }
    async componentDidMount() {
        // console.log("This props for FOF: ", this.props);
        // console.log("This state for FOF: ", this.state);
        // console.log("This otherProfileId: ", this.props.otherProfileId);
        const userId = this.props.otherProfileId;
        // console.log("Reassuring this.props.otherProfileId", userId);
        const friendstatus = await axios.get(`/friendstatus/${userId}.json`);
        // console.log("myFriendstatus Object: ", friendstatus);
        // console.log("myFriendstatusRowcount: ", friendstatus.data.rowCount);
        // console.log(
        //     "myFriendStatus Value Boolean: ",
        //     friendstatus.data.rows[0].accepted
        // );
        // console.log("Log my definitive State: ", this.state);
        // console.log("Log my Pending: ", friendstatus.data.pending);

        if (friendstatus.data.friendstatus.rowCount == 0) {
            console.log("No Data");
            this.setState(friendstatus.data);
        } else {
            console.log(
                "Log my Id in Friendstatus: ",
                friendstatus.data.friendstatus.rows[0].id
            );
            this.setState(friendstatus.data);
        }

        // console.log("Log this.state.accepted: ", this.state.accepted);
    }
    submitFriendRequest(e) {
        // console.log("Got a Friend Request!", e);
        const id = this.props.otherProfileId;
        // console.log("Reassuring it is the correct Id in front: ", id);
        axios.post(`/user/sendFriendRequest/${id}.json`).then(result => {
            console.log("Results from sendFriendData at Front", result.data);
            this.setState(result.data);
        });
    }
    acceptFriendRequest(e) {
        // JustNeedsId of RowTable
        // console.log(
        //     "MyState for Accept Friend Request: ",
        //     this.state.friendstatus.rows[0].id
        // );
        console.log("I accepted a Friend!", e);
        const id = this.state.friendstatus.rows[0].id;
        // console.log("My current Id for Friend Request: ", id);

        axios.post(`/user/acceptFriendRequest/${id}.json`).then(result => {
            console.log("Results from sendFriendData at Front", result);
            this.setState(result.data);
        });
    }
    withdrawFriendRequest(e) {
        // JustNeedsId of RowTable
        // console.log("Withdraw Friend Request!", e);
        const id = this.props.otherProfileId;
        // console.log("Friendstatus.id: ", this.state.friendstatus.rows[0].id);

        axios.post(`/user/withdrawFriendRequest/${id}.json`).then(result => {
            // console.log("Results from sendFriendData at Front", result);
            this.setState(result.data);
        });
    }
    declineFriendRequest(e) {
        // JustNeedsId of RowTable
        // console.log("Decline Friend Request!", e);
        const id = this.props.otherProfileId;
        axios.post(`/user/declineFriendRequest/${id}.json`).then(result => {
            // console.log("Results from sendFriendData at Front", result);
            this.setState(result.data);
        });
    }

    render() {
        return (
            <div>
                {this.state.noRowsOrNoRequest && (
                    <div>
                        <p
                            onClick={e => this.submitFriendRequest(e)}
                            className="Button sendFriendRequest"
                        >
                            Send Friend Request
                        </p>
                    </div>
                )}
                {this.state.accepted && (
                    <div>
                        <p
                            onClick={e =>
                                this.withdrawFriendRequest(
                                    this.props.otherProfileId
                                )
                            }
                            className="Button AlreadyFriends"
                        >
                            Already Friends - Terminate?
                        </p>
                    </div>
                )}
                {this.state.pending && (
                    <div>
                        <p
                            onClick={e =>
                                this.withdrawFriendRequest(
                                    this.props.otherProfileId
                                )
                            }
                            className="Button PendingFriends"
                        >
                            Status Pending - Cancel?
                        </p>
                    </div>
                )}
                {this.state.mightAccept && (
                    <div>
                        <p
                            onClick={e => this.acceptFriendRequest(e)}
                            className="Button AcceptFriend"
                        >
                            Accept Friend Request
                        </p>
                        <p
                            onClick={e =>
                                this.declineFriendRequest(
                                    this.props.otherProfileId
                                )
                            }
                            className="Button DeclineFriend"
                        >
                            Decline Friend Request
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

// this.props.otherProfileId --> works
