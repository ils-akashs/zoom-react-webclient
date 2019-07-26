import React from "react";
import Iframe from "./Iframe";

export class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student_email: "",
      meeting_id: "",
      showIframe: false,
      join_url: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ student_email: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:8000/joinmeeting?email=${this.state.student_email}`)
      .then(response => response.json())
      .then(result => {
        console.log(result[result.length - 1].meeting_id);
        this.setState({
          meeting_id: result[result.length - 1].meeting_id,
          join_url: result[result.length - 1].join_url,
          showIframe: true
        });
      });
  }

  //

  render() {
    const links = {
      frame: `<div class="iframe-container" style="overflow: hidden; padding-top: 56.25%; position: relative;">
      <iframe allow="microphone; camera" style="border: 0; height: 50%; left: 0; position: absolute; top: 0; width: 50%;" src="https://success.zoom.us/wc/join/${
        this.state.meeting_id
      }" frameborder="0"></iframe> </div>`
    };
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Student's Email:
            <input
              placeholder="Enter your email"
              type="text"
              value={this.state.student_email}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <br />
          <input type="submit" value="Join Class" />
        </form>
        {this.state.showIframe ? <Iframe iframe={links["frame"]} /> : null}
      </div>
    );
  }
}
