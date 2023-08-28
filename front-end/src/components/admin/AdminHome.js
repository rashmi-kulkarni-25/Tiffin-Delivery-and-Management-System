import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import AdminLogin from "./AdminLogin";
import { createDotNetUrl, createNodejsUrl, log } from "../../utils/utils";
import axios from "axios";
import bgimage4 from "../../../src/images/bg4.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image1 from "../../images/bg8.jpg";
import image2 from "../../images/bg9.jpg";
import image3 from "../../images/bg10.jpg";

function AdminHome() {
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
  const [r1, setR1] = useState(0.0);
  const [r2, setR2] = useState(0.0);
  const [r3, setR3] = useState(0.0);
  const [r4, setR4] = useState(0.0);
  const [rev1, setRev1] = useState(0.0);
  const [rev2, setRev2] = useState(0.0);
  const [rev3, setRev3] = useState(0.0);
  const [rev4, setRev4] = useState(0.0);

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getApprovalRequests();
    getRevenueByCurrentMonth();
    sumOfRevenueByCurrentMonth();
    SumOfRevenueByYear();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [vendors, vendor, r1, r2, r3, r4]);

  const getApprovalRequests = async () => {
    debugger;
    const url = createDotNetUrl("api/admins/showpendingrequests");
    axios.get(url).then((res) => {
      debugger;
      log(res.data);
      setVendors(res.data);
    });
  };

  const approve = (id) => {
    debugger;
    var vendorId = { vendor_id: id };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        log("Vendor approved sucecssfully");
        toast.success("Vendor approved");
        approveVendor(id);
      }
    };
    const url = createNodejsUrl("admin/approve");
    helper.open("PUT", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(vendorId));
  };

  const approveVendor = (id) => {
    debugger;
    var vendorId = { vendor_id: id };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log("Vendor approved sucecssfully");
        window.location.reload();
      }
    };
    const url = createNodejsUrl("admin/approvevendor");
    helper.open("PUT", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(vendorId));
  };

  const reject = (id) => {
    debugger;
    var vendorId = { vendor_id: id };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        log("Vendor rejected sucecssfully");
        toast.success("Vendor rejected");
        rejectVendor(id);
      }
    };
    const url = createNodejsUrl("admin/reject");
    helper.open("PUT", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(vendorId));
  };

  const rejectVendor = (id) => {
    debugger;
    var vendorId = { vendor_id: id };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        log("Vendor approved sucecssfully");
        window.location.reload();
      }
    };
    const url = createNodejsUrl("admin/rejectvendor");
    helper.open("PUT", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(vendorId));
  };

  const getRevenueByCurrentMonth = async () => {
    debugger;
    const url = createDotNetUrl("api/admins/getrevenuebycurrentmonth");
    axios.get(url).then((res) => {
      debugger;
      log(res.data);
      setR1(res.data);
    });
  };

  const sumOfRevenueByCurrentMonth = async () => {
    debugger;
    const url = createDotNetUrl("api/admins/sumofrevenuebycurrentmonth");
    axios.get(url).then((res) => {
      debugger;
      log(res.data);
      setRev1(res.data);
    });
  };

  const SumOfRevenueByYear = async () => {
    debugger;
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        setRev3(result[0].sum);
      }
    };
    const url = createNodejsUrl("admin/sumofrevenuebyyear");
    helper.open("GET", url);
    helper.send();
  };

  if (isLoggedIn) {
    return (
      // <div style={{backgroundColor:'#bbe9ee'}}>
      <div>
        <div
          style={{
            backgroundImage: `url(${bgimage4})`,
            backgroundAttachment: "fixed",
            content: "",
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: -1,
            opacity: 0.5,
          }}
        ></div>

        <AdminNavbar />

        <div className="row" style={{ paddingTop: "180px" }}>
          <div className="col-md-2">
            <div
              className="card mx-3 my-5 bg-dark"
              style={{ backgroundColor: "olivedrab", color: "white" }}
            >
              <div className="card-body">
                <h5 className="card-title">Monthly Revenue</h5>
                <h6 className="card-title">Current Month</h6>
                <h1 className="card-text">₹ {r1 + rev1}</h1>
                <center>
                  <Link to="#" className="card-link" style={{ color: "white" }}>
                    Refresh
                  </Link>
                </center>
              </div>
            </div>

            <div
              className="card mx-3 my-5 bg-dark"
              style={{ backgroundColor: "olivedrab", color: "white" }}
            >
              <div className="card-body">
                <h5 className="card-title">Monthly Revenue</h5>
                <input type="number" id="input" value="" />
                <h1 className="card-text">₹ {r2 + rev2}</h1>
                <center>
                  <Link to="#" className="card-link" style={{ color: "white" }}>
                    Get Revenue
                  </Link>
                </center>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="row">
              <div className="col">
                <div
                  className="card mx-3 my-5 bg-dark"
                  style={{ backgroundColor: "olivedrab", color: "white" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      <center>Vendors count</center>
                    </h5>
                    <h1 className="card-text">
                      {" "}
                      <center>17</center>{" "}
                    </h1>
                    <center>
                      <Link
                        to="#"
                        className="card-link"
                        style={{ color: "white" }}
                      >
                        Refresh
                      </Link>
                    </center>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className="card mx-3 my-5 bg-dark"
                  style={{ backgroundColor: "olivedrab", color: "white" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      <center>Customers count</center>
                    </h5>
                    <h1 className="card-text">
                      {" "}
                      <center>320</center>{" "}
                    </h1>
                    <center>
                      <Link
                        to="#"
                        className="card-link"
                        style={{ color: "white" }}
                      >
                        Refresh
                      </Link>
                    </center>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className="card mx-3 my-5 bg-dark"
                  style={{ backgroundColor: "olivedrab", color: "white" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      <center>Tiffins count</center>
                    </h5>
                    <h1 className="card-text">
                      <center>47</center>
                    </h1>
                    <center>
                      <Link
                        to="#"
                        className="card-link"
                        style={{ color: "white" }}
                      >
                        Refresh
                      </Link>
                    </center>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "white" }}>
              <h2
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  padding: "10px",
                }}
              >
                Pending Approval Requests
              </h2>
            </div>
            <div className="table-responsive my-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Vendor Name</th>
                    <th>Address</th>
                    <th>Pincode</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Approve</th>
                    <th>Reject</th>
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
                        <td>
                          <button
                            type="button"
                            onClick={() => approve(vendor.vendorId)}
                            className="btn btn-success"
                          >
                            Approve
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => reject(vendor.vendorId)}
                            className="btn btn-danger"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-2">
            <div
              className="card mx-3 my-5 bg-dark"
              style={{ backgroundColor: "olivedrab", color: "white" }}
            >
              <div className="card-body">
                <h5 className="card-title">Yearly Revenue</h5>
                <h6 className="card-title">Current year</h6>
                <h1 className="card-text">₹ {r3 + rev3}</h1>
                <center>
                  <Link to="#" className="card-link" style={{ color: "white" }}>
                    Refresh
                  </Link>
                </center>
              </div>
            </div>

            <div
              className="card mx-3 my-5 bg-dark"
              style={{ backgroundColor: "olivedrab", color: "white" }}
            >
              <div className="card-body">
                <h5 className="card-title">Yearly Revenue</h5>
                <input type="number" id="input" value="" />
                <h1 className="card-text">₹ {r4 + rev4}</h1>
                <center>
                  <Link to="#" className="card-link" style={{ color: "white" }}>
                    Get Revenue
                  </Link>
                </center>
              </div>
            </div>
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

export default AdminHome;
