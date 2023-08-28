import React from "react";
import Login from "./Login";
import { useEffect, useState } from "react";
import { createNodejsUrl, log } from "../../utils/utils";
import Footer from "./Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar2 from "./CustomerNavbar2";
import bgimage4 from "../../../src/images/bg4.jpg";

function Subscription() {
  // var user = sessionStorage.getItem("user");
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");
  var customerId = sessionStorage.getItem("customerId");

  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState({
    purchase_id: 0,
    status: "",
    name: "",
    description: "",
    price: 0.0,
    no_of_meals: 0,
    transaction_id: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    console.log("Inside Component Did Mount");
    select();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [subs, sub]);

  const select = () => {
    debugger;
    var id = { customer_id: customerId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        setSubs(result);
        setStatus(result[0].status);
      }
    };
    const url = createNodejsUrl("customer/getsubscription");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(id));
  };

  const cancel = () => {
    toast.success("Plan canceled");
    setStatus("inactive");
  };

  const active = () => {
    toast.success("Plan activated");
    setStatus("active");
  };

  const buy = () => {
    toast.error("You already have one subscription plan");
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

        <div className="row my-3" style={{ paddingTop: "180px" }}>
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-9"></div>
              <div className="col-md-3">
                <button className="btn btn-dark btn-lg my-3 mx-3" onClick={buy}>
                  Buy Subscription
                </button>
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
                My Subscriptions
              </h2>
            </div>
            <div className="table-responsive my-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>No. of meals</th>
                    <th>Transaction Id</th>
                    <th>Status</th>
                    <th>Cancel/Active</th>
                  </tr>
                </thead>
                <tbody>
                  {subs.map((sub) => {
                    return (
                      <tr>
                        <td>{sub.name}</td>
                        <td>{sub.description}</td>
                        <td>{sub.price}</td>
                        <td>{sub.no_of_meals}</td>
                        <td>{sub.transaction_id}</td>
                        <td>{sub.status}</td>
                        <td>
                          {status === "active" ? (
                            <button className="btn btn-danger" onClick={cancel}>
                              Cancel plan
                            </button>
                          ) : (
                            <button
                              className="btn btn-success"
                              onClick={active}
                            >
                              Active Plan
                            </button>
                          )}
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
    return <Login />;
  }
}

export default Subscription;
