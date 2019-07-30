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
