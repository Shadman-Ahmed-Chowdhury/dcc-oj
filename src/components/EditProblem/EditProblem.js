import React from "react";
import { BounceLoader } from "react-spinners";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";

import "./EditProblem.css";
import authListener from "../../app-logic/authListener";
import getUserData from "../../app-logic/getUserData";
import getProblemDetails from "../../app-logic/getProblemDetails";
import saveUpdatedProblem from "../../app-logic/saveUpdatedProblem";

class EditProblem extends React.Component {
  state = {
    title: "",
    description: "",
    difficulty: "",
    input: "",
    output: "",
    sampleInput: "",
    sampleOutput: "",
    problemSetter: "",
    inputTestCase: "",
    outputTestCase: "",
    totalAcceptedSubmissions: "",
    totalSubmissions: "",
    tutorial: "",
    tags: [],
    ownProblem: false,
    username: "",
    uid: "", //Uid of the problem setter
    loading: true,
    id: "",
  };
  componentDidMount() {
    this.getProblemData();
    authListener().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        const promise = getUserData(user.uid);
        promise.then((doc) => {
          console.log(doc.data().username);
          const uname = doc.data().username;
          console.log(uname);
          this.setState({
            username: uname,
          });
          const userId = doc.data().uid;
          console.log(this.state.uid);
          console.log(userId);
          if (userId === this.state.uid) {
            this.setState({
              ownProblem: true,
            });
          } else {
            window.location.assign("/problems");
          }
        });
      } else {
        console.log("Logged out");
        window.location.assign("/login");
      }
    });
  }

  getProblemData() {
    const id = this.props.match.params.id;
    console.log(id);

    //Get from firestore
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
        inputTestCase: doc.data().testCaseInput,
        outputTestCase: doc.data().testCaseOutput,
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
  handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    console.log(event.target.value);
  };
  handleDescription = (event, editor) => {
    const data = editor.getData();
    this.setState({
      description: data,
    });
    //console.log(data);
  };
  handleInput = (event, editor) => {
    const data = editor.getData();
    this.setState({
      input: data,
    });
    //console.log(data);
  };
  handleConstraints = (event, editor) => {
    const data = editor.getData();
    this.setState({
      constraints: data,
    });
  };
  handleOutput = (event, editor) => {
    const data = editor.getData();
    this.setState({
      output: data,
    });
  };
  handleSampleInput = (event, editor) => {
    const data = editor.getData();
    this.setState({
      sampleInput: data,
    });
  };
  handleSampleOutput = (event, editor) => {
    const data = editor.getData();
    this.setState({
      sampleOutput: data,
    });
  };
  handleTestCaseInput = (event, editor) => {
    const data = editor.getData();
    this.setState({
      inputTestCase: data,
    });
    //console.log(data);
  };
  handleTestCaseOutput = (event, editor) => {
    const data = editor.getData();
    this.setState({
      outputTestCase: data,
    });
    //console.log(data);
  };
  handleTutorial = (event, editor) => {
    const data = editor.getData();
    this.setState({
      tutorial: data,
    });
    //console.log(data);
  };
  createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  updateProblem = (e) => {
    e.preventDefault();
    const id = this.state.id;
    const title = this.state.title;
    const difficulty = this.state.difficulty;
    const description = this.state.description;
    const input = this.state.input;
    const constraints = this.state.constraints;
    const output = this.state.output;
    const sampleInput = this.state.sampleInput;
    const sampleOutput = this.state.sampleOutput;
    const testCaseInput = this.state.inputTestCase;
    const testCaseOutput = this.state.outputTestCase;
    const tutorial = this.state.tutorial;
    const tags = this.state.tags;

    //const tags = tagsString.split(",");

    saveUpdatedProblem(
      id,
      title,
      difficulty,
      description,
      input,
      constraints,
      output,
      sampleInput,
      sampleOutput,
      testCaseInput,
      testCaseOutput,
      tutorial,
      tags
    );
  };
  render() {
    console.log(this.state.ownProblem);
    if (this.state.loading) {
      return (
        <div className="ProblemDetails">
          <div className="loader">
            <BounceLoader size={100} color="#543F6F" />
          </div>
        </div>
      );
    }
    return (
      <div>
        <div>
          <div className="container">
            <h3 className="mt-3">Edit your problem: {this.state.title}</h3>
            <form className="custom-form" onSubmit={this.updateProblem}>
              {/*  title  */}
              <div className="form-group">
                <label htmlFor="title" className="mb-1 mt-2">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  className="form-control input-title"
                  required
                />
              </div>

              {/*  difficulty  */}
              <div className="form-group">
                <label htmlFor="difficulty" className="mb-1 mt-2">
                  Difficulty:
                </label>
                <select
                  value={this.state.difficulty}
                  onChange={this.handleChange}
                  name="difficulty"
                  className="form-control form-select input-title"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/*  description  */}
              <div className="form-group">
                <label className="mb-1 mt-2">Description:</label>
                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    //console.log('Editor is ready to use!', editor);
                  }}
                  onChange={this.handleDescription}
                  className="form-control desc"
                  data={this.state.description}
                  required
                />
              </div>

              {/* input */}
              <div className="form-group">
                <label className="mb-1 mt-2">Input:</label>
                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    //console.log('Editor is ready to use!', editor);
                  }}
                  onChange={this.handleInput}
                  className="form-control"
                  data={this.state.input}
                  required
                />
              </div>

              {/* constraints */}
              <div className="form-group">
                <label className="mb-1 mt-2">Constraints:</label>
                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    //console.log('Editor is ready to use!', editor);
                  }}
                  onChange={this.handleConstraints}
                  className="form-control"
                  data={this.state.constraints}
                  required
                />
              </div>

              {/* output */}
              <div className="form-group">
                <label className="mb-1 mt-2">Output:</label>
                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    //console.log('Editor is ready to use!', editor);
                  }}
                  onChange={this.handleOutput}
                  className="form-control"
                  data={this.state.output}
                  required
                />
              </div>

              {/* sampleInput */}
              <div className="form-group">
                <label className="mb-1 mt-2">Sample Input:</label>
                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    //console.log('Editor is ready to use!', editor);
                  }}
                  onChange={this.handleSampleInput}
                  className="form-control"
                  data={this.state.sampleInput}
                />
              </div>

              {/* sampleOutput */}
              <div className="form-group">
                <label className="mb-1 mt-2">Sample Output:</label>
                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    //console.log('Editor is ready to use!', editor);
                  }}
                  onChange={this.handleSampleOutput}
                  className="form-control"
                  data={this.state.sampleOutput}
                  required
                />
              </div>

              {/*  inputTestCase  */}
              <div className="form-group">
                <label className="mb-1 mt-2">Test Case - Input:</label>
                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    //console.log('Editor is ready to use!', editor);
                  }}
                  onChange={this.handleTestCaseInput}
                  config={{
                    toolbar: [],
                  }}
                  className="form-control"
                  data={this.state.inputTestCase}
                  required
                />
              </div>

              {/*  outputTestCase  */}
              <div className="form-group">
                <label className="mb-1 mt-2">Test Case - Output:</label>
                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    //console.log('Editor is ready to use!', editor);
                  }}
                  onChange={this.handleTestCaseOutput}
                  config={{
                    toolbar: [],
                  }}
                  className="form-control"
                  data={this.state.outputTestCase}
                  required
                />
              </div>

              {/* tutorial */}
              <div className="form-group">
                <label className="mb-1 mt-2">Tutorial: </label>
                <CKEditor
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    //console.log('Editor is ready to use!', editor);
                  }}
                  onChange={this.handleTutorial}
                  className="form-control"
                  data={this.state.tutorial}
                />
              </div>

              {/*  tags  */}
              <div className="form-group">
                <label htmlFor="tags" className="mb-1 mt-2">
                  Tags:
                </label>
                <input
                  type="text"
                  name="tags"
                  className="form-control"
                  placeholder="Enter the tags by comma(e.g. implementation, math, string)"
                  value={this.state.tags}
                  onChange={this.handleChange}
                />
              </div>

              {/* submit btn */}
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-sm btn-style mt-3 mb-3"
                  value="Update Problem"
                />
              </div>
            </form>
          </div>

          {/* <div
					className="preview"
					dangerouslySetInnerHTML={this.createMarkup(this.state.sampleInput)}
				></div> */}
        </div>
      </div>
    );
  }
}

export default EditProblem;
