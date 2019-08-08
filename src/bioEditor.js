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
                    <div className="BioEditor">
                        <p
                            onClick={() =>
                                this.setState({
                                    editing: true,
                                    addstatus: false
                                })
                            }
                            className="bioPlaceholder BioEditor"
                        >
                            Add Your Bio
                        </p>
                    </div>
                )}

                {this.state.editing && (
                    <div className="BioEditor">
                        <textarea
                            name="draftBio"
                            defaultValue={this.props.bio}
                            onChange={this.handleChangeBio}
                            className="draftBio"
                        />
                        <br />
                        <button onClick={this.handleSubmitBio}>Save</button>
                    </div>
                )}
                {this.props.bio && this.state.addstatus && (
                    <div className="BioEditor">
                        <br />
                        <p className="BioEditor">
                            <strong className="BioEditor">Bio:</strong>{" "}
                            {this.props.bio}
                        </p>
                        <br />
                        <p
                            onClick={() =>
                                this.setState({
                                    editing: true,
                                    addstatus: false
                                })
                            }
                            className="editButton BioEditor"
                        >
                            Edit
                        </p>
                        <br />
                    </div>
                )}
            </div>
        );
    }
}

// put in OtherProfile
// async componentDidMount() {
// const id = this.props.match.params.id;
// if(id == loggedInUserId)  --- could do this in server and serve home
// const {data} = await axios.get(`/user/${id}.json`)
//     this.setState({})
// }

//
// in server
//
// const {id} = req.params;
//
// if(id == req.session.userId) {
//     res.json({
//         error: true,
//         sameUser: true
//     })
// and redirect to slash
// could user location.replace('/')
// OOOOOOR
// in app.js
// if (data.sameUser) {
// this.props.history.push('/')
// }
// }

// look at "key"-value  -- ties component to url - if it not matches, it will change the component
