import fireConfig from "../firebaseConfig/config";

const authListener = () => {
  return fireConfig.auth();
};

export default authListener;
