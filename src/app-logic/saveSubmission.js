import firestore from "./firestore";

const saveSubmission = (submissionData) => {
  const {
    submissionId,
    token,
    when,
    problemId,
    problemTitle,
    uid,
    username,
    sourceCode,
    language,
    verdict,
    time,
    memory,
  } = submissionData;
  firestore
    .collection("Submissions")
    .doc(submissionId)
    .set({
      submissionId,
      token,
      when,
      problemId,
      problemTitle,
      uid,
      username,
      sourceCode,
      language,
      verdict,
      time,
      memory,
    })
    .then(function () {
      console.log("Submission added to database!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
};

export default saveSubmission;
