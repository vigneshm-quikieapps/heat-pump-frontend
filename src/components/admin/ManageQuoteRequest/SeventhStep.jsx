import React, { useState, useEffect } from "react";

// import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

import { Typography, Box } from "@mui/material";
import { Card, Checkbox } from "../../../common";

import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
// import { Card, TextField } from "../../../common";
import StyledTextField from "../../../common/textfield";
// import { TempleHinduOutlined } from "@mui/icons-material";
import { getQuote, UpdateJob } from "../../../services/services";
import { toast } from "react-toastify";

import { connect, useDispatch } from "react-redux";

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
const heatValueRev = {
  1: "Gas",
  2: "Heat Pump",
  3: "Wood",
  4: "Oil",
  5: "LPG",
};
const SeventhStep = (props) => {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"));
  const [focused, setFocused] = React.useState("");
  const [priority, setPriority] = useState("Gas");
  const [priorityValue, setPriorityValue] = useState("");
  const [currentBills, setCurrentBills] = useState({
    amount_of_gas: "",
    cost_of_gas: "",
  });
  const [existingData, setExistingData] = useState({ data: [], other: "" });
  const [proposedData, setProposedData] = useState({ data: [], other: "" });
  const [otherDesignData, setOtherDesignData] = useState([]);
  const [checkOtherToggle, setCheckOtherToggle] = useState([true, true]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setPriorityValue(props?.quoteData?.heating_system || priorityValue);
    let temp = { ...currentBills };
    temp.amount_of_gas = props?.quoteData?.amount_of_gas;
    temp.cost_of_gas = props?.quoteData?.cost_of_gas;
    setExistingData(props?.quoteData?.existing || existingData);
    setProposedData(props?.quoteData?.proposed || proposedData);
    setOtherDesignData(
      props?.quoteData?.other_design_factor || otherDesignData
    );
    setPriority(heatValueRev[props?.quoteData?.heating_system] || priority);
    setCurrentBills(temp || currentBills);
  }, [props]);
  const updateStatus = (e) => {
    UpdateJob(props?.quoteData?._id, {
      heating_system: priorityValue,
      amount_of_gas: currentBills.amount_of_gas,
      cost_of_gas: currentBills.cost_of_gas,
      existing: existingData,
      proposed: proposedData,
      other_design_factor: otherDesignData,
    }).then((res) => {
      toast.success("Updated successfully");
    });
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
                checked={existingData.data[0] === "Radiator"}
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
                checked={existingData.data[1] === "Underfloor Heating"}
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
                checked={existingData.data[2] === "Underfloor and Radiators"}
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
                checked={existingData.data[3] === "Fan coils"}
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
                // checked={!checkOtherToggle[0]}
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
                checked={proposedData.data[0]}
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
                checked={proposedData.data[1] === "Underfloor Heating"}
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
                checked={proposedData.data[2] === "Underfloor and Radiators"}
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
                checked={proposedData.data[3] === "Fan coils"}
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
                // checked={!checkOtherToggle[1]}
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
                  value={currentBills?.amount_of_gas}
                  onChange={(e) => {
                    let temp = { ...currentBills };
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
                  value={currentBills?.cost_of_gas}
                  onChange={(e) => {
                    let temp = { ...currentBills };
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
                checked={otherDesignData[0] === "High ceilings"}
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
                checked={otherDesignData[1] === "Intermittent Heating"}
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
                checked={otherDesignData[2] === "Exposed site"}
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
                checked={otherDesignData[3] === "Any microbore"}
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

export default SeventhStep;
