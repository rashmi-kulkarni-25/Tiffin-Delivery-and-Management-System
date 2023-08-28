import React from "react";
import VendorLogin from "./VendorLogin";
import VendorNavbar from "./VendorNavbar";
import Footer from "./Footer";
import bgimage4 from "../../../src/images/bg4.jpg";
import { useEffect, useState } from "react";
import { createDotNetUrl, createNodejsUrl, log } from "../../utils/utils";

function FeedsComps() {
  var vendorId = sessionStorage.getItem("vendorId");
  var isLoggedIn = sessionStorage.getItem("vendorLoggedIn");

  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState({
    name: 0,
    tiffin_name: "",
    category: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getFeedbacks();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [feedbacks, feedback]);

  const getFeedbacks = () => {
    debugger;
    var obj = { vendor_id: vendorId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        setFeedbacks(result);
      }
    };
    const url = createNodejsUrl("vendor/feedbackcomplaints");
    helper.open("POST", url);
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
          <div className="col-md-3 my-3"></div>

          <div className="col-md-6">
            <div style={{ backgroundColor: "white" }}>
              <h2
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  padding: "10px",
                }}
              >
                Feedbacks / Complaints
              </h2>
            </div>
            <div className="table-responsive my-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Tiffin</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback) => {
                    return (
                      <tr>
                        <td>{feedback.name}</td>
                        <td>{feedback.tiffin_name}</td>
                        <td>{feedback.category}</td>
                        <td>{feedback.description}</td>
                        <td>{feedback.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3 my-3"></div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <VendorLogin />;
  }
}

export default FeedsComps;
