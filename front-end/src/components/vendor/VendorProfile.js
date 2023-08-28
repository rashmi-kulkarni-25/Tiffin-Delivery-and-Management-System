import React from "react";
import VendorLogin from "./VendorLogin";
import VendorNavbar from "./VendorNavbar";
import Footer from "./Footer";
import { createNodejsUrl, log } from "../../utils/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import bgimage4 from "../../../src/images/bg4.jpg";

function VendorProfile() {
  const history = useHistory();
  var vendorId = sessionStorage.getItem("vendorId");
  var isLoggedIn = sessionStorage.getItem("vendorLoggedIn");

  const [venId, setVenId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [activeStatus, setActiveStatus] = useState("");

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getMyProfile();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [venId, name, address, pincode, email, mobNo, activeStatus]);

  const getMyProfile = () => {
    debugger;
    var id = { vendor_id: vendorId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        setVenId(result[0].vendor_id);
        setName(result[0].name);
        setAddress(result[0].address);
        setPincode(result[0].pincode);
        setEmail(result[0].email);
        setMobNo(result[0].mob_no);
        setActiveStatus(result[0].active_status);
      }
    };
    const url = createNodejsUrl("vendor/getvendorbyid");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(id));
  };

  const edit = () => {
    history.push("/editvendorprofile");
  };

  const changepass = () => {
    history.push("/changevendorpass");
  };

  if (isLoggedIn) {
    return (
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
        <VendorNavbar />
        <div className="row" style={{ paddingTop: "180px" }}>
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6"></div>
              <div className="col-md-6">
                <button
                  className="btn btn-dark btn-lg my-3 mx-3"
                  onClick={edit}
                >
                  Edit Profile
                </button>
                <button
                  className="btn btn-dark btn-lg my-3 mx-3"
                  onClick={changepass}
                >
                  Change Password
                </button>
              </div>
            </div>

            <div className="form-check">
              <div className="container my-3">
                <label>
                  {" "}
                  <h4>Name </h4>
                </label>
                <input
                  className="form-control my-3"
                  type="text"
                  style={{ height: "50px", fontSize: "20px" }}
                  value={name}
                ></input>
                <label>
                  <h4>Address</h4>
                </label>
                <textarea
                  className="form-control my-3"
                  rows="4"
                  style={{ fontSize: "20px" }}
                  value={address}
                ></textarea>
                <label>
                  <h4>Pincode</h4>
                </label>
                <input
                  className="form-control my-3"
                  type="text"
                  style={{ height: "50px", fontSize: "20px" }}
                  value={pincode}
                ></input>

                <label>
                  <h4>Email</h4>
                </label>
                <input
                  className="form-control my-3"
                  type="email"
                  style={{ height: "50px", fontSize: "20px" }}
                  value={email}
                ></input>

                <label>
                  <h4>Mobile Number</h4>
                </label>
                <input
                  className="form-control my-3"
                  type="tel"
                  style={{ height: "50px", fontSize: "20px" }}
                  value={mobNo}
                ></input>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <VendorLogin />;
  }
}

export default VendorProfile;
