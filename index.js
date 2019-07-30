const express = require("express");
const app = express();
const compression = require("compression");

app.use(compression());
// should be used always - shorten res/req time

app.use(express.static("./public"));
const db = require("./utils/db");
const bc = require("./utils/bc");
app.use(require("body-parser").json());

// app.use(
//     require("body-parser").urlencoded({
//         extended: false
//     })
// );

// Stuff-Setup from petition

const cookieParser = require("cookie-parser");
const csurf = require("csurf");

// var cookieSession = require("cookie-session");
// app.use(
//     cookieSession({
//         secret: `I cook rice.`,
//         maxAge: 1000 * 60 * 60 * 24 * 14
//     })
// );

// What is this?? process.env.SESSION_SECRET

app.use(
    require("cookie-session")({
        secret: "process.env.SESSION_SECRET",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use("/favicon.ico", (req, res) => res.sendStatus(404));
app.use(cookieParser());
// app.use(csurf());

var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");
const s3 = require("./s3");
const config = require("./config");

// Csurf Token

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// Disk Storage

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

// Uploader

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

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

// somehow I need this for location

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// app.get("/user", function(req, res) {
//     console.log("My Req to user: ", req);
//     db.getUserProfile(req.session.userId)
//         .then(account => {
//             console.log("Req.session.userId: ", req.session.userId);
//             console.log("The Account: ", account);
//             res.json({
//                 account
//             });
//         })
//         .catch(err => {
//             console.log("Error in get UserData for App.js: ", err);
//         });
// });

app.get("/user", async (req, res) => {
    // console.log("req", req);
    try {
        let user = await db.getUserById(req.session.userId);
        user = user.rows[0];
        console.log("user data: ", user);
        if (user.picurl == null) {
            user.picurl = "/images/smallimage.jpg";
        }
        console.log("user", user);

        res.json({ user });
    } catch (err) {
        console.log("My Error in get User: ", err);
    }
});

// or in profilepicurl
// image = image || 'defaultpicture.jpg';
// return ( <img src={image} alt="blabla" />)

// app.post("/registration", function(req, res) {
//     console.log("Request for registration: ", req);
//     bc.hashPassword(req.body.password).then(decrypt => {
//         db.addRegistration(
//             req.body.first_name,
//             req.body.last_name,
//             req.body.email,
//             decrypt
//         )
//             .then(resp => {
//                 console.log("Added in Database: ", resp);
//                 req.session.userId = resp.rows[0].id;
//                 res.json({
//                     success: true
//                 });
//             })
//             .catch(err => {
//                 console.log("Error in addRegistration: ", err);
//             });
//     });
// });

// have to rewrite to make await async usable
app.post("/registration", async (req, res) => {
    const { first_name, last_name, email, password } = req.body; //  Destructuring
    // you can change name with colon, like "password:newname"

    try {
        let hash = await bc.hashPassword(password);
        let id = await db.addRegistration(first_name, last_name, email, hash);
        req.session.userId = id.rows[0].id;
        res.json({ success: true });
    } catch (err) {
        console.log("error in add Registration: ", err);
        res.json({ success: false });
    }

    // console.log("Request for registration: ", req);
    // bc.hashPassword(req.body.password).then(decrypt => {
    //     db.addRegistration(
    //         req.body.first_name,
    //         req.body.last_name,
    //         req.body.email,
    //         decrypt
    //     )
    //         .then(resp => {
    //             console.log("Added in Database: ", resp);
    //             req.session.userId = resp.rows[0].id;
    //             res.json({
    //                 success: true
    //             });
    //         })
    //         .catch(err => {
    //             console.log("Error in addRegistration: ", err);
    //         });
    // });
});

app.post("/login", (req, res) => {
    // console.log("Request for Login: ", req);
    db.getUser(req.body.email)
        .then(account => {
            if (!account.rows[0]) {
                // console.log("nothing Found");
                res.json({
                    success: false
                });
            } else {
                let userId = account.rows[0].id;
                // console.log("Account Found: ", account.rows[0].id);
                bc.checkPassword(req.body.password, account.rows[0].password)
                    .then(match => {
                        if (match) {
                            // console.log("Just log match: ", match);
                            // console.log("My user Id", userId);
                            req.session.userId = userId;
                            res.json({
                                success: true
                            });
                        } else {
                            res.json({ success: false });
                        }

                        // console.log(
                        //     "Its fine: ",
                        //     req.session.userId
                        // );
                        // if (req.session.userId) {
                        //     res.redirect("/");
                        // } else {
                        //     res.json({
                        //         error: true
                        //     });
                        // }
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

// Other Users
// all paths should be unique
// could use :id.json

app.get("/user/:id.json", async (req, res) => {
    console.log("Req.params.id: ", req.params.id);
    let id = req.params.id;
    console.log("Just id: ", id);

    if (req.session.userId == req.params.id) {
        console.log("LoggedInUser");
        res.json({
            LoggedInUser: true
        });
    } else {
        try {
            let user = await db.getUserById(id);
            user = user.rows[0];
            console.log("otherUser data: ", user);
            if (user.picurl == null) {
                user.picurl = "/images/smallimage.jpg";
            }
            console.log("otherUser different Picture", user);

            res.json({ user });
        } catch (err) {
            console.log("Error in getting UserData: ", err);
        }
    }
});

// Upload Route

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("My Request in Index: ", req);

    let id = req.session.userId;
    let url = config.s3Url + req.file.filename;
    if (req.file) {
        db.updateUserImage(url, id)
            .then(updatePicture => {
                console.log("Updated Picture of User: ", id);
                res.json({
                    data: updatePicture.rows[0].picurl,
                    success: true
                });
            })
            .catch(err => {
                console.log("Error in updateUserImage: ", err);
            });
    } else {
        res.json({
            success: false
        });
    }
});

app.post("/user/bioEditor", (req, res) => {
    let id = req.session.userId;
    let text = req.body.bio;
    console.log("My Request in editing the Bio: ", req.body);
    console.log("Text: ", text);

    if (text) {
        db.updateUserBio(text, id)
            .then(updateBio => {
                console.log("Updated Bio of User: ", id);
                console.log("Log: ", updateBio.rows[0].bio);

                res.json({
                    success: true,
                    draftBio: updateBio.rows[0].bio
                });
            })
            .catch(err => {
                console.log("Error in Edit Bio: ", err);
            });
    } else {
        res.json({
            success: false
        });
    }
    // declaring Variable for the Value in Text
});

app.get("/users.json", (req, res) => {
    console.log("My Request in recent Users: ", req.body);
    // console.log("I get something from find People");

    db.getRecentRegistrations()
        .then(users => {
            console.log("Data for recent Users: ", users);
            res.json(users.rows);
        })
        .catch(err => {
            console.log("Error in get RecentRegistraion/Users: ", err);
        });
});

app.get("/search-user/:search.json", (req, res) => {
    // console.log("Responds!");
    // console.log("My Request in User: ", req.body);
    console.log("Req.params.search: ", req.params.search);
    let val = req.params.search;
    db.findUsers(val)
        .then(users => {
            console.log("Data for findUsers: ", users);

            // if theres data render
            res.json(users.rows);
            // if there is not --> empty - render something else
        })
        .catch(err => {
            console.log("Error in result for Finding Users:", err);
        });
});

////////////////////////
///////////////

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

// needToTryAfterGettingBrowserRouter

app.post("/logout", function(req, res) {
    req.session.userId = null;
    res.redirect("/");
});

app.get("*", function(req, res) {
    if (!req.session.userId && req.url != "/welcome") {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
