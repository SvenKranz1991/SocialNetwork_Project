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
