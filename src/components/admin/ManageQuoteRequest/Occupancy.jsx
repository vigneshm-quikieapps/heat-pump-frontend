import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
// import Checkbox from "../../../../common/checkbox";
import step2ProgressBar from "../../../Img/step2.png";
import { Box, MenuItem, Table, Typography } from "@mui/material";
// import "./SecondStep.css";
// import { Card, Radio } from "../../../common";
import { getQuote, UpdateJob } from "../../../services/services";
import { toast } from "react-toastify";

import {
  // Box,
  FormControl,
  FormControlLabel,
  // MenuItem,
  RadioGroup,
  // Typography,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { withStyles } from "@material-ui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Card, Checkbox, Radio } from "../../../common";
import TableWeek from "../../After Customer Login/GetAQuote/SecondStep/TableWeek";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import StyledTextField from "../../../common/textfield";
import { Co2Sharp, InsertEmoticon } from "@mui/icons-material";
const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 42,
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "0px 16px",
  },
}))(TableCell);
const Occupancy = (props) => {
  const [focused, setFocused] = React.useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [weeklySlots, setWeeklySlots] = useState({
    "0000 - 0600": Array(2).fill(false),
    "0600 - 0800": Array(2).fill(false),
    "0800 - 1000": Array(2).fill(false),
    "1000 - 1400": Array(2).fill(false),
    "1400 - 1800": Array(2).fill(false),
    "1800 - 2359": Array(2).fill(false),
  });

  const [selectedAdultOccupants, setSelectedAdultOccupants] = useState("1");
  const [selectedChildOccupants, setSelectedChildOccupants] = useState("1");
  const [selectedNoPerBedroom, setSelectedNoPerBedroom] = useState("1");
  const [propertyUsage, setPropertyUsage] = useState({ data: [], other: "" });
  const [checkOtherToggle, setCheckOtherToggle] = useState([true]);

  const [selectedGuestInWinter, setSelectedGuestInWinter] = useState(0);

  const [selectedSauna, setSelectedSauna] = useState("0");
  const [selectedHotTub, setSelectedHotTub] = useState("0");
  const [selectedSwimmingPool, setSelectedSwimmingPool] = useState("0");
  const [selectedKilns, setSelectedKilns] = useState("0");
  const [selectedOther, setSelectedOther] = useState("0");

  const [questions, setQuestions] = useState({
    hotwater_importance: 1,
    heating_then_uk_average: 1,
  });
  useEffect(() => {
    setWeeklySlots(props?.quoteData?.occupancy?.weekly || weeklySlots);
    setSelectedAdultOccupants(
      props?.quoteData?.occupancy?.number_of_adultOccupants ||
        selectedAdultOccupants
    );
    setSelectedChildOccupants(
      props?.quoteData?.occupancy?.number_of_childrenOccupants ||
        selectedChildOccupants
    );
    setSelectedNoPerBedroom(
      props?.quoteData?.occupancy?.number_of_typicalOccupantsPerBedroom ||
        selectedNoPerBedroom
    );
    setPropertyUsage(
      props?.quoteData?.occupancy?.property_usage || propertyUsage
    );
    setSelectedGuestInWinter(
      props?.quoteData?.number_of_guests || selectedGuestInWinter
    );
    setSelectedSauna(
      props?.quoteData?.high_energy_equipments?.sauna || selectedSauna
    );
    setSelectedHotTub(
      props?.quoteData?.high_energy_equipments?.hotTub || selectedHotTub
    );
    setSelectedSwimmingPool(
      props?.quoteData?.high_energy_equipments?.swimmingPool ||
        selectedSwimmingPool
    );
    setSelectedKilns(
      props?.quoteData?.high_energy_equipments?.kilns || selectedKilns
    );
    setSelectedOther(
      props?.quoteData?.high_energy_equipments?.other || selectedOther
    );
    setQuestions(props?.quoteData?.questions || questions);
    setLoader(false);
  }, [props]);

  function createData(name, Weekday, Weekend) {
    return { name, Weekday, Weekend };
  }
  const handleWeeklySlots = (index, slot) => {
    let temp = { ...weeklySlots };
    temp[`${slot}`][index] = !weeklySlots[`${slot}`][index];
    setWeeklySlots(temp);
  };
  const updateStatus = (e) => {
    UpdateJob(props?.quoteData?._id, {
      occupancy: {
        number_of_adultOccupants: selectedAdultOccupants,
        number_of_childrenOccupants: selectedChildOccupants,
        number_of_typicalOccupantsPerBedroom: selectedNoPerBedroom,
        property_usage: propertyUsage,
        weekly: weeklySlots,
      },
      high_energy_equipments: {
        sauna: selectedSauna,
        swimmingPool: selectedSwimmingPool,
        hotTub: selectedHotTub,
        kilns: selectedKilns,
        other: selectedOther,
      },
      questions: questions,
      number_of_guests: selectedGuestInWinter,
    }).then((res) => {
      toast.success("Updated successfully");
    });
  };

  const rows = [
    createData(
      "0000 - 0600",
      <Checkbox
        checked={Boolean(weeklySlots["0000 - 0600"][0])}
        onChange={() => {
          handleWeeklySlots(0, "0000 - 0600");
        }}
      />,
      <Checkbox
        checked={Boolean(weeklySlots["0000 - 0600"][1])}
        onChange={() => {
          handleWeeklySlots(1, "0000 - 0600");
        }}
      />
    ),

    createData(
      "0600 - 0800",
      <Checkbox
        checked={Boolean(weeklySlots["0600 - 0800"][0])}
        onChange={() => {
          handleWeeklySlots(0, "0600 - 0800");
        }}
      />,
      <Checkbox
        checked={Boolean(weeklySlots["0600 - 0800"][1])}
        onChange={() => {
          handleWeeklySlots(1, "0600 - 0800");
        }}
      />
    ),
    createData(
      "0800 - 1000",
      <Checkbox
        checked={Boolean(weeklySlots["0800 - 1000"][0])}
        onChange={() => {
          handleWeeklySlots(0, "0800 - 1000");
        }}
      />,
      <Checkbox
        checked={Boolean(weeklySlots["0800 - 1000"][1])}
        onChange={() => {
          handleWeeklySlots(1, "0800 - 1000");
        }}
      />
    ),
    createData(
      "1000  -  1400",
      <Checkbox
        checked={Boolean(weeklySlots["1000 - 1400"][0])}
        onChange={() => {
          handleWeeklySlots(0, "1000 - 1400");
        }}
      />,
      <Checkbox
        checked={Boolean(weeklySlots["1000 - 1400"][1])}
        onChange={() => {
          handleWeeklySlots(1, "1000 - 1400");
        }}
      />
    ),
    createData(
      "1400  -  1800",
      <Checkbox
        checked={Boolean(weeklySlots["1400 - 1800"][0])}
        onChange={() => {
          handleWeeklySlots(0, "1400 - 1800");
        }}
      />,
      <Checkbox
        checked={Boolean(weeklySlots["1400 - 1800"][1])}
        onChange={() => {
          handleWeeklySlots(1, "1400 - 1800");
        }}
      />
    ),

    createData(
      "1800  -  2359",
      <Checkbox
        checked={Boolean(weeklySlots["1800 - 2359"][0])}
        onChange={() => {
          handleWeeklySlots(0, "1800 - 2359");
        }}
      />,
      <Checkbox
        checked={Boolean(weeklySlots["1800 - 2359"][1])}
        onChange={() => {
          handleWeeklySlots(1, "1800 - 2359");
        }}
      />
    ),
  ];

  return (
    <>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "bold",
          fontFamily: "outfit",
        }}
      >
        Please click when you think the property will typically be occupied in
        the week
      </Typography>
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "300",
          fontFamily: "outfit",
          color: "#767676",
        }}
      >
        Just imagine its a typical week when you/your family are in the property
      </Typography>
      <Box
        sx={{
          background: "#fcfcfc",
          borderRadius: "10px",
          width: "45%",
          height: "30%",
          margin: "20px 0px 45px 20px",
          padding: "18px 32px 5px 25px",
        }}
      >
        <Table sx={{}}>
          <TableHead sx={{ borderBottom: "none" }}>
            <StyledTableRow>
              <StyledTableCell sx={{ borderBottom: "none" }}></StyledTableCell>
              <StyledTableCell
                sx={{
                  borderBottom: "none",
                  fontSize: "22px",
                  fontWeight: "300",
                  fontFamily: "Outfit",
                  textAlign: "center",
                  width: "100px",
                }}
                align="right"
              >
                Weekday
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  width: "100px",
                  borderBottom: "none",
                  fontSize: "22px",
                  fontWeight: "300",
                  fontFamily: "Outfit",
                  textAlign: "center",
                }}
                align="right"
              >
                Weekend
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.name}
                sx={{
                  width: "100px",
                  "&:last-child td, &:last-child th": { border: 0 },
                  fontSize: "22px",
                  fontWeight: "300",
                  fontFamily: "Outfit",
                }}
              >
                <StyledTableCell
                  sx={{
                    borderBottom: "none",
                    fontSize: "22px",
                    fontWeight: "300",
                    fontFamily: "Outfit",
                  }}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell sx={{ borderBottom: "none" }} align="center">
                  {row.Weekday}
                </StyledTableCell>
                <StyledTableCell sx={{ borderBottom: "none" }} align="center">
                  {row.Weekend}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "bold",
          fontFamily: "outfit",
        }}
      >
        Please tick the property usage as appropriate
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "50%",
          height: "100px",
          justifyContent: "space-evenly",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Checkbox
            // sx={{ float: "center" }}
            checked={propertyUsage.data[0] === "Main House"}
            onChange={(e) => {
              let temp = { ...propertyUsage };
              e.target.checked
                ? (temp.data[0] = "Main House")
                : temp.data.splice(0, 1);
              setPropertyUsage(temp);
            }}
          />
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "bold",
              fontFamily: "outfit",
            }}
          >
            Main House
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Checkbox
            checked={propertyUsage.data[1] === "Holiday Home"}
            onChange={(e) => {
              let temp = { ...propertyUsage };
              e.target.checked
                ? (temp.data[1] = "Holiday Home")
                : temp.data.splice(1, 1);
              setPropertyUsage(temp);
              // console.log(propertyUsage);
            }}
          />
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "bold",
              fontFamily: "outfit",
            }}
          >
            Holiday Home
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Checkbox
            checked={!checkOtherToggle[0]}
            onChange={(e) => {
              let temp = [...checkOtherToggle];
              let temp1 = { ...propertyUsage };
              if (e.target.checked) {
                temp[0] = false;
              } else {
                temp[0] = true;
                temp1.other = "";
                setPropertyUsage(temp1);
              }
              setCheckOtherToggle(temp);
              //  console.log(propertyUsage);
            }}
          />
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "bold",
              fontFamily: "outfit",
            }}
          >
            Other
          </Typography>
        </Box>
        <StyledTextField
          type="text"
          disabled={checkOtherToggle[0]}
          value={propertyUsage.other}
          placeholder="If other, please state"
          onChange={(e) => {
            let temp = { ...propertyUsage };
            temp.other = e.target.value;
            setPropertyUsage(temp);
          }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "bold",
          fontFamily: "outfit",
        }}
      >
        Number of Adult Occupants
      </Typography>
      <StyledTextField
        select
        sx={{ width: "30%", marginTop: "20px", marginBottom: "30px" }}
        value={selectedAdultOccupants}
        onChange={(e) => {
          setSelectedAdultOccupants(e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        IconComponent={() =>
          focused ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
        }
      >
        <MenuItem value="1">1 Adult</MenuItem>
        <MenuItem value="2">2 Adult</MenuItem>
        <MenuItem value="3">3 Adult</MenuItem>
        <MenuItem value="4">4 Adult</MenuItem>
        <MenuItem value="5">5 Adult</MenuItem>
        <MenuItem value="More than 5">More than 5</MenuItem>
      </StyledTextField>

      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "bold",
          fontFamily: "outfit",
        }}
      >
        Number of Children (under 14) Occupants
      </Typography>
      <StyledTextField
        select
        sx={{ width: "30%", marginTop: "20px", marginBottom: "30px" }}
        value={selectedChildOccupants}
        onChange={(e) => {
          setSelectedChildOccupants(e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        IconComponent={() =>
          focused ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
        }
      >
        <MenuItem value="1">1 Child</MenuItem>
        <MenuItem value="2">2 Child</MenuItem>
        <MenuItem value="3">3 Child</MenuItem>
        <MenuItem value="4">4 Child</MenuItem>
        <MenuItem value="5">5 Child</MenuItem>
        <MenuItem value="More than 5">More than 5</MenuItem>
      </StyledTextField>
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "bold",
          fontFamily: "outfit",
        }}
      >
        Number of Typical Occupants per Bedroom (average)
      </Typography>
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "300",
          fontFamily: "outfit",
          color: "#767676",
        }}
      >
        Its an average/guess hence the half people numbers
      </Typography>
      <StyledTextField
        select
        sx={{ width: "30%", marginTop: "20px", marginBottom: "30px" }}
        value={selectedNoPerBedroom}
        onChange={(e) => {
          setSelectedNoPerBedroom(e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        IconComponent={() =>
          focused ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
        }
      >
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="1.5">1.5</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="2.5">2.5</MenuItem>
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="More than 3">More than 3</MenuItem>
      </StyledTextField>
      <Typography
        sx={{
          marginTop: "53px",
          marginBottom: "20px",
          fontSize: "22px",
          fontWeight: "bold",
          lineHeight: "normal",
          fontFamily: "Outfit",
          letterSpacing: "0.03px",
        }}
      >
        Number of Guests in winter
      </Typography>
      <StyledTextField
        select
        sx={{ width: "30%", marginTop: "20px", marginBottom: "30px" }}
        value={selectedGuestInWinter}
        onChange={(e) => {
          setSelectedGuestInWinter(e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        IconComponent={() =>
          focused ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
        }
      >
        <MenuItem value="0">0</MenuItem>
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="1.5">1.5</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="2.5">2.5</MenuItem>
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="More than 3">More than 3</MenuItem>
        <MenuItem value="Not sure">Other</MenuItem>
      </StyledTextField>
      <Typography
        sx={{
          fontSize: "22px",
          marginBottom: "20px",
          fontWeight: "bold",
          lineHeight: "normal",
          fontFamily: "Outfit",
          letterSpacing: "0.03px",
        }}
      >
        How important is hot water for you?
      </Typography>
      <Box
        sx={{
          width: "100%",
          background: "#fafafa",
          borderRadius: "20px",
          paddingBottom: "30px",
          paddingTop: "15px",
          marginBottom: "30px",
        }}
      >
        <FormControl
          sx={{
            width: "100%",
            padding: "12px 100px 10px 100px",
          }}
        >
          <RadioGroup
            sx={{ justifyContent: "space-evenly" }}
            row
            aria-labelledby="demo-form-control-label-placement"
            name="position"
            // defaultValue={questions.hotwater_importance}
          >
            <FormControlLabel
              sx={{}}
              value={1}
              control={
                <Radio
                  checked={questions.hotwater_importance === 1}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.hotwater_importance = 1;
                    setQuestions(temp);
                  }}
                />
              }
              label="1"
              FormControlLabelProps={{
                style: { fontSize: "22px", fontWeight: "bold" },
              }}
              labelPlacement="top"
            />
            <FormControlLabel
              value={2}
              control={
                <Radio
                  checked={questions.hotwater_importance === 2}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.hotwater_importance = 2;
                    setQuestions(temp);
                  }}
                />
              }
              label="2"
              labelPlacement="top"
            />
            <FormControlLabel
              value={3}
              control={
                <Radio
                  checked={questions.hotwater_importance === 3}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.hotwater_importance = 3;
                    setQuestions(temp);
                  }}
                />
              }
              label="3"
              labelPlacement="top"
            />
            <FormControlLabel
              value={4}
              control={
                <Radio
                  checked={questions.hotwater_importance === 4}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.hotwater_importance = 4;
                    setQuestions(temp);
                  }}
                />
              }
              label="4"
              labelPlacement="top"
            />
            <FormControlLabel
              value={5}
              control={
                <Radio
                  checked={questions.hotwater_importance === 5}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.hotwater_importance = 5;
                    setQuestions(temp);
                  }}
                />
              }
              label="5"
              labelPlacement="top"
            />
            <FormControlLabel
              value={6}
              control={
                <Radio
                  checked={questions.hotwater_importance === 6}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.hotwater_importance = 6;
                    setQuestions(temp);
                  }}
                />
              }
              label="6"
              labelPlacement="top"
            />
            <FormControlLabel
              value={7}
              control={
                <Radio
                  checked={questions.hotwater_importance === 7}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.hotwater_importance = 7;
                    setQuestions(temp);
                  }}
                />
              }
              label="7"
              labelPlacement="top"
            />
            <FormControlLabel
              value={8}
              control={
                <Radio
                  checked={questions.hotwater_importance === 8}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.hotwater_importance = 8;
                    setQuestions(temp);
                  }}
                />
              }
              label="8"
              labelPlacement="top"
            />
            <FormControlLabel
              value={9}
              control={
                <Radio
                  checked={questions.hotwater_importance === 9}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.hotwater_importance = 9;
                    setQuestions(temp);
                  }}
                />
              }
              label="9"
              labelPlacement="top"
            />
            <FormControlLabel
              value={10}
              control={
                <Radio
                  checked={questions.hotwater_importance === 10}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.hotwater_importance = 10;
                    setQuestions(temp);
                  }}
                />
              }
              label="10"
              labelPlacement="top"
            />
          </RadioGroup>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "space-between",
            paddingLeft: "23px",
            paddingRight: "15px",
          }}
        >
          <Box sx={{ width: "33%", textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: "500",
                fontFamily: "Outfit",
                lineHeight: "normal",
                letterSpacing: "0.03px",
                color: "#767676",
              }}
            >
              Low Priority/Can wait for hot water to recharge between use/Few
              guests
            </Typography>
          </Box>
          <Box sx={{ width: "32%", textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: "500",
                fontFamily: "Outfit",
                lineHeight: "normal",
                letterSpacing: "0.03px",
                color: "#767676",
              }}
            >
              High Priority/Must have hot water quickly/Lots of guests
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "bold",
          fontFamily: "Outfit",
        }}
      >
        High Energy Equipment
      </Typography>
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
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "bold",
          lineHeight: "normal",
          fontFamily: "Outfit",
          letterSpacing: "0.03px",
        }}
      >
        Would you say you have a lower or higher use for heating than the UK
        average?
      </Typography>
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "300",
          lineHeight: "normal",
          fontFamily: "Outfit",
          letterSpacing: "0.03px",
          color: "#767676",
          marginBottom: "20px",
        }}
      >
        You may consider elderly people etc may need the heating on more and at
        higher temperatures
      </Typography>
      <Box
        sx={{
          width: "100%",
          background: "#fafafa",
          borderRadius: "20px",
          paddingBottom: "30px",
          paddingTop: "15px",
          marginBottom: "30px",
        }}
      >
        <FormControl
          sx={{
            width: "100%",
            padding: "12px 100px 10px 100px",
          }}
        >
          <RadioGroup
            sx={{ justifyContent: "space-evenly" }}
            row
            aria-labelledby="demo-form-control-label-placement"
            name="position"
            // defaultValue={questions.heating_then_uk_average}
          >
            <FormControlLabel
              sx={{}}
              value={1}
              control={
                <Radio
                  checked={questions.heating_then_uk_average === 1}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.heating_then_uk_average = 1;
                    setQuestions(temp);
                  }}
                />
              }
              label="1"
              FormControlLabelProps={{
                style: { fontSize: "22px", fontWeight: "bold" },
              }}
              labelPlacement="top"
            />
            <FormControlLabel
              value={2}
              control={
                <Radio
                  checked={questions.heating_then_uk_average === 2}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.heating_then_uk_average = 2;
                    setQuestions(temp);
                  }}
                />
              }
              label="2"
              labelPlacement="top"
            />
            <FormControlLabel
              value={3}
              control={
                <Radio
                  checked={questions.heating_then_uk_average === 3}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.heating_then_uk_average = 3;
                    setQuestions(temp);
                  }}
                />
              }
              label="3"
              labelPlacement="top"
            />
            <FormControlLabel
              value={4}
              control={
                <Radio
                  checked={questions.heating_then_uk_average === 4}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.heating_then_uk_average = 4;
                    setQuestions(temp);
                  }}
                />
              }
              label="4"
              labelPlacement="top"
            />
            <FormControlLabel
              value={5}
              control={
                <Radio
                  checked={questions.heating_then_uk_average === 5}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.heating_then_uk_average = 5;
                    setQuestions(temp);
                  }}
                />
              }
              label="5"
              labelPlacement="top"
            />
            <FormControlLabel
              value={6}
              control={
                <Radio
                  checked={questions.heating_then_uk_average === 6}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.heating_then_uk_average = 6;
                    setQuestions(temp);
                  }}
                />
              }
              label="6"
              labelPlacement="top"
            />
            <FormControlLabel
              value={7}
              control={
                <Radio
                  checked={questions.heating_then_uk_average === 7}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.heating_then_uk_average = 7;
                    setQuestions(temp);
                  }}
                />
              }
              label="7"
              labelPlacement="top"
            />
            <FormControlLabel
              value={8}
              control={
                <Radio
                  checked={questions.heating_then_uk_average === 8}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.heating_then_uk_average = 8;
                    setQuestions(temp);
                  }}
                />
              }
              label="8"
              labelPlacement="top"
            />
            <FormControlLabel
              value={9}
              control={
                <Radio
                  checked={questions.heating_then_uk_average === 9}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.heating_then_uk_average = 9;
                    setQuestions(temp);
                  }}
                />
              }
              label="9"
              labelPlacement="top"
            />
            <FormControlLabel
              value={10}
              control={
                <Radio
                  checked={questions.heating_then_uk_average === 10}
                  onChange={() => {
                    let temp = { ...questions };
                    temp.heating_then_uk_average = 10;
                    setQuestions(temp);
                  }}
                />
              }
              label="10"
              labelPlacement="top"
            />
          </RadioGroup>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "space-between",
            paddingLeft: "23px",
            paddingRight: "15px",
          }}
        >
          <Box sx={{ width: "33%", textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: "500",
                fontFamily: "Outfit",
                lineHeight: "normal",
                letterSpacing: "0.03px",
                color: "#767676",
              }}
            >
              Lowest/never put the heating on, just use a jumper!
            </Typography>
          </Box>
          <Box sx={{ width: "32%", textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: "500",
                fontFamily: "Outfit",
                lineHeight: "normal",
                letterSpacing: "0.03px",
                color: "#767676",
              }}
            >
              Yes/must have house warm at all times
            </Typography>
          </Box>
        </Box>
      </Box>
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

export default Occupancy;
