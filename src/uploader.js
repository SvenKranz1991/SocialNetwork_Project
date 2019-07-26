import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    upload(e) {
        console.log("upload click!");
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append("file", file);

        axios
            .post("/upload", formData)
            .then(({ data }) => {
                if (data.success) {
                    console.log(data);
                    this.props.done(data.data);
                } else {
                    console.log("upload fail");
                }
            })
            .catch(function(err) {
                console.log("err in upload(e):", err);
            });
    }
    close() {
        console.log("closeClick");
        this.props.close();
    }
    render() {
        return (
            <div className="modal">
                <button className="close-btn" onClick={e => this.close(e)}>
                    Close
                </button>
                <h1>Want to change your profile image?</h1>
                <input
                    onChange={e => this.upload(e)}
                    name="file"
                    type="file"
                    id="file"
                    className="inputfile"
                    accept="image/*"
                />
                <br />
                <label htmlFor="file">Upload</label>
            </div>
        );
    }
}
