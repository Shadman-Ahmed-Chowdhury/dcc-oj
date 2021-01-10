import fireConfig from '../firebaseConfig/config';

const loginUser = (email, password) => {
	fireConfig
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((user) => {
			console.log(user);
			window.location.assign('/problems');
		})
		.catch((err) => {
			alert(err);
			console.log(err);
		});
};

export default loginUser;
