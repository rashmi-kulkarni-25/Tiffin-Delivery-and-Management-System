import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { Card, Button } from "react-bootstrap";
import "./styles.css";
import { Reply } from "react-bootstrap-icons";

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
          // toast.success("Fetched your feedbacks!");
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
        <h1 style={{ marginBottom: 0 }}>Feedbacks and Complaints</h1>
      </center>
      <br /> <br />
      <center>
        <div className="card-containerCard">
          {feedbacks.map((feedback) => (
            <center key={feedback.fcId}>
              <Card
                style={{
                  width: "18rem",
                  marginBottom: "50px",
                  border: "5px solid olive",
                  display: "-ms-iline-grid",
                }}
                className="customCard"
              >
                <Card.Body>
                  <Card.Title style={{ color: "darkgreen" }}>
                    <h2>
                      <b>Feedback ID: {feedback.fcId}</b>
                    </h2>
                  </Card.Title>
                  <Card.Text> Customer: {feedback.customerName}</Card.Text>
                  <Card.Text>Tiffin: {feedback.tiffinName}</Card.Text>
                  <Card.Text>
                    Description: {feedback.feedbackDescription}
                  </Card.Text>
                  <Card.Text> Status: {feedback.feedbackStatus}</Card.Text>
                  <Button
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      border: "0",
                    }}
                    data-tiffinId={feedback.fcId}
                  >
                    <Reply
                      data-orderId={feedback.fcId}
                      color="darkgreen"
                      size={30}
                    />
                  </Button>
                </Card.Body>
                <br />
              </Card>
            </center>
          ))}
        </div>
      </center>
    </div>
  );
}

export default VendorFeedbacks;
