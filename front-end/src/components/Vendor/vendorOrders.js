import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Truck } from "react-bootstrap-icons";

function MyOrders(props) {
  const vendorId = sessionStorage.getItem("vendorId");
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const responsePromise = axios.get(
        `${config.backendUrl}/api/Vendors/myorders`,
        {
          params: {
            vendorId: vendorId, //TODO: Replace with actual vendor ID
          },
        }
      );

      responsePromise.then((response) => {
        if (response.status === 200) {
          setOrders(response.data);
          console.log("response.data: ", response.data);
          // toast.success("Fetched your orders!");
        } else {
          toast.error("Failed while getting vendor orders!");
        }
      });
    } catch (error) {
      //TODO: Handle fetch orders error
      console.log("error: ", error);
    }
  }, [vendorId]);

  const deliverOrder = (event) => {
    const orderId = parseInt(event.target.getAttribute("data-orderId"));
    console.log("order delivery event: ", orderId);

    try {
      const responsePromise = axios.patch(
        `${config.backendUrl}/api/Vendors/deliver?orderId=${orderId}`
      );

      responsePromise.then((response) => {
        if (response.status === 200) {
          console.log("response.data: ", response.data);
          toast.success("Order has been delivered!");
          navigate("/vendor-orders");
        } else {
          toast.error("Delivery failed!");
        }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="containerCard">
      <center>
        <br />
        <h1 style={{ marginBottom: 0 }}>My Orders</h1>
        (pending orders)
      </center>
      <br /> <br />
      <center>
        <div className="card-containerCard">
          {orders.map((order) => (
            <center key={order.transactionId}>
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
                      <b>Order ID: {order.orderId}</b>
                    </h2>
                  </Card.Title>
                  <br />
                  <Card.Text> Customer: {order.customerName}</Card.Text>
                  <Card.Text>Tiffin: {order.tiffinName}</Card.Text>
                  <Card.Text>Quantity: {order.quantity}</Card.Text>
                  <Card.Text> Address: {order.customerHomeAddress}</Card.Text>
                  <Button
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      border: "0",
                    }}
                    data-tiffinId={order.orderId}
                    onClick={deliverOrder}
                  >
                    <Truck
                      data-orderId={order.orderId}
                      onClick={deliverOrder}
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

export default MyOrders;
