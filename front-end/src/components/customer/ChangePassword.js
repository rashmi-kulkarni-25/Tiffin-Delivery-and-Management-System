import React from "react";
import { useEffect, useState } from "react";
import CustomerNavbar2 from "./CustomerNavbar2";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Login from "./Login";
import { createNodejsUrl, log } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import bgimage4 from "../../../src/images/bg4.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangePassword() {
  const history = useHistory();
  // var user = sessionStorage.getItem("user");
  var customerId = sessionStorage.getItem("customerId");
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const [curpassword, setCurPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

  useEffect(() => {
    log("Inside Component Did Mount");
    getMyProfile();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [password, curpassword, newpassword]);

  const getMyProfile = () => {
    debugger;
    var id = { id: customerId };
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
    const url = createNodejsUrl("customer/getcustomer");
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
      var id = { customer_id: customerId, password: newpassword };
      var helper = new XMLHttpRequest();
      helper.onreadystatechange = () => {
        debugger;
        if (helper.readyState === 4 && helper.status === 200) {
          debugger;
          var result = JSON.parse(helper.responseText);
          log(result);
          toast.success("Password changed");
          history.push("/profile");
        }
      };
      const url = createNodejsUrl("customer/changepass");
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
        <CustomerNavbar2 />
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

        {/* <h5>
                <center>
                <form role="form">
                    <div className="form-group" style={{marginTop:'150px'}}>
                <div className="table-responsive col-md-6 my-3">
                    <table className="table table-hover table-bordered">
                        <tbody>
                            <tr>
                                <td className='col-md-3'>Current password</td>
                                <td><input type="password" className="form-control" value={current} required="required"
                                    onChange={(e) => {
                                    setCurrent(e.target.value)
                                  }}/></td>
                            </tr>
                            <tr>
                                <td>New Password</td>
                                <td>
                                <input type="password" className="form-control" value={password} required="required"
                                    onChange={(e) => {
                                    setPassword(e.target.value)
                                  }}/>
                                </td>
                            </tr>
                         
                        </tbody>
                    </table>
                </div>
                </div>
                        <button type="submit" onClick={changePassword} className="btn btn-success"
                        style={{marginBottom:'150px'}}>Save</button>
            </form>
                </center>
                </h5> */}
        <Footer />
      </div>
    );
  } else {
    <Login />;
  }
}

export default ChangePassword;
