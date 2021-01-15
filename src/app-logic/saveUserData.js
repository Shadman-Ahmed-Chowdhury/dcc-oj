import firestore from './firestore';

//Importing SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const saveUserData = (uid, username, email, password) => {
	const MySwal = withReactContent(Swal);
	MySwal.showLoading();
	firestore
		.collection('Users')
		.doc(uid)
		.set({
			uid,
			username,
			email,
			password,
		})
		.then(() => {
			MySwal.fire({
				icon: 'success',
				title: 'User Registration Completed!',
				confirmButtonText: 'Continue',
			}).then(() => {
				window.location.assign('/');
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

export default saveUserData;
