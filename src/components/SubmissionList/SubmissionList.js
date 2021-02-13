import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import getSubmissions from "../../app-logic/getSubmissions";
import "./SubmissionList.css";
import CodeViewer from "../CodeViewer/CodeViewer";

const SubmissionList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [codeViewer, toggleCodeViewer] = useState(false);
  const [codeViewerData, setCodeViewerData] = useState({});
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
  function setCodeViewer(codeViewerData) {
    toggleCodeViewer(true);
    setCodeViewerData(codeViewerData);
  }
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
      <div className="SubmissionList">
        <div className="container">
          <h2>All Submission</h2>

          <table className="table" style={{ fontSize: "16px" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">When</th>
                <th scope="col">Username</th>
                <th scope="col">Problem</th>
                <th scope="col">Language</th>
                <th scope="col">Verdict</th>
                <th scope="col">Time (s)</th>
                <th scope="col">Memory (KB)</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((doc) => (
                <tr key={doc.id} className="col-md-4 mt-5">
                  <td>
                    <button
                      className="btn-style btn btn-sm"
                      onClick={() => setCodeViewer(doc.data())}
                    >
                      {doc.data().submissionId}
                    </button>
                    <CodeViewer
                      show={codeViewer}
                      onHide={() => toggleCodeViewer(false)}
                      sourceCode={codeViewerData.sourceCode}
                      username={codeViewerData.username}
                      problemTitle={codeViewerData.problemTitle}
                      verdict={codeViewerData.verdict}
                    />
                  </td>
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
                        : doc.data().verdict === "Wrong Answer"
                        ? "wa"
                        : "error"
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

export default SubmissionList;
