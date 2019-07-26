import React from "react";

export class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student_email: "",
      teacher_email: "",
      meetings: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    fetch("http://localhost:8000/meetings")
      .then(meetings => meetings.json())
      .then(meets => {
        this.setState({ meetings: meets });
        console.log(meets);
      });
  }
  handleSubmit(event) {
    event.preventDefault();

    const req_body = {
      student_email: this.state.student_email,
      teacher_email: this.state.teacher_email
    };

    fetch("http://localhost:8000/createmeeting", {
      method: "POST",
      body: JSON.stringify(req_body),
      headers: {
        "content-type": "application/json"
      }
    }).then(response => {
      console.log(response);
    });
  }

  render() {
    const { meetings } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Student Email:
            <input
              name="student_email"
              type="text"
              value={this.state.student_email}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Teacher Email:
            <input
              name="teacher_email"
              type="text"
              value={this.state.teacher_email}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <input type="submit" value="Create Meeting" />
        </form>

        <ol>
          {meetings.map(meeting => (
            <div>
              <li key={meeting._id}>{meeting.id}</li>
              <li key={meeting._id}>Teacher Email: {meeting.teacher_email}</li>
              <li key={meeting._id}>Student Email: {meeting.student_email}</li>
              <li key={meeting._id}>Start_URL: {meeting.start_url}</li>
              <li key={meeting._id}>Join_URL: {meeting.join_url}</li>
            </div>
          ))}
        </ol>
      </div>
    );
  }
}
