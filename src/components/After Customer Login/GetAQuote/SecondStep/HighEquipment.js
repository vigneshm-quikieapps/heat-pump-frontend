import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StyledTextField from "../../../../common/textfield";
import { Box, MenuItem } from "@mui/material";

const HighEquipment = (props) => {
  const [focused, setFocused] = useState(false);
  const [loader, setLoader] = useState(true);

  const [selectedSauna, setSelectedSauna] = useState("");
  const [selectedHotTub, setSelectedHotTub] = useState("");
  const [selectedSwimmingPool, setSelectedSwimmingPool] = useState("");
  const [selectedKilns, setSelectedKilns] = useState("");
  const [selectedOther, setSelectedOther] = useState("");
  useEffect(() => {
    setSelectedSauna(props?.highEnergyEquipments.sauna);
    setSelectedHotTub(props?.highEnergyEquipments.hotTub);
    setSelectedSwimmingPool(props?.highEnergyEquipments.swimmingPool);
    setSelectedKilns(props?.highEnergyEquipments.kilns);
    setSelectedOther(props?.highEnergyEquipments.other);
  }, [props]);
  return (
    <>
      <Box sx={{ width: "80%" }}>
        <StyledTextField
          select
          label="Sauna"
          variant="outlined"
          sx={{ width: "30%", marginTop: "20px", marginBottom: "20px" }}
          value={selectedSauna}
          onChange={(e) => {
            setSelectedSauna(e.target.value);
            props?.getHighEnergyEquipments("sauna", e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          IconComponent={() =>
            focused ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
        >
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="More than 6">More than 6</MenuItem>
        </StyledTextField>
        <StyledTextField
          select
          label="Swimming Pool"
          variant="outlined"
          sx={{
            width: "30%",
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "20px",
          }}
          value={selectedSwimmingPool}
          onChange={(e) => {
            setSelectedSwimmingPool(e.target.value);
            props?.getHighEnergyEquipments("swimmingPool", e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          IconComponent={() =>
            focused ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
        >
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="More than 6">More than 6</MenuItem>
        </StyledTextField>
        <StyledTextField
          select
          label="Hot Tub"
          variant="outlined"
          sx={{
            width: "30%",
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "20px",
          }}
          value={selectedHotTub}
          onChange={(e) => {
            setSelectedHotTub(e.target.value);
            props?.getHighEnergyEquipments("hotTub", e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          IconComponent={() =>
            focused ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
        >
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="More than 6">More than 6</MenuItem>
        </StyledTextField>
      </Box>
      <Box sx={{ width: "80%" }}>
        <StyledTextField
          select
          label="Kilns"
          variant="outlined"
          sx={{
            width: "30%",
            marginTop: "20px",
            marginBottom: "30px",
          }}
          value={selectedKilns}
          onChange={(e) => {
            setSelectedKilns(e.target.value);
            props?.getHighEnergyEquipments("kilns", e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          IconComponent={() =>
            focused ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
        >
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="More than 6">More than 6</MenuItem>
        </StyledTextField>
        <StyledTextField
          select
          label="Other"
          variant="outlined"
          sx={{
            width: "30%",
            marginTop: "20px",
            marginBottom: "30px",
            marginLeft: "20px",
          }}
          value={selectedOther}
          onChange={(e) => {
            setSelectedOther(e.target.value);
            props?.getHighEnergyEquipments("other", e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          IconComponent={() =>
            focused ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
        >
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="More than 6">More than 6</MenuItem>
        </StyledTextField>
      </Box>
    </>
  );
};

export default HighEquipment;
