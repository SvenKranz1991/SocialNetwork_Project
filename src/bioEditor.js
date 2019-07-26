import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addstatus: true,
            draftBio: ""
        };
        this.handleSubmitBio = this.handleSubmitBio.bind(this);
        this.handleChangeBio = this.handleChangeBio.bind(this);
    }
    handleSubmitBio() {
        console.log("LogValue HandleSubmitBio:", this.state.draftBio);

        axios
            .post("/user/bioEditor", {
                bio: this.state.draftBio
            })
            .then(({ data }) => {
                console.log("MyDataResponse: ", { data });
                console.log("My Bio", data.draftBio);
                this.setState({
                    addstatus: true,
                    editing: false,
                    draftBio: data.draftBio
                });
                this.props.done(data.draftBio);
            })
            .catch(err => {
                console.log("Error in /user/bioEditor: ", err);
            });
    }
    handleChangeBio(e) {
        console.log(
            "e.target.value.substr(0, 100))",
            e.target.value.substr(0, 100)
        );
        this.setState({
            draftBio: e.target.value.substr(0, 100)
        });
    }
    render() {
        return (
            <div>
                {this.state.editing && (
                    <div>
                        <textarea
                            name="draftBio"
                            defaultValue="blabla"
                            onChange={this.handleChangeBio}
                        />
                        <br />
                        <button onClick={this.handleSubmitBio}>Save</button>
                    </div>
                )}

                {this.props.bio}

                {this.state.addstatus && (
                    <div>
                        <button
                            onClick={() =>
                                this.setState({
                                    editing: true,
                                    addstatus: false
                                })
                            }
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

// make Save Button eventHandler emit submit(e)
// and send Info to DraftBio

// bio: this.state.bio
