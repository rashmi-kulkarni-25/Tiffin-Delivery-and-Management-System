import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import VendorDashboard from "./components/Vendor/vendorDashboard";
import VendorTiffins from "./components/Vendor/vendorTiffins";
import VendorAddTiffin from "./components/Vendor/vendorAddTiffin";
import VendorEditTiffin from "./components/Vendor/vendorEditTiffin";
import VendorProfile from "./components/Vendor/vendorProfile";
import VendorOrders from "./components/Vendor/vendorOrders";
import VendorLogin from "./components/Vendor/vendorLogin";
import VendorRegister from "./components/Vendor/vendorRegister";
import VendorFeedbacks from "./components/Vendor/vendorFeedbacks";
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
