import React from "react";
import axios from "./axios";



// Component in OtherProfile
<FriendButton otherProfileId={this.props.match.params.id} />;
// getting Id of the other Profile

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    accepted BOOLEAN DEFAULT false
);

// OPTION two
// status VARCHAR DEFAULT false


// if theres sender_id receiver_id, but not accepted - pending
// STATES

// if only sent and BOOLEAN is false
// --> receiver_id -- accept friendship status?

// --> sender_id -- pending

// if accepted false
// rejected --> delete row?

// if accepted true
// friends!

// if no data --> send friend request button

////////////////////////////////////////
// in Node.js

// getFriendshipstatus      --> SELECT
// acceptFriendshipstatus   --> UPDATE
// declineFriendshipstatus  --> UPDATE
// sendFriendshipdeal  --> INSERT

//////////////////////////
// For React Button UI
// same Logic as showUploaderState
// Button can figure out through current state
// componentDidMount will get current friendshipstatus


Parameters - this.props.match.params.id AND req.session.userId
SELECT * FROM friendships WHERE sender_id = $1 AND receiver_id = $2 OR
(sender_id = $2 AND receiver_id = $1)



// For option two
SELECT * FROM friendships WHERE ((sender_id = $1 AND receiver_id = $2 OR
(sender_id = $2 AND receiver_id = $1))
AND status = 'accepted'



// ROUTES -- at least two - and one post possible


//

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
