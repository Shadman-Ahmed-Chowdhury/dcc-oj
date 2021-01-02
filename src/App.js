import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Importing Global CSS File
import "./App.css";

//Importing Components
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </div>
      </Router>
    </div>
  );
}

export default App;
