import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

import MdArrowDropdownCircle from "react-ionicons/lib/MdArrowDropdownCircle";

import logoutUser from "../app-logic/logoutUser";
import authListener from "../app-logic/authListener";
import getUserData from "../app-logic/getUserData";

const Navbar = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  //const [username, setUsername] = useState('');
  //Use Effect
  useEffect(() => {
    authListener().onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        const promise = getUserData(user.uid);
        promise.then((doc) => {
          console.log(doc.data().username);
          const uname = doc.data().username;
          // this.setState({
          //   username: uname,
          //   uid: user.uid,
          // });
          setUsername(uname);
          setUid(user.uid);
        });
      } else {
        console.log("Logged out");
      }
    });

    //fetchUser();
  }, [user]);

  // const fetchUser = () => {
  // 	console.log(user);
  // 	//Getting data from firestore.
  // 	if (user === null || user === {}) {
  // 		setUsername('');
  // 		console.log(user);
  // 		return;
  // 	} else {
  // 		const promise = getUserData(user.uid);
  // 		promise.then((doc) => {
  // 			console.log(doc.data().username);
  // 			const uname = doc.data().username;
  // 			setUsername(uname);
  // 		});
  // 	}
  //};
  const logout = () => {
    logoutUser();
    setUser(null);
  };
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Online Judge
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/problems" className="link">
                  Problems
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/submissions" className="link">
                  Submissions
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/docs" className="link">
                  Docs
                </Link>
              </li>
            </ul>
            {user ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="#!" className="nav-link user-email">
                    {username}
                    <MdArrowDropdownCircle fontSize="20px" color="white" />
                  </a>
                  <ul className="dp-menu level-1">
                    <li className="dp-item">
                      <span className="dp-link">
                        <Link
                          to={`/profile/${username}`}
                          className="profile-link"
                        >
                          Profile
                        </Link>
                      </span>
                    </li>
                    <li className="dp-item">
                      <span className="dp-link" onClick={() => logout()}>
                        Logout
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/login" className="link">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
