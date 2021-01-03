import React from 'react';
import { BounceLoader } from 'react-spinners';

import './ProblemDetails.css';

import Navbar from './Navbar';

import getProblemDetails from '../app-logic/getProblemDetails';

class ProblemDetails extends React.Component {
	state = {
		title: '',
		description: '',
		difficulty: '',
		input: '',
		output: '',
		sampleInput: '',
		sampleOutput: '',
		problemSetter: '',
		totalAcceptedSubmissions: '',
		totalSubmissions: '',
		tags: [],
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
				sampleInput: doc.data().sampleInput,
				sampleOutput: doc.data().sampleOutput,
				problemSetter: doc.data().problemSetter,
				totalAcceptedSubmissions: doc.data().totalAcceptedSubmissions,
				totalSubmissions: doc.data().totalSubmissions,
				tags: doc.data().tags,
				loading: false,
			});
		});
	}

	render() {
		if (this.state.loading) {
			return (
				<div className="ProblemDetails">
					<Navbar />
					<div className="loader">
						<BounceLoader size={100} />
					</div>
				</div>
			);
		}
		return (
			<div>
				<Navbar />
				<div className="container">
					<div className="row">
						<div className="col-md-9 mt-3">
							<h3>{this.state.title}</h3>

							<h6>Description</h6>
							<p className="content">{this.state.description}</p>

							<h6>Input</h6>
							<p className="content">{this.state.input}</p>

							<h6>Output</h6>
							<p className="content">{this.state.output}</p>

							<h6>Sample Input</h6>
							<p className="content">{this.state.sampleInput}</p>

							<h6>Sample Output</h6>
							<p className="content">{this.state.sampleOutput}</p>

							<button className="btn btn-sm btn-outline-dark">
								Submit Solution
							</button>
						</div>
						<div className="col-md-3 mt-5 list">
							<ul class="list-group">
								<li class="list-group-item">
									Setter: {this.state.problemSetter}
								</li>
								<li class="list-group-item ">
									Difficulty: {this.state.difficulty}
								</li>
								<li class="list-group-item ">Time Limit: 2s</li>
								<li class="list-group-item ">Memory Limit: 256MB</li>
								<li class="list-group-item ">
									Tags:
									{this.state.tags.map((tag) => {
										return <div>{tag}</div>;
									})}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProblemDetails;
