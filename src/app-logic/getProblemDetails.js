import firestore from './firestore';

const getProblemDetails = (id) => {
	return firestore.collection('Problems').doc(id).get();
};

export default getProblemDetails;
