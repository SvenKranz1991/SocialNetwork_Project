import React, { useState, useEffect } from "react";
import axios from "./axios";
// import Profilepic from "./profilepic";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUser] = useState();
    const [search, setSearch] = useState();

    console.log("My search: ", search);
    useEffect(() => {
        // if no Value in the Input Field
        if (!search) {
            (async () => {
                try {
                    // console.log("Has Some Effect");
                    let usersList = await axios.get(`/users.json`);
                    console.log("My usersList: ", usersList);
                    console.log("Typeof Data: ", typeof usersList);
                    setUser(usersList.data);
                } catch (err) {
                    console.log(
                        "Error in getting first Data for findPeople: ",
                        err
                    );
                }
            })();
            // if something is in search field
        } else {
            (async () => {
                try {
                    // console.log("Has Some Effect");
                    let usersList = await axios.get(
                        `/search-user/${search}.json`
                    );
                    console.log("My searchList: ", usersList);
                    console.log("Typeof Data: ", typeof usersList);
                    setUser(usersList.data);
                } catch (err) {
                    console.log("Error in getting Value for SearchTerm: ", err);
                }
            })();
        }
    }, [search]);

    return (
        <div className="findPeople-section">
            <div className="input-search">
                <h1 className="heading-tertiary text-black">Find Users</h1>
                <div className="form__group">
                    <input
                        onChange={e => setSearch(e.target.value)}
                        className="form__input form__input--1"
                        placeholder=""
                        id="search"
                    />
                </div>
            </div>

            <div className="people-search">
                {!search && (
                    <div>
                        <h1 className="heading-tertiary text-black u-margin-bottom-small">
                            ...or see who just joined!
                        </h1>
                    </div>
                )}
                <div className="people-card-wrapper">
                    {users &&
                        users.map(user => (
                            <div key={user.id} className="people-card">
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        src={user.picurl}
                                        height="100px"
                                        width="100px"
                                        className="people-card__image"
                                    />
                                </Link>
                                <p className="people-card__name">
                                    {user.firstname} {user.lastname}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

// // Put it in Top in function
// const [users, setUsers] = useState();
// const [val, setVal] = useState();

// // setVal
// // useEffect

// axios.get("/recentUsers").then(data => {
//     console.log("Result From Get Request -- Recent Users: ", data);
//     this.setState(data.user);
// });
