import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/vendor-register">VendorRegister</Link>
          </li>
          <br />
          <li>
            <Link to="/vendor-login">VendorLogin</Link>
          </li>
          <br />
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
        </ul>
      </nav>
    </div>
  );
}

export default Header;
