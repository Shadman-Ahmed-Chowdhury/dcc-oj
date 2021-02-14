import React from "react";

import "./Docs.css";

const Docs = () => {
  return (
    <div>
      <h2 className="text-center mt-5">Docs of Online Judge</h2>

      <p className="text-center">
        If you find a bug or want to add a feature, consider opening a pull
        request or raise an issue.
      </p>
      <p className="text-center">
        See the contribution instruction in{" "}
        <a
          href="https://github.com/Shadman-Ahmed-Chowdhury/Basic-React-App"
          className="githubLink"
        >
          github
        </a>
      </p>
    </div>
  );
};

export default Docs;
