import React from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import DOMPurify from "dompurify";
import Modal from "react-bootstrap/Modal";

import "./ProblemDetails.css";

import getProblemDetails from "../../app-logic/getProblemDetails";
import authListener from "../../app-logic/authListener";
import getUserData from "../../app-logic/getUserData";

class ProblemDetails extends React.Component {
  state = {
    title: "",
    description: "",
    difficulty: "",
    input: "",
    output: "",
    sampleInput: "",
    sampleOutput: "",
    problemSetter: "",
    totalAcceptedSubmissions: "",
    totalSubmissions: "",
    tags: [],
    uid: "",
    loading: true,
    ownProblem: false,
    id: "",
    show: false,
  };
  componentDidMount() {
    this.loadProblemDetails();
    authListener().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        const promise = getUserData(user.uid);
        promise.then((doc) => {
          //console.log(doc.data().username);
          const userId = doc.data().uid;
          console.log(this.state.uid);
          console.log(userId);
          if (userId === this.state.uid) {
            this.setState({
              ownProblem: true,
            });
          }
        });
      } else {
        console.log("Logged out");
        //window.location.assign('/login');
      }
    });
  }
  setShow = (bool) => {
    this.setState({
      show: bool,
    });
    console.log(this.state.show);
  };

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
        constraints: doc.data().constraints,
        output: doc.data().output,
        sampleInput: doc.data().sampleInput,
        sampleOutput: doc.data().sampleOutput,
        problemSetter: doc.data().problemSetter,
        totalAcceptedSubmissions: doc.data().totalAcceptedSubmissions,
        totalSubmissions: doc.data().totalSubmissions,
        tutorial: doc.data().tutorial,
        tags: doc.data().tags,
        uid: doc.data().uid,
        loading: false,
        id: id,
      });
    });
  }

  submitBtn = () => {
    const id = this.props.match.params.id;
    this.props.history.push(`/submit/${id}`);
  };
  createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="ProblemDetails">
          <div className="loader">
            <BounceLoader size={100} color="#543F6F" />
          </div>
        </div>
      );
    }
    console.log(this.state.ownProblem);
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-9 mt-3">
              <h3>{this.state.title}</h3>

              <h6>Description</h6>
              <p
                className="content"
                dangerouslySetInnerHTML={this.createMarkup(
                  this.state.description
                )}
              ></p>

              <h6>Input</h6>
              <p
                className="content"
                dangerouslySetInnerHTML={this.createMarkup(this.state.input)}
              ></p>

              <h6>Constraints</h6>
              <p
                className="content"
                dangerouslySetInnerHTML={this.createMarkup(
                  this.state.constraints
                )}
              ></p>

              <h6>Output</h6>
              <p
                className="content"
                dangerouslySetInnerHTML={this.createMarkup(this.state.output)}
              ></p>

              <h6>Sample Input</h6>
              <p
                className="content"
                dangerouslySetInnerHTML={this.createMarkup(
                  this.state.sampleInput
                )}
              ></p>

              <h6>Sample Output</h6>
              <p
                className="content"
                dangerouslySetInnerHTML={this.createMarkup(
                  this.state.sampleOutput
                )}
              ></p>

              <button
                className="btn btn-sm btn-style mb-5"
                onClick={this.submitBtn}
              >
                Submit Solution
              </button>
            </div>
            <div className="col-md-3">
              <div className="mt-5 list">
                <ul className="list-group">
                  <li className="list-group-item">
                    Setter: {this.state.problemSetter}
                  </li>
                  <li className="list-group-item ">
                    Difficulty: {this.state.difficulty}
                  </li>
                  <li className="list-group-item ">Time Limit: 2s</li>
                  <li className="list-group-item ">Memory Limit: 256MB</li>
                  <li className="list-group-item">
                    <button
                      className="btn btn-style"
                      onClick={() => this.setShow(true)}
                    >
                      Read Tutorials
                    </button>
                  </li>

                  <Modal
                    show={this.state.show}
                    onHide={() => this.setShow(false)}
                    dialogClassName="modal-180w"
                    aria-labelledby="example-custom-modal-styling-title"
                    centered
                  >
                    <Modal.Header>
                      <Modal.Title id="example-custom-modal-styling-title">
                        Tutorials/Hints for problem {this.state.title}.
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>{this.state.tutorial}</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className={"btn-style btn-sm btn"}
                        onClick={() => this.setShow(false)}
                      >
                        Close
                      </button>
                    </Modal.Footer>
                  </Modal>

                  <li className="list-group-item">
                    Tags:
                    {this.state.tags.map((tag) => {
                      return (
                        <div key={tag}>
                          <span className="badge badge-dark">{tag}</span>
                        </div>
                      );
                    })}
                  </li>
                </ul>
              </div>
              {this.state.ownProblem ? (
                <div className="mt-3">
                  <Link
                    to={`/problems/edit/${this.state.id}`}
                    className="btn btn-sm btn-style"
                  >
                    Edit Problem
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProblemDetails;
