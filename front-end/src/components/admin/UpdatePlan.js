import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import AdminLogin from "./AdminLogin";
import { createNodejsUrl, log } from "../../utils/utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgimage4 from "../../../src/images/bg4.jpg";

function UpdatePlan() {
  const { id } = useParams();
  var admin = sessionStorage.getItem("user");
  var isLoggedIn = sessionStorage.getItem("adminLoggedIn");
  const history = useHistory();

  const [planId, setPlanId] = useState(0);
  const [plan, setPlan] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const [noOfMeals, setNoOfMeals] = useState(0);

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getPlanById(id);
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [plan, description, price, noOfMeals]);

  const getPlanById = async (id) => {
    debugger;
    var planId = { id: id };
    // const url = createNodejsUrl('admin/getplanbyid')
    // axios.post(url, {"id":id})
    // .then(res =>{
    // debugger
    // log(res.data)
    // setPlan(res.data.name)
    // setDescription(res.data.description)
    // setPrice(res.data.price)
    // setNoOfMeals(res.data.noOfMeals)
    // })

    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log("Vendor approved sucecssfully");
        log(result);
        setPlanId(result[0].plan_id);
        setPlan(result[0].name);
        setDescription(result[0].description);
        setPrice(result[0].price);
        setNoOfMeals(result[0].no_of_meals);
      }
    };
    const url = createNodejsUrl("admin/getplanbyid");
    helper.open("POST", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(planId));
  };

  const update = () => {
    debugger;
    var planToUpdate = {
      plan_id: planId,
      name: plan,
      description: description,
      price: price,
      no_of_meals: noOfMeals,
    };

    const url = createNodejsUrl("admin/updateplan");
    axios
      .put(url, {
        plan_id: planId,
        name: plan,
        description: description,
        price: price,
        no_of_meals: noOfMeals,
      })
      .then((res) => {
        debugger;
        log(res.data);
        toast.success("Plan updated");
        history.push("/subplans");
      });
  };

  if (isLoggedIn) {
    return (
      <>
        <div
          style={{
            backgroundImage: `url(${bgimage4})`,
            backgroundAttachment: "fixed",
            content: "",
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: -1,
            opacity: 0.5,
          }}
        ></div>
        <AdminNavbar />
        <div style={{ paddingTop: "180px" }}>
          <h1 style={{ textAlign: "center", margin: 10 }}>Update plan</h1>

          <div className="row">
            <div className="col"></div>
            <div className="col">
              <div className="form">
                <div className="mb-3">
                  <label htmlFor="">Plan</label>
                  <input
                    type="text"
                    value={plan}
                    className="form-control"
                    onChange={(e) => {
                      setPlan(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Description</label>
                  <input
                    type="text"
                    value={description}
                    className="form-control"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Price</label>
                  <input
                    type="number"
                    value={price}
                    className="form-control"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">No. of meals</label>
                  <input
                    type="number"
                    value={noOfMeals}
                    className="form-control"
                    onChange={(e) => {
                      setNoOfMeals(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <button className="btn btn-success" onClick={update}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <AdminLogin />
      </>
    );
  }
}

export default UpdatePlan;
