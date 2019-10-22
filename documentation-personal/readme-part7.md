// make your own Hooks

// The Hook

function useStatefulFields() {
const [fields, setFields] = useState({});
const handleChange = ({target}) => {
setFields({
...fields,
[target.name]: target.value
})
};

    return [fields, handleChange]; ---> returning value of both fields
    // handleChange comes from here

}

class FieldStateSetter extends React.Component {
constructor(props) {
super(props);
this.state = {
fields: {}
};
}
} render() {
const handleChange = ({target}) => {
this.setState({
fields: {
...this.state.fields,
[target.name] : target.value
}
});
};
const Component = this.props.component;

}

// Spreading an object

var leo = {
name: 'Leonardo',
age: 44,
oscars: 1
}

var pcruz = {
...leo,
name: 'Penelope'
}

--> clone Object and overwriting name with 'Penelope'
