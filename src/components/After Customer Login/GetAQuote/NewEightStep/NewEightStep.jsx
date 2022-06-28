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
import {
  bookJobAction,
  bookJobReset,
} from "../../../../Redux/bookJob/bookJob.action";
import { connect, useDispatch } from "react-redux";
const useStyles = makeStyles({});

const NewEightStep = ({ myProps, bookJobDetails, bookJobAction }) => {
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
    setData(bookJobDetails.ventilation_draught);
  }, [bookJobDetails]);
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
  // const handleChange1 = (e) => {
  //   // console.log(e);
  //   let temp = { ...data };
  //   e.target.checked
  //     ? e.target.name === "Not sure"
  //       ? (temp.draught = ["Not sure"])
  //       : temp["draught"]?.push(e.target.name)
  //     : temp["draught"]?.map((item, index) => {
  //         e.target.name === item && temp["draught"]?.splice(index, 1);
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
      <Box sx={{ display: "flex" }}>
        <button
          variant="contained"
          className="btn-house btn-icon"
          onClick={() => {
            bookJobAction({ ventilation_draught: data });
            myProps.prev();
          }}
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
            myProps.getPayloadData(["ventilation_draught"], [data]);
            bookJobAction({ ventilation_draught: data });
            myProps.next();
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
const mapStateToProps = (state, ownProps) => {
  return {
    myProps: ownProps,
    bookJobDetails: state.bkjb,
  };
};

const mapDispatchToProps = (dispatch) => ({
  bookJobAction: (keypair) => dispatch(bookJobAction(keypair)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewEightStep);
// export default NewEightStep;
