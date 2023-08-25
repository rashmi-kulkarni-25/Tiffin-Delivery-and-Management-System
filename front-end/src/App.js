import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import VendorDashboard from "./components/Vendor/vendorDashboard";
import VendorTiffins from "./components/vendor/vendorTiffins";
import VendorAddTiffin from "./components/vendor/vendorAddTiffin";
import VendorEditTiffin from "./components/vendor/vendorEditTiffin";
import VendorProfile from "./components/vendor/vendorProfile";
import VendorOrders from "./components/vendor/vendorOrders";
import VendorLogin from "./components/vendor/vendorLogin";
import VendorRegister from "./components/vendor/vendorRegister";
import VendorFeedbacks from "./components/vendor/vendorFeedbacks";
//import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import VendorHomePage from "./pages/VendorHomePage";
import Header from "./components/header";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          {/* <Route path="/vendor-homepage" element={<VendorHomePage />} /> */}
          {/* <Route path="/vendor-dashboard" element={<VendorDashboard />} /> */}
          <Route path="/vendor-tiffins" element={<VendorTiffins />} />
          <Route path="/vendor-addtiffin" element={<VendorAddTiffin />} />
          <Route path="/vendor-edittiffin" element={<VendorEditTiffin />} />
          <Route path="/vendor-profile" element={<VendorProfile />} />
          <Route path="/vendor-orders" element={<VendorOrders />} />
          <Route path="/vendor-login" element={<VendorLogin />} />
          <Route path="/vendor-register" element={<VendorRegister />} />
          <Route path="/vendor-feedbacks" element={<VendorFeedbacks />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Tejas app.js file navigations

// import "./App.css";
// import Home from "./components/customer/Home";
// import Cart from "./components/customer/Cart";
// import Login from "./components/customer/Login";
// import Register from "./components/customer/Register";
// import RegPage from "./components/customer/RegPage";
// import Profile from "./components/customer/Profile";
// import ChangeProfile from "./components/customer/ChangeProfile";
// import ChangePassword from "./components/customer/ChangePassword";
// import Favorites from "./components/customer/Favorites";
// import MyOrders from "./components/customer/MyOrders";
// import MyOrderHistory from "./components/customer/MyOrderHistory";
// import Subscription from "./components/customer/Subscription";
// import "react-toastify/dist/ReactToastify.css";

// import { BrowserRouter, Route, Routes } from "react-router-dom";

// // import VendorLogin from './components/vendor/VendorLogin';
// // import VendorRegister from './components/vendor/VendorRegister';
// // import VendorRegPage from './components/vendor/VendorRegPage';
// // import VendorHome from './components/vendor/VendorHome';

// // ====================================================================

// import AdminLogin from "./components/admin/AdminLogin";
// import AdminHome from "./components/admin/AdminHome";

// // ====================================================================

// import AboutUs from "./components/customer/AboutUs";
// import ContactUs from "./components/customer/ContactUs";
// import { ToastContainer } from "react-toastify";
// import RequestHistory from "./components/admin/RequestHistory";
// import Feedbacks from "./components/admin/Feedbacks";
// import SubscriptionPlans from "./components/admin/SubscriptionPlans";
// import AddPlan from "./components/admin/AddPlan";
// import UpdatePlan from "./components/admin/UpdatePlan";
// import OrderHistory from "./components/admin/OrderHistory";
// import SubPurchaseHistory from "./components/admin/SubPurchaseHistory";
// import AdminAboutUs from "./components/admin/AdminAboutUs";
// import AdminContactUs from "./components/admin/AdminContactUs";

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="page-container">
//         <div className="content-wrap">
//           <Routes>
//             <Route exact path="/about" Component={AboutUs} />
//             <Route exact path="/contact" Component={ContactUs} />
//             {/* ========================================================================== */}

//             <Route exact path="/login" Component={Login} />
//             <Route exact path="/register" Component={Register} />
//             <Route exact path="/regpage" Component={RegPage} />
//             <Route exact path="/" Component={Home} />
//             <Route exact path="/profile" Component={Profile} />
//             <Route exact path="/changeprofile" Component={ChangeProfile} />
//             <Route exact path="/changepassword" Component={ChangePassword} />
//             <Route exact path="/favorites" Component={Favorites} />
//             <Route exact path="/cart" Component={Cart} />
//             <Route exact path="/myorders" Component={MyOrders} />
//             <Route exact path="/myorderhistory" Component={MyOrderHistory} />
//             <Route exact path="/subscription" Component={Subscription} />

//             {/* ======================================================================== */}

//             {/* <Route exact path="/vendorlogin" Component={VendorLogin}/>
//           <Route exact path="/vendorregister" Component={VendorRegister}/>
//           <Route exact path="/vendorregpage" Component={VendorRegPage}/>
//           <Route exact path="/vendorhome" Component={VendorHome}/> */}

//             {/* ======================================================================== */}

//             <Route exact path="/adminlogin" Component={AdminLogin} />
//             <Route exact path="/adminhome" Component={AdminHome} />
//             <Route exact path="/reqhistory" Component={RequestHistory} />
//             <Route exact path="/feedbacks" Component={Feedbacks} />
//             <Route exact path="/subplans" Component={SubscriptionPlans} />
//             <Route exact path="/addplan" Component={AddPlan} />
//             <Route exact path="/updateplan/:id" Component={UpdatePlan} />
//             <Route exact path="/orderhistory" Component={OrderHistory} />
//             <Route
//               exact
//               path="/subpurchasehistory"
//               Component={SubPurchaseHistory}
//             />
//             <Route exact path="/adminabout" Component={AdminAboutUs} />
//             <Route exact path="/admincontact" Component={AdminContactUs} />
//           </Routes>
//         </div>
//         <ToastContainer />
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
