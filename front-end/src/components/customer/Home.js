import React from "react";
import Footer from "./Footer";
import CustomerNavbar from "./CustomerNavbar";
import CustomerNavbar2 from "./CustomerNavbar2";
import { useEffect, useState } from "react";
import { createUrl, createaUrl, log } from "../../utils/utils";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const bgimage4 = "/images/bg4.jpg";

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
    const url = createaUrl("customer/tiffins");
    helper.open("GET", url);
    helper.send();
  };

  const addToCart = async (tiffinId) => {
    debugger;
    const url = createUrl("api/customers/cart");
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
    const url = createUrl("api/customers/addtofavorites");
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
      <div
        style={{
          backgroundImage: `url(${bgimage4})`,
          backgroundAttachment: "fixed",
        }}
      >
        <CustomerNavbar />
        <>
          <div className="container">
            <div className="row gy-3">
              {tiffins.map((tiffin) => {
                return (
                  <div className="col-md-3">
                    <div className="card">
                      <img
                        src={tiffin.image_link}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{tiffin.tiffin_name}</h5>
                        <p className="card-text">{tiffin.description}</p>
                        <Link to="/login" className="btn btn-primary mx-3">
                          Add to cart
                        </Link>
                        <Link to="/login" className="btn btn-primary mx-3">
                          Like
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Footer />
        </>
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundImage: `url(${bgimage4})`,
          backgroundAttachment: "fixed",
        }}
      >
        <CustomerNavbar2 />
        <>
          <div className="container">
            <div className="row gy-3">
              {tiffins.map((tiffin) => {
                return (
                  <div className="col-md-3">
                    <div className="card">
                      <img
                        src={tiffin.image_link}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{tiffin.tiffin_name}</h5>
                        <p className="card-text">{tiffin.description}</p>
                        <center>
                          <button
                            type="button"
                            className="btn btn-primary mx-3"
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
                );
              })}
            </div>
          </div>
          <Footer />
        </>
      </div>
    );
  }
}

export default Home;
