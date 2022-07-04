import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
// import Checkbox from "../../../../common/checkbox";
import step2ProgressBar from "../../../../Img/step2.png";
import { Box, MenuItem, Table, Typography } from "@mui/material";
import "./SecondStep.css";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { withStyles } from "@material-ui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Card, Checkbox } from "../../../../common";
import TableWeek from "./TableWeek";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import StyledTextField from "../../../../common/textfield";
import { InsertEmoticon } from "@mui/icons-material";
import {
  bookJobAction,
  bookJobReset,
} from "../../../../Redux/bookJob/bookJob.action";
import { connect, useDispatch } from "react-redux";

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
const SecondStep = ({ myProps, bookJobDetails, bookJobAction }) => {
  const [focused, setFocused] = React.useState("");
  const [loader, setLoader] = useState(false);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  const [weeklySlots, setWeeklySlots] = useState({
    "0000 - 0600": Array(2).fill(false),
    "0600 - 0800": Array(2).fill(false),
    "0800 - 1000": Array(2).fill(false),
    "1000 - 1400": Array(2).fill(false),
    "1400 - 1800": Array(2).fill(false),
    "1800 - 2359": Array(2).fill(false),
  });
  const [propertyUsage, setPropertyUsage] = useState({ data: [], other: "" });
  const [checkOtherToggle, setCheckOtherToggle] = useState([true]);
  const [selectedAdultOccupants, setSelectedAdultOccupants] = useState("1");
  const [selectedChildOccupants, setSelectedChildOccupants] = useState("1");
  const [selectedNoPerBedroom, setSelectedNoPerBedroom] = useState(1);
  function createData(name, Weekday, Weekend) {
    return { name, Weekday, Weekend };
  }
  const handleWeeklySlots = (index, slot) => {
    let temp = { ...weeklySlots };
    temp[`${slot}`][index] = !weeklySlots[`${slot}`][index];
    setWeeklySlots(temp);
  };
  // console.log(bookJobDetails);
  useEffect(() => {
    setWeeklySlots(bookJobDetails?.occupancy?.weekly);
    setPropertyUsage(bookJobDetails?.occupancy?.property_usage);
    setSelectedAdultOccupants(
      bookJobDetails?.occupancy?.number_of_adultOccupants
    );
    setSelectedChildOccupants(
      bookJobDetails?.occupancy?.number_of_childrenOccupants
    );
    setSelectedNoPerBedroom(
      bookJobDetails?.occupancy?.number_of_typicalOccupantsPerBedroom
    );
  }, [bookJobDetails]);
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
    <Card>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <div className="step4text1">
        Step 2 of 9
        <img src={step2ProgressBar} className="s4baricon" alt="step 2" />
      </div>

      <Typography
        style={{
          fontSize: "30px",
          fontFamily: "Outfit",
          fontWeight: "600",
          marginTop: "10vh",
        }}
      >
        Occupancy
      </Typography>
      <hr className="s2hr2" />
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
      <Box sx={{ display: "flex" }}>
        <button
          variant="contained"
          className="btn-house btn-icon"
          onClick={() => {
            bookJobAction({
              occupancy: {
                weekly: weeklySlots,
                property_usage: propertyUsage,
                number_of_adultOccupants: selectedAdultOccupants,
                number_of_childrenOccupants: selectedChildOccupants,
                number_of_typicalOccupantsPerBedroom: selectedNoPerBedroom,
              },
            });
            sessionStorage.setItem("customerCheck", true);
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
            myProps.getPayloadData(
              ["occupancy"],
              [
                {
                  weekly: weeklySlots,
                  property_usage: propertyUsage,
                  number_of_adultOccupants: selectedAdultOccupants,
                  number_of_childrenOccupants: selectedChildOccupants,
                  number_of_typicalOccupantsPerBedroom: selectedNoPerBedroom,
                },
              ]
            );
            bookJobAction({
              occupancy: {
                weekly: weeklySlots,
                property_usage: propertyUsage,
                number_of_adultOccupants: selectedAdultOccupants,
                number_of_childrenOccupants: selectedChildOccupants,
                number_of_typicalOccupantsPerBedroom: selectedNoPerBedroom,
              },
            });

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

export default connect(mapStateToProps, mapDispatchToProps)(SecondStep);
