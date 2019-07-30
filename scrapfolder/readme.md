Lecture HOOOOOKS

Hooks only functions in function component
Is only in one single scope, if displaying a component twice, the state stays in their on scope of each instance

function CuteBunny() {
useState() --> has to be at top level

    if (somethingOrOther) {

    } else {

    } for (var whatever in something) {}

}

/////////////////// Example

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Hello />, document.querySelector('main'));

function Hello(userId) {
const [greetee, setGreetee] = useState('World');
const [bool, setBool] = useState(false);
// greetee is the default state
// setGreetee changes the state Property
setGreetee('Kitty'); --> sets Value of greetee to "Kitty"
console.log("My Greetee: ", greetee); --> logging the input

////////////////// Example, need to adjust Input to call this
///////// in input --> onChange = {onChange};
// const onChange = e => {
// setGreetee(e.target.value);
// alert(greetee)
// };

// for Exercise
useEffect(() => {
console.log(`"${greetee}" has been rendered!`)
return () => { --> does something before it changes/renders
console.log(`"${greetee}" is about to change on screen!`)
}
}, [greetee]);

// confirms that value has been changed from the last time // value in array
// can put bool in array and connect it to a click handler that refers to the useState of Bool above to make a condition that it only renders if that has changed
// he deleted the array so it runs every time

// option in array put in prop [userId]

// look into Documentary in Github!!!

return (

<div>
<p>
Hello, <strong>{greetee}</strong>
</p>
<input onChange= {e => setGreetee(e.target.value)} defaultValue={greetee} />
<div onClick= {e => setBool(true)}>change Bool </div>
</div>
)
}

// Example how you could use this in login

// in this example don't need to use this

function Login() {
const [error, setError] = useState(false);
const [email, setEmail] = useState();
const [pass, setPass] = useState();
function submit() {
axios.post('/login', {
email: email,
pass: pass
})
}
return(
{error && <div>Oops!</div>}
input name"email onChange={e => setEmail(e.target.value)}
<button onClick={submit}>submit</button>
)
}

//

// componentDidMount --> runs ones after rendered
// componentDidUpdate

//////////////// For Exercise

function FindPeople() {
const [users, setUsers] = useState();
const [val, setVal] = useState();
}
