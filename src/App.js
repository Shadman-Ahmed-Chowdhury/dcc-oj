import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Importing Global CSS File
import './App.css';

//Importing Components
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProblemList from './components/ProblemList';
import AddProblem from './components/AddProblem';
import ProblemDetails from './components/ProblemDetails';
import SubmitProblem from './components/SubmitProblem';
import SubmissionList from './components/SubmissionList';
import Navbar from './components/Navbar';

function App() {
	return (
		<div>
			<Router>
				<Navbar />
				<div>
					<Route path="/" exact component={Home} />
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<Route path="/problems" exact component={ProblemList} />
					<Route
						path="/problems/details/:id"
						exact
						component={ProblemDetails}
					/>
					<Route path="/problems/new" exact component={AddProblem} />
					<Route path="/submit/:id" exact component={SubmitProblem} />
					<Route path="/submissions" exact component={SubmissionList} />
				</div>
			</Router>
		</div>
	);
}

export default App;
