import React from 'react'
import Login from './Login';
import { useEffect, useState } from 'react';
import { createaUrl, log } from '../../utils/utils';
import Footer from './Footer';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar2 from './CustomerNavbar2';
import Navbar from './Navbar';

function MyOrderHistory() {
    // var user = sessionStorage.getItem("user");
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    var customerId = sessionStorage.getItem("customerId");

    const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({order_id: 0, tiffin_id: 0, tiffin_name: "",
                                      quantity: 0, tiffin_price: 0.0, transaction_id: "",
                                    timestamp:"", status:""});

    useEffect(()=>{
    console.log("Inside Component Did Mount")
    select();
    }, [])

    useEffect(()=>
    {
        console.log("Component Did Update is called..")
    }, [orders, order]);

    const select=()=>
  {
    debugger;
    var id = {"customer_id": customerId}
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = ()=>{
        debugger
        if (helper.readyState === 4 && helper.status === 200 )
            {
              debugger;
              var result = JSON.parse(helper.responseText);
              setOrders(result);
            }
      };
      const url = createaUrl('customer/orderhistory')
      helper.open("POST", url);
      helper.setRequestHeader("Content-Type", "application/json");
      helper.send(JSON.stringify(id));
  }
                                  

  if(isLoggedIn)
  {
    return(
        <div>
            <CustomerNavbar2/>
            <Navbar/>

            <div className="row my-3">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <div style={{backgroundColor:'white'}}>
        <h2 style={{textAlign:'center', marginTop:'15px', padding:'10px'}}>My Orders</h2>
        </div>
        <div className="table-responsive my-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Tiffin</th>
                <th>Qunantity</th>
                <th>Price</th>
                <th>Transaction Id</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order) =>
                {
                  return (
                  <tr>
                    <td>{order.tiffin_name}</td>
                    <td>{order.quantity}</td>
                    <td>{order.tiffin_price}</td>
                    <td>{order.transaction_id}</td>
                    <td>{order.timestamp}</td>
                    <td>{order.status}</td>
                  </tr>)
                })
              }
            
            </tbody>
          </table>
        </div>
        
      </div>
      <div className="col-md-3"></div>
      </div>

            <Footer/>
            </div>
    )
  }
  else
  {
    return(
        <Login/>
    )
  }
}

export default MyOrderHistory