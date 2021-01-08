import firestore from './firestore';

//Importing SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const saveProblem = (
	id,
	title,
	difficulty,
	description,
	input,
	constraints,
	output,
	sampleInput,
	sampleOutput,
	testCaseInput,
	testCaseOutput,
	problemSetter
) => {
	const MySwal = withReactContent(Swal);
	MySwal.showLoading();
	firestore
		.collection('Problems')
		.doc(id)
		.set({
			id,
			title,
			difficulty,
			description,
			input,
			constraints,
			output,
			sampleInput,
			sampleOutput,
			testCaseInput,
			testCaseOutput,
			problemSetter,
			totalSubmissions: 0,
			totalAcceptedSubmissions: 0,
		})
		.then(() => {
			MySwal.fire({
				icon: 'success',
				title: 'Data Saved!',
				confirmButtonText: 'Okay',
			}).then(() => {
				window.location.assign('/');
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

export default saveProblem;
