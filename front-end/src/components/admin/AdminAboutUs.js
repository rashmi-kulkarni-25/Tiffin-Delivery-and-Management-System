import React from 'react'
import Footer from './Footer';
import AdminNavbar from './AdminNavbar';
import AdminLogin from './AdminLogin';

function AdminAboutUs() {
    var user = sessionStorage.getItem("user");
    var isLoggedIn = sessionStorage.getItem("adminLoggedIn");

    if(isLoggedIn)
    {
        return (
            <>
                <AdminNavbar/>
                <h1>About Us</h1>
                <Footer/>
            </>
        )
    }
    else
    {
        return(
            <>
            <AdminLogin/>
            </>
        )
    }
}

export default AdminAboutUs