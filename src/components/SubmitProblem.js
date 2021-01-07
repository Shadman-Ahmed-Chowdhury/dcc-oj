import React from "react";
import { CodeEditor } from "./CodeEditor";
import "./SubmitProblem.css";
import getProblemDetails from "../app-logic/getProblemDetails";
import axios from "axios";
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
  };
  componentDidMount() {
    this.loadProblemDetails();
  }

  loadProblemDetails() {
    const id = this.props.match.params.id;
    console.log(id);

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
        stdin: "Mow",
        expected_output: "Hello, Shadman",
      }),
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data.token);
        setTimeout(() => this.getSubmission(response.data.token), 3000);
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
      .then(function (response) {
        console.log(response.data.status.description);
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
    console.log(
      JSON.stringify({
        language_id: this.state.langID,
        source_code: this.state.sourceCode,
      })
    );
    return (
      <div className="container">
        <h2> Submit your solution for problem: {this.state.title}</h2>
        <CodeEditor
          getCodeFromCodeEditor={this.getCodeFromCodeEditor}
          getLanguageId={this.getLanguageId}
          submit={this.handleSubmit}
        />
      </div>
    );
  }
}
export default SubmitProblem;
