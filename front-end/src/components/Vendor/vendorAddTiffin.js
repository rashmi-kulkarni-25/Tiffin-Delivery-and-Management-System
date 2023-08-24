import React, { useState } from "react";
import axios from "axios";
import config from "../../config";
import "./styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function VendorAddTiffin(props) {
  const vendorId = sessionStorage.getItem("vendorId");

  const [tiffinName, setTiffinName] = useState("");
  const [description, setDescription] = useState("");
  const [tiffinCategory, setCategory] = useState("");
  const [tiffinPrice, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");

  console.log("vendorId: ", vendorId);
  const navigate = useNavigate();

  const handleAddTiffin = () => {
    const responsePromise = axios.post(
      `${config.backendUrl}/api/Vendors/addtiffin`,
      {
        tiffinName,
        description,
        tiffinCategory,
        tiffinPrice: parseFloat(tiffinPrice),
        imageLink,
        vendorId: vendorId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Handle successful tiffin addition
    responsePromise
      .then((response) => {
        if (response.status === 200) {
          console.log("Vendors/addtiffin response: ", response.data);
          toast.success("Tiffin added successfully!");
          toast.success("Navigating you to tiffins page");
          setTimeout(() => {
            navigate("/vendor-tiffins");
          }, 3000);
        } else {
          console.log("Failed to add tiffin response: ", response);
          toast.error("Failed to add tiffin!");
        }
      })
      .catch((error) => {
        console.log("Failed to add new tiffin!", error);
        toast.error("Failed to add tiffin!");
      });
  };

  return (
    <div className="containerCard">
      <center>
        <h1>Add Tiffin</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            style={{ border: "2px solid Green", margin: "10px", width: "30%" }}
            type="text"
            placeholder="Tiffin Name"
            value={tiffinName}
            onChange={(e) => setTiffinName(e.target.value)}
          />
          <br />
          <input
            style={{
              border: "2px solid Green",
              margin: "10px",
              width: "30%",
              height: "150px",
            }}
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <input
            style={{ margin: "10px" }}
            type="radio"
            value="Veg"
            checked={tiffinCategory === "Veg"}
            onChange={(e) => setCategory(e.target.value)}
          />{" "}
          Veg
          <input
            style={{ margin: "10px" }}
            type="radio"
            value="Non-Veg"
            checked={tiffinCategory === "Non-Veg"}
            onChange={(e) => setCategory(e.target.value)}
          />{" "}
          Non-Veg
          <br />
          <input
            style={{ border: "2px solid Green", margin: "10px", width: "30%" }}
            type="text"
            placeholder="Image Link"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
          <br />
          <input
            style={{ border: "2px solid Green", margin: "10px" }}
            type="text"
            placeholder="Price"
            value={tiffinPrice}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <input
            style={{ border: "2px solid Green", margin: "10px" }}
            type="text"
            placeholder="Vendor Id"
            value={vendorId}
            readOnly
          />
          <br />
          <br />
          <br />
          <b style={{ color: "greenyellow" }} />
          <button className="add-button" onClick={handleAddTiffin}>
            <h4>Add Tiffin</h4>
          </button>
        </form>
      </center>
    </div>
  );
}

export default VendorAddTiffin;
