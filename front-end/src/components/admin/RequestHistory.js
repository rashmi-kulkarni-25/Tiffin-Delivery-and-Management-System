import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import AdminLogin from "./AdminLogin";
import { createUrl, log } from "../../utils/utils";
import axios from "axios";
const bgimage4 = "/images/bg4.jpg";

function RequestHistory() {
  var admin = sessionStorage.getItem("user");
  var isLoggedIn = sessionStorage.getItem("adminLoggedIn");
  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState({
    vednorId: 0,
    name: "",
    address: "",
    pincode: "",
    email: "",
    mobNo: "",
    status: "",
  });

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getAllRequests();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [vendors, vendor]);

  const getAllRequests = async () => {
    debugger;
    const url = createUrl("api/admins/showrequesthistory");
    axios.get(url).then((res) => {
      debugger;
      log(res.data);
      setVendors(res.data);
    });
  };

  if (isLoggedIn) {
    return (
      <div
        style={{
          backgroundImage: `url(${bgimage4})`,
          backgroundAttachment: "fixed",
        }}
      >
        <AdminNavbar />
        <h2
          style={{
            textAlign: "center",
            marginTop: "15px",
            backgroundColor: "white",
          }}
        >
          Request History
        </h2>
        <div className="row my-3">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="table-responsive my-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Vendor Name</th>
                    <th>Address</th>
                    <th>Pincode</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => {
                    return (
                      <tr>
                        <td>{vendor.name}</td>
                        <td>{vendor.address}</td>
                        <td>{vendor.pincode}</td>
                        <td>{vendor.email}</td>
                        <td>{vendor.mobNo}</td>
                        <td>{vendor.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <>
        <AdminLogin />
      </>
    );
  }
}

export default RequestHistory;
