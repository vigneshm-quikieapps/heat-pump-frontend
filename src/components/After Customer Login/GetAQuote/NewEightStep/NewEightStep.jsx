import React, { useState, useEffect } from "react";
// import "./EightStep.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../../GlobalUrl";
import globalAPI from "../../../../GlobalApi";
import {
  Button,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import { Card, Checkbox, Radio } from "../../../../common";
import StyledTextField from "../../../../common/textfield";

const useStyles = makeStyles({});

const NewEightStep = (props) => {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState("");
  const token = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState({ ventilation: [], draught: "", other: "" });
  const [toggleOther, setToggleOther] = useState({
    ventilation: true,
    drought: false,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleChange = (e) => {
    let temp = { ...data };

    if (e.target.name !== "Other") {
      e.target.checked
        ? temp["ventilation"]?.push(e.target.name)
        : temp["ventilation"]?.map((item, index) => {
            e.target.name === item && temp["ventilation"]?.splice(index, 1);
          });
    } else {
      if (!toggleOther.ventilation) {
        temp.other = e.target.value;
      }
    }
    setData(temp);
  };
  // const handleChange1 = (e) => {
  //   // console.log(e);
  //   let temp = { ...data };
  //   e.target.checked
  //     ? e.target.name === "Not sure"
  //       ? (temp.drought = ["Not sure"])
  //       : temp["drought"]?.push(e.target.name)
  //     : temp["drought"]?.map((item, index) => {
  //         e.target.name === item && temp["drought"]?.splice(index, 1);
  //       });
  //   setData(temp);
  // };
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
          <Box sx={{ margin: "0 0 1% 0" }}>
            <Checkbox
              name="Natural Ventilation"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Typography
              sx={{
                display: "inline",
                fontFamily: "Outfit",
                marginLeft: "1.6%",
              }}
            >
              Natural Ventilation
            </Typography>
          </Box>
          <Box sx={{ margin: "0 0 1% 0" }}>
            <Checkbox
              name="Natural ventilation with trickle vents"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Typography
              sx={{
                display: "inline",
                fontFamily: "Outfit",
                marginLeft: "1.6%",
              }}
            >
              Natural ventilation with trickle vents
            </Typography>
          </Box>
          <Box sx={{ margin: "0 0 1% 0" }}>
            <Checkbox
              name="Intermittent extract fans in bathrooms/kitchen"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Typography
              sx={{
                display: "inline",
                fontFamily: "Outfit",
                marginLeft: "1.6%",
              }}
            >
              Intermittent extract fans in bathrooms/kitchen
            </Typography>
          </Box>
          <Box sx={{ margin: "0 0 1% 0" }}>
            <Checkbox
              name="Whole house extract"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Typography
              sx={{
                display: "inline",
                fontFamily: "Outfit",
                marginLeft: "1.6%",
              }}
            >
              Whole house extract
            </Typography>
          </Box>
          <Box sx={{ margin: "0 0 1% 0" }}>
            <Checkbox
              name="Positive input Fan from Loft"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Typography
              sx={{
                display: "inline",
                fontFamily: "Outfit",
                marginLeft: "1.6%",
              }}
            >
              Positive input Fan from Loft
            </Typography>
          </Box>
          <Box sx={{ margin: "0 0 1% 0" }}>
            <Checkbox
              name="Mechanical Ventilation with heat recovery (MVHR)"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Typography
              sx={{
                display: "inline",
                fontFamily: "Outfit",
                marginLeft: "1.6%",
              }}
            >
              Mechanical Ventilation with heat recovery (MVHR)
            </Typography>
          </Box>
          <Box sx={{ margin: "0 0 1% 0" }}>
            <Checkbox
              onChange={(e) => {
                let temp = { ...toggleOther };
                let temp1 = { ...data };
                if (e.target.checked) {
                  temp.ventilation = false;
                } else {
                  temp.ventilation = true;
                  temp1.other = "";
                  setData(temp1);
                }
                setToggleOther(temp);
                //  console.log(propertyUsage);
              }}
            />
            <Typography
              sx={{
                display: "inline",
                fontFamily: "Outfit",
                marginLeft: "1.6%",
              }}
            >
              Other
            </Typography>
          </Box>
          <StyledTextField
            disabled={toggleOther.ventilation}
            sx={{ width: "30%", marginLeft: "3.5%" }}
            type="text"
            value={data.other}
            placeholder="If other, please state"
            name="Other"
            onChange={(e) => {
              handleChange(e);
            }}
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
        <FormControl sx={{ width: "45%" }}>
          <RadioGroup
            sx={{ justifyContent: "space-evenly" }}
            column
            aria-labelledby="demo-form-control-label-placement"
          >
            <FormControlLabel
              sx={{
                marginLeft: "1.5%",
              }}
              value="Airtight (less than 3m3/hr.m2)"
              control={
                <Radio
                  onChange={() => {
                    let temp = { ...data };
                    temp.drought = "Airtight (less than 3m3/hr.m2)";
                    setData(temp);
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    display: "inline",
                    fontFamily: "Outfit",
                    marginLeft: "3%",
                  }}
                >
                  Airtight (less than 3m3/hr.m2)
                </Typography>
              }
              labelPlacement="right"
            />
            <FormControlLabel
              sx={{
                marginLeft: "1.5%",
              }}
              value="Sealed (less than 5m3/hr.m2)"
              control={
                <Radio
                  onChange={() => {
                    let temp = { ...data };
                    temp.drought = "Sealed (less than 5m3/hr.m2)";
                    setData(temp);
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    display: "inline",
                    fontFamily: "Outfit",
                    marginLeft: "3%",
                  }}
                >
                  Sealed (less than 5m3/hr.m2)
                </Typography>
              }
              labelPlacement="right"
            />
            <FormControlLabel
              sx={{
                marginLeft: "1.5%",
              }}
              value="Normal (5-10m3/hr.m2)"
              control={
                <Radio
                  onChange={() => {
                    let temp = { ...data };
                    temp.drought = "Normal (5-10m3/hr.m2)";
                    setData(temp);
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    display: "inline",
                    fontFamily: "Outfit",
                    marginLeft: "3%",
                  }}
                >
                  Normal (5-10m3/hr.m2)
                </Typography>
              }
              labelPlacement="right"
            />
            <FormControlLabel
              sx={{
                marginLeft: "1.5%",
              }}
              value="Draughty (more than 10m3/hr.m2)"
              control={
                <Radio
                  onChange={() => {
                    let temp = { ...data };
                    temp.drought = "Draughty (more than 10m3/hr.m2)";
                    setData(temp);
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    display: "inline",
                    fontFamily: "Outfit",
                    marginLeft: "3%",
                  }}
                >
                  Draughty (more than 10m3/hr.m2)
                </Typography>
              }
              labelPlacement="right"
            />
            <FormControlLabel
              sx={{
                marginLeft: "1.5%",
              }}
              value="Not sure"
              control={
                <Radio
                  onChange={() => {
                    let temp = { ...data };
                    temp.drought = "Not sure";
                    setData(temp);
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    display: "inline",
                    fontFamily: "Outfit",
                    marginLeft: "3%",
                  }}
                >
                  Not sure
                </Typography>
              }
              labelPlacement="right"
            />
          </RadioGroup>
        </FormControl>
        {/* <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
          <Box sx={{ margin: "0 0 1% 0" }}>
            <Checkbox
              defaultChecked={data.drought[0] === "Airtight"}
              name="Airtight"
              onChange={(e) => {
                handleChange1(e);
              }}
            />
            <Typography
              sx={{
                display: "inline",
                fontFamily: "Outfit",
                marginLeft: "1.6%",
              }}
            >
              Airtight (less than 3m3/hr.m2)
            </Typography>
          </Box>
          <Box sx={{ margin: "0 0 1% 0" }}>
            <Checkbox
              defaultChecked={data.drought[1] === "Sealed"}
              name="Sealed"
              onChange={(e) => {
                handleChange1(e);
              }}
            />
            <Typography
              sx={{
                display: "inline",
                fontFamily: "Outfit",
                marginLeft: "1.6%",
              }}
            >
              Sealed (less than 5m3/hr.m2)
            </Typography>
          </Box>
          <Box sx={{ margin: "0 0 1% 0" }}>
            <Checkbox
              defaultChecked={data.drought[2] === "Normal"}
              name="Normal"
              onChange={(e) => {
                handleChange1(e);
              }}
            />
            <Typography
              sx={{
                display: "inline",
                fontFamily: "Outfit",
                marginLeft: "1.6%",
              }}
            >
              Normal (5-10m3/hr.m2)
            </Typography>
          </Box>
          <Box sx={{ margin: "0 0 1% 0" }}>
            <Checkbox
              defaultChecked={data.drought[3] === "Draughty"}
              name="Draughty"
              onChange={(e) => {
                handleChange1(e);
              }}
            />
            <Typography
              sx={{
                display: "inline",
                fontFamily: "Outfit",
                marginLeft: "1.6%",
              }}
            >
              Draughty (more than 10m3/hr.m2)
            </Typography>
          </Box>
          <Box sx={{ margin: "0 0 1% 0" }}>
            <Checkbox
              name="Not sure"
              onChange={(e) => {
                let temp = { ...toggleOther };
                e.target.checked && (temp.drought = true);
                setToggleOther(temp);
                handleChange1(e);
              }}
            />
            <Typography
              sx={{
                display: "inline",
                fontFamily: "Outfit",
                marginLeft: "1.6%",
              }}
            >
              Not sure
            </Typography>
          </Box>
        </Box> */}
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
            props.getPayloadData(["ventilation_draught"], [data]);
            // props.getPayloadData(["drought"], data.drought);
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
