import React from 'react';
import { Link,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminNavbar(props) {
let location = useLocation();
const clear = ()=>
{
  toast.success("Logged Out. Visit again!")
  sessionStorage.clear("adminLoggedIn");
  sessionStorage.clear("user");
}

  return (
    <nav className="navbar navbar-expand-lg-dark navbar-dark bg-light fixed-top">
        <div className="container-fluid" style={{backgroundColor:'olivedrab'}}>
            <Link className="navbar-brand" to="/adminhome">              
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
              <Link className={`nav-link ${location.pathname === "/"?"active":""}`} to="/aboutus">
                <h6> About Us </h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""} mx-4`} to="/admincontact">
                <h6> Contact Us </h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""} mx-4`} to="/adminhome">
                <h6> Home </h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""} mx-4`} to="/reqhistory">
                <h6> Request History </h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""} mx-4`} to="/feedbacks">
                <h6> Feedback/complaints</h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""} mx-4`} to="/subplans">
                <h6> Subscription </h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""} mx-4`} to="/orderhistory">
                <h6> Order History </h6>
              </Link> 

              <Link className={`nav-link ${location.pathname === "/"?"active":""} mx-4`} to="/subpurchasehistory">
                <h6> Subscription Purchases </h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""}`} to="#"
                style={{marginLeft: 'auto'}}>
                <h6> Profile </h6>
              </Link>
             
              <Link onClick={clear} className={`nav-link ${location.pathname === "/login"?"active":""}mx-4`} to="/adminlogin"
                style={{marginLeft: 'auto'}}>
              <h6> Logout </h6>
              </Link>
              </div>
            </div>
        </div>
    </nav>
  )
}

export default AdminNavbar