import fireConfig from '../firebaseConfig/config';

const getUser = () => {
	var user = fireConfig.auth().currentUser;

	if (user) {
		return user;
	} else {
		return null;
	}
};

export default getUser;
