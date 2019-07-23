import React from "react";
import axios from "axios";

import Registration from "./registration";

// export default class Welcome extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     render() {
//         return (
//             <div>
//                 <h1>Welcome to...</h1>
//                 <img
//                     src="/images/Social_Network_Ello_Logo.svg.png"
//                     alt="ThisLogo"
//                 />
//                 <Registration />
//                 <Login />
//             </div>
//         );
//     }
// }

export default function Welcome(props) {
    return (
        <div>
            <h1>Welcome to...</h1>
            <img
                className="logo"
                src="/images/Social_Network_Ello_Logo.svg.png"
            />
            <Registration />
        </div>
    );
}
