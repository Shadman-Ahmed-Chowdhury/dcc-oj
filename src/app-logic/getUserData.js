import firestore from "./firestore";

const getUserData = (id) => {
  return firestore.collection("Users").doc(id).get();
};

export default getUserData;
