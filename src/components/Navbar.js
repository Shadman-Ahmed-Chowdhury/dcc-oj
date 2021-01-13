import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

import MdArrowDropdownCircle from "react-ionicons/lib/MdArrowDropdownCircle";

import logoutUser from "../app-logic/logoutUser";

const Navbar = ({ user }) => {
  const logout = () => {
    logoutUser();
    window.location.assign("/");
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
            </ul>
            {user ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="#!" className="nav-link user-email">
                    {user.email}
                    <MdArrowDropdownCircle fontSize="20px" color="white" />
                  </a>
                  <ul className="dp-menu level-1">
                    <li className="dp-item">
                      <span className="dp-link">Profile</span>
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
