import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import getSubmissions from "../app-logic/getSubmissions";
import "./SubmissionList.css";

const SubmissionList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [codeViewer, toggleCodeViewer] = useState(false);

  //Use Effect
  useEffect(() => {
    const fetchSubmissions = async () => {
      //Getting data from firestore.
      const data = await getSubmissions();
      setSubmissions(data.docs);
      setLoading(false);
    };
    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="ProblemList">
        <div className="loader">
          <BounceLoader size={100} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="SubmissionList">
        <div className="container">
          <h2>All Submission</h2>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">When</th>
                <th scope="col">Username</th>
                <th scope="col">Problem</th>
                <th scope="col">Language</th>
                <th scope="col">Verdict</th>
                <th scope="col">Execution Time (s)</th>
                <th scope="col">Memory (KB)</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((doc) => (
                <tr key={doc.id} className="col-md-4 mt-5">
                  <td>{doc.data().submissionId}</td>
                  <td>{doc.data().when}</td>
                  <td>{doc.data().username}</td>
                  <td>
                    <Link
                      to={`/problems/details/${doc.data().problemId}`}
                      className="title"
                    >
                      {doc.data().problemTitle}
                    </Link>
                  </td>
                  <td>{doc.data().language}</td>
                  <td
                    className={
                      doc.data().verdict === "Accepted"
                        ? "accepted"
                        : "not-accepted"
                    }
                  >
                    {doc.data().verdict}
                  </td>
                  <td>{doc.data().time}</td>
                  <td>{doc.data().memory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

// FIXME: Code viewer modal needs to be separted in isolete component.
// const CodeViewer = () => {{doc.data().submissionId}
// <Modal show={codeViewer}>
//   <Modal.Dialog>
//     <Modal.Header closeButton>
//       <Modal.Title>Modal title</Modal.Title>
//     </Modal.Header>

//     <Modal.Body>
//       <p>Modal body text goes here.</p>
//     </Modal.Body>
//   </Modal.Dialog>
//   ;
//</Modal>};

// FIXME: Used hooks, so didn't used auth. Maybe it's not important here though.
// class SubmissionList extends React.Component {
//   componentDidMount() {
//     authListener();
//   }
//   render() {
//     return (
//       <div>
//         <h3>All Submissions</h3>
//       </div>
//     );
//   }
// }

export default SubmissionList;
