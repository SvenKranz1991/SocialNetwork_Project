const express = require("express");
const app = express();
const compression = require("compression");

app.use(compression());
// should be used always - shorten res/req time

const server = require("http").Server(app);
// Socket IO Server Setup

const io = require("socket.io")(server, { origins: "localhost:8080" });

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

// app.use(
//     require("cookie-session")({
//         secret: "process.env.SESSION_SECRET",
//         maxAge: 1000 * 60 * 60 * 24 * 14
//     })
// );

// Socket CookieSession

const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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
        // console.log("user data: ", user);
        if (user.picurl == null) {
            user.picurl = "/images/smallimage.jpg";
        }
        // console.log("user", user);

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
    // console.log("Req.params.id: ", req.params.id);
    let id = req.params.id;
    // console.log("Just id: ", id);

    if (req.session.userId == req.params.id) {
        // console.log("LoggedInUser");
        res.json({
            LoggedInUser: true
        });
    } else {
        try {
            let user = await db.getUserById(id);
            user = user.rows[0];
            // console.log("otherUser data: ", user);
            if (user.picurl == null) {
                user.picurl = "/images/smallimage.jpg";
            }
            // console.log("otherUser different Picture", user);

            res.json({ user });
        } catch (err) {
            console.log("Error in getting UserData: ", err);
        }
    }
});

