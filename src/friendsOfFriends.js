import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsOfFriendsList } from "./actions";
import { Link } from "react-router-dom";
import Friendbutton from "./friendbutton";

export default function FriendsOfFriends(props) {
    const dispatch = useDispatch();

    console.log("Log my Props in FOF: ", props);

    useEffect(() => {
        dispatch(getFriendsOfFriendsList(props.otherProfileId));
        // console.log("Wie gehts!");
    }, []);

    let friendsList = useSelector(state => state.friendsList);

    // console.log("Log my GET friendsList: ", friendsList);

    return (
        <div className="friendsOfFriends-section">
            <h1
                className="heading-primary text-white u-center-text
        u-margin-top-medium"
            >
                {props.nameOfUser} is friends with...{" "}
            </h1>

            <div className="flex-container">
                {friendsList &&
                    friendsList.map(friends => (
                        <div className="friend-card" key={friends.id}>
                            <br />
                            <Link to={`/user/${friends.id}`}>
                                <img
                                    src={friends.picurl}
                                    height="100px"
                                    width="100px"
                                    className="friend-card__image"
                                />
                            </Link>
                            <p className="friend-card__name">
                                {friends.firstname} {friends.lastname}
                            </p>

                            <Friendbutton otherProfileId={friends.id} />
                        </div>
                    ))}
            </div>
            {!friendsList && (
                <div>
                    <p>Nobody</p>
                </div>
            )}
        </div>
    );
}
