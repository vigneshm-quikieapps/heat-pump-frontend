import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { useParams } from "react-router";
import { Typography, AccordionSummary, AccordionDetails } from "@mui/material";
import {
  Card,
  Accordion,
  ImgIcon,
  Grid,
  TextField,
  Checkbox,
} from "../../../common";
// import "./ViewQuote.css";
import Photos from "../ManageQuoteRequest/Photos";
import FourthStep from "../../After Customer Login/GetAQuote/FourthStep/FourthStep";
import DropdownIcon from "../../../Img/icon dropdown.png";
import { getQuote, UpdateJob } from "../../../services/services";
import { FirstPageAction } from "../../../Redux/FirstPage/FirstPage.action";
import { connect } from "react-redux";
import StyledTextField from "../../../common/textfield";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";

import Occupancy from "./Occupancy";
import FabricType from "./FabricType";
import Drawings from "./Drawings";
import RadiatorWindow from "./RadiatorWindow";
import { TailSpin } from "react-loader-spinner";

// const userData = JSON.parse(localStorage.getItem("userData"));
// const userName = userData?.name;
function ManageQuoteRequest({ FirstPageAction }) {
  const { id: quoteId } = useParams();
  const [quoteData, setQuoteData] = useState();
  const [userData1, setUserData1] = useState();
  const [status, setStatus] = useState("");
  const [site_details, setSite_details] = useState({});
  const [loader, setLoader] = useState(true);
  console.log(quoteId);
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
  const [pricing, setPricing] = useState();
  const [isDiscount, setIsDiscount] = useState(false);
  const [other_details, setOther_details] = useState("");
  useEffect(() => {
    FirstPageAction(true);
  }, []);

  useEffect(() => {
    getQuote(quoteId).then((res) => {
      console.log("res", res?.data?.data);
      setQuoteData(res?.data?.data);
    });
  }, [quoteId]);
  useEffect(() => {
    setPricing(quoteData?.pricing);
    setOther_details(quoteData?.other_details);
    setStatus(quoteData?.status);
    setSite_details(quoteData?.site_details);
    setLoader(false);
  }, [quoteData]);

  const updateStatus = (e) => {
    UpdateJob(quoteId, status).then((res) => {
      toast.success("Updated successfully");
    });
  };
  const updatePricing = (e) => {
    UpdateJob(quoteId, { pricing, other_details }).then((res) => {
      toast.success("Updated successfully");
    });
  };
  const updateSite_details = (e) => {
    UpdateJob(quoteId, site_details).then((res) => {
      toast.success("Updated successfully");
    });
  };
  const site_detailsHandler = (e) => {
    let temp = { ...site_details };
    temp[`${e.target.name}`] = e.target.value;
    setSite_details(temp);
  };
  console.log(pricing);
  return (
    <>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <h1 className="get-a-quote">Manage Job Request</h1>
      <hr className="quote" />

      <Card className="mqr">
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
                Status
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
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <MenuItem value="1" style={{ fontWeight: 600 }}>
                    {" "}
                    New-Unpaid{" "}
                  </MenuItem>
                  <MenuItem value="2" style={{ fontWeight: 600 }}>
                    {" "}
                    New-Paid{" "}
                  </MenuItem>
                  <MenuItem value="3" style={{ fontWeight: 600 }}>
                    {" "}
                    In Progress{" "}
                  </MenuItem>
                  <MenuItem value="4" style={{ fontWeight: 600 }}>
                    {" "}
                    Complete{" "}
                  </MenuItem>
                  <MenuItem value="5" style={{ fontWeight: 600 }}>
                    {" "}
                    Snagging{" "}
                  </MenuItem>
                </StyledTextField>
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
                  type="text"
                  variant="outlined"
                  name="address_1"
                  label="Address Line 1"
                  value={site_details?.address_1 || ""}
                  onChange={site_detailsHandler}
                />
                {/*<span className=" rca2inputError input9Error">{input9Error}</span>*/}
                <StyledTextField
                  sx={{ mb: 1.5 }}
                  type="text"
                  name="address_2"
                  label="Address Line 2"
                  variant="outlined"
                  value={site_details?.address_2 || ""}
                  onChange={site_detailsHandler}
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
                  value={site_details?.city || ""}
                  onChange={site_detailsHandler}
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
                  value={site_details?.postcode || ""}
                  onChange={site_detailsHandler}
                />
              </Grid>
              <button
                className="browsebtn"
                style={{ marginLeft: "-5px" }}
                onClick={updateSite_details}
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
              {/* <Occupancy quoteData={quoteData} /> */}
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
              <RadiatorWindow quoteData={quoteData} quoteId={quoteId} />
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
                Pricing
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
                    <Box>
                      <Checkbox
                        disabled={isDiscount}
                        // checked={pricing === 349 && !isDiscount}
                        onChange={(e) => {
                          e.target.checked
                            ? setPricing(pricing + 299)
                            : setPricing(pricing - 299);
                        }}
                      />
                      <Typography
                        sx={{
                          display: "inline-block",
                          fontFamily: "Outfit",
                          width: "30%",
                          mt: 2,
                          ml: 2,
                        }}
                      >
                        Heat Loss Calculation
                      </Typography>
                      <Typography
                        sx={{
                          width: "40px",
                          display: "inline-block",
                          fontFamily: "Outfit",
                          fontWeight: "900",
                          textAlign: "right",
                        }}
                      >
                        £299
                      </Typography>
                    </Box>
                    <Box>
                      <Checkbox
                        disabled={isDiscount}
                        // checked={pricing !== 349 && isDiscount}
                        // defaultChecked={}
                        onChange={(e) => {
                          e.target.checked
                            ? setPricing(pricing + 75)
                            : setPricing(pricing - 75);
                        }}
                      />
                      <Typography
                        sx={{
                          display: "inline-block",
                          fontFamily: "Outfit",
                          width: "30%",
                          mt: 2,
                          ml: 2,
                        }}
                      >
                        Emitter Sizing
                      </Typography>
                      <Typography
                        sx={{
                          width: "40px",

                          display: "inline-block",
                          fontFamily: "Outfit",
                          fontWeight: "900",
                          textAlign: "right",
                        }}
                      >
                        £75
                      </Typography>
                    </Box>
                    <Box>
                      <Checkbox
                        disabled={isDiscount}
                        // checked={pricing !== 349 && isDiscount}
                        // defaultChecked={}
                        onChange={(e) => {
                          e.target.checked
                            ? setPricing(pricing + 10)
                            : setPricing(pricing - 10);
                        }}
                      />
                      <Typography
                        sx={{
                          display: "inline-block",
                          fontFamily: "Outfit",
                          width: "30%",
                          mt: 2,
                          ml: 2,
                        }}
                      >
                        Noise Assessment
                      </Typography>
                      <Typography
                        sx={{
                          width: "40px",

                          display: "inline-block",
                          fontFamily: "Outfit",
                          fontWeight: "900",
                          textAlign: "right",
                        }}
                      >
                        £10
                      </Typography>
                    </Box>
                    <Box>
                      <Checkbox
                        // defaultChecked={}
                        disabled={isDiscount}
                        // checked={pricing !== 349 && isDiscount}
                        onChange={(e) => {
                          e.target.checked
                            ? setPricing(pricing + 10)
                            : setPricing(pricing - 10);
                        }}
                      />
                      <Typography
                        sx={{
                          display: "inline-block",
                          fontFamily: "Outfit",
                          width: "30%",
                          mt: 2,
                          ml: 2,
                        }}
                      >
                        DNO Application
                      </Typography>
                      <Typography
                        sx={{
                          width: "40px",

                          display: "inline-block",
                          fontFamily: "Outfit",
                          fontWeight: "900",
                          textAlign: "right",
                        }}
                      >
                        £10
                      </Typography>
                    </Box>
                    <Box>
                      <Checkbox
                        defaultChecked={
                          quoteData?.pricing === 349 ? true : false
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPricing(349);
                            setIsDiscount(true);
                          } else {
                            setPricing(0);
                            setIsDiscount(false);
                          }
                        }}
                      />
                      <Typography
                        sx={{
                          display: "inline-block",
                          fontFamily: "Outfit",
                          width: "30%",
                          mt: 2,
                          ml: 2,
                        }}
                      >
                        Discount for all 4
                      </Typography>

                      <Typography
                        sx={{
                          width: "40px",

                          display: "inline-block",
                          fontFamily: "Outfit",
                          fontWeight: "900",
                          textAlign: "right",
                        }}
                      >
                        £349
                      </Typography>
                      <Typography
                        sx={{
                          width: "40px",
                          // display: "inline-block",
                          fontFamily: "Outfit",
                          marginLeft: "36%",
                          textAlign: "right",
                          // float: "right",
                        }}
                      >
                        Total
                      </Typography>
                      <hr
                        style={{
                          width: "41%",
                          backgroundColor: "#f2f3f2",
                          border: "0.1vh solid #f2f3f2",
                        }}
                      />
                      <Typography
                        sx={{
                          width: "40px",
                          // display: "inline-block",
                          fontFamily: "Outfit",
                          marginLeft: "36%",
                          fontWeight: "900",
                          textAlign: "right",
                          // float: "right",
                        }}
                      >
                        £{pricing || 0}
                      </Typography>
                    </Box>
                  </div>
                  <div style={{ marginTop: "1.5%" }}>
                    <textarea
                      className="quotetextarea"
                      value={other_details}
                      onChange={(e) => {
                        setOther_details(e.target.value);
                      }}
                      placeholder="Comments"
                    ></textarea>
                  </div>
                </Box>
              </Grid>
              <button className="browsebtn" onClick={updatePricing}>
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
