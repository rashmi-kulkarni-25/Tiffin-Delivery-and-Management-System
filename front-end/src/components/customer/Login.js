import React from "react";
import { useHistory, Link } from "react-router-dom";
import "./styles.css";
import { createNodejsUrl } from "../../utils/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgimage from "../../../src/images/img1.jpg";

function Login() {
  const history = useHistory();

  const customerlogin = (event) => {
    event.preventDefault();
    debugger;
    var { uname, pass } = document.forms[0];
    var creds = { email: uname.value, password: pass.value };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        // var username = result[0].name;
        if (result[0].customer_id === "not found") {
          toast.error("Invalid credentials");
        } else {
          var email = result[0].email;
          var customerId = result[0].customer_id;

          // if (email===uname.value)
          // {
          console.log("Logged in");
          // sessionStorage.setItem("user", username);
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("customerId", customerId);
          toast.success("Logged in sucessfully");
          history.push("/");
          // } else
          // {
          //   console.log("Invalid creds...");
          //   toast.error("Invalid credentials")
          // }
        }
      } else {
      }
    };
    const url = createNodejsUrl("customer/login");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(creds));
  };

  debugger;
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
      <div className="login-form" style={{ backgroundColor: "lightgray" }}>
        <div className="title">
          {" "}
          <center>Customer Sign In</center>{" "}
        </div>
        <div className="form">
          <form onSubmit={customerlogin}>
            <div className="input-container">
              <label>Email </label>
              <input type="email" name="uname" required />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" required />
            </div>
            <div className="button-container">
              <input
                type="submit"
                value="Login"
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
                <Link to="/vendorlogin">Login as Vendor</Link>
              </p>
              <p className="forgot-password text-right my-3">
                Don't have account? <a href="/register">Register here</a>
              </p>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
