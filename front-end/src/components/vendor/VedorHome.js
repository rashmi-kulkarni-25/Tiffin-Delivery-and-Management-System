import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VendorLogin from "./VendorLogin";
import { createDotNetUrl, createNodejsUrl, log } from "../../utils/utils";
import axios from "axios";
import bgimage4 from "../../../src/images/bg4.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VendorNavbar from "./VendorNavbar";
import Footer from "./Footer";

function VendorHome() {
  var vendorId = sessionStorage.getItem("vendorId");
  var isLoggedIn = sessionStorage.getItem("vendorLoggedIn");

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({
    order_id: 0,
    name: "",
    home_address: "",
    work_address: "",
    vendor_name: "",
    tiffin_name: "",
    quantity: 0,
  });

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getMyOrders();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [orders, order]);

  // const getMyOrders = async() =>
  // {
  //   debugger
  //   const url = createDotNetUrl('api/vendors/myorders')
  //   axios.post(url,
  //     {
  //       vendorId
  //     })
  //   .then(res =>{
  //     debugger
  //     log(res.data)
  //     setOrders(res.data)
  //   })
  // }

  const getMyOrders = () => {
    debugger;
    var obj = { vendor_id: vendorId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        setOrders(result);
      }
    };
    const url = createNodejsUrl("vendor/getmyorders");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(obj));
  };

  const dispatch = () => {
    toast.success("Order dispatched");
  };

  const deliver = (orderId) => {
    debugger;
    var obj = { order_id: orderId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        toast.success("Order delivered");
        getMyOrders();
      }
    };
    const url = createNodejsUrl("vendor/deliver");
    helper.open("PUT", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(obj));
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
          <div className="col-md-2 my-3">
            <div
              className="card mx-3 my-5 bg-dark"
              style={{ backgroundColor: "olivedrab", color: "white" }}
            >
              <div className="card-body">
                <h5 className="card-title">Monthly Revenue</h5>
                <h6 className="card-title">Current Month</h6>
                <h1 className="card-text">₹ 14570</h1>
                <center>
                  <Link to="#" className="card-link" style={{ color: "white" }}>
                    Refresh
                  </Link>
                </center>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div style={{ backgroundColor: "white" }}>
              <h2
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  padding: "10px",
                }}
              >
                Orders
              </h2>
            </div>
            <div className="table-responsive my-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Home Address</th>
                    <th>Work Address</th>
                    <th>Vendor Name</th>
                    <th>Tiffin Name</th>
                    <th>Quantity</th>
                    <th>Dispatched</th>
                    <th>Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr>
                        <td>{order.name}</td>
                        <td>{order.home_address}</td>
                        <td>{order.work_address}</td>
                        <td>{order.vendor_name}</td>
                        <td>{order.tiffin_name}</td>
                        <td>{order.quantity}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={dispatch}
                          >
                            Dispatched
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => deliver(order.order_id)}
                          >
                            Delivered
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-2 my-3">
            <div
              className="card mx-3 my-5 bg-dark"
              style={{ backgroundColor: "olivedrab", color: "white" }}
            >
              <div className="card-body">
                <h5 className="card-title">Yearly Revenue</h5>
                <h6 className="card-title">Current Year</h6>
                <h1 className="card-text">₹ 47560</h1>
                <center>
                  <Link to="#" className="card-link" style={{ color: "white" }}>
                    Refresh
                  </Link>
                </center>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <VendorLogin />;
  }
}

export default VendorHome;
