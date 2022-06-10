import React, { useState, useEffect } from "react";
// import "./EightStep.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../../GlobalUrl";
import globalAPI from "../../../../GlobalApi";
import { Button, Box, Typography, Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import { Card } from "../../../../common";
import StyledTextField from "../../../../common/textfield";

const useStyles = makeStyles({});

const NewEightStep = (props) => {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState("");
  const token = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState({ ventilation: [], drought: [] });
  const [toggleOther, setToggleOther] = useState({
    ventilation: true,
    drought: true,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleChange = (e) => {
    // console.log(e);
    let temp = { ...data };
    e.target.checked
      ? temp["ventilation"]?.push(e.target.name)
      : temp["ventilation"]?.map((item, index) => {
          e.target.name === item && temp["ventilation"]?.splice(index, 1);
        });
    setData(temp);
  };
  const handleChange1 = (e) => {
    // console.log(e);
    let temp = { ...data };
    e.target.checked
      ? e.target.name === "Not sure"
        ? (temp.drought = ["Not sure"])
        : temp["drought"]?.push(e.target.name)
      : temp["drought"]?.map((item, index) => {
          e.target.name === item && temp["drought"]?.splice(index, 1);
        });
    setData(temp);
  };
  console.log(data);
  return (
    <Card>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <div className="s7text1">
        Step 8 of 9
        <img src={require("../../../../Img/step7.png")} className="s7baricon" />
      </div>
      <div>
        <Typography
          style={{
            fontSize: "30px",
            fontFamily: "Outfit",
            fontWeight: "600",
            marginTop: "10vh",
          }}
        >
          Ventilation
        </Typography>
        <hr
          style={{
            backgroundColor: "#f2f3f2",
            border: "0.1vh solid #f2f3f2",
          }}
        />
        <Typography sx={{ color: "gray", fontFamily: "Outfit" }}>
          Please tick the options below or leave blank if unknown
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
          <Box>
            <Checkbox
              name="Natural Ventilation"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Typography sx={{ display: "inline", fontFamily: "Outfit" }}>
              Natural Ventilation
            </Typography>
          </Box>
          <Box>
            <Checkbox
              name="Intermittent extract fans in bathrooms/kitchen"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Typography sx={{ display: "inline", fontFamily: "Outfit" }}>
              Intermittent extract fans in bathrooms/kitchen
            </Typography>
          </Box>
          <Box>
            <Checkbox
              name="Whole house extract"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Typography sx={{ display: "inline", fontFamily: "Outfit" }}>
              Whole house extract
            </Typography>
          </Box>
          <Box>
            <Checkbox
              name="Positive input Fan from Loft"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Typography sx={{ display: "inline", fontFamily: "Outfit" }}>
              Positive input Fan from Loft
            </Typography>
          </Box>
          <Box>
            <Checkbox
              name="Mechanical Ventilation with heat recovery (MVHR)"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Typography sx={{ display: "inline", fontFamily: "Outfit" }}>
              Mechanical Ventilation with heat recovery (MVHR)
            </Typography>
          </Box>
          <Box>
            <Checkbox
              onChange={() => {
                let temp = { ...toggleOther };
                temp.ventilation = false;
                setToggleOther(temp);
              }}
            />
            <Typography sx={{ display: "inline", fontFamily: "Outfit" }}>
              Other
            </Typography>
          </Box>
          <StyledTextField
            disabled={toggleOther.ventilation}
            sx={{ width: "30%", marginLeft: "3.5%" }}
            type="text"
            placeholder="If other please state"
            // onChange={(e) => {
            //   let temp = { ...data };
            //   temp["ventilation"].push(e.target.value);
            //   setData(temp);
            // }}
          />
        </Box>
      </div>
      <div>
        <Typography
          style={{
            fontSize: "30px",
            fontFamily: "Outfit",
            fontWeight: "600",
            marginTop: "10vh",
          }}
        >
          Building Draught Proofing / Airtightness
        </Typography>
        <hr
          style={{
            backgroundColor: "#f2f3f2",
            border: "0.1vh solid #f2f3f2",
          }}
        />
        <Typography sx={{ color: "gray", fontFamily: "Outfit" }}>
          Please tick the options below or leave blank if unknown
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
          <Box>
            <Checkbox
              name="Airtight"
              onChange={(e) => {
                handleChange1(e);
              }}
            />
            <Typography sx={{ display: "inline", fontFamily: "Outfit" }}>
              Airtight (less than 3m3/hr.m2)
            </Typography>
          </Box>
          <Box>
            <Checkbox
              name="Sealed"
              onChange={(e) => {
                handleChange1(e);
              }}
            />
            <Typography sx={{ display: "inline", fontFamily: "Outfit" }}>
              Sealed (less than 5m3/hr.m2)
            </Typography>
          </Box>
          <Box>
            <Checkbox
              name="Normal"
              onChange={(e) => {
                handleChange1(e);
              }}
            />
            <Typography sx={{ display: "inline", fontFamily: "Outfit" }}>
              Normal (5-10m3/hr.m2)
            </Typography>
          </Box>
          <Box>
            <Checkbox
              name="Draughty"
              onChange={(e) => {
                handleChange1(e);
              }}
            />
            <Typography sx={{ display: "inline", fontFamily: "Outfit" }}>
              Draughty (more than 10m3/hr.m2)
            </Typography>
          </Box>
          <Box>
            <Checkbox
              name="Not sure"
              onChange={(e) => {
                handleChange1(e);
              }}
            />
            <Typography sx={{ display: "inline", fontFamily: "Outfit" }}>
              Not sure
            </Typography>
          </Box>
        </Box>
      </div>
      <Box sx={{ display: "flex" }}>
        <button
          variant="contained"
          className="btn-house btn-icon"
          onClick={props.prev}
        >
          <span style={{ height: "27px", width: "27px" }}>
            <ChevronLeftSharpIcon sx={{ height: "27px", width: "27px" }} />
          </span>
          <span style={{ marginLeft: "100px" }}>Previous</span>
        </button>
        <button
          variant="contained"
          className="btn-house Add btn-icon"
          onClick={() => {
            props.getPayloadData(["ventilation"], data.ventilation);
            props.getPayloadData(["drought"], data.drought);
            props.next();
          }}
        >
          <span style={{ marginRight: "100px" }}>Continue</span>
          <span style={{ height: "27px", width: "27px" }}>
            <ChevronRightSharpIcon sx={{ height: "27px", width: "27px" }} />
          </span>
        </button>
      </Box>
    </Card>
  );
};

export default NewEightStep;
