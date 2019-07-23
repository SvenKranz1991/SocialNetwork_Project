const express = require("express");
const app = express();
const compression = require("compression");

app.use(compression());
// should be used always

app.use(express.static("./public"));
const db = require("./utils/db");
const bc = require("./utils/bc");
app.use(require("body-parser").json());

// app.use(
//     require("cookie-session")({
//         secret: process.env.SESSION_SECRET,
//         maxAge: 1000 * 60 * 60 * 24 * 14
//     })
// );

// can switch out

// app.use(
//     require("body-parser").urlencoded({
//         extended: false
//     })
// );

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// log location.pathname just to check

// if (location.pathname == "/welcome") {
//     // they are logged out
// } else {
//     // they are logged in
// }

app.get("*", function(req, res) {
    // if (!req.session.userId) {
    //     res.redirect("/welcome");
    // } else {
    res.sendFile(__dirname + "/index.html");
    // }
});

app.post("/registration", function(req, res) {
    console.log("Request for registration: ", req);
    bc.hashPassword(req.body.password).then(decrypt => {
        db.addRegistration(
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            decrypt
        )
            .then(resp => {
                console.log("Added in Database: ", resp);
                res.json({
                    process: "success"
                });
            })
            .catch(err => {
                console.log("Error in addRegistration: ", err);
            });
    });
});

app.post("/login", (req, res) => {
    console.log("Request for Login: ", req);
    db.getUser(req.body.email)
        .then(account => {
            if (!account.rows[0]) {
                console.log("nothing Found");
                res.render("login", {
                    warning: true
                });
            } else {
                // let userId = account.rows[0].userid;
                // let signId = account.rows[0].signId;
                // let nameId = account.rows[0].fullname;
                // console.log("Account Found: ", account.rows[0]);
                bc.checkPassword(req.body.password, account.rows[0].password)
                    .then(match => {
                        // console.log("Password: ", match);
                        // req.session.userId = userId;
                        // req.session.signId = signId;
                        // req.session.nameId = nameId;
                        // console.log(
                        //     "Its fine: ",
                        //     req.session.userId,
                        //     req.session.signId,
                        //     req.session.nameId
                        // );
                        // if (req.session.userId && req.session.signId) {
                        //     res.redirect("petition/signed");
                        // } else if (!req.session.signId) {
                        //     res.redirect("petition");
                        // } else {
                        //     res.render("login", {
                        //         warning: true
                        //     });
                        // }

                        console.log("Just log match: ", match);
                    })
                    .catch(err => {
                        console.log("Error in assigning Cookie: ", err);
                    });
            }
        })
        .catch(err => {
            console.log("Error in getUser: ", err);
        });
});

// maybe better here
// app.get('/welcome', function(req, res) {
//
// })

// handle first axios request in React

// app.get("/get-animal", (req, res) => {
//     res.json({
//         name: "Zebra",
//         cutenessScore: "pretty cute"
//     });
// });

// if slash route /welcome -> user is definately logged out
// start.js can read cookies
// but it isn't a regular cookie, you need to b65? it
// --> log document.cookie btoa
// other option axios request -- takes longer

app.listen(8080, function() {
    console.log("I'm listening.");
});
