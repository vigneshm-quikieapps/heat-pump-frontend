import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { useParams } from "react-router";
import { Typography, AccordionSummary, AccordionDetails } from "@mui/material";
import { Card, Accordion, ImgIcon, Grid } from "../../../common";
import "./ViewQuote.css";
import DropdownIcon from "../../../Img/icon dropdown.png";
import { getQuote } from "../../../services/services";
import { FirstPageAction } from "../../../Redux/FirstPage/FirstPage.action";
import { connect } from "react-redux";
import { TailSpin } from "react-loader-spinner";

// const userData = JSON.parse(localStorage.getItem("userData"));
// const userName = userData?.name;
function ViewQuote({ FirstPageAction }) {
  const { id: quoteId } = useParams();
  const [quoteData, setQuoteData] = useState();
  const [userData1, setUserData1] = useState();
  const [loader, setLoader] = useState(true);

  const [checkAccordion, setCheckAccordion] = useState({
    acc1: false,
    acc2: false,
    acc3: false,
    acc4: false,
    acc5: false,
    acc6: false,
    acc7: false,
    acc8: false,
    acc9: false,
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
      setLoader(false);
    });
  }, [quoteId]);
  console.log(quoteData);

  return (
    <>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <h1 className="get-a-quote">View Job</h1>
      <hr className="quote" />

      <Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            ml: 5,
          }}
        >
          <Box>
            <Typography
              style={{
                color: "#fa5e00",
                fontSize: "28px",
                fontWeight: "600",
                fontFamily: "Outfit",
              }}
            >
              {userData1?.name}
            </Typography>
            <Typography
              style={{
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
                  ? "New-Unpaid"
                  : quoteData?.status == 2
                  ? "New-Paid"
                  : quoteData?.status == 3
                  ? "In Progress"
                  : quoteData?.status == 4
                  ? "Complete"
                  : quoteData?.status == 5
                  ? "Snagging"
                  : "-"}
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
            expanded={checkAccordion.acc1}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc1 = !temp.acc1;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              temp.acc9 = false;

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
                gridTemplateColumns="repeat(1, 1fr)"
                columnGap="10px"
                columnCount={2}
              >
                <Box>
                  <Typography className="Output">Address Line 1</Typography>
                  <Typography className="Output2">
                    {quoteData?.site_details?.address_1}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="Output">Address Line 2</Typography>
                  <Typography className="Output2">
                    {quoteData?.site_details?.address_2}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="Output">Town/City</Typography>
                  <Typography className="Output2">
                    {quoteData?.site_details?.city}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="Output">Postcode</Typography>
                  <Typography className="Output2">
                    {quoteData?.site_details?.postcode}
                  </Typography>
                </Box>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc2}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc2 = !temp.acc2;
              temp.acc1 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              temp.acc9 = false;

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
              <Grid
                gridTemplateColumns="repeat(1, 1fr)"
                columnGap="10px"
                columnCount={2}
                rowGap="20px"
              >
                <Box>
                  <Typography className="Output">
                    Time(Weekly) occupied
                  </Typography>

                  <Typography className="Output2">
                    0000 - 0600 &#40;
                    {quoteData?.occupancy?.weekly["0000 - 0600"][0] === 1 &&
                      "Weekday"}
                    {quoteData?.occupancy?.weekly["0000 - 0600"][0] === 1 &&
                      quoteData?.occupancy?.weekly["0000 - 0600"][1] === 1 &&
                      ","}
                    {quoteData?.occupancy?.weekly["0000 - 0600"][1] === 1 &&
                      "Weekend"}
                    {quoteData?.occupancy?.weekly["0000 - 0600"][0] === 0 &&
                      quoteData?.occupancy?.weekly["0000 - 0600"][1] === 0 &&
                      "NA"}
                    &#41;
                  </Typography>

                  <Typography className="Output2">
                    0600 - 0800 &#40;
                    {quoteData?.occupancy?.weekly["0600 - 0800"][0] === 1 &&
                      "Weekday"}
                    {quoteData?.occupancy?.weekly["0600 - 0800"][0] === 1 &&
                      quoteData?.occupancy?.weekly["0600 - 0800"][1] === 1 &&
                      ","}
                    {quoteData?.occupancy?.weekly["0600 - 0800"][1] === 1 &&
                      "Weekend"}
                    {quoteData?.occupancy?.weekly["0600 - 0800"][0] === 0 &&
                      quoteData?.occupancy?.weekly["0600 - 0800"][1] === 0 &&
                      "NA"}
                    &#41;
                  </Typography>

                  <Typography className="Output2">
                    0800 - 1000 &#40;
                    {quoteData?.occupancy?.weekly["0800 - 1000"][0] === 1 &&
                      "Weekday"}
                    {quoteData?.occupancy?.weekly["0800 - 1000"][0] === 1 &&
                      quoteData?.occupancy?.weekly["0800 - 1000"][1] === 1 &&
                      ","}
                    {quoteData?.occupancy?.weekly["0800 - 1000"][1] === 1 &&
                      "Weekend"}
                    {quoteData?.occupancy?.weekly["0800 - 1000"][0] === 0 &&
                      quoteData?.occupancy?.weekly["0800 - 1000"][1] === 0 &&
                      "NA"}
                    &#41;
                  </Typography>

                  <Typography className="Output2">
                    1000 - 1400 &#40;
                    {quoteData?.occupancy?.weekly["1000 - 1400"][0] === 1 &&
                      "Weekday"}
                    {quoteData?.occupancy?.weekly["1000 - 1400"][0] === 1 &&
                      quoteData?.occupancy?.weekly["1000 - 1400"][1] === 1 &&
                      ","}
                    {quoteData?.occupancy?.weekly["1000 - 1400"][1] === 1 &&
                      "Weekend"}
                    {quoteData?.occupancy?.weekly["1000 - 1400"][0] === 0 &&
                      quoteData?.occupancy?.weekly["1000 - 1400"][1] === 0 &&
                      "NA"}
                    &#41;
                  </Typography>

                  <Typography className="Output2">
                    1400 - 1800 &#40;
                    {quoteData?.occupancy?.weekly["1400 - 1800"][0] === 1 &&
                      "Weekday"}
                    {quoteData?.occupancy?.weekly["1400 - 1800"][0] === 1 &&
                      quoteData?.occupancy?.weekly["1400 - 1800"][1] === 1 &&
                      ","}
                    {quoteData?.occupancy?.weekly["1400 - 1800"][1] === 1 &&
                      "Weekend"}
                    {quoteData?.occupancy?.weekly["1400 - 1800"][0] === 0 &&
                      quoteData?.occupancy?.weekly["1400 - 1800"][1] === 0 &&
                      "NA"}
                    &#41;
                  </Typography>

                  <Typography className="Output2">
                    1800 - 2359 &#40;
                    {quoteData?.occupancy?.weekly["1800 - 2359"][0] === 1 &&
                      "Weekday"}
                    {quoteData?.occupancy?.weekly["1800 - 2359"][0] === 1 &&
                      quoteData?.occupancy?.weekly["1800 - 2359"][1] === 1 &&
                      ","}
                    {quoteData?.occupancy?.weekly["1800 - 2359"][1] === 1 &&
                      "Weekend"}
                    {quoteData?.occupancy?.weekly["1800 - 2359"][0] === 0 &&
                      quoteData?.occupancy?.weekly["1800 - 2359"][1] === 0 &&
                      "NA"}
                    &#41;
                  </Typography>
                </Box>
                <Box>
                  <Typography className="Output">Property Usage</Typography>

                  {quoteData?.occupancy?.property_usage?.data.map((item) => (
                    <Typography className="Output2">{item}</Typography>
                  ))}
                  <Typography className="Output2">
                    {quoteData?.occupancy?.property_usage?.other || ""}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    Number of adults occupants
                  </Typography>
                  <Typography className="Output2">
                    {quoteData?.occupancy?.number_of_adultOccupants}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    Number of children(under 14) occupants
                  </Typography>
                  <Typography className="Output2">
                    {quoteData?.occupancy?.number_of_childrenOccupants}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    Number of typical occupants per bedroom
                  </Typography>
                  <Typography className="Output2">
                    {quoteData?.occupancy?.number_of_typicalOccupantsPerBedroom}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    Number of guests in winter
                  </Typography>
                  <Typography className="Output2">
                    {quoteData?.number_of_guests}
                  </Typography>
                </Box>

                <Box>
                  <Typography className="Output">
                    High energy equipments
                  </Typography>
                  <Typography className="Output2">
                    {quoteData?.high_energy_equipments &&
                      Object.entries(quoteData?.high_energy_equipments).map(
                        (item) => `${item[0]}(${item[1]})${" "}`
                      )}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    NPS: How important is Hot Water for you?
                  </Typography>
                  <Typography className="Output2">
                    {quoteData?.questions?.hotwater_importance}
                  </Typography>
                </Box>
                <Box></Box>

                <Box>
                  <Typography className="Output">
                    NPS: Would you say you have a lower or higher use for
                    heating than the UK average?
                  </Typography>
                  <Typography className="Output2">
                    {quoteData?.questions?.heating_then_uk_average}
                  </Typography>
                </Box>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc3}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc3 = !temp.acc3;
              temp.acc2 = false;
              temp.acc1 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              temp.acc9 = false;

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
              {quoteData?.fabric_details?.map((item, index) => {
                return (
                  <Box key={`fab${index}`}>
                    <Typography className="Output Heading">
                      {item.label}
                    </Typography>
                    <Grid
                      gridTemplateColumns="repeat(1, 1fr)"
                      columnGap="10px"
                      columnCount={2}
                      rowGap="20px"
                    >
                      <Box>
                        <Typography className="Output">
                          External Wall Type
                        </Typography>

                        <Typography className="Output2">
                          {item["External Walls"].fabric_type && "Type"}{" "}
                          {item["External Walls"].fabric_type || ""}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography className="Output">Roof Type</Typography>

                        <Typography className="Output2">
                          {item["Roof Type"]?.fabric_type && "Type"}{" "}
                          {item["Roof Type"]?.fabric_type}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="Output">Window Type</Typography>

                        <Typography className="Output2">
                          {item.Windows?.fabric_type && "Type"}{" "}
                          {item?.Windows?.fabric_type}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="Output">
                          External Floor Type
                        </Typography>

                        <Typography className="Output2">
                          {item["Suspended Floors"]?.fabric_type && "Type"}{" "}
                          {item["Suspended Floors"]?.fabric_type}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="Output">
                          Roof Light Type
                        </Typography>

                        <Typography className="Output2">
                          {item["Inner Floors"]?.fabric_type && "Type"}{" "}
                          {item["Inner Floors"]?.fabric_type}
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc4}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc4 = !temp.acc4;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc1 = false;
              temp.acc5 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              temp.acc9 = false;

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
              {/* <Grid
                gridTemplateColumns="repeat(1, 1fr)"
                columnGap="10px"
                columnCount={2}
              ></Grid> */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box>
                  <Typography className="Output Heading">
                    Plans - GF/1F/2F
                  </Typography>
                  <Box>
                    {quoteData?.drawings?.plans.map((item, index) => (
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
                  <Typography className="Output Heading">Elevations</Typography>
                  <Box>
                    {quoteData?.drawings?.elevations.map((item, index) => (
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
                  <Typography className="Output Heading">Sections</Typography>
                  <Box>
                    {quoteData?.drawings?.sections.map((item, index) => (
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
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc5}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc5 = !temp.acc5;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc1 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              temp.acc9 = false;

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
              {/* <Grid
                gridTemplateColumns="repeat(1, 1fr)"
                columnGap="10px"
                columnCount={2}
              ></Grid> */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
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
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc6}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc6 = !temp.acc6;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc1 = false;
              temp.acc7 = false;
              temp.acc8 = false;
              temp.acc9 = false;

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
              <Grid
                gridTemplateColumns="repeat(1, 1fr)"
                columnGap="10px"
                columnCount={3}
                rowGap="20px"
              >
                <Box>
                  <Typography className="Output">Heating System</Typography>
                  <Typography className="Output2">Gas</Typography>
                </Box>

                <Box>
                  <Typography className="Output">Existing</Typography>
                  {quoteData?.existing?.data.map((item, index) => (
                    <Typography sx={{ fontFamily: "Outfit" }}>
                      {item}
                    </Typography>
                  ))}
                  <Typography>{quoteData?.existing?.other || ""}</Typography>
                </Box>
                <Box>
                  <Typography className="Output">Proposed</Typography>
                  {quoteData?.proposed?.data.map((item, index) => (
                    <Typography sx={{ fontFamily: "Outfit" }}>
                      {item}
                    </Typography>
                  ))}
                  <Typography>{quoteData?.proposed?.other || ""}</Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    Amount of Gas (kWh)
                  </Typography>
                  <Typography className="Output2">
                    {quoteData?.amount_of_gas}
                  </Typography>
                </Box>

                <Box>
                  <Typography className="Output">Cost of Gas (£)</Typography>
                  <Typography className="Output2">
                    {quoteData?.cost_of_gas}
                  </Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    Other Design Factors
                  </Typography>
                  {quoteData?.other_design_factor.map((item) => (
                    <Typography className="Output2">{item}</Typography>
                  ))}
                </Box>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc7}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc7 = !temp.acc7;
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
              <Grid
                gridTemplateColumns="repeat(1, 1fr)"
                columnGap="10px"
                columnCount={3}
              >
                <Box>
                  <Typography className="Output">Room Description</Typography>
                </Box>
                <Box>
                  <Typography className="Output">Radiator</Typography>
                </Box>
                <Box>
                  <Typography className="Output">Window</Typography>
                </Box>
                {quoteData?.radiator_and_window_sizes.map((item, index) => (
                  // <Box key={index}>
                  <>
                    <Box key={index}>
                      <Typography className="Output2">
                        {item.room_desc}
                      </Typography>
                    </Box>
                    <Box key={index}>
                      <Typography className="Output2">
                        {item?.radiator_size}
                      </Typography>
                    </Box>
                    <Box key={index}>
                      <Typography className="Output2">
                        {item?.window_size}
                      </Typography>
                    </Box>
                  </>
                  // </Box>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc9}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc9 = !temp.acc9;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc6 = false;
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
                Ventilation
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Box sx={{ mb: 4 }}>
                {quoteData?.ventilation_draught?.ventilation.map((item) => (
                  <Typography className="Output2">{item}</Typography>
                ))}
                <Typography className="Output2">
                  {quoteData?.ventilation_draught?.other || ""}
                </Typography>
              </Box>
              <Box>
                <Typography className="Output">
                  Building Draught Proofing / Airtightness
                </Typography>
                <Typography className="Output2">
                  {quoteData?.ventilation_draught?.draught || ""}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={checkAccordion.acc8}
            onChange={() => {
              let temp = { ...checkAccordion };
              temp.acc8 = !temp.acc8;
              temp.acc2 = false;
              temp.acc3 = false;
              temp.acc4 = false;
              temp.acc5 = false;
              temp.acc6 = false;
              temp.acc7 = false;
              temp.acc1 = false;
              temp.acc9 = false;
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
              <Box sx={{ mb: 4, width: "31%" }}>
                <Grid sx={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                  <Typography
                    sx={{
                      display: "inline",
                      fontFamily: "Outfit",
                      fontWeight: "300",
                      fontSize: "15px",
                      // textAlign: "right",
                    }}
                  >
                    Heat Loss Calculation
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline",
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      textAlign: "right",

                      ml: 4,
                    }}
                  >
                    {!quoteData?.pricing.discount
                      ? `£${quoteData?.pricing.data[0]}`
                      : "£0"}
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline",
                      fontFamily: "Outfit",
                      fontWeight: "300",
                      fontSize: "15px",
                      // textAlign: "right",
                    }}
                  >
                    Emitter Size
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline",
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      ml: 4,
                      textAlign: "right",
                    }}
                  >
                    {!quoteData?.pricing.discount
                      ? `£${quoteData?.pricing.data[1]}`
                      : "£0"}
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline",
                      fontFamily: "Outfit",
                      fontWeight: "300",
                      fontSize: "15px",
                      // textAlign: "right",
                    }}
                  >
                    Noise Assessment
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline",
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      ml: 4,
                      textAlign: "right",
                    }}
                  >
                    {!quoteData?.pricing.discount
                      ? `£${quoteData?.pricing.data[2]}`
                      : "£0"}
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline",
                      fontFamily: "Outfit",
                      fontWeight: "300",
                      fontSize: "15px",
                      // textAlign: "right",
                    }}
                  >
                    DNO Application
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline",
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      textAlign: "right",

                      ml: 4,
                    }}
                  >
                    {!quoteData?.pricing.discount
                      ? `£${quoteData?.pricing.data[3]}`
                      : "£0"}
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline",
                      fontFamily: "Outfit",
                      fontWeight: "300",
                      fontSize: "15px",
                      // textAlign: "right",
                    }}
                  >
                    Discount For All 4
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline",
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      textAlign: "right",

                      ml: 4,
                    }}
                  >
                    {!quoteData?.pricing.discount ? `£0` : "£349"}
                  </Typography>
                  <div></div>
                  <div>
                    <hr
                      style={{
                        width: "60%",
                        backgroundColor: "#ccc",
                        border: "1px solid #ccc",
                        float: "right",
                      }}
                    />
                  </div>

                  <Typography
                    sx={{
                      display: "inline",
                      fontFamily: "Outfit",
                      fontWeight: "300",
                      fontSize: "15px",
                      // textAlign: "right",
                    }}
                  >
                    Total
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline",
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      ml: 4,
                      textAlign: "right",
                    }}
                  >
                    £
                    {!quoteData?.pricing.discount
                      ? quoteData?.pricing.data.reduce(
                          (a, b) => Number(a) + Number(b)
                        )
                      : "349"}
                  </Typography>
                </Grid>
              </Box>
              <Box>
                <Typography className="Output">Any Other Comments</Typography>
                <Typography className="Output2">
                  {quoteData?.["other_details"]}
                </Typography>
              </Box>
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

export default connect(null, mapDispatchtoProps)(ViewQuote);
// export default ViewQuote;
