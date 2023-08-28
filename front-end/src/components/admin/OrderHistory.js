import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import AdminLogin from "./AdminLogin";
import { createDotNetUrl, createNodejsUrl, log } from "../../utils/utils";
import axios from "axios";
import bgimage4 from "../../../src/images/bg4.jpg";

function OrderHistory() {
  var admin = sessionStorage.getItem("user");
  var isLoggedIn = sessionStorage.getItem("adminLoggedIn");

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({
    orderId: 0,
    customerName: "",
    tiffinName: "",
    quantity: 0,
    totalPrice: 0.0,
    timestamp: "",
    status: "",
  });

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getOrderHistory();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [orders, order]);

  const getOrderHistory = async () => {
    debugger;
    const url = createDotNetUrl("api/admins/getordershistory");
    axios.get(url).then((res) => {
      debugger;
      log(res.data);
      setOrders(res.data);
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
                Order History
              </h2>
            </div>
            <div className="table-responsive my-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Tiffin Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr>
                        <td>{order.customerName}</td>
                        <td>{order.tiffinName}</td>
                        <td>{order.quantity}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.timestamp}</td>
                        <td>{order.status}</td>
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

export default OrderHistory;
