import React from "react";
import { useHistory, Link } from "react-router-dom";
import { log, createDotNetUrl } from "../../utils/utils";
import "./styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgimage from "../../../src/images/img1.jpg";

function Register() {
  const history = useHistory();

  const customerregister = (event) => {
    event.preventDefault();
    debugger;
    var { uname, haddress, waddress, pincode, email, mobile, pass, cnfpass } =
      document.forms[0];
    if (pass.value !== cnfpass.value) {
      log("Passwords are not matching");
      toast.error("Passwords not matching");
    } else {
      var record = {
        name: uname.value,
        homeAddress: haddress.value,
        workAddress: waddress.value,
        pincode: pincode.value,
        email: email.value,
        password: pass.value,
        mobNo: mobile.value,
      };
      var helper = new XMLHttpRequest();
      helper.onreadystatechange = () => {
        debugger;
        if (helper.readyState === 4 && helper.status === 200) {
          debugger;
          var responseReceived = JSON.parse(helper.responseText);
          if (responseReceived.email === email.value) {
            console.log("Registered!!!");
            history.push("/login");
            toast.success("Registered successfully");
          } else {
            log("already registered");
            toast.error("User already registered");
          }
        } else {
          toast.error("User already registered");
        }
      };
      const url = createDotNetUrl("api/customers/register");
      helper.open("POST", url);
      helper.setRequestHeader("Content-Type", "application/json");
      helper.send(JSON.stringify(record));
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        content: "",
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="login-form"
        style={{ width: "500px", backgroundColor: "lightgray" }}
      >
        <div className="title">
          {" "}
          <center>Register</center>
        </div>
        <div className="form">
          <form onSubmit={customerregister}>
            <div className="input-container">
              <label>Name</label>
              <input type="text" name="uname" required />
            </div>
            <div className="input-container">
              <label>Home Address</label>
              <input
                type="text"
                name="haddress"
                required
                style={{ height: "50px" }}
              />
            </div>
            <div className="input-container">
              <label>Work Address</label>
              <input
                type="text"
                name="waddress"
                required
                style={{ height: "50px" }}
              />
            </div>
            <div className="input-container">
              <label>Pincode</label>
              <input type="text" name="pincode" required />
            </div>
            <div className="input-container">
              <label>Email Id</label>
              <input type="email" name="email" required />
            </div>
            <div className="input-container">
              <label>Mobile Number</label>
              <input type="text" name="mobile" required />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" required />
            </div>
            <div className="input-container">
              <label>Confirm Password </label>
              <input type="password" name="cnfpass" required />
            </div>
            <div className="button-container">
              <input
                type="submit"
                value="Register"
                style={{
                  background: "gray",
                  borderColor: "black",
                  borderRadius: 10,
                  height: "30px",
                  width: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexdirection: "row",
                  flexWrap: "wrap",
                }}
              />
            </div>
            <center>
              <p className="forgot-password text-right my-3">
                Already have account?<Link to="/login">Login here</Link>
              </p>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
