import React, { useState, useEffect } from "react";
// import "./EightStep.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";
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
import { Card, Checkbox, Radio } from "../../../common";
import StyledTextField from "../../../common/textfield";
import { getQuote, UpdateJob } from "../../../services/services";

const useStyles = makeStyles({});

const NewEightStep = (props) => {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState("");
  const token = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState({
    ventilation: ["", "", "", "", "", ""],
    draught: "",
    other: "",
  });
  const [toggleOther, setToggleOther] = useState({
    ventilation: true,
    draught: false,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setData(props?.quoteData?.ventilation_draught || data);
  }, [props]);
  const handleChange = (e, i) => {
    let temp = { ...data };

    if (e.target.name !== "Other") {
      e.target.checked
        ? (temp["ventilation"][i] = e.target.name)
        : temp["ventilation"]?.map((item, index) => {
            return e.target.name === item
              ? (temp["ventilation"][index] = "")
              : (temp["ventilation"][index] = item);
          });
    } else {
      if (!toggleOther.ventilation) {
        temp.other = e.target.value;
      }
    }
    setData(temp);
  };
  const updateStatus = (e) => {
    UpdateJob(props?.quoteData?._id, { ventilation_draught: data }).then(
      (res) => {
        toast.success("Updated successfully");
      }
    );
  };
  return (
    <>
      {/* <Card> */}
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}

      <div>
        <Typography
          style={{
            fontSize: "25px",
            fontFamily: "Outfit",
            fontWeight: "600",
            marginTop: "5vh",
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
              checked={data.ventilation[0] === "Natural Ventilation"}
              name="Natural Ventilation"
              onChange={(e) => {
                handleChange(e, 0);
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
              checked={
                data.ventilation[1] === "Natural ventilation with trickle vents"
              }
              name="Natural ventilation with trickle vents"
              onChange={(e) => {
                handleChange(e, 1);
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
              checked={
                data.ventilation[2] ===
                "Intermittent extract fans in bathrooms/kitchen"
              }
              name="Intermittent extract fans in bathrooms/kitchen"
              onChange={(e) => {
                handleChange(e, 2);
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
              checked={data.ventilation[3] === "Whole house extract"}
              name="Whole house extract"
              onChange={(e) => {
                handleChange(e, 3);
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
              checked={data.ventilation[4] === "Positive input Fan from Loft"}
              name="Positive input Fan from Loft"
              onChange={(e) => {
                handleChange(e, 4);
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
              checked={
                data.ventilation[5] ===
                "Mechanical Ventilation with heat recovery (MVHR)"
              }
              name="Mechanical Ventilation with heat recovery (MVHR)"
              onChange={(e) => {
                handleChange(e, 5);
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
            fontSize: "25px",
            fontFamily: "Outfit",
            fontWeight: "600",
            marginTop: "5vh",
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
                  checked={data.draught === "Airtight (less than 3m3/hr.m2)"}
                  onChange={() => {
                    let temp = { ...data };
                    temp.draught = "Airtight (less than 3m3/hr.m2)";
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
                  checked={data.draught === "Sealed (less than 5m3/hr.m2)"}
                  onChange={() => {
                    let temp = { ...data };
                    temp.draught = "Sealed (less than 5m3/hr.m2)";
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
                  checked={data.draught === "Normal (5-10m3/hr.m2)"}
                  onChange={() => {
                    let temp = { ...data };
                    temp.draught = "Normal (5-10m3/hr.m2)";
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
                  checked={data.draught === "Draughty (more than 10m3/hr.m2)"}
                  onChange={() => {
                    let temp = { ...data };
                    temp.draught = "Draughty (more than 10m3/hr.m2)";
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
                  checked={data.draught === "Not sure"}
                  onChange={() => {
                    let temp = { ...data };
                    temp.draught = "Not sure";
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
      </div>
      {/* </Card> */}
      <button
        className="browsebtn"
        name="status"
        style={{ marginTop: "5%", marginLeft: "-5px" }}
        onClick={(e) => {
          updateStatus(e);
        }}
      >
        Save
      </button>
    </>
  );
};

export default NewEightStep;
