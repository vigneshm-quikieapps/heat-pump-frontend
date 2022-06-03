import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { useParams } from "react-router";
import { Typography, AccordionSummary, AccordionDetails } from "@mui/material";
import { Card, Accordion, ImgIcon, Grid, TextField } from "../../../common";
// import "./ViewQuote.css";
import Photos from "../ManageQuoteRequest/Photos";
import FourthStep from "../../After Customer Login/GetAQuote/FourthStep/FourthStep";
import DropdownIcon from "../../../Img/icon dropdown.png";
import { getQuote } from "../../../services/services";
import { FirstPageAction } from "../../../Redux/FirstPage/FirstPage.action";
import { connect } from "react-redux";
import StyledTextField from "../../../common/textfield";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Occupancy from "./Occupancy";
import FabricType from "./FabricType";
import Drawings from "./Drawings";
import RadiatorWindow from "./RadiatorWindow";

// const userData = JSON.parse(localStorage.getItem("userData"));
// const userName = userData?.name;
function ManageQuoteRequest({ FirstPageAction }) {
  const { id: quoteId } = useParams();
  const [quoteData, setQuoteData] = useState();
  const [userData1, setUserData1] = useState();
  const [proposals, setProposals] = useState({
    status: "2",
    proposal: "",
  });

  const [checkAccordion, setCheckAccordion] = useState({
    acc: false,
    acc1: false,
    acc2: false,
    acc3: false,
    acc4: false,
    acc5: false,
    acc6: false,
    acc7: false,
    acc8: false,
  });
  useEffect(() => {
    FirstPageAction(false);
  }, []);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    userData && setUserData1(userData);
  }, [localStorage.getItem("userData")]);
  useEffect(() => {
    getQuote(quoteId).then((res) => {
      // console.log(res);
      setQuoteData(res?.data?.data);
    });
  }, [quoteId]);
  console.log(quoteData);
  return (
    <>
      <h1 className="get-a-quote">Manage Job Request</h1>
      <hr className="quote" />

      <Card className="mqr">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            ml: 5,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#fa5e00",
                fontSize: "28px",
                fontWeight: "600",
                fontFamily: "Outfit",
              }}
            >
              {userData1?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontFamily: "Outfit",
                fontWeight: "300",
              }}
            >
              {userData1?.business_trade_name}, {userData1?.city}
            </Typography>
          </Box>

          <Box>
            <div
              style={{
                width: " 2px",
                height: " 63px",
                flexGrow: "0",
                margin: "0 80px 5px 80px",
                transform: " rotate(-180deg)",
                backgroundColor: "#e7e7e7",
              }}
            ></div>
          </Box>
          <Box sx={{ width: "50%", display: "flex", flexDirection: "row" }}>
            <Box>
              <Typography className="Output">Job Status</Typography>
              <Typography className="Output">Job Request No.</Typography>
            </Box>
            <Box sx={{ ml: 2.5 }}>
              <Typography className="Output">
                {quoteData?.status == 1
                  ? "New"
                  : quoteData?.status == 2
                  ? "In Progress"
                  : quoteData?.status == 3
                  ? "Approved"
                  : quoteData?.status == 5
                  ? "Rejected"
                  : quoteData?.status == 6
                  ? "Inactive"
                  : "New"}
              </Typography>
              <Typography className="Output">
                {quoteData?.quote_reference_number}
              </Typography>
            </Box>
          </Box>
        </Box>
        <div className="Rectangle-31"></div>
        <Box>
          <Accordion
            expanded={checkAccordion.acc}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc = !temp.acc;
              temp.acc1 = false;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              setCheckAccordion({ ...temp });
            }}
          >
            <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
              <Typography
                sx={{
                  fontSize: "25px !important",
                  fontWeight: "900 !important",
                  fontFamily: "Outfit !important",
                }}
              >
                Proposal
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  // alignItems: "center",
                  gap: "100px",
                }}
              >
                <StyledTextField
                  select
                  sx={{ width: "210px", height: "63px", mt: 3 }}
                  value={proposals?.status}
                  onChange={(e) => {
                    let temp = { ...proposals };
                    temp.status = e.target.value;
                    setProposals(temp);
                  }}
                  // onFocus={() => setFocused(true)}
                  // onBlur={() => setFocused(false)}
                  // label="Status"
                  // IconComponent={() =>
                  //   focused ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                  // }
                >
                  <MenuItem value="1" style={{ fontWeight: 600 }}>
                    {" "}
                    New{" "}
                  </MenuItem>
                  <MenuItem value="2" style={{ fontWeight: 600 }}>
                    {" "}
                    Inprogress{" "}
                  </MenuItem>
                  <MenuItem value="3" style={{ fontWeight: 600 }}>
                    {" "}
                    Active{" "}
                  </MenuItem>
                  {/* <MenuItem value="0" style={{ fontWeight: 600 }}>
                {" "}
                All{" "}
              </MenuItem> */}
                </StyledTextField>
                <button
                  variant="contained"
                  className="btn-house btn-icon"
                  // onClick={props.prev()}
                >
                  {/* <span style={{ height: "27px", width: "27px" }}>
                  <img src={require("../../../Img/icon attach.png")} />
                </span> */}
                  <span>Upload Proposal</span>
                </button>
              </Box>
              <button
                className="browsebtn"
                onClick={() => {
                  // setIsSavedStatus(true);
                  // createUpdateFabric();
                }}
              >
                Save
              </button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc1}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc = false;
              temp.acc1 = !temp.acc1;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              setCheckAccordion({ ...temp });
            }}
          >
            <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
              <Typography
                sx={{
                  fontSize: "25px !important",
                  fontWeight: "900 !important",
                  fontFamily: "Outfit !important",
                }}
              >
                Site Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Grid
                sx={{ width: "70%", mb: 6 }}
                gridTemplateColumns="repeat(1, 1fr)"
                columnGap="10px"
                columnCount={2}
              >
                <StyledTextField
                  sx={{ mb: 1.5 }}
                  // required
                  // error={customerDetails.address_1 === "" ? true : false}
                  type="text"
                  variant="outlined"
                  // value={customerDetails.address_1}
                  // onChange={changeHandler}
                  name="address_1"
                  label="Address Line 1"
                  // placeholder={checked === false ? "Address line 1*" : ""}
                  // disabled={checked == false ? true : false}
                  // helperText={
                  //   checked &&
                  //   customerDetails.address_1 === "" &&
                  //   "Address Line 1 in mandatory"
                  // }
                />
                {/*<span className=" rca2inputError input9Error">{input9Error}</span>*/}
                <StyledTextField
                  sx={{ mb: 1.5 }}
                  // className="step1inputfields input2"

                  type="text"
                  // value={customerDetails.address_2}
                  // onChange={changeHandler}
                  name="address_2"
                  label="Address Line 2"
                  variant="outlined"
                  // placeholder={checked === false ? "Address line 2" : ""}
                  // disabled={checked === false ? true : false}
                />
                <StyledTextField
                  sx={{ mb: 1.5 }}
                  // required
                  // className="step1inputfields input2"
                  // error={customerDetails.city === "" ? true : false}
                  type="text"
                  // value={customerDetails.city}
                  // onChange={changeHandler}
                  name="city"
                  label="City/Town"
                  variant="outlined"
                  // placeholder={checked === false ? "City/Town*" : ""}
                  // disabled={checked === false ? true : false}
                  // helperText={
                  //   checked &&
                  //   customerDetails.city === "" &&
                  //   "City/Country in mandatory"
                  // }
                />
                <StyledTextField
                  sx={{ mb: 1.5 }}
                  // required
                  // error={customerDetails.postcode === "" ? true : false}
                  // value={customerDetails.postcode}
                  type="text"
                  // onChange={changeHandler}
                  name="postcode"
                  label="Postcode"
                  variant="outlined"
                  // placeholder={checked === false ? "PostCode*" : ""}
                  // disabled={checked === false ? true : false}
                  // helperText={
                  //   checked &&
                  //   customerDetails.postcode === "" &&
                  //   "Postcode in mandatory"
                  // }
                />
              </Grid>
              <button
                className="browsebtn"
                onClick={() => {
                  // setIsSavedStatus(true);
                  // createUpdateFabric();
                }}
              >
                Save
              </button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc2}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc = false;
              temp.acc2 = !temp.acc2;
              temp.acc1 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              setCheckAccordion({ ...temp });
            }}
          >
            <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
              <Typography
                sx={{
                  fontSize: "25px !important",
                  fontWeight: "900 !important",
                  fontFamily: "Outfit !important",
                }}
              >
                Occupancy
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Occupancy />
              <div>
                <button
                  className="browsebtn"
                  onClick={() => {
                    // setIsSavedStatus(true);
                    // createUpdateFabric();
                  }}
                >
                  Save
                </button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc3}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc3 = !temp.acc3;
              temp.acc = false;
              temp.acc2 = false;
              temp.acc1 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              setCheckAccordion({ ...temp });
            }}
          >
            <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
              <Typography
                sx={{
                  fontSize: "25px !important",
                  fontWeight: "900 !important",
                  fontFamily: "Outfit !important",
                }}
              >
                Fabric Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <FabricType />
              <button
                className="browsebtn"
                onClick={() => {
                  // setIsSavedStatus(true);
                  // createUpdateFabric();
                }}
              >
                Save
              </button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc4}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc4 = !temp.acc4;
              temp.acc = false;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc1 = false;
              temp.acc5 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              setCheckAccordion({ ...temp });
            }}
          >
            <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
              <Typography
                sx={{
                  fontSize: "25px !important",
                  fontWeight: "900 !important",
                  fontFamily: "Outfit !important",
                }}
              >
                Drawings
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Drawings />

              <button
                className="browsebtn"
                onClick={() => {
                  // setIsSavedStatus(true);
                  // createUpdateFabric();
                }}
              >
                Save
              </button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc5}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc5 = !temp.acc5;
              temp.acc = false;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc1 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              setCheckAccordion({ ...temp });
            }}
          >
            <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
              <Typography
                sx={{
                  fontSize: "25px !important",
                  fontWeight: "900 !important",
                  fontFamily: "Outfit !important",
                }}
              >
                Photos
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              {/* <FourthStep /> */}
              <Photos />
              {/* <Grid
                gridTemplateColumns="repeat(1, 1fr)"
                columnGap="10px"
                columnCount={2}
              ></Grid> */}
              {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box>
                  <Typography className="Output Heading">Walls</Typography>
                  <Box>
                    {quoteData?.photos?.walls.map((item, index) => (
                      <div
                        className="file1"
                        style={{ borderRadius: "1.9vw" }}
                        key={index}
                      >
                        <span style={{ float: "left", marginLeft: "1vw" }}>
                          <img
                            src={require("../../../Img/attachIcon.png")}
                            style={{
                              height: "2.8vh",
                              width: "1vw",
                            }}
                          />

                          <span className="fileName">{item}</span>
                        </span>
                      </div>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography className="Output Heading">Roof</Typography>
                  <Box>
                    {quoteData?.photos?.roof.map((item, index) => (
                      <div
                        className="file1"
                        style={{ borderRadius: "1.9vw" }}
                        key={index}
                      >
                        <span style={{ float: "left", marginLeft: "1vw" }}>
                          <img
                            src={require("../../../Img/attachIcon.png")}
                            style={{
                              height: "2.8vh",
                              width: "1vw",
                            }}
                          />

                          <span className="fileName">{item}</span>
                        </span>
                      </div>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography className="Output Heading">Windows</Typography>
                  <Box>
                    {quoteData?.photos?.windows.map((item, index) => (
                      <div
                        className="file1"
                        style={{ borderRadius: "1.9vw" }}
                        key={index}
                      >
                        <span style={{ float: "left", marginLeft: "1vw" }}>
                          <img
                            src={require("../../../Img/attachIcon.png")}
                            style={{
                              height: "2.8vh",
                              width: "1vw",
                            }}
                          />

                          <span className="fileName">{item}</span>
                        </span>
                      </div>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography className="Output Heading">
                    Existing Boiler
                  </Typography>
                  <Box>
                    {quoteData?.photos?.existing_boiler.map((item, index) => (
                      <div
                        className="file1"
                        style={{ borderRadius: "1.9vw" }}
                        key={index}
                      >
                        <span style={{ float: "left", marginLeft: "1vw" }}>
                          <img
                            src={require("../../../Img/attachIcon.png")}
                            style={{
                              height: "2.8vh",
                              width: "1vw",
                            }}
                          />

                          <span className="fileName">{item}</span>
                        </span>
                      </div>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography className="Output Heading">
                    Existing Radiator
                  </Typography>
                  <Box>
                    {quoteData?.photos?.existing_radiator.map((item, index) => (
                      <div
                        className="file1"
                        style={{ borderRadius: "1.9vw" }}
                        key={index}
                      >
                        <span style={{ float: "left", marginLeft: "1vw" }}>
                          <img
                            src={require("../../../Img/attachIcon.png")}
                            style={{
                              height: "2.8vh",
                              width: "1vw",
                            }}
                          />

                          <span className="fileName">{item}</span>
                        </span>
                      </div>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography className="Output Heading">Pipework</Typography>
                  <Box>
                    {quoteData?.photos?.pipework.map((item, index) => (
                      <div
                        className="file1"
                        style={{ borderRadius: "1.9vw" }}
                        key={index}
                      >
                        <span style={{ float: "left", marginLeft: "1vw" }}>
                          <img
                            src={require("../../../Img/attachIcon.png")}
                            style={{
                              height: "2.8vh",
                              width: "1vw",
                            }}
                          />

                          <span className="fileName">{item}</span>
                        </span>
                      </div>
                    ))}
                  </Box>
                </Box>
              </Box> */}
              <button
                className="browsebtn"
                onClick={() => {
                  // setIsSavedStatus(true);
                  // createUpdateFabric();
                }}
              >
                Save
              </button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc6}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc6 = !temp.acc6;
              temp.acc = false;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc1 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              setCheckAccordion({ ...temp });
            }}
          >
            <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
              <Typography
                sx={{
                  fontSize: "25px !important",
                  fontWeight: "900 !important",
                  fontFamily: "Outfit !important",
                }}
              >
                Heating System &#38; Current Bills{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              {/* <Grid
                gridTemplateColumns="repeat(1, 1fr)"
                columnGap="10px"
                columnCount={3}
                rowGap="20px"
              > */}
              <div style={{ marginBottom: "6%" }}>
                <div style={{ marginTop: "2.5%" }}>
                  <StyledTextField
                    select
                    sx={{ width: "20%" }}
                    value={"Gas"}
                    // onChange={(e) => {
                    //   setPriority(e.target.value);
                    //   setPriorityValue(heatValue[e.target.value]);
                    // }}
                    // onFocus={() => setFocused(true)}
                    // onBlur={() => setFocused(false)}
                    // IconComponent={() =>
                    //   focused ? (
                    //     <KeyboardArrowUpIcon />
                    //   ) : (
                    //     <KeyboardArrowDownIcon />
                    //   )
                    // }
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
                      fontSize: "22px",
                      fontFamily: "Outfit",
                      fontWeight: "300",
                      marginTop: "2%",
                      color: "#fa5e00",
                    }}
                  >
                    Gas Annual Usage
                  </Typography>

                  <Typography sx={{ marginTop: "2vh" }}>
                    <TextField
                      sx={{ width: "30%" }}
                      label={`Amount of Gas (kWh)`}
                      // value={currnetBills?.amount_of_gas}
                      // onChange={(e) => {
                      //   let temp = currnetBills;
                      //   temp["amount_of_gas"] = e.target.value;
                      //   setCurrentBills(temp);
                      // }}
                    />
                  </Typography>
                  <h3
                    style={{
                      fontSize: "22px",
                      fontFamily: "Outfit",
                      fontWeight: "300",
                      marginTop: "2%",
                      color: "#fa5e00",
                    }}
                  >
                    Gas Annual Spend
                  </h3>

                  <Typography sx={{ marginTop: "2vh" }}>
                    <TextField
                      sx={{ width: "30%" }}
                      label={`Cost of Gas (£)`}
                      // value={currnetBills?.cost_of_gas}
                      // onChange={(e) => {
                      //   let temp = currnetBills;
                      //   temp["cost_of_gas"] = e.target.value;
                      //   setCurrentBills(temp);
                      // }}
                    />
                  </Typography>
                </div>
              </div>
              {/* </Grid> */}
              <button
                className="browsebtn"
                onClick={() => {
                  // setIsSavedStatus(true);
                  // createUpdateFabric();
                }}
              >
                Save
              </button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc7}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc7 = !temp.acc7;
              temp.acc = false;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc6 = false;
              temp.acc1 = false;
              temp.acc8 = false;
              setCheckAccordion({ ...temp });
            }}
          >
            <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
              <Typography
                sx={{
                  fontSize: "25px !important",
                  fontWeight: "900 !important",
                  fontFamily: "Outfit !important",
                }}
              >
                Radiator and Window Sizes
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <RadiatorWindow />
              <div style={{ marginTop: "6%" }}>
                <button
                  className="browsebtn"
                  onClick={() => {
                    // setIsSavedStatus(true);
                    // createUpdateFabric();
                  }}
                >
                  Save
                </button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc8}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc8 = !temp.acc8;
              temp.acc = false;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc1 = false;
              setCheckAccordion({ ...temp });
            }}
          >
            <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
              <Typography
                sx={{
                  fontSize: "25px !important",
                  fontWeight: "900 !important",
                  fontFamily: "Outfit !important",
                }}
              >
                Any Other Comments
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Grid
                sx={{ mb: 6 }}
                gridTemplateColumns="repeat(1, 1fr)"
                columnGap="10px"
                columnCount={2}
              >
                <Box>
                  <div style={{ marginTop: "1.5%" }}>
                    <textarea
                      className="quotetextarea"
                      // value={text}
                      // onChange={(e) => {
                      //   setText(e.target.value);
                      // }}
                      placeholder="Comments"
                    ></textarea>
                  </div>
                </Box>
              </Grid>
              <button
                className="browsebtn"
                onClick={() => {
                  // setIsSavedStatus(true);
                  // createUpdateFabric();
                }}
              >
                Save
              </button>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Card>
    </>
  );
}
const mapDispatchtoProps = (dispatch) => ({
  FirstPageAction: (value) => dispatch(FirstPageAction(value)),
});

export default connect(null, mapDispatchtoProps)(ManageQuoteRequest);
// export default ManageQuoteRequest;
