import React from "react";
import Footer from "./Footer";
import CustomerNavbar from "./CustomerNavbar";
import CustomerNavbar2 from "./CustomerNavbar2";
import { useEffect, useState } from "react";
import { createDotNetUrl, createNodejsUrl, log } from "../../utils/utils";
import { Link } from "react-router-dom";
import axios from "axios";
import bgimage4 from "../../../src/images/bg4.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
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

  const select = () => {
    debugger;
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        setTiffins(result);
      }
    };
    const url = createNodejsUrl("customer/tiffins");
    helper.open("GET", url);
    helper.send();
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

  if (!isLoggedIn) {
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
        <CustomerNavbar />
        <div style={{ paddingTop: "180px" }}>
          <div className="container">
            <div className="row gy-3 my-3">
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
                          <Link to="/login" className="btn btn-success mx-3">
                            Add to cart
                          </Link>
                          <Link to="/login" className="btn btn-danger mx-3">
                            Like
                          </Link>
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
          <div className="container">
            <div className="row gy-3 my-3">
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
                              className="btn btn-success mx-3"
                              onClick={() => addToCart(tiffin.tiffin_id)}
                            >
                              Add to cart
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger mx-3"
                              onClick={() => like(tiffin.tiffin_id)}
                            >
                              Like
                            </button>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                );

                // <div className="col-md-3">
                // <div className="card" style={{borderRadius:'40px'}}>
                //     <img src={tiffin.image_link} className="card-img-top" alt="..."
                //     style={{padding:'10px', borderRadius:'40px'}}/>
                //     <div className="card-body">
                //     <div className='row'>
                //         <div className='col-md-8'>
                //       <h5 className="card-title">{tiffin.tiffin_name}</h5>
                //       </div>
                //       <div className='col-md-4'>
                //       <h5 className="card-title">₹ {tiffin.tiffin_price}</h5>
                //       </div>
                //       </div>
                //       <p className="card-text">{tiffin.description}</p>
                //       <center>
                //       <button type="button" className="btn btn-primary mx-3"
                //       onClick={()=>addToCart(tiffin.tiffin_id)}>
                //         Add to cart</button>
                //       <button type="button" className="btn btn-danger mx-3"
                //       onClick={()=>like(tiffin.tiffin_id)}>
                //         Like</button>
                //       </center>
                //     </div>
                //   </div>
                // </div>
              })}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Home;
