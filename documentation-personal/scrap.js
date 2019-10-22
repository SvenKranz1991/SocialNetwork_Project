// from Start js

export default function HelloWorld() {
    // needs to be exported
    return (
        // must be wrapped in an element - a div
        <div>
            <h1>Hello, World!</h1>
            <input type="text" name="text" />
        </div>
    );
}

// import new Component -- AnimalsContainer // and App
import AnimalsContainer from "./AnimalsContainer"; // dont need curly brackets because of "default" attribute

// from app.js

import AnimalsContainer from "./AnimalsContainer";
import HelloWorld from "./start"; // is not gonna be exported
import Registration from "./registration";


<h1>App is running!</h1>
<p>
    {this.state.name} : {this.state.cutenessScore}
</p>
<AnimalsContainer
    name={this.state.name}
    cutenessScore={this.state.cutenessScore}
/>
<HelloWorld />
<form>
    <input
        type="text"
        name="name"
        onChange={this.handleChange}
    />
    <input
        type="text"
        name="cutenessScore"
        onChange={this.handleChange}
    />
    <button onClick={this.handleSubmit}>Submit</button>
</form>

// from app.js example

// Rewrite as function component

// export default function AnimalsContainer(props) {
//     return (
//         <div>
//             <h1>App is running!</h1>
//             <AnimalsContainer>
//                 Undefined {props.name} : Undefined {props.cutenessScore}
//             </p>
//         </div>
//     );
// }
