import fireConfig from '../firebaseConfig/config';

const logoutUser = () => {
	fireConfig.auth().signOut();
};

export default logoutUser;
