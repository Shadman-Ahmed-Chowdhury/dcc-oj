import React from "react";
import { CodeEditor } from "./CodeEditor";
import "./SubmitProblem.css";

import axios from "axios";
import { Card, Alert } from "react-bootstrap";
import saveSubmission from "../app-logic/saveSubmission";
import authListener from "../app-logic/authListener";
import getProblemDetails from "../app-logic/getProblemDetails";
import getUserData from "../app-logic/getUserData";

class SubmitProblem extends React.Component {
  state = {
    title: "",
    stdin: "",
    expected_output: "",
    source_code: "",
    language_id: "",
    language: "",
    totalAcceptedSubmissions: "",
    totalSubmissions: "",
    loading: true,
    token: "",
    status: "",
    username: "",
    uid: "",
    problemId: "",
  };
  componentDidMount() {
    authListener().onAuthStateChanged((user) => {
      if (user) {
        const promise = getUserData(user.uid);
        promise.then((doc) => {
          const uname = doc.data().username;
          this.setState({
            username: uname,
            uid: user.uid,
          });
        });
      } else {
        window.location.assign("/login");
      }
    });
    this.loadProblemDetails();
  }

  loadProblemDetails() {
    const id = this.props.match.params.id;
    const promise = getProblemDetails(id);
    promise.then((doc) => {
      this.setState({
        title: doc.data().title,
        problemId: id,
        description: doc.data().description,
        difficulty: doc.data().difficulty,
        stdin: doc.data().sampleInput,
        expected_output: doc.data().sampleOutput,
        totalAcceptedSubmissions: doc.data().totalAcceptedSubmissions,
        totalSubmissions: doc.data().totalSubmissions,
        loading: false,
      });
    });
  }
  submitToJudge() {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": process.env.REACT_APP_JUDGE_API_KEY,
        "x-rapidapi-host": process.env.REACT_APP_JUDGE_API_HOST,
      },
      data: JSON.stringify({
        language_id: this.state.language_id,
        source_code: this.state.source_code,
        stdin: this.state.stdin,
        expected_output: this.state.expected_output,
      }),
    };
    axios
      .request(options)
      .then((response) => {
        this.setState(
          {
            token: response.data.token,
          },
          () => {
            setTimeout(() => this.getSubmission(response.data.token), 3000);
          }
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  getSubmission = (token) => {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_JUDGE_API_KEY,
        "x-rapidapi-host": process.env.REACT_APP_JUDGE_API_HOST,
      },
    };

    axios
      .request(options)
      .then((response) => {
        if (response.data.status.id === 1 || response.data.status.id === 2) {
          setTimeout(() => this.getSubmission(response.data.token), 3000);
        } else {
          this.setState(
            {
              status: response.data.status.description,
            },
            () => {
              const date = new Date();
              const submissionId = Date.parse(date).toString();
              const submissionData = {
                submissionId: submissionId,
                token: response.data.token,
                when: date.toUTCString(),
                problemId: this.state.problemId,
                problemTitle: this.state.title,
                uid: this.state.uid,
                username: this.state.username,
                sourceCode: this.state.source_code,
                language: this.state.language,
                verdict: this.state.status,
                time: response.data.time,
                memory: response.data.time,
              };
              saveSubmission(submissionData);
              console.log(submissionData);
            }
          );
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  handleSubmissionData = (source_code, language) => {
    this.setState(
      {
        source_code: source_code,
        language_id: language.id,
        language: language.name,
      },
      () => {
        this.submitToJudge();
      }
    );
  };
  render() {
    return (
      <div className="container submission-container">
        <div>
          <h2> Submit your solution for problem: {this.state.title}</h2>
          <CodeEditor
            getCodeFromCodeEditor={this.getCodeFromCodeEditor}
            getLanguageId={this.getLanguageId}
            submitButton={this.handleSubmissionData}
          />
        </div>
        <div>
          <Card border="light" className="verdict">
            <Card.Header>Submission Verdict</Card.Header>
            <Card.Body>
              {this.state.status === "" ? (
                "Your submission verdict will appear here"
              ) : this.state.status === "Accepted" ? (
                <Alert variant="success">{this.state.status}</Alert>
              ) : (
                <Alert variant="danger">{this.state.status}</Alert>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
export default SubmitProblem;
