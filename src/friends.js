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
        <div className="FriendsDiv">
            {wannabeFriends && (
                <div>
                    <h3>These Guys and Girls want to be your Friend!</h3>
                </div>
            )}

            {wannabeFriends &&
                wannabeFriends.map(user => (
                    <div>
                        <div className="wannabelist" key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <img
                                    src={user.picurl}
                                    height="250"
                                    width="250"
                                />
                            </Link>
                            <br />
                            <p>
                                {user.firstname} {user.lastname}
                            </p>
                            <button
                                className="friends-button"
                                onClick={() =>
                                    dispatch(acceptFriendship(user.id))
                                }
                            >
                                Add Friend
                            </button>
                            <br />
                            <button
                                className="friends-button"
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

            <hr />

            {friends && (
                <div>
                    <h3>
                        These Guys and Girls are by this moment declared your
                        Friends!
                    </h3>
                </div>
            )}

            {friends &&
                friends.map(user => (
                    <div className="friendsList" key={user.id}>
                        <Link to={`/user/${user.id}`}>
                            <img src={user.picurl} height="250" width="250" />
                        </Link>
                        <p>
                            {user.firstname} {user.lastname}
                        </p>
                        <div>
                            <button
                                className="friends-button"
                                onClick={() =>
                                    dispatch(declineFriendship(user.id))
                                }
                            >
                                Terminate Friend
                            </button>
                        </div>
                        <br />
                    </div>
                ))}
        </div>
    );
}