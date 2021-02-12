import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";

import getProblems from "../../app-logic/getProblems";

import "./ProblemList.css";

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

  var a = 1;

  if (loading) {
    return (
      <div className="ProblemList">
        <div className="loader">
          <BounceLoader size={100} color="#543F6F" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="ProblemList">
        <div className="container">
          <h2>All Problems</h2>
          <Link to="/problems/new">
            <button className="btn btn-sm btn-style mb-3">
              Add a Custom Problem
            </button>
          </Link>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Total Submissions</th>
                <th scope="col">Total AC Submissions</th>
                <th scope="col">Problem Setter</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((doc) => (
                <tr key={doc.id} className="col-md-4 mt-5">
                  <td>{a++}</td>
                  <td>
                    <Link to={`/problems/details/${doc.id}`} className="title">
                      {doc.data().title}
                    </Link>
                  </td>
                  <td>{doc.data().difficulty}</td>
                  <td>{doc.data().totalSubmissions}</td>
                  <td>{doc.data().totalAcceptedSubmissions}</td>
                  <td>{doc.data().problemSetter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default ProblemList;
