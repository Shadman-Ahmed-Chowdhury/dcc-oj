import React from "react";
import { Modal } from "react-bootstrap";
import Editor from "@monaco-editor/react";

function CodeViewer(props) {
  return (
    <Modal
      {...props}
      size="lg"
      dialogClassName="modal-180w"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="example-custom-modal-styling-title"
          style={{ fontSize: "14px" }}
        >
          Problem: {props.problemTitle}, Submitted by: {props.username}
          ,Verdict:{" "}
          {props.verdict === "Accepted" ? (
            <span style={{ color: "#2c9e2c" }}>Accepted</span>
          ) : props.verdict === "Wrong Answer" ? (
            <span style={{ color: "#f8225b" }}>{props.verdict}</span>
          ) : (
            <span style={{ color: "#fc7a00" }}>{props.verdict}</span>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Editor
          className="content"
          height="50vh"
          theme={"vs"}
          language="cpp"
          value={props.sourceCode}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className={"btn-style btn-sm btn"} onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default CodeViewer;
