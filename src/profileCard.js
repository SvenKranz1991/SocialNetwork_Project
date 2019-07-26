import React from "react";
import BioEditor from "./bioEditor";
import Profilepic from "./profilepic";

export default function ProfileCard(props) {
    return (
        <div>
            <Profilepic
                className="ProfileCard"
                url={props.url}
                image={props.image}
                first={props.firstname}
                last={props.lastname}
                onClick={props.onClick}
            />
            {props.Profilepic}
            <p>{`${props.firstname} ${props.lastname}`}</p>
            <BioEditor bio={props.bio} done={props.doneBio} />
        </div>
    );
}

// Passing props to different places -- in documentation
