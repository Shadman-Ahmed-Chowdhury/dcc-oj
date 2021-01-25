import firestore from "./firestore";

const getProblems = () => {
  return firestore.collection("Problems").get();
};

export default getProblems;
