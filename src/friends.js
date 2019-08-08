import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getListOfLove, acceptFriendship, declineFriendship } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListOfLove());
    }, []);

    let wannabeFriends = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == false)
    );

    let friends = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == true)
    );

    if (!friends) {
        console.log("No Friends");
    } else if (!wannabeFriends) {
        console.log("No wannabeFriends");
        return;
    } else {
        console.log("Empty Bro");
    }

    console.log("Friends: ", friends);
    console.log("WannabeFriends: ", wannabeFriends);

    return (
        <div className="findFriendsDiv">
            {wannabeFriends && (
                <div>
                    <h3>Your Friend Requests</h3>
                    <br />
                </div>
            )}

            {wannabeFriends &&
                wannabeFriends.map(user => (
                    <div>
                        <div className="wannabelist" key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <img
                                    src={user.picurl}
                                    height="100px"
                                    width="100px"
                                />
                            </Link>
                            <p>
                                {user.firstname} {user.lastname}
                            </p>
                            <button
                                className="Button AcceptFriend"
                                onClick={() =>
                                    dispatch(acceptFriendship(user.id))
                                }
                            >
                                Add Friend
                            </button>
                            <button
                                className="Button DeclineFriend"
                                onClick={() =>
                                    dispatch(declineFriendship(user.id))
                                }
                            >
                                Decline Request
                            </button>
                        </div>
                        <br />
                    </div>
                ))}

            <hr className="horiLine" />
            <br />

            {friends && (
                <div>
                    <h3>Your Friends</h3>
                    <br />
                </div>
            )}

            {friends &&
                friends.map(user => (
                    <div className="friendsList" key={user.id}>
                        <Link to={`/user/${user.id}`}>
                            <img
                                src={user.picurl}
                                height="100px"
                                width="100px"
                            />
                        </Link>
                        <p>
                            {user.firstname} {user.lastname}
                        </p>
                        <div>
                            <button
                                className="Button AlreadyFriends"
                                onClick={() =>
                                    dispatch(declineFriendship(user.id))
                                }
                            >
                                Friends - Terminate?
                            </button>
                        </div>
                        <br />
                    </div>
                ))}
        </div>
    );
}
