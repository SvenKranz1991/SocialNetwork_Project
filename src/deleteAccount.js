import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function DeleteAccount() {
    const [deleteAccount, setDeleteAccount] = useState(false);

    useEffect(
        () => {
            // if no Value in the Input Field
            if (!deleteAccount) {
                (async () => {
                    try {
                        console.log("Loaded page Delete Account!");
                    } catch (err) {
                        console.log(
                            "Error in firstLoading Delete Account: ",
                            err
                        );
                    }
                })();
                // if something is in search field
            } else {
                (async () => {
                    try {
                        console.log("Trying to delete Account!");
                        let userDelete = axios.post("/user/deleteAccount");
                        console.log("data deleted: ", userDelete);
                        location.replace("/logout");
                    } catch (err) {
                        console.log(
                            "Error in deleting Account in front: ",
                            err
                        );
                    }
                })();
            }
        },
        [deleteAccount]
    );

    return (
        <div>
            <h3>By pressing this button you will delete your Account!</h3>
            <button onClick={() => setDeleteAccount(true)}>
                Are you sure?
            </button>
        </div>
    );
}

//
