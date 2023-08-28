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

function VendorChangePassword() {
  const history = useHistory();
  var vendorId = sessionStorage.getItem("vendorId");
  var isLoggedIn = sessionStorage.getItem("vendorLoggedIn");

  const [curpassword, setCurPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getMyProfile();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [password, curpassword, newpassword]);

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
        setCurPassword(result[0].password);
      }
    };
    const url = createNodejsUrl("vendor/getvendorbyid");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(id));
  };

  const update = () => {
    if (password !== curpassword) {
      toast.error("Password is incorrect");
    } else if (password === newpassword) {
      toast.error("Old password and new password cannot be same");
    } else {
      debugger;
      var id = { vendor_id: vendorId, password: newpassword };
      var helper = new XMLHttpRequest();
      helper.onreadystatechange = () => {
        debugger;
        if (helper.readyState === 4 && helper.status === 200) {
          debugger;
          var result = JSON.parse(helper.responseText);
          log(result);
          toast.success("Password changed");
          history.push("/vendorprofile");
        }
      };
      const url = createNodejsUrl("vendor/changepass");
      helper.open("PUT", url);
      helper.setRequestHeader("Content-Type", "application/json");
      helper.send(JSON.stringify(id));
    }
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
            <div className="form-check">
              <div className="container my-3">
                <label>
                  {" "}
                  <h4>Enter Current Password </h4>
                </label>
                <input
                  className="form-control my-3"
                  type="password"
                  style={{ height: "50px", fontSize: "20px" }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
                <label>
                  <h4>Enter new password</h4>
                </label>
                <input
                  className="form-control my-3"
                  type="password"
                  style={{ height: "50px", fontSize: "20px" }}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <center>
              <button className="btn btn-success btn-lg my-3" onClick={update}>
                Submit
              </button>
            </center>
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

export default VendorChangePassword;
