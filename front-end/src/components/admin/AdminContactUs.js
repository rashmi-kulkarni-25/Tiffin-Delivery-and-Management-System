import React from 'react'
import Footer from './Footer';
import AdminLogin from './AdminLogin';
import AdminNavbar from './AdminNavbar';

function AdminContactUs() {
    var user = sessionStorage.getItem("user");
    var isLoggedIn = sessionStorage.getItem("adminLoggedIn");

    if(isLoggedIn)
    {
        return (
            <>
                <AdminNavbar/>
                <h1>Contact Us</h1>
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

export default AdminContactUs