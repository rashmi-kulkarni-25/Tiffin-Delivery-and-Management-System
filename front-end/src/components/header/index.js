import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
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
            <Link to="/vendor-login">Logout</Link>
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
