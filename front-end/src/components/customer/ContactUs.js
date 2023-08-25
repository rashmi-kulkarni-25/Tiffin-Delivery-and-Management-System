import React from 'react'
import CustomerNavbar2 from './CustomerNavbar2';
import CustomerNavbar from './CustomerNavbar';
import Footer from './Footer';

function ContactUs() {
    // var user = sessionStorage.getItem("user");
    var customerId = sessionStorage.getItem("customerId");
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if(isLoggedIn)
    {
        return (
            <>
                <CustomerNavbar2/>
                <h1>Contact Us</h1>
                <Footer/>
            </>
        )
    }
    else
    {
        return(
            <>
                <CustomerNavbar/>
                <h1>Contact Us</h1>
                <Footer/>
            </>
        )
    }
}

export default ContactUs