import React, { useState } from "react";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function VendorRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();
  const handleRegister = () => {
    try {
      const responsePromise = axios.post(
        `${config.backendUrl}/api/Vendors/register`,
        {
          name,
          email,
          password,
          mobNo,
          address,
          pincode,
        }
      );
      // Handle successful registration
      responsePromise.then((response) => {
        console.log("Registration successful", response);
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/vendor-login");
        }, 4000);
      });
    } catch (error) {
      // Handle registration error
      console.error("Registration error:", error);
      toast.error("Registration error!, Please try again!");
      setTimeout(() => {
        navigate("/vendor-register");
      }, 4000);
    }
  };

  return (
    <div className="containerCard">
      <center>
        <h1>Register</h1> <br />
        <input
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            height: "25px",
          }}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            height: "25px",
          }}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            height: "25px",
          }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            height: "25px",
          }}
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <input
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            height: "25px",
          }}
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <br />
        <input
          style={{
            border: "2px solid Green",
            margin: "10px",
            width: "30%",
            height: "25px",
          }}
          type="text"
          placeholder="Mobile No"
          value={mobNo}
          onChange={(e) => setMobNo(e.target.value)}
        />
        <br />
        <br /> <br /> <br />
        <button onClick={handleRegister} className="add-button">
          Register
        </button>
      </center>
    </div>
  );
}

export default VendorRegister;
