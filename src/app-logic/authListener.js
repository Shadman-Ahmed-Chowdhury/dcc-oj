import fireConfig from '../firebaseConfig/config';

const authListener = () => {
	fireConfig.auth().onAuthStateChanged((user) => {
		if (user) {
			console.log(user.email);
		} else {
			window.location.assign('/login');
		}
	});
};

export default authListener;
