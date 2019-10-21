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
    close(e) {
        console.log("closeClick");
        this.props.close();
    }
    render() {
        return (
            <div className="popup">
                <div className="popup__content">
                    <div className="popup__left">
                        <h1 className="popup__text ">
                            Want to change your profile image?
                        </h1>
                        <img
                            src={`${this.props.url}`}
                            className="popup__image"
                        ></img>
                    </div>

                    <div className="popup__right">
                        <a
                            className="popup__close"
                            onClick={e => this.close(e)}
                        >
                            &times;
                        </a>
                        <input
                            onChange={e => this.upload(e)}
                            name="file"
                            type="file"
                            id="file"
                            className="popup__inputfile"
                            accept="image/*"
                            required
                        />

                        <label htmlFor="file" className="popup__upload">
                            <i className="fas fa-upload"></i> Choose file
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

// for showing image in uploader -->                 <img src={this.props.url} height="100px" width="100px" />
