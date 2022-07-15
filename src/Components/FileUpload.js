import React from "react";
import axios from "axios";

class FileUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      selectedFile: event.target.files,
    });
  }

  async submit(e) {
    console.log("hh");
    const data = new FormData();
    const TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTc4MDE4MTMsImlkeCI6MiwiaWF0IjoxNjU3NzE1NDEzfQ.REFNF7CBYXRUbzWW9YWM4l5IJKSlch8iTyaSz6xZNBU";
    // data.append("file", this.state.selectedFile);
    for (let i = 0; i < this.state.selectedFile.length; i++) {
      data.append(`file`, this.state.selectedFile[i]);
      console.log(i, ":", this.state.selectedFile[i]);
    }
    console.warn(this.state.selectedFile);

    // try {
    //   const response = await fetch("https://bluy29.com/api/uploads/housings/", {
    //     method: "POST",
    //     body: data,
    //   });
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   console.log(response);
    // } catch (err) {
    //   console.log(err);
    // }

    axios({
      method: "post",
      url: "https://bluy29.com/api/uploads/housings/",
      headers: {
        "x-jwt": TOKEN,
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "multipart/form-data",
        "Content-Type": "text/plain",
      },
      data,
    }).then((res) => {
      // then print response status
      console.warn(res);
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <br />
            <br />

            <h3 className="text-white">
              React File Upload Example - Tutsmake.com
            </h3>
            <br />
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="text-white">Select File :</label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  multiple
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-6">
                <button
                  type="submit"
                  className="btn btn-dark"
                  onClick={() => this.submit()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
