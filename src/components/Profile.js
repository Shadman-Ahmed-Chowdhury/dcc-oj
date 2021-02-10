import React from "react";

import "./Profile.css";

import authListener from "../app-logic/authListener";
import getUserData from "../app-logic/getUserData";

class Profile extends React.Component {
  state = {
    username: "",
    email: "",
    uid: "",
    numberOfSolve: 0,
    numberOfSubmissions: 0,
  };
  componentDidMount() {
    authListener().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        const promise = getUserData(user.uid);
        promise.then((doc) => {
          console.log(doc.data().username);
          const uname = doc.data().username;
          this.setState({
            username: uname,
            uid: user.uid,
            numberOfSolve: doc.data().numberOfSolve,
            numberOfSubmissions: doc.data().numberOfSubmissions,
            email: doc.data().email,
          });
        });
      } else {
        console.log("Logged out");
        window.location.assign("/login");
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row gutters-sm mt-3">
          <div className="col-md-5 mb-3">
            <div className="card custom-card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://lh3.googleusercontent.com/-izGQ-LUODI0/YBjnuaCmiPI/AAAAAAAAEBQ/_8vRbwjMm-Yb-yCFEDqE8yxBNPpRfyanwCK8BGAsYHg/s0/user-avatar-icon-sign-symbol-vector-4001945.jpg"
                    alt="Avatar"
                    className="rounded-circle"
                    width="120"
                  />
                  <div className="mt-3">
                    <h4>{this.state.username}</h4>
                    <p>Profession</p>
                    <p>Address</p>
                    <button className="btn btn-style">Edit Profile </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 mb-3">
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="custom-card card">
                  <div className="card-body">
                    <h1 className="text-center">Submissions</h1>
                    <h1 className="text-center">
                      {this.state.numberOfSubmissions}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="custom-card card">
                  <div className="card-body">
                    <h1 className="text-center">Solved</h1>
                    <h1 className="text-center">{this.state.numberOfSolve}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="card custom-card">
                <div className="card-body">
                  <h2>Submission history</h2>
                  <p>No submissions yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="card custom-card">
              <h3 className="text-center mt-3">Personal Information</h3>
              <div className="card-body">
                <p>
                  <strong>Name: </strong>
                  {this.state.username}
                </p>
                <hr />
                <p>
                  <strong>Email: </strong>
                  {this.state.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
