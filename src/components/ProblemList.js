import React, { useState, useEffect } from 'react';

import { BounceLoader } from 'react-spinners';

import Navbar from './Navbar';

import getProblems from '../app-logic/getProblems';

const ProblemList = () => {
	const [problems, setProblems] = useState([]);
	const [loading, setLoading] = useState(true);

	//Use Effect
	useEffect(() => {
		const fetchProblems = async () => {
			//Getting data from firestore.
			const data = await getProblems();
			setProblems(data.docs);
			setLoading(false);
		};
		fetchProblems();
	}, []);
	/* return (
		<div className="ProblemList">
			<Navbar />
			<div className="container">
				<h2 className="text-center mt-3">List of all problems</h2>
			</div>
		</div>
	); */
	//Show loader while fetching data from firestore
	if (loading) {
		return (
			<div className="ProblemList">
				<Navbar />
				<div className="loader">
					<BounceLoader size={100} />
				</div>
			</div>
		);
	} else {
		return (
			<div className="ProblemList">
				<Navbar />
				<div className="container">
					{problems.map((doc) => (
						<div key={doc.id} className="col-md-4 mt-5">
							<h3>{doc.data().title}</h3>
							<p>{doc.data().description}</p>
						</div>
					))}
				</div>
			</div>
		);
	}
};

export default ProblemList;
