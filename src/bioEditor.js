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
                    bio: data.draftBio
                });
                console.log("My Data.DraftBio: ", data.draftBio);
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
                {!this.props.bio && (
                    <div>
                        <p
                            onClick={() =>
                                this.setState({
                                    editing: true,
                                    addstatus: false
                                })
                            }
                            className="bioPlaceholder"
                        >
                            Add Your Bio
                        </p>
                    </div>
                )}

                {this.state.editing && (
                    <div>
                        <textarea
                            name="draftBio"
                            defaultValue={this.props.bio}
                            onChange={this.handleChangeBio}
                        />
                        <br />
                        <button onClick={this.handleSubmitBio}>Save</button>
                    </div>
                )}
                {this.props.bio && this.state.addstatus && (
                    <div>
                        <br />
                        <p>{this.props.bio}</p>
                        <br />
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
