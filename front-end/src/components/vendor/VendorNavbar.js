import React from 'react';
import { Link,useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function VendorNavbar(props) {
  const clear = ()=>
{
  toast.success("Logged out. Visit again!")
  sessionStorage.clear("vendorLoggedIn");
  sessionStorage.clear("vendorId");
}
let location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg-dark navbar-dark bg-light fixed-top">
        <div className="container-fluid" style={{backgroundColor:'olivedrab'}}>
            <Link className="navbar-brand" to="/vendorhome">              
              <img src="/images/logo.png" style={{height:75, width:90}}></img>
              <br/><b> NutriTiff </b>
            </Link>            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <hr></hr>
            <div className="nav-item" style={{marginRight: "20px", color:"white", display:"flex"}}>            
              <Link className={`nav-link ${location.pathname === "/"?"active":""}`} to="/vendorabout">
                <h6> About Us </h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""} mx-4`} to="/vendorcontact">
                <h6> Contact Us </h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""} mx-4`} to="/mytiffins">
                <h6> My Tiffins </h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""} mx-4`} to="/vendororderhistory">
                <h6> Order History </h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""} mx-4`} to="/feedscomps">
                <h6> Feedbacks/Complaints </h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""}`} to="/vendorprofile"
                style={{marginLeft: 'auto'}}>
                <h6> Profile </h6>
              </Link>
             
              <Link className={`nav-link ${location.pathname === "/"?"active":""}mx-4`} to="/vendorlogin"
                style={{marginLeft: 'auto'}} onClick={clear}>
              <h6> Logout </h6>
              </Link>
              </div>
            </div>
        </div>
    </nav>
  )
}

export default VendorNavbar