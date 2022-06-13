import React, { useState, useEffect } from "react";
import "./SeventhStep.css";
// import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

import { Typography, Box } from "@mui/material";
import { Card, Checkbox } from "../../../../common";

import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
// import { Card, TextField } from "../../../../common";
import StyledTextField from "../../../../common/textfield";
// import { TempleHinduOutlined } from "@mui/icons-material";

const useStyles = makeStyles({
  textfield: {
    "& label.Mui-focused": {
      color: "black",
      fontSize: "1vw",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.46vw",
      marginRight: "3.73vw",
      height: "6.71vh",
      fontSize: "1vw",
      width: "25vw",
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
  button: {
    backgroundColor: "black",
    width: "20%",
    height: "1.5%",
    borderRadius: "2.5vw",
    marginTop: "5%",
    fontSize: "1vw",
  },
  selectfield: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.61vw",
      marginRight: "1.22vw",
      width: "15.22vw",
      height: "6.51vh",
      fontWeight: "bolder",
      fontFamily: "outfit",
      backgroundColor: "white",

      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    icons: {
      fontSize: "0.5vw",
    },
  },
  selectinput: {
    marginBottom: "0.67vh",
    fontFamily: "outfit",
    fontWeight: "bolder",
    fontSize: "1vw",
  },
});
const heatValue = {
  Gas: 1,
  "Heat Pump": 2,
  Wood: 3,
  Oil: 4,
  LPG: 5,
};
const SeventhStep = (props) => {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"));
  const [focused, setFocused] = React.useState("");
  const [priority, setPriority] = useState("Gas");
  const [priorityValue, setPriorityValue] = useState();
  const [currnetBills, setCurrentBills] = useState({
    amount_of_gas: "",
    cost_of_gas: "",
  });
  const [existingData, setExistingData] = useState({ data: [], other: "" });
  const [proposedData, setProposedData] = useState({ data: [], other: "" });
  const [otherDesignData, setOtherDesignData] = useState([]);
  const [checkOtherToggle, setCheckOtherToggle] = useState([false, false]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Card>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <div className="s7text1">
        Step 7 of 9
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
          Heating System
        </Typography>
        <hr className="s2hr2" />

        <div style={{ marginTop: "2.5%" }}>
          <StyledTextField
            select
            sx={{ width: "20%" }}
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setPriorityValue(heatValue[e.target.value]);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            IconComponent={() =>
              focused ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
          >
            <MenuItem value="Gas">Gas</MenuItem>
            <MenuItem value="Heat Pump">Heat Pump</MenuItem>
            <MenuItem value="Wood">Wood</MenuItem>
            <MenuItem value="Oil">Oil</MenuItem>
            <MenuItem value="LPG">LPG</MenuItem>
          </StyledTextField>
        </div>
        <div>
          <Typography
            style={{
              fontSize: "30px",
              fontFamily: "Outfit",
              fontWeight: "600",
              marginTop: "3%",
            }}
          >
            Existing
          </Typography>
          <hr
            style={{
              backgroundColor: "#f2f3f2",
              border: "0.2vh solid #f2f3f2",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
            }}
          >
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={existingData.data[0]}
                onChange={(e) => {
                  let temp = { ...existingData };
                  e.target.checked
                    ? (temp.data[0] = "Radiator")
                    : temp.data.splice(0, 1);
                  setExistingData(temp);
                }}
              />
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "Outfit",
                  marginLeft: "1.6%",
                }}
              >
                Radiator
              </Typography>
            </Box>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={existingData.data[1]}
                onChange={(e) => {
                  let temp = { ...existingData };
                  e.target.checked
                    ? (temp.data[1] = "Underfloor Heating")
                    : temp.data.splice(1, 1);
                  setExistingData(temp);
                }}
              />
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "Outfit",
                  marginLeft: "1.6%",
                }}
              >
                Underfloor Heating
              </Typography>
            </Box>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={existingData.data[2]}
                onChange={(e) => {
                  let temp = { ...existingData };
                  e.target.checked
                    ? (temp.data[2] = "Underfloor and Radiators")
                    : temp.data.splice(2, 1);
                  setExistingData(temp);
                }}
              />
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "Outfit",
                  marginLeft: "1.6%",
                }}
              >
                Underfloor and Radiators
              </Typography>
            </Box>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={existingData.data[3]}
                onChange={(e) => {
                  let temp = { ...existingData };
                  e.target.checked
                    ? (temp.data[3] = "Fan coils")
                    : temp.data.splice(3, 1);
                  setExistingData(temp);
                }}
              />
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "Outfit",
                  marginLeft: "1.6%",
                }}
              >
                Fan coils
              </Typography>
            </Box>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={checkOtherToggle[0]}
                onChange={(e) => {
                  let temp = [...checkOtherToggle];
                  let temp1 = { ...existingData };
                  if (e.target.checked) {
                    temp[0] = false;
                  } else {
                    temp[0] = true;
                    temp1.other = "";
                    setExistingData(temp1);
                  }
                  setCheckOtherToggle(temp);
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
              sx={{ width: "30%", marginLeft: "3.5%" }}
              type="text"
              disabled={checkOtherToggle[0]}
              value={existingData.other}
              placeholder="If other, please state"
              onChange={(e) => {
                let temp = { ...existingData };
                temp.other = e.target.value;
                setExistingData(temp);
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
              marginTop: "3%",
            }}
          >
            Proposed
          </Typography>
          <hr
            style={{
              backgroundColor: "#f2f3f2",
              border: "0.2vh solid #f2f3f2",
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={proposedData.data[0]}
                onChange={(e) => {
                  let temp = { ...proposedData };
                  e.target.checked
                    ? (temp.data[0] = "Radiator")
                    : temp.data.splice(0, 1);
                  setProposedData(temp);
                }}
              />
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "Outfit",
                  marginLeft: "1.6%",
                }}
              >
                Radiator
              </Typography>
            </Box>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={proposedData.data[1]}
                onChange={(e) => {
                  let temp = { ...proposedData };
                  e.target.checked
                    ? (temp.data[1] = "Underfloor Heating")
                    : temp.data.splice(1, 1);
                  setProposedData(temp);
                }}
              />
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "Outfit",
                  marginLeft: "1.6%",
                }}
              >
                Underfloor Heating
              </Typography>
            </Box>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={proposedData.data[2]}
                onChange={(e) => {
                  let temp = { ...proposedData };
                  e.target.checked
                    ? (temp.data[2] = "Underfloor and Radiators")
                    : temp.data.splice(2, 1);
                  setProposedData(temp);
                }}
              />
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "Outfit",
                  marginLeft: "1.6%",
                }}
              >
                Underfloor and Radiators
              </Typography>
            </Box>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={proposedData.data[3]}
                onChange={(e) => {
                  let temp = { ...proposedData };
                  e.target.checked
                    ? (temp.data[3] = "Fan coils")
                    : temp.data.splice(3, 1);
                  setProposedData(temp);
                }}
              />
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "Outfit",
                  marginLeft: "1.6%",
                }}
              >
                Fan coils
              </Typography>
            </Box>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={checkOtherToggle[1]}
                onChange={(e) => {
                  let temp = [...checkOtherToggle];
                  let temp1 = { ...proposedData };
                  if (e.target.checked) {
                    temp[1] = false;
                  } else {
                    temp[1] = true;
                    temp1.other = "";
                    setProposedData(temp1);
                  }
                  setCheckOtherToggle(temp);
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
              sx={{ width: "30%", marginLeft: "3.5%" }}
              type="text"
              disabled={checkOtherToggle[1]}
              value={proposedData.other}
              placeholder="If other, please state"
              onChange={(e) => {
                let temp = { ...proposedData };
                temp.other = e.target.value;
                setProposedData(temp);
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
              marginTop: "3%",
            }}
          >
            Current Bills
          </Typography>
          <hr
            style={{
              backgroundColor: "#f2f3f2",
              border: "0.2vh solid #f2f3f2",
            }}
          />
          <Box sx={{ display: "flex", gap: "70px", alignItems: "center" }}>
            <Box sx={{ width: "30%" }}>
              <Typography
                style={{
                  fontSize: "22px",
                  fontFamily: "Outfit",
                  fontWeight: "300",
                  marginTop: "3%",
                  color: "#fa5e00",
                }}
              >
                {priority} Annual Usage
              </Typography>
              <hr className="s2hr2" />
              <Typography>
                <StyledTextField
                  type="number"
                  sx={{ width: "100%" }}
                  label={`Amount of ${priority} (kWh)`}
                  value={currnetBills?.amount_of_gas}
                  onChange={(e) => {
                    let temp = { ...currnetBills };
                    temp["amount_of_gas"] = e.target.value;
                    setCurrentBills(temp);
                  }}
                />
              </Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <h3
                style={{
                  fontSize: "22px",
                  fontFamily: "Outfit",
                  fontWeight: "300",
                  marginTop: "4%",
                  color: "#fa5e00",
                }}
              >
                {priority} Annual Spend
              </h3>
              <hr className="s2hr2" />
              <Typography>
                <StyledTextField
                  type="number"
                  sx={{ width: "100%" }}
                  label={`Cost of ${priority} (£)`}
                  value={currnetBills?.cost_of_gas}
                  onChange={(e) => {
                    let temp = { ...currnetBills };
                    temp["cost_of_gas"] = e.target.value;
                    setCurrentBills(temp);
                  }}
                />
              </Typography>
            </Box>
          </Box>
        </div>
        <div>
          <Typography
            style={{
              fontSize: "30px",
              fontFamily: "Outfit",
              fontWeight: "600",
              marginTop: "3%",
            }}
          >
            Other Design Factor
          </Typography>
          <hr
            style={{
              backgroundColor: "#f2f3f2",
              border: "0.2vh solid #f2f3f2",
            }}
          />
          <Typography sx={{ color: "gray", fontFamily: "Outfit" }}>
            Tick all that apply
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={otherDesignData[0]}
                onChange={(e) => {
                  let temp = [...otherDesignData];
                  e.target.checked
                    ? (temp[0] = "High ceilings")
                    : temp.splice(0, 1);
                  setOtherDesignData(temp);
                }}
              />
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "Outfit",
                  marginLeft: "1.6%",
                }}
              >
                High ceilings
              </Typography>
            </Box>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={otherDesignData[1]}
                onChange={(e) => {
                  let temp = [...otherDesignData];
                  e.target.checked
                    ? (temp[1] = "Intermittent Heating")
                    : temp.splice(1, 1);
                  setOtherDesignData(temp);
                }}
              />
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "Outfit",
                  marginLeft: "1.6%",
                }}
              >
                Intermittent Heating
              </Typography>
            </Box>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={otherDesignData[2]}
                onChange={(e) => {
                  let temp = [...otherDesignData];
                  e.target.checked
                    ? (temp[2] = "Exposed site")
                    : temp.splice(2, 1);
                  setOtherDesignData(temp);
                }}
              />
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "Outfit",
                  marginLeft: "1.6%",
                }}
              >
                Exposed site
              </Typography>
            </Box>
            <Box sx={{ margin: "0 0 1% 0" }}>
              <Checkbox
                defaultChecked={otherDesignData[3]}
                onChange={(e) => {
                  let temp = [...otherDesignData];
                  e.target.checked
                    ? (temp[3] = "Any microbore")
                    : temp.splice(3, 1);
                  setOtherDesignData(temp);
                }}
              />
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "Outfit",
                  marginLeft: "1.6%",
                }}
              >
                Any microbore
              </Typography>
            </Box>
          </Box>
        </div>
        <Box sx={{ display: "flex", marginTop: "30px" }}>
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
              props.getPayloadData(
                ["heating_system", "amount_of_gas", "cost_of_gas"],
                [
                  priorityValue,
                  currnetBills.amount_of_gas,
                  currnetBills.cost_of_gas,
                ]
              );
              props.getPayloadData(
                ["existing", "proposed", "other_design_factor"],
                [existingData, proposedData, otherDesignData]
              );

              props.next();
            }}
          >
            <span style={{ marginRight: "100px" }}>Continue</span>
            <span style={{ height: "27px", width: "27px" }}>
              <ChevronRightSharpIcon sx={{ height: "27px", width: "27px" }} />
            </span>
          </button>
        </Box>
      </div>
    </Card>
  );
};

export default SeventhStep;
