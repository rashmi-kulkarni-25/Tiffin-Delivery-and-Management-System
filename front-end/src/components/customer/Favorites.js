import React from 'react'
import { useEffect, useState } from 'react';
import CustomerNavbar2 from './CustomerNavbar2';
import Navbar from './Navbar';
import Footer from './Footer'
import Login from './Login';
import { createaUrl, createUrl, log } from '../../utils/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Favorites() {
    // var user = sessionStorage.getItem("user");
  var customerId = sessionStorage.getItem("customerId");
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const [tiffins, setTiffins] = useState([]);
  const [tiffin, setTiffin] = useState({tiffin_id: "", tiffin_name: "", description: "",
                                      tiffin_category: "", tiffin_price: "", image_link: ""});

    useEffect(()=>{
    console.log("Inside Component Did Mount")
    select();
    }, [])

    useEffect(()=>
    {
        console.log("Component Did Update is called..")
    }, [tiffins, tiffin]);

    // const select = () =>
    // {
    //     debugger;
    //     var helper = new XMLHttpRequest();
    //     var creds = {"customer_id":customerId}
    //     helper.onreadystatechange = ()=>{
    //         debugger
    //         if (helper.readyState === 4 && helper.status === 200 )
    //             {
    //             debugger;
    //             var result = JSON.parse(helper.responseText);
    //             log(result)
    //             setTiffins(result)
    //             }
    //     };
    //     const url = createaUrl('customer/myfavorites')
    //     helper.open("GET", url);
    //     helper.setRequestHeader("Content-Type", "application/json");
    //     helper.send(JSON.stringify(creds));
    // }

    const select = async() =>
  {
    debugger
    const url = createaUrl('customer/myfavorites')
    axios.post(url,
      {
        "customer_id": customerId,
      })
    .then(res =>{
      debugger
      log(res.data)
      setTiffins(res.data)
    })
  }

    const addToCart = async(tiffinId) =>
  {
    debugger
    const url = createUrl('api/customers/cart')
    axios.post(url,
      {
        "customerId": customerId,
        "tiffinId": tiffinId
      })
    .then(res =>{
      debugger
      log(res.data)
      toast.success("Added to cart")
    })
}

const like = (tiffinId) =>
  {
    debugger
    const url = createUrl('api/customers/addtofavorites')
    axios.post(url,
      {
        "customerId": customerId,
        "tiffinId": tiffinId
      })
    .then(res =>{
      debugger
      log(res.data)
      toast.success("Added to favorites")
    })
  }

  if(isLoggedIn)
  {
    return(
        <>
          <CustomerNavbar2/>
          <Navbar/>
          <>
            <div className="container my-3">
                <div className="row gy-3">
                  {
                    tiffins.map((tiffin) =>
                    {
                      return <div className="col-md-3">
                      <div className="card">
                          <img src={tiffin.image_link} className="card-img-top" alt="..."/>
                          <div className="card-body">
                            <h5 className="card-title">{tiffin.tiffin_name}</h5>
                            <p className="card-text">{tiffin.description}</p>
                            <center>
                            <button type="button" className="btn btn-primary" 
                            onClick={()=>addToCart(tiffin.tiffin_id)}>
                              Add to cart</button>
                              <button type="button" className="btn btn-danger mx-3" 
                        onClick={()=>like(tiffin.tiffin_id)}>
                          Like</button>
                            </center>
                          </div>
                        </div>
                      </div>
                    })
                  }
                  
                </div>
                
            </div>
            <Footer/>
        </>
        </>
      )
  }
  else
  {
    <Login/>
  }
}

export default Favorites