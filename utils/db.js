var spicedPg = require("spiced-pg");

var dbUrl;
if (process.env.DATABASE_URL) {
    dbUrl = spicedPg(process.env.DATABASE_URL);
} else {
    dbUrl = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");
}

exports.addRegistration = function addRegistration(
    firstname,
    lastname,
    email,
    password
) {
    return dbUrl.query(
        `INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4) RETURNING id`,
        [firstname, lastname, email, password]
    );
};

exports.getUser = function getUser(email) {
    return dbUrl.query(`SELECT * FROM users WHERE email=$1`, [email]);
};

exports.getUserById = function getUserById(id) {
    return dbUrl.query(
        `SELECT id, firstname, lastname, picurl, bio FROM users WHERE id=$1`,
        [id]
    );
};

exports.updateUserImage = function updateUserImage(url, id) {
    return dbUrl.query(
        `UPDATE users SET picurl = $1 WHERE id = $2 RETURNING picurl`,
        [url, id]
    );
};

exports.updateUserBio = function updateUserBio(bio, id) {
    return dbUrl.query(
        `UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio`,
        [bio, id]
    );
};

exports.getRecentRegistrations = function getRecentRegistrations() {
    return dbUrl.query(
        `SELECT id, firstname, lastname, picurl, bio FROM users ORDER BY created_at DESC LIMIT 3`
    );
};

// works

exports.findUsers = function findUsers(val) {
    return dbUrl.query(
        `SELECT id, firstname, lastname, picurl FROM users WHERE firstname ILIKE $1 OR lastname ILIKE $1`,
        [val + "%"]
    );
};

// getFriendstatus for check

exports.getFriendstatus = function getFriendstatus(sender_id, receiver_id) {
    return dbUrl.query(
        `SELECT * FROM friendstatus WHERE sender_id = $1 AND receiver_id = $2 OR sender_id = $2 AND receiver_id = $1`,
        [sender_id, receiver_id]
    );
};

// Insert Table Row for friendshipoffer

exports.sendFriendshipOffer = function sendFriendshipOffer(
    sender_id,
    receiver_id
) {
    return dbUrl.query(
        `INSERT INTO friendstatus (sender_id, receiver_id) VALUES ($1, $2) RETURNING *`,
        [sender_id, receiver_id]
    );
};

// accept and decline and updating boolean of accepted
// could be either only ID or both sender_id, receiver_id
// UPDATE : needed to change query for friends Page

exports.acceptFriendship = function acceptFriendship(sender_id, receiver_id) {
    return dbUrl.query(
        `UPDATE friendstatus SET accepted = 'true' WHERE sender_id = $1 AND receiver_id = $2 OR sender_id = $2 AND receiver_id = $1 RETURNING *`,
        [sender_id, receiver_id]
    );
};

// could be either only ID or both sender_id, receiver_id

// Option 1 for declining - updating the database
// exports.declineFriendship = function declineFriendship(id) {
//     return dbUrl.query(
//         `UPDATE friendstatus SET accepted = 'false' WHERE id = $1 RETURNING *`,
//         [id]
//     );
// };

// But i just want to delete the Friend Request

exports.declineFriendship = function declineFriendship(sender_id, receiver_id) {
    return dbUrl.query(
        `DELETE FROM friendstatus
            WHERE sender_id = $1 AND receiver_id = $2 OR sender_id = $2 AND receiver_id = $1`,
        [sender_id, receiver_id]
    );
};

exports.withdrawFriendRequest = function withdrawFriendRequest(
    sender_id,
    receiver_id
) {
    return dbUrl.query(
        `DELETE FROM friendstatus
            WHERE sender_id = $1 AND receiver_id = $2 OR sender_id = $2 AND receiver_id = $1`,
        [sender_id, receiver_id]
    );
};

// For Friends.js

exports.getDataForFriends = function getDataForFriends(id) {
    return dbUrl.query(
        `SELECT users.id, firstname, lastname, picurl, accepted
        FROM friendstatus
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,
        [id]
    );
};

// delete DeleteAccount

exports.deleteUser = function deleteUser(id) {
    return dbUrl.query(`DELETE FROM users WHERE id = $1`, [id]);
};

exports.deleteAllFriendstatus = function deleteAllFriendstatus(id) {
    return dbUrl.query(
        `DELETE FROM friendstatus
        WHERE sender_id = $1 OR receiver_id = $1`,
        [id]
    );
};

// for chatmessages

exports.deleteAllChatMessagesOfUser = function deleteAllChatMessagesOfUser(id) {
    return dbUrl.query(
        `DELETE FROM chatmessages WHERE sender_id = $1 OR receiver_id = $1`,
        [id]
    );
};
