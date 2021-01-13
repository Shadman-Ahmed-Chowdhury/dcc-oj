import fireConfig from "../firebaseConfig/config";

//Importing SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const logoutUser = () => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: "Are you sure?",
    text: "Do you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!",
  }).then((result) => {
    if (result.isConfirmed) {
      fireConfig.auth().signOut();
      window.location.assign("/");
    }
  });
};

export default logoutUser;
