import fireConfig from "../firebaseConfig/config";
import saveUserData from "./saveUserData";

const registerUser = (username, email, password) => {
  fireConfig
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCreds) => {
      const uid = userCreds.user.uid;
      saveUserData(uid, username, email, password);
    })
    .catch((err) => {
      alert(err);
      console.log(err);
    });
};

export default registerUser;
