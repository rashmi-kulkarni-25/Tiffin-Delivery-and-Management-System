import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import AdminLogin from "./AdminLogin";
import { createUrl, createaUrl, log } from "../../utils/utils";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const bgimage4 = "/images/bg4.jpg";

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
    const url = createUrl("api/admins/showpendingrequests");
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
    const url = createaUrl("admin/approve");
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
    const url = createaUrl("admin/approvevendor");
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
    const url = createaUrl("admin/reject");
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
    const url = createaUrl("admin/rejectvendor");
    helper.open("PUT", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(vendorId));
  };

  const getRevenueByCurrentMonth = async () => {
    debugger;
    const url = createUrl("api/admins/getrevenuebycurrentmonth");
    axios.get(url).then((res) => {
      debugger;
      log(res.data);
      setR1(res.data);
    });
  };

  const sumOfRevenueByCurrentMonth = async () => {
    debugger;
    const url = createUrl("api/admins/sumofrevenuebycurrentmonth");
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
    const url = createaUrl("admin/sumofrevenuebyyear");
    helper.open("GET", url);
    helper.send();
  };

  if (isLoggedIn) {
    return (
      // <div style={{backgroundColor:'#bbe9ee'}}>
      <div
        style={{
          backgroundImage: `url(${bgimage4})`,
          backgroundAttachment: "fixed",
        }}
      >
        <AdminNavbar />

        <div className="row">
          <div className="col-md-2 my-3">
            {/* <h4>Monthly revenue</h4>
<div style={{border:'1px solid black', height:'40px'}}></div> */}

            <div
              className="card mx-3 my-5"
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
              className="card mx-3 my-5"
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
            <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGwoYWCOQfoeTGYWJ-D1BcJOA0qD7Xcrk-Vw&usqp=CAU"
                    style={{ height: "400px" }}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiRlbX47U1YATt1ThqKKE0zaxnmZNy79BmVA&usqp=CAU"
                    style={{ height: "400px" }}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHIVHzser-cPTSPj0Nj8gMBufKf8WvDTL1Ug&usqp=CAU"
                    style={{ height: "400px" }}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="card mx-3 my-5"
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
              className="card mx-3 my-5"
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

        {/* <h2 style={{textAlign:'center', marginTop:'15px'}}>Pending Approval Requests</h2> */}
        <div className="row my-3">
          <div className="col-md-3"></div>
          <div className="col-md-6">
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
          <div className="col-md-3"></div>
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
