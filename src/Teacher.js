import React from "react";
import Iframe from "./Iframe";
//import Iframe from 'react-iframe'

export class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher_email: "",
      meeting_id: "",
      showIframe: false,
      start_url: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ teacher_email: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:8000/joinmeeting?email=${this.state.teacher_email}`)
      .then(response => response.json())
      .then(result => {
        console.log(result[result.length - 1].meeting_id);
        this.setState({
          meeting_id: result[result.length - 1].meeting_id,
          start_url: result[result.length - 1].start_url,
          showIframe: true
        });
      });
  }
  //

  render() {
    const links = {
      frame: `<div class="iframe-container" style="overflow: hidden; padding-top: 56.25%; position: relative;">
      <iframe allow="microphone; camera" style="border: 0; height: 50%; left: 0; position: absolute; top: 0; width: 50%;" src="https://zoom.us/wc/${
        this.state.meeting_id
      }/start" frameborder="0"></iframe> </div>`
    };
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Teacher's Email:
            <input
              placeholder="Enter your email"
              type="text"
              value={this.state.teacher_email}
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
