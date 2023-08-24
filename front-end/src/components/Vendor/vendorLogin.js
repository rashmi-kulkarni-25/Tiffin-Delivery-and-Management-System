import React, { useState } from "react";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      const responsePromise = axios.post(
        `${config.backendUrl}/api/Vendors/login`,
        {
          email,
          password,
        }
      );

      // Handle successful login
      responsePromise
        .then((response) => {
          console.log("Login successful", response.data);
          toast.success("Login Successful!");

          const vendorId = response.data.vendorId;
          sessionStorage.setItem("vendorId", vendorId);

          setTimeout(() => {
            navigate("/vendor-homepage");
          }, 4000);
        })
        .catch((error) => {
          // Handle login error
          console.error("Invalid email or password!");
          toast.error("Invalid email or password!");
          setTimeout(() => {
            navigate("/vendor-login");
          }, 4000);
        });
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Invalid User! Please register!");
      setTimeout(() => {
        navigate("/vendor-register");
      }, 4000);
    }
  };

  return (
    <div className="containerCard">
      <center>
        <h1>Login</h1> <br />
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
        <br /> <br /> <br />
        <button onClick={handleLogin} className="add-button">
          Login
        </button>
      </center>
    </div>
  );
}

export default VendorLogin;
