import React from "react";
import "./styles.css"

const Footer = () =>
{
    return(
        <div className="main-footer my-3">            
            <div className="container-fluid" style={{backgroundColor:"olivedrab"}}>
                <center>
                <div className="row">
                    <div className="col my-3">
                        <h4>NutriTiff</h4>
                        <ul className="list-unstyled">
                            <li>987-654-3210</li>
                            <li>Hinjewadi, Pune</li>
                            <li></li>
                        </ul>
                    </div>

                    <div className="col my-3">
                        <h4> Social Links </h4>                        
                        <img src="/images/socialMedia.jpeg" style={{height:60, width:150}}></img>
                    </div>
                
                </div>
                </center>
                <hr/>
                <div className="row">
                    <center>
                        <p className="col-sm">
                            &copy;{new Date().getUTCFullYear()} NutriTiff Inc | All rights reserved | Terms of Service | Privacy
                        </p>
                    </center>
                </div>
            </div>            
        </div>
    );
}

export default Footer;