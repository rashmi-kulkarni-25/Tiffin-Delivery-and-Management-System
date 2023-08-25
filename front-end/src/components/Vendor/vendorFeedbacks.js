import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
//import { Card } from "react-bootstrap";
import "./styles.css";

function VendorFeedbacks(props) {
  const vendorId = sessionStorage.getItem("vendorId");
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    try {
      const responsePromise = axios.get(
        `${config.backendUrl}/api/Vendors/showfeedbacks`,
        {
          params: {
            vendorId: vendorId, //TODO: Replace with actual vendor ID
          },
        }
      );

      responsePromise.then((response) => {
        if (response.status === 200) {
          setFeedbacks(response.data);
          console.log("response.data: ", response.data);
          toast.success("Fetched your feedbacks!");
        } else {
          toast.error("Failed while getting vendor feedbacks!");
        }
      });
    } catch (error) {
      //TODO: Handle fetch feedbacks error
      console.log("error: ", error);
    }
  }, [vendorId]);

  return (
    <div className="containerCard">
      <center>
        <br />
        <h1>Feedbacks and Complaints</h1>
      </center>
      <br />
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.fcId}>
            <b> Feedback ID: {feedback.fcId}</b>
            <br />
            Customer: {feedback.customerName}
            <br />
            Tiffin: {feedback.tiffinName}
            <br />
            Description: {feedback.feedbackDescription}
            <br />
            Status: {feedback.feedbackStatus}
            <br />
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VendorFeedbacks;
