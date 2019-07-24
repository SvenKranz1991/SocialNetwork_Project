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
