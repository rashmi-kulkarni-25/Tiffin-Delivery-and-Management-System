// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// function VendorNavbar() {
//   let location = useLocation();
//   const clear = () => {
//     sessionStorage.clear("isLoggedIn");
//     sessionStorage.clear("user");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg-dark navbar-dark bg-light">
//       <div className="container-fluid" style={{ backgroundColor: "olivedrab" }}>
//         <Link className="navbar-brand" to="/adminhome">
//           <img
//             src="../nutriTiffLogo.png"
//             alt=""
//             style={{ height: 75, width: 90 }}
//           ></img>
//           <br />
//           <b> NutriTiff </b>
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <hr></hr>
//           <div
//             className="nav-item"
//             style={{ marginRight: "20px", color: "white", display: "flex" }}
//           >
//             <Link
//               className={`nav-link ${
//                 location.pathname === "/" ? "active" : ""
//               }`}
//               to="/vendor-register"
//             >
//               <h6> Register </h6>
//             </Link>

//             <Link
//               className={`nav-link ${
//                 location.pathname === "/" ? "active" : ""
//               } mx-4`}
//               to="/vendor-login"
//             >
//               <h6> Login </h6>
//             </Link>
//             {/*
//             <Link
//               className={`nav-link ${
//                 location.pathname === "/" ? "active" : ""
//               } mx-4`}
//               to="/vendor-profile"
//             >
//               <h6> Home </h6>
//             </Link> */}

//             <Link
//               className={`nav-link ${
//                 location.pathname === "/" ? "active" : ""
//               } mx-4`}
//               to="/vendor-tiffins"
//             >
//               <h6> My Tiffins </h6>
//             </Link>

//             <Link
//               className={`nav-link ${
//                 location.pathname === "/" ? "active" : ""
//               } mx-4`}
//               to="/vendor-addtiffin"
//             >
//               <h6> Add Tiffin </h6>
//             </Link>

//             <Link
//               className={`nav-link ${
//                 location.pathname === "/" ? "active" : ""
//               } mx-4`}
//               to="/vendor-orders"
//             >
//               <h6> Orders </h6>
//             </Link>

//             <Link
//               className={`nav-link ${
//                 location.pathname === "/" ? "active" : ""
//               } mx-4`}
//               to="/vendor-feedbacks"
//             >
//               <h6> Feedbacks and Complaints </h6>
//             </Link>

//             {/* <Link
//               className={`nav-link ${
//                 location.pathname === "/" ? "active" : ""
//               } mx-4`}
//               to="/subpurchasehistory"
//             >
//               <h6> Subscription Purchases </h6>
//             </Link> */}

//             <Link
//               className={`nav-link ${
//                 location.pathname === "/" ? "active" : ""
//               }`}
//               to="/vendor-profile"
//               style={{ marginLeft: "auto" }}
//             >
//               <h6> Profile </h6>
//             </Link>

//             <Link
//               onClick={clear}
//               className={`nav-link ${
//                 location.pathname === "/login" ? "active" : ""
//               }mx-4`}
//               to="/vendor-login"
//               style={{ marginLeft: "auto" }}
//             >
//               <h6> Logout </h6>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default VendorNavbar;
