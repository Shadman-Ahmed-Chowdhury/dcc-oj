import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Importing Global CSS File
import './App.css';

//Importing Components
import Home from './components/Home';
import Login from './components/Login';
import ProblemList from './components/ProblemList';
import SubmissionList from './components/SubmissionList';

function App() {
	return (
		<div>
			<Router>
				<div>
					<Route path="/" exact component={Home} />
					<Route path="/login" exact component={Login} />
					<Route path="/problems" exact component={ProblemList} />
					<Route path="/submissions" exact component={SubmissionList} />
				</div>
			</Router>
		</div>
	);
}

export default App;
