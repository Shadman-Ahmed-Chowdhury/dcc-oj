import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Importing Global CSS File
import "./App.css";

//Importing Components
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProblemList from "./components/ProblemList";
import AddProblem from "./components/AddProblem";
import ProblemDetails from "./components/ProblemDetails";
import SubmitProblem from "./components/SubmitProblem";
import SubmissionList from "./components/SubmissionList";
import About from "./components/About";
import Docs from "./components/Docs";
import Navbar from "./components/Navbar";

import fireConfig from "./firebaseConfig/config";

class App extends React.Component {
  state = {
    user: null,
  };

  async componentDidMount() {
    await this.authListener();
  }

  authListener() {
    fireConfig.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        //window.location.assign('/login');
      }
    });
  }
  render() {
    let authUser = this.state.user;
    return (
      <div>
        <Router>
          <Navbar user={authUser} />
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
            <Route
              path="/problems/new"
              render={() => <AddProblem user={authUser} />}
            />
            {/* <Route path="/problems/new" exact component={AddProblem} /> */}
            <Route
              path="/submit/:id"
              render={(props) => <SubmitProblem user={authUser} {...props} />}
            />
            {/* <Route path="/submit/:id" exact component={SubmitProblem} /> */}
            <Route path="/submissions" exact component={SubmissionList} />

            <Route path="/about" exact component={About} />
            <Route path="/docs" exact component={Docs} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
