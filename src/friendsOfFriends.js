import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsOfFriendsList } from "./actions";
import { Link } from "react-router-dom";
import Friendbutton from "./friendbutton";

export default function FriendsOfFriends(props) {
    const dispatch = useDispatch();

    // console.log("Log my Props in FOF: ", props);

    useEffect(() => {
        dispatch(getFriendsOfFriendsList(props.otherProfileId));
        // console.log("Wie gehts!");
    }, []);

    let friendsList = useSelector(state => state.friendsList);

    // console.log("Log my GET friendsList: ", friendsList);

    return (
        <div>
            <h4>This Guy is friends with: </h4>
            {friendsList &&
                friendsList.map(user => (
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

                        <Friendbutton otherProfileId={user.id} />
                    </div>
                ))}
        </div>
    );
}
