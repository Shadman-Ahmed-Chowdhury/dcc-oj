import React from 'react';

const ProblemDetails = (props) => {
	const { id } = props.match.params;
	return (
		<div>
			<h2>ProblemDetails with Id = {id}</h2>
		</div>
	);
};

export default ProblemDetails;
