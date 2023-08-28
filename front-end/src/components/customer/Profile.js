import React from "react";
import { useEffect, useState } from "react";
import CustomerNavbar2 from "./CustomerNavbar2";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Login from "./Login";
import { createNodejsUrl } from "../../utils/utils";
import bgimage4 from "../../../src/images/bg4.jpg";
import { useHistory } from "react-router-dom";

function Profile() {
  const history = useHistory();
  // var user = sessionStorage.getItem("user");
  var customerId = sessionStorage.getItem("customerId");
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const [customer, setCustomer] = useState({
    customer_id: "",
    name: "",
    home_address: "",
    work_address: "",
    pincode: "",
    email: "",
    password: "",
    mob_no: "",
    active_status: "",
  });

  useEffect(() => {
    console.log("Inside Component Did Mount");
    select();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [customer]);

  const select = () => {
    debugger;
    var helper = new XMLHttpRequest();
    var id = { id: customerId };
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        setCustomer(result[0]);
      }
    };
    const url = createNodejsUrl("customer/getcustomer");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(id));
  };

  const edit = () => {
    history.push("/changeprofile");
  };

  const changepass = () => {
    history.push("/changepassword");
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
                  value={customer.name}
                ></input>
                <label>
                  <h4>Home Address</h4>
                </label>
                <textarea
                  className="form-control my-3"
                  rows="4"
                  style={{ fontSize: "20px" }}
                  value={customer.home_address}
                ></textarea>
                <label>
                  <h4>Work Address</h4>
                </label>
                <textarea
                  className="form-control my-3"
                  rows="4"
                  style={{ fontSize: "20px" }}
                  value={customer.work_address}
                ></textarea>
                <label>
                  <h4>Pincode</h4>
                </label>
                <input
                  className="form-control my-3"
                  type="text"
                  style={{ height: "50px", fontSize: "20px" }}
                  value={customer.pincode}
                ></input>

                <label>
                  <h4>Email</h4>
                </label>
                <input
                  className="form-control my-3"
                  type="email"
                  style={{ height: "50px", fontSize: "20px" }}
                  value={customer.email}
                ></input>

                <label>
                  <h4>Mobile Number</h4>
                </label>
                <input
                  className="form-control my-3"
                  type="tel"
                  style={{ height: "50px", fontSize: "20px" }}
                  value={customer.mob_no}
                ></input>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>

        {/* <h5>
            <center>
            <div className="table-responsive col-md-6 my-3">
                <table className="table table-hover table-bordered" style={{marginTop:'75px', marginBottom:'75px'}}>
                    <tbody>
                        <tr>
                            <td className='col-md-2'>Name</td>
                            <td>{customer.name}</td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>{customer.email}</td>
                        </tr>
                        <tr>
                            <td>mobile</td>
                            <td>{customer.mob_no}</td>
                        </tr>
                        <tr>
                            <td>address</td>
                            <td>{customer.home_address}</td>
                        </tr>
                        <tr>
                            <td>Pincode</td>
                            <td>{customer.pincode}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </center>
            </h5> */}
        <Footer />
      </div>
    );
  } else {
    return <Login />;
  }
}

export default Profile;
