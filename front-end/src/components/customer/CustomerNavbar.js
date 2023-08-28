import React from 'react';
import { Link,useLocation } from "react-router-dom";

function CustomerNavbar(props) {
let location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg-dark navbar-dark bg-light fixed-top">
        <div className="container-fluid" style={{backgroundColor:'olivedrab'}}>
            <Link className="navbar-brand" to="/">              
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
              <Link className={`nav-link ${location.pathname === "/"?"active":""}`} to="/customerabout">
                <h6> About Us </h6>
              </Link>

              <Link className={`nav-link ${location.pathname === "/"?"active":""} mx-4`} to="/contact">
                <h6> Contact Us </h6>
              </Link>

              {/* <Link className={`nav-link ${location.pathname === "/"?"active":""} mx4`} to="/venfeedback">
                <h6> Tiffins </h6>
              </Link> */}

              <Link className={`nav-link ${location.pathname === "/"?"active":""}`} to="/login"
                style={{marginLeft: 'auto'}}>
                <h6> Login </h6>
              </Link>
             
              <Link className={`nav-link ${location.pathname === "/login"?"active":""}mx-4`} to="/register"
                style={{marginLeft: 'auto'}}>
              <h6> Register </h6>
              </Link>
              </div>
            </div>
        </div>
    </nav>
  )
}

export default CustomerNavbar