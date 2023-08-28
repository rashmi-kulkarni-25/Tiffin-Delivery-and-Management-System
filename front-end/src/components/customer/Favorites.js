import React from "react";
import { useEffect, useState } from "react";
import CustomerNavbar2 from "./CustomerNavbar2";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Login from "./Login";
import { createNodejsUrl, createDotNetUrl, log } from "../../utils/utils";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgimage4 from "../../../src/images/bg4.jpg";

function Favorites() {
  // var user = sessionStorage.getItem("user");
  var customerId = sessionStorage.getItem("customerId");
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const [tiffins, setTiffins] = useState([]);
  const [tiffin, setTiffin] = useState({
    tiffin_id: "",
    tiffin_name: "",
    description: "",
    tiffin_category: "",
    tiffin_price: "",
    image_link: "",
  });

  useEffect(() => {
    console.log("Inside Component Did Mount");
    select();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [tiffins, tiffin]);

  // const select = () =>
  // {
  //     debugger;
  //     var helper = new XMLHttpRequest();
  //     var creds = {"customer_id":customerId}
  //     helper.onreadystatechange = ()=>{
  //         debugger
  //         if (helper.readyState === 4 && helper.status === 200 )
  //             {
  //             debugger;
  //             var result = JSON.parse(helper.responseText);
  //             log(result)
  //             setTiffins(result)
  //             }
  //     };
  //     const url = createNodejsUrl('customer/myfavorites')
  //     helper.open("GET", url);
  //     helper.setRequestHeader("Content-Type", "application/json");
  //     helper.send(JSON.stringify(creds));
  // }

  const select = async () => {
    debugger;
    const url = createNodejsUrl("customer/myfavorites");
    axios
      .post(url, {
        customer_id: customerId,
      })
      .then((res) => {
        debugger;
        log(res.data);
        setTiffins(res.data);
      });
  };

  const addToCart = async (tiffinId) => {
    debugger;
    const url = createDotNetUrl("api/customers/cart");
    axios
      .post(url, {
        customerId: customerId,
        tiffinId: tiffinId,
      })
      .then((res) => {
        debugger;
        log(res.data);
        toast.success("Added to cart");
      });
  };

  const like = (tiffinId) => {
    debugger;
    const url = createDotNetUrl("api/customers/addtofavorites");
    axios
      .post(url, {
        customerId: customerId,
        tiffinId: tiffinId,
      })
      .then((res) => {
        debugger;
        log(res.data);
        toast.success("Added to favorites");
      });
  };

  const remove = (tiffId) => {
    debugger;
    var obj = { customer_id: customerId, tiffin_id: tiffId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        toast.success("Tiffin removed from favorites");
        window.location.reload();
      }
    };
    const url = createNodejsUrl("customer/unlike");
    helper.open("DELETE", url);
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
        <CustomerNavbar2 />
        <div style={{ paddingTop: "180px" }}>
          <div className="container my-3">
            <div className="row gy-3">
              {tiffins.map((tiffin) => {
                return (
                  <div className="col-md-3 my-3">
                    <div
                      className="card h-100 bg-dark text-white"
                      style={{ borderRadius: "40px" }}
                    >
                      <img
                        src={tiffin.image_link}
                        className="card-img-top"
                        alt="..."
                        style={{ padding: "10px", borderRadius: "40px" }}
                      />
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-8">
                            <h5 className="card-title">{tiffin.tiffin_name}</h5>
                          </div>
                          <div className="col-md-4">
                            <h5 className="card-title">
                              ₹ {tiffin.tiffin_price}
                            </h5>
                          </div>
                        </div>
                        <p className="card-text">{tiffin.description}</p>
                        <div className="card-footer mt-auto">
                          <center>
                            <button
                              type="button"
                              className="btn btn-success mx-3 my-3"
                              onClick={() => addToCart(tiffin.tiffin_id)}
                            >
                              Add to cart
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger mx-3 my-3"
                              onClick={() => like(tiffin.tiffin_id)}
                            >
                              Like
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-warning mx-3 my-3"
                              onClick={() => remove(tiffin.tiffin_id)}
                            >
                              Remove
                            </button>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  } else {
    <Login />;
  }
}

export default Favorites;
