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
        <div>
            <br />
            <h4>{props.nameOfUser} is friends with... </h4>
            <br />

            {friendsList &&
                friendsList.map(friends => (
                    <div className="friendsList" key={friends.id}>
                        <br />
                        <Link to={`/user/${friends.id}`}>
                            <img
                                src={friends.picurl}
                                height="100px"
                                width="100px"
                            />
                        </Link>
                        <p>
                            {friends.firstname} {friends.lastname}
                        </p>

                        <Friendbutton otherProfileId={friends.id} />
                    </div>
                ))}
            {!friendsList && (
                <div>
                    <p>Nobody</p>
                </div>
            )}
        </div>
    );
}
