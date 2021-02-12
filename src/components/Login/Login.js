import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

import loginUser from "../../app-logic/loginUser";
class Login extends React.Component {
  login = (e) => {
    e.preventDefault();
    console.log("Login button clicked");
    const email = this.email.value;
    const password = this.password.value;

    if (email === "" || password === "") {
      alert("Email or Password can't be empty");
    } else {
      loginUser(email, password);
      console.log(email);
      this.formReset();
    }
  };
  formReset() {
    this.email.value = "";
    this.password.value = "";
  }
  render() {
    return (
      <div className="login">
        <form onSubmit={this.login}>
          <h2 className="text-center text">Welcome to DCC OJ</h2>

          <h3 className="text-center text">Login</h3>

          <div className="loginForm">
            <div className="form-group">
              <label htmlFor="email" className="mt-2 mb-2 text">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                ref={(input) => (this.email = input)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="mt-2 mb-2 text">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                ref={(input) => (this.password = input)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-dark mt-3 loginBtn">
                Login
              </button>
            </div>
          </div>
        </form>
        <p className="text-center mt-3 text">
          Don't have an account?{" "}
          <Link to="/register" className="registerLink">
            Register Now!
          </Link>
        </p>
      </div>
    );
  }
}

export default Login;
