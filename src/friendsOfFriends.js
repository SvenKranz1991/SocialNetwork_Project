import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsOfFriendsList, getFriendstatus } from "./actions";
import { Link } from "react-router-dom";
import axios from "./axios";
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

// export default class FriendsOfFriends extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     async componentDidMount() {
//         const user = this.props.otherProfileId;
//         console.log("Log my user in FriendsOfFriends: ", user);
//         console.log("Log my state: ", this.state);
//         try {
//             const { data } = await axios.get(`/friendstatus/${user}.json`);
//
//             if (data.friendstatus.rows[0].accepted == true) {
//                 console.log("I'll get the List!");
//                 const { data } = await axios.get(
//                     `/friendsOfFriends/${user}.json`
//                 );
//                 console.log(
//                     "The FriendsOfFriendsList: ",
//                     data.friendsList.rows[0]
//                 );
//                 let friendsList = data.friendsList.rows[0];
//                 console.log("Typeof friendslist: ", typeof friendsList);
//                 this.setState({ friendsList: friendsList });
//             }
//             // console.log(
//             //     "My Friendstatus Data: ",
//             //     data.friendstatus.rows[0].accepted
//             // );
//         } catch (err) {
//             console.log("Error in getting Friendstatus in FriendsOfFriends");
//         }
//     }
//     render() {
//         return (
//             <div>
//                 <h3>My Friends of Friends Component</h3>
//                 {friendsList &&
//                     friendsList.map(user => (
//                         <div className="friendsList" key={user.id}>
//                             <Link to={`/user/${user.id}`}>
//                                 <img
//                                     src={user.picurl}
//                                     height="100px"
//                                     width="100px"
//                                 />
//                             </Link>
//                             <p>
//                                 {user.firstname} {user.lastname}
//                             </p>
//                             <br />
//                         </div>
//                     ))}
//             </div>
//         );
//     }
// }

// Rewrite it as Hook

// {friendsList &&
//     friendsList.map(user => (
//         <div className="friendsList" key={user.id}>
//             <Link to={`/user/${user.id}`}>
//                 <img
//                     src={user.picurl}
//                     height="100px"
//                     width="100px"
//                 />
//             </Link>
//             <p>
//                 {user.firstname} {user.lastname}
//             </p>
//             <br />
//         </div>
//     ))}
