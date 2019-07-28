import React from "react";
import BioEditor from "./bioEditor";
import Profilepic from "./profilepic";

export default function ProfileCard(props) {
    return (
        <div className="ProfileCard">
            <Profilepic
                url={props.url}
                image={props.image}
                first={props.firstname}
                last={props.lastname}
                onClick={props.onClick}
            />
            <p>{`${props.firstname} ${props.lastname}`}</p>
            <BioEditor bio={props.bio} done={props.doneBio} />
        </div>
    );
}

// Passing props to different places -- in documentation
