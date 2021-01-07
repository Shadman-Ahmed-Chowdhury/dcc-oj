import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DOMPurify from 'dompurify';

import './AddProblem.css';

class AddProblem extends React.Component {
	state = {
		title: '',
		description: '',
		input: '',
		constraints: '',
		output: '',
		sampleInput: '',
		sampleOutput: '',
		testCase: '',
	};
	handleChange = (event) => {
		const target = event.target;
		const { name, value } = target;
		this.setState({
			[name]: value,
		});
		console.log(value);
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

	createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	addProblem = (e) => {
		e.preventDefault();

		const title = this.state.
	}
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

						{/*  testCase  */}
						<div className="form-group">
							<label htmlFor="title" className="mb-1 mt-2">
								Test Case:
							</label>
							<textarea
								name="testCase"
								value={this.state.testCase}
								onChange={this.handleChange}
								placeholder="Paste your test case here"
								className="form-control input-title"
								required
								rows="3"
							></textarea>
						</div>

						{/* submit btn */}
						<div className="form-group">
							<input
								type="submit"
								className="btn btn-sm btn-outline-dark mt-3 mb-3"
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
