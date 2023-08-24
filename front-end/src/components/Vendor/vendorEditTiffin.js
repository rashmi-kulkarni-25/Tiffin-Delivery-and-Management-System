import React, { useState } from "react";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditTiffin(props) {
  const selectedTiffinForEdit = sessionStorage.getItem("selectedTiffinForEdit");
  let tiffinToEdit = null;
  if (selectedTiffinForEdit) {
    tiffinToEdit = JSON.parse(selectedTiffinForEdit);
  }

  console.log("tiffinToEdit: ", tiffinToEdit);
  const [tiffin, setTiffin] = useState(tiffinToEdit);
  // const [description, setDescription] = useState("");
  // const [tiffinCategory, setCategory] = useState("");
  // const [tiffinPrice, setPrice] = useState("");
  // const [imageLink, setImageLink] = useState("");

  const navigate = useNavigate();
  const handleEditTiffin = () => {
    const responsePromise = axios.patch(
      `${config.backendUrl}/api/Vendors/updatetiffin`,
      tiffin
    );
    // Handle successful tiffin addition

    responsePromise
      .then((response) => {
        if (response.status === 200) {
          toast.success("Updated tiffin successfully!");
        } else {
          console.log("Failed to update tiffin response: ", response);
          toast.error("Failed to update tiffin!");
        }
      })
      .catch((error) => {
        console.log("Something went wrong!", error);
        toast.error("Something went wrong in EditTiffin!");
      });
  };

  return (
    <div className="containerCard">
      <center>
        <h1>Edit Tiffin</h1>
        <input
          style={{ border: "2px solid Green", margin: "10px", width: "30%" }}
          type="text"
          placeholder="Tiffin Name"
          value={tiffin.tiffinName}
          onChange={(e) => setTiffin({ ...tiffin, tiffinName: e.target.value })}
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
          value={tiffin.description}
          onChange={(e) =>
            setTiffin({ ...tiffin, description: e.target.value })
          }
        />
        <br />
        <input
          style={{ margin: "10px" }}
          type="radio"
          value="Veg"
          checked={tiffin.tiffinCategory.toLowerCase() === "veg"}
          onChange={(e) =>
            setTiffin({ ...tiffin, tiffinCategory: e.target.value })
          }
        />{" "}
        Veg
        <input
          style={{ margin: "10px" }}
          type="radio"
          value="Non-Veg"
          checked={tiffin.tiffinCategory.toLowerCase() === "non-neg"}
          onChange={(e) =>
            setTiffin({ ...tiffin, tiffinCategory: e.target.value })
          }
        />{" "}
        Non-Veg
        <br />
        <input
          style={{ border: "2px solid Green", margin: "10px", width: "30%" }}
          type="text"
          placeholder="Price"
          value={tiffin.tiffinPrice}
          onChange={(e) =>
            setTiffin({ ...tiffin, tiffinPrice: e.target.value })
          }
        />
        <br />
        <input
          style={{ border: "2px solid Green", margin: "10px", width: "30%" }}
          type="text"
          placeholder="Image Link"
          value={tiffin.imageLink}
          onChange={(e) => setTiffin({ ...tiffin, imageLink: e.target.value })}
        />
        <br />
        <input
          style={{ border: "2px solid Green", margin: "10px", width: "30%" }}
          type="text"
          placeholder="Image Link"
          value={tiffin.status}
          onChange={(e) => setTiffin({ ...tiffin, status: e.target.value })}
        />
        <br />
        <br />
        <br />
        <button
          onClick={() => navigate("/vendor-tiffins")}
          className="add-button"
        >
          Cancel
        </button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
        <button onClick={handleEditTiffin} className="add-button">
          Update
        </button>
      </center>
    </div>
  );
}

export default EditTiffin;
