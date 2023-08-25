import React from "react";
import { useEffect, useState } from "react";
import CustomerNavbar2 from "./CustomerNavbar2";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Login from "./Login";
import { createaUrl, log } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const bgimage4 = "/images/bg4.jpg";

function ChangePassword() {
  const navigate = useNavigate();
  // var user = sessionStorage.getItem("user");
  var customerId = sessionStorage.getItem("customerId");
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    log("Inside Component Did Mount");
  }, []);

  useEffect(() => {
    log("Component Did Update is called..");
  }, [password]);

  const changePassword = async () => {
    debugger;
    var helper = new XMLHttpRequest();
    var creds = { customer_id: customerId, password: password };
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        navigate("/profile");
        toast.success("Password changed");
      }
    };
    const url = createaUrl("customer/changepass");
    helper.open("PUT", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(creds));
  };

  if (isLoggedIn) {
    return (
      <div
        style={{
          backgroundImage: `url(${bgimage4})`,
          backgroundAttachment: "fixed",
        }}
      >
        <CustomerNavbar2 />
        <Navbar />
        <h5>
          <center>
            <form role="form">
              <div className="form-group" style={{ marginTop: "150px" }}>
                <div className="table-responsive col-md-6 my-3">
                  <table className="table table-hover table-bordered">
                    <tbody>
                      <tr>
                        <td className="col-md-3">Current password</td>
                        <td>
                          <input
                            type="password"
                            className="form-control"
                            value={current}
                            required="required"
                            onChange={(e) => {
                              setCurrent(e.target.value);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>New Password</td>
                        <td>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            required="required"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <button
                type="submit"
                onClick={changePassword}
                className="btn btn-success"
                style={{ marginBottom: "150px" }}
              >
                Save
              </button>
            </form>
          </center>
        </h5>
        <Footer />
      </div>
    );
  } else {
    <Login />;
  }
}

export default ChangePassword;
