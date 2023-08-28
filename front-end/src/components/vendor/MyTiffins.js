import React from "react";
import { useEffect, useState } from "react";
import VendorLogin from "./VendorLogin";
import VendorNavbar from "./VendorNavbar";
import Footer from "./Footer";
import { createDotNetUrl, createNodejsUrl, log } from "../../utils/utils";
import bgimage4 from "../../../src/images/bg4.jpg";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function MyTiffins() {
  const history = useHistory();
  var vendorId = sessionStorage.getItem("vendorId");
  var isLoggedIn = sessionStorage.getItem("vendorLoggedIn");

  const [tiffins, setTiffins] = useState([]);
  const [tiffin, setTiffin] = useState({
    tiffin_id: 0,
    tiffin_name: "",
    description: "",
    tiffin_category: "",
    tiffin_price: 0.0,
    image_link: "",
    status: "",
  });

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getMyTiffins();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [tiffins, tiffin]);

  const getMyTiffins = () => {
    debugger;
    var id = { vendor_id: vendorId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        setTiffins(result);
      }
    };
    const url = createNodejsUrl("vendor/getmytiffins");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(id));
  };

  const edit = (tiffinId) => {
    sessionStorage.setItem("tiffinId", tiffinId);
    history.push("/edittiffin");
  };
  const remove = () => {
    toast.success("Tiffin removed");
  };

  const add = () => {
    history.push("/addtiffin");
  };

  const unavailable = () => {
    toast.success("Marked as not available");
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
        <>
          <div className="container" style={{ paddingTop: "200px" }}>
            <div>
              <center>
                <button className="btn btn-success btn-lg" onClick={add}>
                  Add new tiffin
                </button>
              </center>
            </div>
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
                              className="btn btn-success mx-3 my-3"
                              onClick={() => edit(tiffin.tiffin_id)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger mx-3 my-3"
                              onClick={remove}
                            >
                              Remove
                            </button>

                            <button
                              type="button"
                              className="btn btn-warning mx-3"
                              onClick={unavailable}
                            >
                              Mark as not available
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
        </>

        <Footer />
      </div>
    );
  } else {
    return <VendorLogin />;
  }
}

export default MyTiffins;
