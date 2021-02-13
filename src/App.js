import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Importing Global CSS File
import "./App.css";

//Importing Components
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProblemList from "./components/ProblemList/ProblemList";
import AddProblem from "./components/AddProblem/AddProblem";
import EditProblem from "./components/EditProblem/EditProblem";
import ProblemDetails from "./components/ProblemDetails/ProblemDetails";
import SubmitProblem from "./components/SubmitProblem/SubmitProblem";
import SubmissionList from "./components/SubmissionList/SubmissionList";
import Profile from "./components/Profile/Profile";
import About from "./components/About/About";
import Docs from "./components/Docs/Docs";
import Navbar from "./components/Navbar/Navbar";

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
          {/* <Route
            path="/problems/new"
            render={() => <AddProblem user={authUser} />}
          /> */}
          <Route path="/problems/new" exact component={AddProblem} />
          {/* <Route
            path="/submit/:id"
            render={(props) => <SubmitProblem user={authUser} {...props} />}
          /> */}
          <Route path="/problems/edit/:id" exact component={EditProblem} />
          <Route path="/submit/:id" exact component={SubmitProblem} />
          <Route path="/submissions" exact component={SubmissionList} />
          <Route path="/profile/:username" exact component={Profile} />

          <Route path="/about" exact component={About} />
          <Route path="/docs" exact component={Docs} />
        </div>
      </Router>
    </div>
  );
}

export default App;
