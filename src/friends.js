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
        <div className="friend-section">
            <div className="friendrequest-section friendrequest-section--1">
                {wannabeFriends && (
                    <h1
                        className="heading-primary text-white u-center-text
                    u-margin-top-big"
                    >
                        Your Friend Requests
                    </h1>
                )}

                <div className="flex-container">
                    {wannabeFriends &&
                        wannabeFriends.map(user => (
                            <div className="friend-card" key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        src={user.picurl}
                                        height="100px"
                                        width="100px"
                                        className="friend-card__image"
                                    />
                                </Link>
                                <p className="friend-card__name">
                                    {user.firstname} {user.lastname}
                                </p>
                                <div className="friendbutton-wrapper">
                                    <button
                                        className="frnd-btn frnd-btn--accept"
                                        onClick={() =>
                                            dispatch(acceptFriendship(user.id))
                                        }
                                    >
                                        Add Friend
                                    </button>
                                    <button
                                        className="frnd-btn frnd-btn--decline"
                                        onClick={() =>
                                            dispatch(declineFriendship(user.id))
                                        }
                                    >
                                        Decline Request
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="friendrequest-section friendrequest-section--2">
                {friends && (
                    <h1
                        className="heading-primary text-white u-center-text
                        u-margin-top-big"
                    >
                        Your Friends
                    </h1>
                )}
                <div className="flex-container">
                    {friends &&
                        friends.map(user => (
                            <div className="friend-card" key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        src={user.picurl}
                                        height="100px"
                                        width="100px"
                                        className="friend-card__image"
                                    />
                                </Link>
                                <p className="friend-card__name">
                                    {user.firstname} {user.lastname}
                                </p>
                                <div className="friendbutton-wrapper">
                                    <button
                                        className="frnd-btn frnd-btn--friends"
                                        onClick={() =>
                                            dispatch(declineFriendship(user.id))
                                        }
                                    >
                                        Friends - Terminate?
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
