import React from "react";
import BioEditor from "./bioEditor";
import Profilepic from "./profilepic";

export default function ProfileCard(props) {
    return (
        <div className="profilepage">
            <div className="profilecard u-margin-top-big">
                <h1 className="heading-primary text-black">My Profile</h1>
                <div className="profilecard__container">
                    <Profilepic
                        url={props.url}
                        image={props.image}
                        first={props.firstname}
                        last={props.lastname}
                        onClick={props.onClick}
                    />
                    <p className="profilecard__text paragraph text-black">{`${props.firstname} ${props.lastname}`}</p>
                    <BioEditor bio={props.bio} done={props.doneBio} />
                </div>
            </div>
            <div className="profilecard-side">
                <p className="infobox">
                    <i className="infobox__logo icon-basic-compass"></i> Hello{" "}
                    {props.firstname} {props.lastname}, <br />
                    Edit your Bio so other hikers can get to know you.
                </p>
                <p className="infobox">
                    <i className="infobox__logo icon-basic-compass"></i> Find
                    other Hikers by using the Find Users Option. <br />
                    Send and receive Friend Requests.
                </p>
                <p className="infobox">
                    <i className="infobox__logo icon-basic-compass"></i>
                    Use the chat and interact with others.
                </p>
            </div>
        </div>
    );
}

// Passing props to different places -- in documentation
