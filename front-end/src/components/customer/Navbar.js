import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-green bg-green" style={{backgroundColor:"olivedrab", top:"180px"}}>
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/changeprofile"><b>Change profile</b></Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/changepassword"><b>Change password</b></Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/favorites"><b>Favourites</b></Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/myorders"><b>My orders</b></Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/myorderhistory"><b>Order History</b></Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link active" to="/subscription"><b>My Subsciption</b></Link>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
  )
}

export default Navbar