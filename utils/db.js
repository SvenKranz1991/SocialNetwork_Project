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
    return dbUrl.query(
        `SELECT users.id AS userid, users.password, users.first_name || ' ' || users.last_name AS fullname, signatures.id AS "signId"
        FROM users
        LEFT JOIN signatures ON users.id = signatures.userid
        WHERE users.email = $1`,
        [email]
    );
};
