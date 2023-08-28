import React from "react";
import { useEffect, useState } from "react";
import VendorLogin from "./VendorLogin";
import VendorNavbar from "./VendorNavbar";
import Footer from "./Footer";
import { createNodejsUrl, log } from "../../utils/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import bgimage4 from "../../../src/images/bg4.jpg";

function EditTiffin() {
  const history = useHistory();
  var vendorId = sessionStorage.getItem("vendorId");
  var isLoggedIn = sessionStorage.getItem("vendorLoggedIn");

  const [tiffinId, setTiffinId] = useState(0);
  const [tiffinName, setTiffinName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0.0);
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getMyTiffin();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [tiffinId, tiffinName, description, category, price, image, status]);

  const getMyTiffin = () => {
    debugger;
    var tiffinId = sessionStorage.getItem("tiffinId");
    var id = { tiffin_id: tiffinId };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        setTiffinId(result[0].tiffin_id);
        setTiffinName(result[0].tiffin_name);
        setDescription(result[0].description);
        setCategory(result[0].tiffin_category);
        setPrice(result[0].tiffin_price);
        setImage(result[0].image_link);
        setStatus(result[0].status);
      }
    };
    const url = createNodejsUrl("vendor/getmytiffin");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(id));
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const updatetififn = () => {
    debugger;
    var tiffin = {
      tiffin_id: tiffinId,
      tiffin_name: tiffinName,
      description: description,
      tiffin_category: category,
      tiffin_price: price,
      vendor_id: vendorId,
      image_link: image,
      status: status,
    };
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log(result);
        toast.success("Tiffin Updated");
        history.push("/mytiffins");
      }
    };
    const url = createNodejsUrl("vendor/updatetiffin");
    helper.open("PUT", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(tiffin));
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
        <div className="row" style={{ paddingTop: "180px" }}>
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="form-check">
              <div className="container my-3">
                <label>
                  {" "}
                  <h4>Tiffin Name </h4>
                </label>
                <input
                  className="form-control my-3"
                  type="text"
                  style={{ height: "50px", fontSize: "20px" }}
                  value={tiffinName}
                  onChange={(e) => {
                    setTiffinName(e.target.value);
                  }}
                ></input>
                <label>
                  <h4>Description</h4>
                </label>
                <textarea
                  className="form-control my-3"
                  rows="4"
                  style={{ fontSize: "20px" }}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
                <label>
                  <h4>Price</h4>
                </label>
                <input
                  className="form-control my-3"
                  type="text"
                  style={{ height: "50px", fontSize: "20px" }}
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                ></input>

                <center>
                  <div clasName="form-check">
                    <input
                      clasName="form-check-input"
                      type="radio"
                      value="veg"
                      name="category"
                      id="flexRadioDefault1"
                      checked={category === "veg"}
                      onChange={handleCategoryChange}
                    />
                    <label
                      clasName="form-check-label mx-3"
                      for="flexRadioDefault1"
                    >
                      <h4 className="mx-3">Veg</h4>
                    </label>

                    <input
                      clasName="form-check-input"
                      type="radio"
                      value="nonveg"
                      name="category"
                      id="flexRadioDefault2"
                      checked={category === "nonveg"}
                      onChange={handleCategoryChange}
                    />
                    <label
                      clasName="form-check-label mx-3"
                      for="flexRadioDefault2"
                    >
                      <h4 className="mx-3">Non-veg</h4>
                    </label>
                  </div>
                </center>

                <label>
                  <h4>Image link</h4>
                </label>
                <input
                  className="form-control my-3"
                  type="text"
                  style={{ height: "50px", fontSize: "20px" }}
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <center>
              <button
                className="btn btn-primary btn-lg my-3"
                onClick={updatetififn}
              >
                Update
              </button>
            </center>
          </div>
          <div className="col-md-3"></div>
        </div>

        <Footer />
      </div>
    );
  } else {
    return <VendorLogin />;
  }
}

export default EditTiffin;
