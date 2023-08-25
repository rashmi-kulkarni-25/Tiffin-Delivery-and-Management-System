import React from "react";
import { useEffect, useState } from "react";
import { createUrl, createaUrl, log } from "../../utils/utils";
import Login from "./Login";
import CustomerNavbar2 from "./CustomerNavbar2";
import Footer from "./Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  // var user = sessionStorage.getItem("user");
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");
  var customerId = sessionStorage.getItem("customerId");
  const navigate = useNavigate();

  const [tiffins, setTiffins] = useState([]);
  const [tiffin, setTiffin] = useState({
    cart_id: 0,
    tiffin_id: 0,
    tiffin_name: "",
    description: "",
    tiffin_category: "",
    tiffin_price: 0.0,
    image_link: "",
    quantity: 0,
  });
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    console.log("Inside Component Did Mount");
    select();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [tiffins, tiffin, total]);

  const select = () => {
    debugger;
    var id = { customer_id: customerId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        setTiffins(result);
      }
    };
    const url = createaUrl("customer/getcartitems");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(id));
  };

  const getCartTotal = () => {
    debugger;
    var id = { customer_id: customerId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        setTotal(result[0].tot);
      }
    };
    const url = createaUrl("customer/getcarttotal");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(id));
  };

  const placeorder = () => {
    debugger;
    var obj = { customerId: customerId, totalPrice: total };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = helper.responseText;
        log(result);
        toast.success("Order placed successfully");
        navigate("/");
      }
    };
    const url = createUrl("api/customers/placeorder");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(obj));
  };

  const remove = (cartId) => {
    debugger;
    var obj = { cart_id: cartId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        toast.success("Tiffin removed from cart");
        window.location.reload();
      }
    };
    const url = createaUrl("customer/removefromcart");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(obj));
  };

  if (isLoggedIn) {
    return (
      <>
        <CustomerNavbar2 />
        <div className="row">
          <div className="col-md-8">
            {tiffins.map((tiffin) => {
              return (
                <>
                  <div className="container mt-3">
                    <div className="border border-4 p-3">
                      <div className="row" style={{ height: "200px" }}>
                        <div className="col-md-4">
                          <img src={tiffin.image_link} alt="..." />
                        </div>
                        <div className="col-md-4" style={{ marginTop: "30px" }}>
                          <h1>{tiffin.tiffin_name}</h1>
                          <div>
                            <h5>{tiffin.description}</h5>
                          </div>
                          <button
                            className="btn btn-danger"
                            onClick={() => remove(tiffin.cart_id)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="col-md-2" style={{ marginTop: "80px" }}>
                          <div
                            className="quantity-control"
                            style={{ display: "flex", textAlign: "center" }}
                          >
                            <button className="btn btn-danger mx-3">-</button>
                            <input
                              type="number"
                              value={tiffin.quantity}
                              style={{ width: "40px" }}
                            />
                            <button className="btn btn-success mx-3">+</button>
                          </div>
                        </div>
                        <div className="col-md-2" style={{ marginTop: "70px" }}>
                          <h1>
                            ₹ {`${tiffin.tiffin_price * tiffin.quantity}`}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <div className="col-md-4">
            <div
              className="container mt-3 mx-3 my-3"
              style={{ padding: "15px" }}
            >
              <div
                className="border border-4 p-3"
                style={{ backgroundColor: "olivedrab", color: "white" }}
              >
                <h1 style={{ textAlign: "center" }}>Summary</h1>
                <hr></hr>

                <div>
                  <div className="form-check">
                    <div className="container my-3">
                      <label>
                        {" "}
                        <h5>Cardholder's Name </h5>
                      </label>
                      <input
                        className="form-control my-3"
                        placeholder="Cardholder's name"
                        type="text"
                        style={{ height: "50px" }}
                      ></input>
                      <label>
                        <h5>Card Number</h5>
                      </label>
                      <input
                        className="form-control my-3"
                        placeholder="Card Number"
                        type="text"
                        style={{ height: "50px" }}
                      ></input>
                      <label>
                        <h5>Card Expiry</h5>
                      </label>
                      <input
                        className="form-control my-3"
                        placeholder="mm/yy"
                        type="text"
                        style={{ height: "50px" }}
                      ></input>
                      <label>
                        <h5>CVV</h5>
                      </label>
                      <input
                        className="form-control my-3"
                        placeholder=""
                        type="password"
                        style={{ height: "50px" }}
                      ></input>
                    </div>
                  </div>

                  <hr></hr>
                  <center>
                    <label>
                      <h4>Total</h4>
                    </label>
                    <div
                      className="border border-2 p-3"
                      style={{ width: "200px" }}
                    >
                      <h2>₹ {total}</h2>
                    </div>
                  </center>
                  <hr></hr>
                  <center>
                    <button
                      type="button"
                      className="btn btn-primary mx-3"
                      onClick={getCartTotal}
                    >
                      <b>Calculate total</b>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary mx-3"
                      onClick={placeorder}
                    >
                      <b>Place Order</b>
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    <Login />;
  }
}

export default Cart;
