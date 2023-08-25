import React from 'react'
import CustomerNavbar2 from './CustomerNavbar2';
import CustomerNavbar from './CustomerNavbar';
import Footer from './Footer';

function AboutUs() {
    // var user = sessionStorage.getItem("user");
    var customerId = sessionStorage.getItem("customerId");
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if(isLoggedIn)
    {
        return (
            <>
                <CustomerNavbar2/>
                <h1>About Us</h1>
                <Footer/>
            </>
        )
    }
    else
    {
        return(
            <>
                <CustomerNavbar/>
                <h1>About Us</h1>
                <Footer/>
            </>
        )
    }
}

export default AboutUs