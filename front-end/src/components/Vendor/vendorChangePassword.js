// import React, { useState } from "react";
// import axios from "axios";
// import config from "../../config";
// import "./styles.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// //import VendorNavbar from "../header/vendorNavbar";

// function VendorChangePassword() {
//   const vendorId = sessionStorage.getItem("vendorId");
//   const email = sessionStorage.getItem("email");
//   const password = sessionStorage.getItem("password");

//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [isEditing, setIsEditing] = useState(false);

//   const navigate = useNavigate();

//   console.log("vendorId: ", vendorId);

//   const handleChangePassword = () => {
//     if (newPassword === confirmNewPassword) {
//       const responsePromise = axios.patch(
//         `${config.backendUrl}/api/Vendors/addtiffin`,
//         {
//           email: email,
//           password: newPassword,
//           vendorId: vendorId,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Handle successful tiffin addition
//       responsePromise
//         .then((response) => {
//           if (response.status === 200) {
//             console.log("Vendors/changepassword response: ", response.data);
//             toast.success(
//               "Password Update Successful! Please Login with new Password"
//             );
//             setTimeout(() => {
//               navigate("/vendor-login");
//             }, 3000);
//           } else {
//             console.log("Failed to update password: ", response);
//             toast.error("Failed to update password, please try again!");
//           }
//         })
//         .catch((error) => {
//           console.log("Failed to update password: ", error);
//           toast.error("Failed to update password, please try again!");
//         });
//       setIsEditing(false);
//     } else {
//       // Passwords don't match, show an error message
//       toast.error("Passwords do not match. Please try again.");
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     navigate("/vendor-profile"); // Navigate to the profile page
//   };

//   return (
//     <div className="containerCard">
//       {/* <VendorNavbar /> */}
//       <center>
//         <br />
//         <h1>Change Password</h1>
//         <br />
//         <form onSubmit={(e) => e.preventDefault()}>
//           <b style={{ verticalAlign: "5px" }}>Email: </b>
//           <input
//             style={{
//               border: "2px solid Green",
//               margin: "10px",
//               width: "30%",
//               marginLeft: "30px",
//             }}
//             type="text"
//             placeholder="Email"
//             value={email}
//             readonly
//           />
//           <br />
//           <br />
//           <b style={{ verticalAlign: "5px" }}>Password: </b>
//           <input
//             style={{
//               border: "2px solid Green",
//               margin: "10px",
//               width: "30%",
//               marginLeft: "10px",
//             }}
//             type={isEditing ? "text" : "password"}
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setNewPassword(e.target.value)}
//             readOnly={!isEditing}
//           />
//           <br />
//           <br />
//           <br />
//           <b style={{ color: "greenyellow" }} />
//           <button
//             className="add-button"
//             onClick={() => setIsEditing(!isEditing)} // Toggle the isEditing state
//           >
//             <h4>{isEditing ? "Cancel" : "Edit"}</h4>
//           </button>
//           <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
//           <button
//             className="add-button"
//             onClick={isEditing ? handleChangePassword : handleCancel}
//           >
//             <h4>{isEditing ? "Update" : "Cancel"}</h4>
//           </button>
//         </form>
//       </center>
//     </div>
//   );
// }

// export default VendorChangePassword;

// import React, { useState } from "react";
// import axios from "axios";
// import config from "../../config";
// import "./styles.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// function VendorChangePassword() {
//   const vendorId = sessionStorage.getItem("vendorId");
//   const emailFromStorage = sessionStorage.getItem("email");
//   const passwordFromStorage = sessionStorage.getItem("password");

//   const [email, setEmail] = useState(emailFromStorage || "");
//   const [password, setPassword] = useState(passwordFromStorage || "");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [isEditing, setIsEditing] = useState(false);

//   const navigate = useNavigate();

//   const handleChangePassword = () => {
//     if (newPassword === confirmNewPassword) {
//       const responsePromise = axios.patch(
//         `${config.backendUrl}/api/Vendors/changepassword`,
//         {
//           email: email,
//           password: newPassword,
//           confirmPassword: confirmNewPassword,
//           vendorId: vendorId,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Handle successful password update
//       responsePromise
//         .then((response) => {
//           if (response.status === 200) {
//             console.log("Password updated successfully: ", response.data);
//             toast.success("Password Update Successful!");
//             setTimeout(() => {
//               navigate("/vendor-login");
//             }, 3000);
//           } else {
//             console.log("Failed to update password: ", response);
//             toast.error("Failed to update password, please try again!");
//           }
//         })
//         .catch((error) => {
//           console.log("Failed to update password: ", error);
//           toast.error("Failed to update password, please try again!");
//         });
//       setIsEditing(false);
//     } else {
//       // Passwords don't match, show an error message
//       toast.error("Passwords do not match. Please try again.");
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     navigate("/vendor-profile"); // Navigate to the profile page
//   };

