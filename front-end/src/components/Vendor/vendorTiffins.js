import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { Card } from "react-bootstrap";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

function VendorTiffins(props) {
  const vendorId = sessionStorage.getItem("vendorId");
  const [tiffins, setTiffins] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const responsePromise = axios.get(
      `${config.backendUrl}/api/Vendors/mytiffins`,
      {
        params: {
          vendorId: vendorId, // TODO: Replace with actual vendor ID
        },
      }
    );

    responsePromise
      .then((response) => {
        if (response.status === 200) {
          console.log("response.data: ", response.data);
          setTiffins(response.data);
          toast.success("Fetched tiffins successfully!");
        } else {
          console.log("Failed to get tiffins response: ", response);
          toast.error("Failed to get tiffins!");
        }
      })
      .catch((error) => {
        console.log("Failed to add new tiffin!", error);
        toast.error("Failed to add tiffin!");
      });
  }, [vendorId]);

  const addTiffin = () => {
    navigate("/vendor-addtiffin");
  };

  const editTiffin = (event) => {
    const tiffinId = parseInt(event.target.getAttribute("data-tiffinId"));
    console.log("edit-tiffin event : ", tiffinId);
    const selectedTiffin = tiffins.find(
      (tifItem) => tifItem.tiffinId === tiffinId
    );

    console.log("selectedTiffin: ", selectedTiffin);
    if (selectedTiffin) {
      sessionStorage.setItem(
        "selectedTiffinForEdit",
        JSON.stringify(selectedTiffin)
      );
      navigate("/vendor-edittiffin");
    } else {
      toast.error("Failed to identify tiffin. Try select again!");
    }
  };

  return (
    <center>
      <div className="containerCard">
        <center>
          <br />
          <h1>Tiffins</h1>
          {/* <hr style={{ color: "greenyellow" }} /> */}
          <button className="add-button" onClick={addTiffin}>
            <h4>Add Tiffin</h4>
          </button>
          <br />
          <br />
          <br />
          <center>
            <div className="card-containerCard">
              {tiffins.map((tiffin) => (
                <center>
                  <Card
                    key={tiffin.tiffinId}
                    style={{
                      width: "30rem",
                      marginBottom: "50px",
                      border: "5px solid olive",
                      display: "-ms-iline-grid",
                    }}
                    className="customCard"
                  >
                    <Card.Body>
                      <Card.Title style={{ color: "darkgreen" }}>
                        <h1>{tiffin.tiffinName}</h1>
                      </Card.Title>
                      <Card.Img
                        variant="top"
                        src={tiffin.imageLink}
                        className="cardImage"
                        alt={tiffin.tiffinId}
                        style={{ width: "400px", height: "200px" }}
                      />
                      <b>
                        <Card.Text>{tiffin.tiffinCategory}</Card.Text>
                        <Card.Text>{tiffin.description}</Card.Text>
                        <Card.Text>
                          <span>&#8377; </span>
                          {tiffin.tiffinPrice}
                        </Card.Text>
                      </b>

                      {/* <Card.Text>{tiffin.status}</Card.Text> */}

                      <CardActions style={{ justifyContent: "center" }}>
                        <IconButton
                          aria-label="add to favorites"
                          data-tiffinId={tiffin.tiffinId}
                          onClick={editTiffin}
                        >
                          <EditIcon
                            data-tiffinId={tiffin.tiffinId}
                            color="primary"
                          />
                        </IconButton>
                      </CardActions>
                    </Card.Body>
                  </Card>
                </center>
              ))}
            </div>
          </center>
        </center>
      </div>
    </center>
  );
}

export default VendorTiffins;
