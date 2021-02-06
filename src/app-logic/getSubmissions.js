import firestore from "./firestore";

const getSubmissions = () => {
  return firestore
    .collection("Submissions")
    .orderBy("submissionId", "desc")
    .get();
};

export default getSubmissions;
