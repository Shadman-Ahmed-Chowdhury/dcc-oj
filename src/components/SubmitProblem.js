import React from "react";
import { CodeEditor } from "./CodeEditor";
import "./SubmitProblem.css";

import axios from "axios";
import { Card, Alert } from "react-bootstrap";

import authListener from "../app-logic/authListener";
import getProblemDetails from "../app-logic/getProblemDetails";
import getUserData from "../app-logic/getUserData";

class SubmitProblem extends React.Component {
  state = {
    title: "",
    input: "",
    output: "",
    sourceCode: "",
    langID: "",
    totalAcceptedSubmissions: "",
    totalSubmissions: "",
    loading: true,
    token: "",
    status: "",
    username: "",
    uid: "",
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
        console.log("Logged out");
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
        description: doc.data().description,
        difficulty: doc.data().difficulty,
        input: doc.data().input,
        output: doc.data().output,
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
        language_id: this.state.langID,
        source_code: this.state.sourceCode,
        stdin: "Shadman",
        expected_output: "Hello, Shadman",
      }),
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data.token);
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
        console.log(response.data.status.description);
        if (response.data.status.id === 1 || response.data.status.id === 2) {
          setTimeout(() => this.getSubmission(response.data.token), 3000);
        } else {
          this.setState({
            status: response.data.status.description,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  handleSubmit = (sourceCode, language) => {
    this.setState(
      {
        sourceCode: sourceCode,
        langID: language.id,
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
            submit={this.handleSubmit}
          />
        </div>
        <div>
          <Card border="light" className="verdict">
            <Card.Header>Submission Verdict</Card.Header>
            <Card.Body>
              {this.state.status === "" ? (
                "Your submission verdict will appear here"
              ) : this.state.status === "Accepted" ? (
                <Alert variant="success">Well Done!</Alert>
              ) : (
                <Alert variant="danger">Oops! It's WA!</Alert>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
export default SubmitProblem;
