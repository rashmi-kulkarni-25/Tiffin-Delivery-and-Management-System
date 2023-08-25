import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        <ul className="horizontal-links">
          {/* <li>
            <Link to="/vendor-dashboard">Dashboard</Link>
          </li> */}
          <li>
            <Link to="/vendor-profile">Profile</Link>
          </li>
          <li>
            <Link to="/vendor-tiffins">My Tiffins</Link>
          </li>
          <li>
            <Link to="/vendor-addtiffin">Add Tiffin</Link>
          </li>
          <li>
            <Link to="/vendor-orders">My Orders</Link>
          </li>
          <li>
            <Link to="/vendor-feedbacks">Feedbacks and Complaints</Link>
          </li>
          <li>
            <Button
              onClick={() => {
                // TODO: Clear all the session items in the application
                sessionStorage.clear();
                navigate("/vendor-login");
                toast.success("Logged out successfully!");
              }}
            >
              Logout
            </Button>
          </li>
          <li>
            <Link to="/vendor-login">Login</Link>
          </li>
          <li>
            <Link to="/vendor-register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
