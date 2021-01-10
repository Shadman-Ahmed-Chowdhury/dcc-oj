import fireConfig from '../firebaseConfig/config';

const registerUser = (email, password) => {
	fireConfig
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((user) => {
			console.log(user);
			window.location.assign('/login');
		})
		.catch((err) => {
			alert(err);
			console.log(err);
		});
};

export default registerUser;
