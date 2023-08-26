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
  const [editable, setEditable] = useState(false);

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
          toast.success("Navigating you to tiffins page");
          setTimeout(() => {
            navigate("/vendor-tiffins");
          }, 3000);
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
        <br />
        <h1>Edit Tiffin</h1>
        <br />
        <b> Status :</b>
        <input
          style={{ margin: "10px" }}
          type="radio"
          value="active"
          name="tiffinStatus"
          onChange={(e) =>
            setTiffin({ ...tiffin, tiffinStatus: e.target.value })
          }
        />{" "}
        Active
        <input
          style={{ margin: "10px" }}
          type="radio"
          value="inactive"
          name="tiffinStatus"
          onChange={(e) =>
            setTiffin({ ...tiffin, tiffinStatus: e.target.value })
          }
        />{" "}
        Inactive
        <br />
        <b>Name :</b>
        <input
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            marginLeft: "60px",
          }}
          type="text"
          placeholder="Tiffin Name"
          value={tiffin.tiffinName}
          readOnly={!editable}
          onChange={(e) => setTiffin({ ...tiffin, tiffinName: e.target.value })}
        />
        <br />
        <b style={{ verticalAlign: "30px" }}> Description :</b>
        <textarea
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            height: "150px",
            marginLeft: "20px",
          }}
          type="text"
          placeholder="Description"
          value={tiffin.description}
          readOnly={!editable}
          onChange={(e) =>
            setTiffin({ ...tiffin, description: e.target.value })
          }
        />
        <br />
        <b>Image Link: </b>
        <input
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            marginLeft: "20px",
          }}
          type="text"
          placeholder="Image Link"
          value={tiffin.imageLink}
          readOnly={!editable}
          onChange={(e) => setTiffin({ ...tiffin, imageLink: e.target.value })}
        />
        <br />
        <input
          style={{ margin: "10px" }}
          type="radio"
          value="veg"
          checked={tiffin.tiffinCategory.toLowerCase() === "veg"}
          onChange={(e) =>
            setTiffin({ ...tiffin, tiffinCategory: e.target.value })
          }
        />{" "}
        Veg
        <input
          style={{ margin: "10px" }}
          type="radio"
          value="nonveg"
          checked={tiffin.tiffinCategory.toLowerCase() === "nonveg"}
          onChange={(e) =>
            setTiffin({ ...tiffin, tiffinCategory: e.target.value })
          }
        />
        Non-Veg
        <br />
        <b> Price :</b>
        <input
          style={{
            border: "2px solid Green",
            margin: "10px",
            marginLeft: "5px",
          }}
          type="text"
          placeholder="Price"
          value={tiffin.tiffinPrice}
          readOnly={!editable}
          onChange={(e) =>
            setTiffin({ ...tiffin, tiffinPrice: e.target.value })
          }
        />
        <br />
        <b>Status :</b>
        <input
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            marginLeft: "50px",
          }}
          type="text"
          placeholder="Tiffin Status"
          value={tiffin.tiffinStatus}
          readOnly
          onChange={(e) =>
            setTiffin({ ...tiffin, tiffinStatus: e.target.value })
          }
        />
        <br />
        {/* <input
          style={{ border: "2px solid Green", margin: "10px", width: "30%" }}
          type="text"
          placeholder="Image Link"
          value={tiffin.status}
          readOnly={!editable}
          onChange={(e) => setTiffin({ ...tiffin, status: e.target.value })}
        /> */}
        <br />
        <br />
        {/* <button
          onClick={() => navigate("/vendor-tiffins")}
          className="add-button"
        >
          Cancel
        </button> */}
        <button
          onClick={() => setEditable(!editable)} // Toggle editable state
          className="add-button"
        >
          {editable ? "Cancel Edit" : "Edit"}
        </button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
        <button
          onClick={handleEditTiffin}
          className="add-button"
          disabled={!editable} // Disable the button when not editable
        >
          Update
        </button>
      </center>
    </div>
  );
}

export default EditTiffin;
