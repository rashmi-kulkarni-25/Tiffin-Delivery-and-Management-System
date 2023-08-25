import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";

function VendorProfile() {
  const vendorId = sessionStorage.getItem("vendorId");
  const [vendorProfileData, setVendorProfileData] = useState({});
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const responsePromise = axios.get(
      `${config.backendUrl}/api/Vendors/getvendorbyid`,
      {
        params: {
          vendorId: vendorId,
        },
      }
    );

    responsePromise
      .then((response) => {
        if (response.status === 200) {
          setVendorProfileData(response.data);
        } else {
          toast.error("Failed while getting vendor profile!");
        }
      })
      .catch((error) => {
        console.log("Something went wrong!", error);
        toast.error("Something went wrong in VendorProfile!");
      });
  }, [vendorId]);

  const handleUpdateProfile = () => {
    try {
      const responsePromise = axios.patch(
        `${config.backendUrl}/api/Vendors/updateprofile`,
        vendorProfileData
      );
      // Handle successful profile update

      responsePromise.then((response) => {
        if (response.status === 200) {
          console.log("updated vendor data", response.data);
          toast.success("Profile Updated Sccessfully!");
        } else {
          throw new Error("Failed while updating vendor profile!");
        }
      });
    } catch (error) {
      // Handle profile update error
      console.error("Profile update error:", error);
      toast.error("Profile Update Failed!");
    }
  };

  return (
    <div className="containerCard">
      <center>
        <br />
        <h1>Vendor Profile</h1>
        <b> Name :</b>
        <input
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            marginLeft: "35px",
          }}
          type="text"
          placeholder="Name"
          value={vendorProfileData.name || ""}
          readOnly={!editable}
          onChange={(e) =>
            setVendorProfileData({ ...vendorProfileData, name: e.target.value })
          }
        />
        <br />
        <b> Email : </b>
        <input
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            marginLeft: "30px",
          }}
          type="text"
          placeholder="Email"
          value={vendorProfileData.email || ""}
          readOnly={!editable}
          onChange={(e) =>
            setVendorProfileData({
              ...vendorProfileData,
              email: e.target.value,
            })
          }
        />
        <br />
        <b style={{ verticalAlign: "25px" }}> Address :</b>
        <textarea
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            marginLeft: "20px",
          }}
          placeholder="Address"
          value={vendorProfileData.address || ""}
          readOnly={!editable}
          onChange={(e) =>
            setVendorProfileData({
              ...vendorProfileData,
              address: e.target.value,
            })
          }
        />
        <br />
        <b> Pincode :</b>
        <input
          style={{ border: "2px solid Green", margin: "10px", width: "15%" }}
          type="text"
          placeholder="Pincode"
          value={vendorProfileData.pincode || ""}
          readOnly={!editable}
          onChange={(e) =>
            setVendorProfileData({
              ...vendorProfileData,
              pincode: e.target.value,
            })
          }
        />
        <br />
        <b> Contact :</b>
        <input
          style={{ border: "2px solid Green", margin: "10px", width: "15%" }}
          type="text"
          placeholder="Mobile Number"
          value={vendorProfileData.mobNo || ""}
          readOnly={!editable}
          onChange={(e) =>
            setVendorProfileData({
              ...vendorProfileData,
              mobNo: e.target.value,
            })
          }
        />
        <br /> <br /> <br />
        <button onClick={() => setEditable(!editable)} className="add-button">
          {editable ? "Cancel" : "Edit Profile"}
        </button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
        <button
          onClick={() => {
            if (editable) {
              handleUpdateProfile();
            }
            setEditable(false);
          }}
          className="add-button"
        >
          Save
        </button>
      </center>
    </div>
  );
}

export default VendorProfile;
