import React from "react";

// export default class Logonav extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <div className="navigation">
//                 <img
//                     className="logoinnav"
//                     src="/images/Social_Network_Ello_Logo.svg.png"
//                 />
//             </div>
//         );
//     }
// }

// can be just a function - its a dumb component

export default function({ url, firstname, lastname, onClick }) {
    return (
        <div className="wrapperForProfilepic">
            <p>
                {firstname} {lastname}
            </p>
            <img
                className="Profilepic"
                src={url}
                alt={`${firstname} ${lastname}`}
                onClick={onClick}
            />
        </div>
    );
}
