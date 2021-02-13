import React from "react";
import "./Profile.css";

import authListener from "../../app-logic/authListener";
import getUserData from "../../app-logic/getUserData";
import getSubmissions from "../../app-logic/getSubmissions";
import { Link } from "react-router-dom";
import CodeViewer from "../CodeViewer/CodeViewer";

class Profile extends React.Component {
  state = {
    username: "",
    email: "",
    uid: "",
    numberOfSolve: 0,
    numberOfSubmissions: 0,
    submissions: [],
    openCodeViewer: false,
    codeViewerCode: "",
  };

  async componentDidMount() {
    authListener().onAuthStateChanged((user) => {
      if (user) {
        const promise = getUserData(user.uid);
        promise.then((doc) => {
          const uname = doc.data().username;
          this.setState(
            {
              username: uname,
              uid: user.uid,
              email: doc.data().email,
            },
            async () => {
              const {
                submissions,
                numberOfSolve,
                numberOfSubmissions,
              } = await this.getUserSubmissions();
              this.setState({
                submissions: submissions,
                numberOfSolve: numberOfSolve,
                numberOfSubmissions: numberOfSubmissions,
              });
            }
          );
        });
      } else {
        console.log("Logged out");
        window.location.assign("/login");
      }
    });
  }
  async getUserSubmissions() {
    const data = await getSubmissions();
    let submissions = [];
    let numberOfSolve = 0;
    let numberOfSubmissions;
    data.docs.forEach((doc) => {
      if (doc.data().uid === this.state.uid) {
        const {
          submissionId,
          sourceCode,
          when,
          problemId,
          problemTitle,
          language,
          verdict,
          time,
          memory,
        } = doc.data();
        if (verdict === "Accepted") numberOfSolve++;
        submissions.push({
          submissionId,
          sourceCode,
          when,
          problemId,
          problemTitle,
          language,
          verdict,
          time,
          memory,
        });
      }
      numberOfSubmissions = submissions.length;
    });
    return { submissions, numberOfSolve, numberOfSubmissions };
  }
  toggleCodeViewer() {
    this.setState({ openCodeViewer: !this.state.openCodeViewer });
  }
  setCodeViewerCode(sourceCode) {
    this.setState({
      codeViewerCode: sourceCode,
    });
    this.toggleCodeViewer();
  }
  render() {
    console.log(this.openCodeViewer);
    return (
      <div className="container" center>
        <div className="row gutters-sm mt-3">
          <div className="col-md-3 mb-3">
            <div className="card profile-custom-card">
              <div className="profile-card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="../assets/avatar.png"
                    alt="Avatar"
                    className="rounded-circle m-3 img-thumbnail"
                    width="120"
                  />
                  <div className="mb-3">
                    <h4>{this.state.username}</h4>

                    <p>
                      <strong>Email: </strong>
                      {this.state.email}
                    </p>
                    <hr />
                    <p>Final Year Student of DCC, CSE</p>
                    <button className="btn btn-style">Edit Profile </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mb-3" style={{ margin: "1.2rem 0px" }}>
              <div className="profile-custom-card card">
                <div className="profile-card-body">
                  <h1 className="text-center">Submissions</h1>
                  <h1 className="text-center">
                    {this.state.numberOfSubmissions}
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="profile-custom-card card">
                <div className="profile-card-body">
                  <h1 className="text-center">Solved</h1>
                  <h1 className="text-center">{this.state.numberOfSolve}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 mb-3">
            <div className="card profile-custom-card">
              <div className="profile-card-body">
                <h2 className="text-center">Submission History</h2>

                <table className="table" style={{ fontSize: "14px" }}>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">When</th>
                      <th scope="col">Problem</th>
                      <th scope="col">Language</th>
                      <th scope="col">Verdict</th>
                      <th scope="col">Time (s)</th>
                      <th scope="col">Memory (KB)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.submissions.map((data) => (
                      <tr key={data.submissionId} className="col-md-4 mt-3">
                        <td>
                          <button
                            className="btn-style btn btn-sm"
                            onClick={() =>
                              this.setCodeViewerCode(data.sourceCode)
                            }
                          >
                            {data.submissionId}
                          </button>
                          <CodeViewer
                            show={this.openCodeViewer}
                            onHide={() => this.toggleCodeViewer(false)}
                            sourceCode={this.CodeViewerCode}
                            username={data.username}
                            problemTitle={data.problemTitle}
                            verdict={data.verdict}
                          />
                        </td>
                        <td>{data.when}</td>
                        <td>
                          <Link
                            to={`/problems/details/${data.problemId}`}
                            className="title"
                            style={{ fontSize: "14px" }}
                          >
                            {data.problemTitle}
                          </Link>
                        </td>
                        <td>{data.language}</td>
                        <td
                          className={
                            data.verdict === "Accepted"
                              ? "accepted"
                              : data.verdict === "Wrong Answer"
                              ? "wa"
                              : "error"
                          }
                        >
                          {data.verdict}
                        </td>
                        <td>{data.time}</td>
                        <td>{data.memory}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5"></div>
        </div>
      </div>
    );
  }
}

export default Profile;
