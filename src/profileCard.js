import React from "react";
import BioEditor from "./bioEditor";
import Profilepic from "./profilepic";

export default function ProfileCard(props) {
    return (
        <div className="ForProfileSlashRoute">
            <h3>My Profile</h3>
            <div className="ProfileCard">
                <Profilepic
                    url={props.url}
                    image={props.image}
                    first={props.firstname}
                    last={props.lastname}
                    onClick={props.onClick}
                />
                <p className="NoWrap">{`${props.firstname} ${
                    props.lastname
                }`}</p>
                <BioEditor bio={props.bio} done={props.doneBio} />
            </div>
        </div>
    );
}

// Passing props to different places -- in documentation
