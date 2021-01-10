import React from 'react';

import authListener from '../app-logic/authListener';
class SubmissionList extends React.Component {
	componentDidMount() {
		authListener();
	}
	render() {
		return (
			<div>
				<h3>All Submissions</h3>
			</div>
		);
	}
}

export default SubmissionList;