// Upload Route

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("My Request in Index: ", req);

    let id = req.session.userId;
    let url = config.s3Url + req.file.filename;
    if (req.file) {
        db.updateUserImage(url, id)
            .then(updatePicture => {
                // console.log("Updated Picture of User: ", id);
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
    // console.log("My Request in editing the Bio: ", req.body);
    // console.log("Text: ", text);

    if (text) {
        db.updateUserBio(text, id)
            .then(updateBio => {
                // console.log("Updated Bio of User: ", id);
                // console.log("Log: ", updateBio.rows[0].bio);

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
    // console.log("My Request in recent Users: ", req.body);
    // console.log("I get something from find People");

    db.getRecentRegistrations()
        .then(users => {
            // console.log("Data for recent Users: ", users);
            if (users.rows[0].picurl == null) {
                users.picurl = "/images/smallimage.jpg";
                // console.log("New picture added in get RecentUsers!");
            }
            res.json(users.rows);
        })
        .catch(err => {
            console.log("Error in get RecentRegistraion/Users: ", err);
        });
});

app.get("/search-user/:search.json", (req, res) => {
    // console.log("Responds!");
    // console.log("My Request in User: ", req.body);
    // console.log("Req.params.search: ", req.params.search);
    let val = req.params.search;
    db.findUsers(val)
        .then(users => {
            // console.log("Data for findUsers: ", users);

            // if theres data render
            res.json(users.rows);
            // if there is not --> empty - render something else
        })
        .catch(err => {
            console.log("Error in result for Finding Users:", err);
        });
});

//////////////////////// Friend Request Section

// getting Friendshipstatus

app.get("/friendstatus/:user.json", async (req, res) => {
    // console.log(
    //     "Logged User Id: ",
    //     req.session.userId,
    //     "...Foreign User Id: ",
    //     req.params.user
    // );
    let sender_id = req.session.userId;
    let receiver_id = req.params.user;

    try {
        const friendstatus = await db.getFriendstatus(sender_id, receiver_id);
        // console.log("The friendStatus from Query: ", friendstatus);

        // If Else Statement for friendshipstatus
        if (friendstatus.rowCount == 0) {
            res.json({
                friendstatus,
                noRowsOrNoRequest: true
            });
        } else if (friendstatus.rows[0].accepted == true) {
            res.json({
                friendstatus,
                accepted: true
            });
        } else if (friendstatus.rows[0].sender_id == req.session.userId) {
            console.log("SenderId == UserId");
            res.json({
                friendstatus,
                pending: true
            });
        } else if (friendstatus.rows[0].receiver_id == req.session.userId) {
            console.log("ReceiverId == UserId");
            res.json({
                friendstatus,
                mightAccept: true
            });
        } else {
            console.log("Maybe there is something wrong.");
        }
    } catch (err) {
        console.log("Error in getting Friendshipstatus: ", err);
    }
});

// sending FriendData

app.post("/user/sendFriendRequest/:id.json", async (req, res) => {
    // console.log("Id of Object of Caring: ", req.params.id);
    // console.log("Id of Logged In User: ", req.session.userId);

    let sender_id = req.session.userId;
    let receiver_id = req.params.id;

    try {
        const newFriendstatus = await db.sendFriendshipOffer(
            sender_id,
            receiver_id
        );
        console.log("Added to db!", newFriendstatus);

        res.json({
            newFriendstatus,
            noRowsOrNoRequest: false,
            pending: true
        });
    } catch (err) {
        console.log("Error in sending FriendData: ", err);
    }
});

app.post("/user/acceptFriendRequest/:id.json", async (req, res) => {
    // just needs id

    // console.log("Id Row for Accepting Friend: ", req.params.id);
    // let id = req.params.id;
    // console.log("Id of Logged In User: ", req.session.userId);

    let sender_id = req.session.userId;
    let receiver_id = req.params.id;

    try {
        const newFriendstatus = await db.acceptFriendship(
            sender_id,
            receiver_id
        );
        console.log("Added to db!", newFriendstatus);
        res.json({
            newFriendstatus,
            accepted: true,
            pending: false,
            mightAccept: false,
            noRowsOrNoRequest: false
        });
    } catch (err) {
        console.log("Error in sending FriendData: ", err);
    }
});

app.post("/user/withdrawFriendRequest/:id.json", async (req, res) => {
    // just needs id - wrong guess
    // console.log("Id of Row for Withdraw Delete: ", req.params.id);
    //
    // let id = req.params.id;

    let sender_id = req.session.userId;
    let receiver_id = req.params.id;

    try {
        const newFriendstatus = await db.withdrawFriendRequest(
            sender_id,
            receiver_id
        );
        // console.log("Added to db!", newFriendstatus);
        res.json({
            newFriendstatus,
            noRowsOrNoRequest: true,
            pending: false,
            accepted: false
        });
    } catch (err) {
        console.log("Error in sending FriendData: ", err);
    }
});

app.post("/user/declineFriendRequest/:id.json", async (req, res) => {
    // just needs id -- wrong guess

    // let id = req.params.id;

    let sender_id = req.session.userId;
    let receiver_id = req.params.id;

    try {
        const newFriendstatus = await db.declineFriendship(
            sender_id,
            receiver_id
        );
        // console.log("Added to db!", newFriendstatus);
        res.json({
            newFriendstatus,
            noRowsOrNoRequest: true,
            pending: false,
            accepted: false,
            mightAccept: false
        });
    } catch (err) {
        console.log("Error in sending FriendData: ", err);
    }
});

//////////////////////
/////// Friends Page

app.get("/friends/getDataForFriends", async (req, res) => {
    let id = req.session.userId;
    // console.log("Req.session.userId: ", req.session.userId);

    try {
        const friendsdata = await db.getDataForFriends(id);
        // console.log("My FriendsData: ", friendsdata);
        res.json({
            friendsdata
        });
    } catch (err) {
        console.log("Error in Back/getDataForFriends: ", err);
    }
});

////////////////////////
/////////// Delete account

app.post("/user/deleteAccount", async (req, res) => {
    let id = req.session.userId;
    // console.log("ID for Delete User: ", id);
    try {
        const userDelete = await db.deleteUser(id);
        const friendstatusDelete = await db.deleteAllFriendstatus(id);
        const deleteChatOfUser = await db.deleteAllChatMessagesOfUser(id);
        console.log("User deleted: ", userDelete);
        console.log("Friendstatus deleted: ", friendstatusDelete);
        console.log("Chat of User deleted: ", deleteChatOfUser);
        req.session.userId = null;
        // res.redirect("/");
        res.json({
            userDelete
        });
    } catch (err) {
        console.log("Error in deleting Account: ", err);
    }
});

app.get("/friendsOfFriends/:user.json", async (req, res) => {
    let request_Id = req.params.user;
    let loggedUserId = req.session.userId;
    // console.log("Log my Request Id for friendslist: ", request_Id);

    try {
        const friendsList = await db.getFriendsOfFriends(
            request_Id,
            loggedUserId
        );
        // console.log("The FriendsOfFriendsList: ", friendsList);
        // console.log("Log My req.session.user FOF: ", loggedUserId);
        res.json({
            friendsList: friendsList
        });
    } catch (err) {
        console.log("Error in getting FriendsOfFriendsList: ", err);
    }
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

server.listen(process.env.PORT || 8080, function() {
    console.log("I'm listening. Server, not app.");
});

// SOCKET fun!!

// From David

// let mySocketId;
// io.on("connection", socket => {
//     console.log(`A socket with the id ${socket.id} just connected.`);
//
//     console.log(socket.request.headers);
//
//     socket.emit("greeting", {
//         message: "hey there, good looking"
//     });
//
//     io.sockets.emit("newPlayer", {});
//
//     if (mySocketId) {
//         io.sockets.sockets[mySocketId].emit("targetedMessage");
//     }
//
//     mySocketId = socket.id;
//
//     socket.on("niceToBeHere", payload => console.log(payload));
//
//     socket.on("disconnect", () => {
//         console.log(`A socket with the id ${socket.id} just disconnected.`);
//     });
// });

// For showing Online Users - bonus
const onlineUsers = {};

io.on("connection", function(socket) {
    console.log(`A socket with the id ${socket.id} just connected.`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    // Keeping Track of Current Users

    const userId = socket.request.session.userId;
    onlineUsers[socket.id] = userId;

    const onlineUserIds = Object.values(onlineUsers);
    console.log("Log my users: ", onlineUserIds);

    socket.on("getCurrentUsers", () => {
        onlineUserIds.forEach(usersOnline => {
            db.getNewOnlineUser(usersOnline)
                .then(usersOnline => {
                    console.log("My New User Ids: ", usersOnline.rows[0]);
                    socket.emit("NewUser", usersOnline.rows[0]);
                })
                .catch(err => {
                    console.log("Error in tracking new Users: ", err);
                });
        });
    });

    // For Disconnect Online Users - bonus Online Users
    socket.on("disconnect", () => {
        delete onlineUsers[socket.id];
        console.log(`A socket with the id ${socket.id} has disconnected.`);
        console.log("Log my users after disconnect: ", onlineUserIds);
    });

    // part 1 js getting the last 10 chatMessages
    socket.on("getLatestChat", () => {
        db.getLastTenMessages()
            .then(data => {
                // now we have the last 10 chats.
                console.log("Data for my Chat: ", data.rows);
                socket.emit("chatMessages", data.rows.reverse());
            })
            .catch(err => {
                console.log("Error in getting Latest Messages: ", err);
            });
    });

    // part 2 is dealing with a new chat message.
    socket.on("MyNewChatMessage", msg => {
        // figure out who sent message
        // then make a DB query to get info about that user.
        // THEN -> create a new Message Object that matches the objects in
        // the last 10 chat messages.

        // emit that there is a new chat and pass the object.
        // add this chat message to our Database.
        // Do Redux
        console.log("New Message in index: ", userId, msg);
        db.insertMessageIntoTable(userId, msg)
            .then(result => {
                // let chatInfo = result;
                // db.getUserById(userId)
                //     .then(profile => {
                //         console.log("Profile for Chat: ", profile.rows[0]);
                //         console.log("chatInfo: ", chatInfo.rows[0]);
                //     })
                //     .catch(err => {
                //         console.log(
                //             "Error in getting Profile and Chatinfo: ",
                //             err
                //         );
                //     });
                console.log("My Result for inserting in chat table: ", result);
                io.sockets.emit("chatMessage", result.rows[0]);
            })
            .catch(err => {
                console.log("err in MyNewChatMessage: ", err);
            });
    });
});

// where do I need to add --> <script src="/socket.io/socket.io.js"></script>???

// socket.emit("chatMessage", result.rows[0]);
