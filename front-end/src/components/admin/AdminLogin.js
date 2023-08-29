import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { log, createDotNetUrl } from "../../utils/utils";
import bgimage from "../../../src/images/img1.jpg";

function AdminLogin() {
  const history = useHistory();

  const adminlogin = (event) => {
    event.preventDefault();
    debugger;
    var { pass } = document.forms[0];
    var creds = pass.value;
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        var admin_id = result.adminId;
        var password = result.password;

        if (password === pass.value) {
          console.log("Logged in");
          sessionStorage.setItem("user", admin_id);
          sessionStorage.setItem("adminLoggedIn", true);
          toast.success("Logged in successfully");
          history.push("/adminhome");
        } else {
          log("Invalid creds...");
          toast.error("Invalid password");
        }
      } else {
        //toast.error("Invalid password");
      }
    };
    const url = createDotNetUrl("api/admins/login");
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
          <center>Admin Sign In</center>{" "}
        </div>
        <div className="form">
          <form onSubmit={adminlogin}>
            <div className="input-container">
              <label>Password </label>
              <input
                type="password"
                name="pass"
                required
                style={{ height: "40px" }}
              />
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
