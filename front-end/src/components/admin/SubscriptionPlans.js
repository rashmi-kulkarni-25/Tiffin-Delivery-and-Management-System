import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import AdminLogin from "./AdminLogin";
import { createDotNetUrl, createNodejsUrl, log } from "../../utils/utils";
import axios from "axios";
import { useHistory } from "react-router-dom";
import bgimage4 from "../../../src/images/bg4.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubscriptionPlans() {
  var admin = sessionStorage.getItem("user");
  var isLoggedIn = sessionStorage.getItem("adminLoggedIn");
  const history = useHistory();

  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState({
    planId: 0,
    name: "",
    description: "",
    price: 0.0,
    noOfMeals: "",
  });

  useEffect(() => {
    console.log("Inside Component Did Mount");
    getAllPlans();
  }, []);

  useEffect(() => {
    console.log("Component Did Update is called..");
  }, [plans, plan]);

  const getAllPlans = async () => {
    debugger;
    const url = createDotNetUrl("api/admins/subscriptionplans");
    axios.get(url).then((res) => {
      debugger;
      log(res.data);
      setPlans(res.data);
    });
  };

  const remove = (id) => {
    debugger;
    const planId = { plan_id: id };
    // const url = createNodejsUrl('admin/deleteplan')
    // axios.delete(url,
    //     {
    //         "plan_id": id
    //     })
    // .then(res =>{
    //   debugger
    //   log(res.data)
    //   getAllPlans();
    // })

    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      debugger;
      if (helper.readyState === 4 && helper.status === 200) {
        debugger;
        var result = JSON.parse(helper.responseText);
        log("plan deleted");
        log(result);
        toast.success("Plan removed");
        window.location.reload();
      }
    };
    const url = createNodejsUrl("admin/deleteplan");
    helper.open("DELETE", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(planId));
  };

  if (isLoggedIn) {
    return (
      <div>
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

        <div className="row" style={{ paddingTop: "180px" }}>
          <div className="col-md-9"></div>
          <div className="col-md-3">
            <button
              type="button"
              className="btn btn-primary my-3"
              onClick={() => history.push("/addplan")}
            >
              Add Plan
            </button>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h2
              style={{
                textAlign: "center",
                marginTop: "15px",
                backgroundColor: "white",
              }}
            >
              Subscription Plans
            </h2>
            <div className="table-responsive my-3">
              <table
                className="table table-bordered"
                style={{ marginBottom: "75px" }}
              >
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>No. of meals</th>
                    <th>Update plan</th>
                    <th>Remove plan</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => {
                    return (
                      <tr>
                        <td>{plan.name}</td>
                        <td>{plan.description}</td>
                        <td>{plan.price}</td>
                        <td>{plan.noOfMeals}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() =>
                              history.push(`/updateplan/${plan.planId}`)
                            }
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => remove(plan.planId)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <>
        <AdminLogin />
      </>
    );
  }
}

export default SubscriptionPlans;
