import firestore from "./firestore";

//Importing SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const saveUpdatedProblem = (
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
  tutorial,
  tags
) => {
  const MySwal = withReactContent(Swal);
  MySwal.showLoading();
  firestore
    .collection("Problems")
    .doc(id)
    .update({
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
      tutorial,
      tags,
    })
    .then(() => {
      MySwal.fire({
        icon: "success",
        title: "Problem Updated!",
        confirmButtonText: "Okay",
      }).then(() => {
        window.location.assign("/problems");
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default saveUpdatedProblem;
