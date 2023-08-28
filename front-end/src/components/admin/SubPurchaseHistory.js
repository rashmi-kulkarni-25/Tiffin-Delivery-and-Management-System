import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import AdminLogin from "./AdminLogin";
import { createDotNetUrl, createNodejsUrl, log } from "../../utils/utils";
import axios from "axios";
import bgimage4 from "../../../src/images/bg4.jpg";

function SubPurchaseHistory() {
  var admin = sessionStorage.getItem("user");
  var isLoggedIn = sessionStorage.getItem("adminLoggedIn");

  const [purchases, setPurchases] = useState([]);
  const [purchase, setPurchase] = useState({
    puchaseId: 0,
    planId: 0,
    customerId: 0,
    status: "",
    transactionId: "",
    timestamp: "",
  });

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getPurchaseHistory();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [purchases, purchase]);

  const getPurchaseHistory = async () => {
    debugger;
    const url = createDotNetUrl("api/admins/getpurchasehistory");
    axios.get(url).then((res) => {
      debugger;
      log(res.data);
      setPurchases(res.data);
    });
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
        <AdminNavbar />

        {/* <h2 style={{textAlign:'center', marginTop:'15px'}}>Pending Approval Requests</h2> */}
        <div className="row my-3" style={{ paddingTop: "180px" }}>
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div style={{ backgroundColor: "white" }}>
              <h2
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  padding: "10px",
                }}
              >
                Subscription Purchase History
              </h2>
            </div>
            <div className="table-responsive my-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Plan ID</th>
                    <th>Customer ID</th>
                    <th>Status</th>
                    <th>transactionId</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase) => {
                    return (
                      <tr>
                        <td>{purchase.planId}</td>
                        <td>{purchase.customerId}</td>
                        <td>{purchase.status}</td>
                        <td>{purchase.transactionId}</td>
                        <td>{purchase.timestamp}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-2"></div>
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

export default SubPurchaseHistory;
