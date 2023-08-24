import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";

function MyOrders(props) {
  const vendorId = sessionStorage.getItem("vendorId");
  const [orders, setOrders] = useState([]);

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
          toast.success("Fetched your orders!");
        } else {
          toast.error("Failed while getting vendor orders!");
        }
      });
    } catch (error) {
      //TODO: Handle fetch orders error
      console.log("error: ", error);
    }
  }, [vendorId]);

  return (
    <div className="containerCard">
      <center>
        <h1>My Orders</h1>
      </center>
      <hr />
      <br />
      <ul>
        {orders.map((order) => (
          <li key={order.transactionId}>
            <b>Order ID: {order.orderId}</b>
            <br />
            Customer: {order.customerName}
            <br />
            Tiffin: {order.tiffinName}
            <br />
            Quantity: {order.quantity}
            <br />
            Address: {order.customerHomeAddress}
            <br />
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyOrders;