//   return (
//     <div className="containerCard">
//       <center>
//         <br />
//         <h1>Change Password</h1>
//         <br />
//         <form onSubmit={(e) => e.preventDefault()}>
//           <b style={{ verticalAlign: "5px" }}>Email: </b>
//           <input
//             style={{
//               border: "2px solid Green",
//               margin: "10px",
//               width: "30%",
//               marginLeft: "30px",
//             }}
//             type="text"
//             placeholder="Email"
//             value={email}
//             readOnly
//           />
//           <br />
//           <b style={{ verticalAlign: "5px" }}>Password: </b>
//           <input
//             style={{
//               border: "2px solid Green",
//               margin: "10px",
//               width: "30%",
//               marginLeft: "10px",
//             }}
//             type={isEditing ? "text" : "password"}
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             readOnly={!isEditing}
//           />
//           <br />
//           <b style={{ verticalAlign: "5px" }}>New Password: </b>
//           <input
//             style={{
//               border: "2px solid Green",
//               margin: "10px",
//               width: "30%",
//               marginLeft: "10px",
//             }}
//             type="password"
//             placeholder="Enter New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             readOnly={!isEditing}
//           />
//           <br />
//           <b style={{ verticalAlign: "5px" }}>Confirm New Password: </b>
//           <input
//             style={{
//               border: "2px solid Green",
//               margin: "10px",
//               width: "30%",
//               marginLeft: "10px",
//             }}
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmNewPassword}
//             onChange={(e) => setConfirmNewPassword(e.target.value)}
//             readOnly={!isEditing}
//           />
//           <br />
//           <br />
//           <br />
//           <button
//             className="add-button"
//             onClick={() => setIsEditing(!isEditing)} // Toggle the isEditing state
//           >
//             <h4>{isEditing ? "Cancel" : "Edit"}</h4>
//           </button>
//           <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
//           <button
//             className="add-button"
//             onClick={isEditing ? handleChangePassword : handleCancel}
//           >
//             <h4>{isEditing ? "Update" : "Cancel"}</h4>
//           </button>
//         </form>
//       </center>
//     </div>
//   );
// }

// export default VendorChangePassword;

import React, { useState } from "react";
import axios from "axios";
import config from "../../config";
import "./styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function VendorChangePassword() {
  const vendorId = sessionStorage.getItem("vendorId");
  const emailFromStorage = sessionStorage.getItem("email");
  const passwordFromStorage = sessionStorage.getItem("password");

  const [email, setEmail] = useState(emailFromStorage || "");
  const [password, setPassword] = useState(passwordFromStorage || "");
  const [newPassword, setNewPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const handleChangePassword = () => {
    const responsePromise = axios.patch(
      `${config.backendUrl}/api/Vendors/changepassword`,
      {
        email: email,
        password: newPassword,
        vendorId: vendorId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Handle successful password update
    responsePromise
      .then((response) => {
        if (response.status === 200) {
          console.log("Password updated successfully: ", response.data);
          toast.success("Password Update Successful!");
          setTimeout(() => {
            navigate("/vendor-login");
          }, 3000);
        } else {
          console.log("Failed to update password: ", response);
          toast.error("Failed to update password, please try again!");
        }
      })
      .catch((error) => {
        console.log("Failed to update password: ", error);
        toast.error("Failed to update password, please try again!");
      });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    navigate("/vendor-profile"); // Navigate to the profile page
  };

  return (
    <div className="containerCard">
      <center>
        <br />
        <h1>Change Password</h1>
        <br />
        <form onSubmit={(e) => e.preventDefault()}>
          <b style={{ verticalAlign: "5px" }}>Email: </b>
          <input
            style={{
              border: "2px solid Green",
              margin: "10px",
              width: "30%",
              marginLeft: "30px",
            }}
            type="text"
            placeholder="Email"
            value={email}
            readOnly
          />
          <br />
          <b style={{ verticalAlign: "5px" }}>Password: </b>
          <input
            style={{
              border: "2px solid Green",
              margin: "10px",
              width: "30%",
              marginLeft: "10px",
            }}
            type={isEditing ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly={!isEditing}
          />
          <br />
          <b style={{ verticalAlign: "5px" }}>New Password: </b>
          <input
            style={{
              border: "2px solid Green",
              margin: "10px",
              width: "30%",
              marginLeft: "10px",
            }}
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            readOnly={!isEditing}
          />
          <br />
          <br />
          <br />
          <button
            className="add-button"
            onClick={() => setIsEditing(!isEditing)} // Toggle the isEditing state
          >
            <h4>{isEditing ? "Cancel" : "Edit"}</h4>
          </button>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
          <button
            className="add-button"
            onClick={isEditing ? handleChangePassword : handleCancel}
          >
            <h4>{isEditing ? "Update" : "Cancel"}</h4>
          </button>
        </form>
      </center>
    </div>
  );
}

export default VendorChangePassword;

//1. orders + feedback UI
//2. orders status (deliver button) >> change status db and remove from my orders
