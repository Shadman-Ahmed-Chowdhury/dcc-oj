import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";

import "./AddProblem.css";
import saveProblem from "../../app-logic/saveProblem";
import authListener from "../../app-logic/authListener";
import getUserData from "../../app-logic/getUserData";

class AddProblem extends React.Component {
  state = {
    title: "",
    difficulty: "Easy",
    description: "",
    input: "",
    constraints: "",
    output: "",
    sampleInput: "",
    sampleOutput: "",
    inputTestCase: "",
    outputTestCase: "",
    username: "",
    tutorial: "",
    tags: "",
  };
  componentDidMount() {
    authListener().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        const promise = getUserData(user.uid);
        promise.then((doc) => {
          console.log(doc.data().username);
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

  addProblem = (e) => {
    e.preventDefault();

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
    const problemSetter = this.state.username;
    const tutorial = this.state.tutorial;
    const tagsString = this.state.tags;
    const uid = this.state.uid;

    const tags = tagsString.split(",");

    //Generating ID;
    var d = new Date();
    var id = Date.parse(d).toString();

    saveProblem(
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
      problemSetter,
      tutorial,
      tags,
      uid
    );
  };
  render() {
    return (
      <div>
        <div className="container">
          <h3 className="mt-3">Add a custom problem</h3>
          <form className="custom-form" onSubmit={this.addProblem}>
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
                required
              />
            </div>
            {/* tutorial */}
            <div className="form-group">
              <label className="mb-1 mt-2">Tutorial:</label>
              <CKEditor
                editor={ClassicEditor}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  //console.log('Editor is ready to use!', editor);
                }}
                onChange={this.handleTutorial}
                className="form-control"
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
                value="Add Problem"
              />
            </div>
          </form>
        </div>

        {/* <div
					className="preview"
					dangerouslySetInnerHTML={this.createMarkup(this.state.sampleInput)}
				></div> */}
      </div>
    );
  }
}

export default AddProblem;
