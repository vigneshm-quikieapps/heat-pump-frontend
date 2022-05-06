import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { useParams } from "react-router";
import { Typography, AccordionSummary, AccordionDetails } from "@mui/material";
import { Card, Accordion, ImgIcon, Grid } from "../../../common";
import "./ViewQuote.css";
import DropdownIcon from "../../../Img/icon dropdown.png";
import { getQuote } from "../../../services/services";
const userData = JSON.parse(localStorage.getItem("userData"));
const userName = userData?.name;
function ViewQuote() {
  const { id: quoteId } = useParams();
  const [quoteData, setQuoteData] = useState();
  const [checkAccordion, setCheckAccordion] = useState({
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
    getQuote(quoteId).then((res) => {
      console.log(res);
      setQuoteData(res);
    });
  }, [quoteId]);
  return (
    <>
      <h1 className="get-a-quote">View Quote</h1>
      <hr className="quote-hr" />

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
              {userName}
            </Typography>
            <Typography
              style={{
                fontSize: "18px",

                fontFamily: "Outfit",
                fontWeight: "300",
              }}
            >
              {userData?.business_trade_name}, {userData?.city}
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
              <Typography className="Output">Quote Status</Typography>
              <Typography className="Output">Quote Request No.</Typography>
            </Box>
            <Box sx={{ ml: 2.5 }}>
              <Typography className="Output">In Progress</Typography>
              <Typography className="Output">QR12345678</Typography>
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
                  <Typography className="Output2">29 Windyridge</Typography>
                </Box>
                <Box>
                  <Typography className="Output">Address Line 2</Typography>
                  <Typography className="Output2">XXX</Typography>
                </Box>
                <Box>
                  <Typography className="Output">Town/City</Typography>
                  <Typography className="Output2">Hamilton</Typography>
                </Box>
                <Box>
                  <Typography className="Output">Postcode</Typography>
                  <Typography className="Output2">ML37PS</Typography>
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
                    Days(Month) occupied
                  </Typography>
                  <Typography className="Output2">300(10)</Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    Time(Weekly) occupied
                  </Typography>
                  <Typography className="Output2">0000-0600(Monday)</Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    Number of adults occupants
                  </Typography>
                  <Typography className="Output2">4</Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    Number of children(under 14) occupants
                  </Typography>
                  <Typography className="Output2">2</Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    Number of typical occupants per bedroom
                  </Typography>
                  <Typography className="Output2">2</Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    Number of guests in winter
                  </Typography>
                  <Typography className="Output2">2</Typography>
                </Box>
                <Box>
                  <Typography className="Output">Equipments</Typography>
                  <Typography className="Output2">
                    TVs(1), Laptops(2), Monitors(1), IT servers(2),
                    Photocopiers(1)
                  </Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    High energy equipments
                  </Typography>
                  <Typography className="Output2">
                    Sauna(1), Swimming Pool(1), Hot Tub(1), Kilns(1),
                    Others(None)
                  </Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    NPS: How important is Hot Water for you?
                  </Typography>
                  <Typography className="Output2">3</Typography>
                </Box>
                <Box></Box>
                <Box>
                  <Typography className="Output">
                    NPS: Will you be ok with say a wood stove helping on the
                    very coldest days?
                  </Typography>
                  <Typography className="Output2">4</Typography>
                </Box>
                <Box></Box>
                <Box>
                  <Typography className="Output">
                    NPS: Would you say you have a lower or higher use for
                    electricity than the UK average?
                  </Typography>
                  <Typography className="Output2">4</Typography>
                </Box>
                <Box></Box>
                <Box>
                  <Typography className="Output">
                    NPS: Would you say you have a lower or higher use for
                    heating than the UK average?
                  </Typography>
                  <Typography className="Output2">4</Typography>
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
              <Box>
                <Typography className="Output Heading">
                  Main Building
                </Typography>
                <Grid
                  gridTemplateColumns="repeat(1, 1fr)"
                  columnGap="10px"
                  columnCount={2}
                  rowGap="20px"
                >
                  <Box>
                    <Typography className="Output">External walls</Typography>
                    <Typography className="Output2">XXX</Typography>
                  </Box>
                  <Box>
                    <Typography className="Output">Internal walls</Typography>
                    <Typography className="Output2">XXX</Typography>
                  </Box>
                  <Box>
                    <Typography className="Output">Roof type</Typography>
                    <Typography className="Output2">XXX</Typography>
                  </Box>
                  <Box>
                    <Typography className="Output">Windows</Typography>
                    <Typography className="Output2">XXX</Typography>
                  </Box>
                  <Box>
                    <Typography className="Output">Suspended floors</Typography>
                    <Typography className="Output2">XXX</Typography>
                  </Box>
                  <Box>
                    <Typography className="Output">Internal floors</Typography>
                    <Typography className="Output2">XXX</Typography>
                  </Box>
                </Grid>
              </Box>
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
                  <Box></Box>
                </Box>
                <Box>
                  <Typography className="Output Heading">Elevations</Typography>
                  <Box></Box>
                </Box>
                <Box>
                  <Typography className="Output Heading">Sections</Typography>
                  <Box></Box>
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
                  <Box></Box>
                </Box>
                <Box>
                  <Typography className="Output Heading">Roof</Typography>
                  <Box></Box>
                </Box>
                <Box>
                  <Typography className="Output Heading">Windows</Typography>
                  <Box></Box>
                </Box>
                <Box>
                  <Typography className="Output Heading">
                    Existing Boiler
                  </Typography>
                  <Box></Box>
                </Box>
                <Box>
                  <Typography className="Output Heading">
                    Existing Radiator
                  </Typography>
                  <Box></Box>
                </Box>
                <Box>
                  <Typography className="Output Heading">Pipework</Typography>
                  <Box></Box>
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
                  <Typography className="Output">
                    Amount of Electricity (kWh)
                  </Typography>
                  <Typography className="Output2">1000</Typography>
                </Box>
                <Box>
                  <Typography className="Output">
                    Amount of Gas (kWh)
                  </Typography>
                  <Typography className="Output2">1000</Typography>
                </Box>
                <Box></Box>
                <Box>
                  <Typography className="Output">
                    Cost of Electricity (£)
                  </Typography>
                  <Typography className="Output2">600</Typography>
                </Box>
                <Box>
                  <Typography className="Output">Cost of Gas (£)</Typography>
                  <Typography className="Output2">600</Typography>
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
                  <Typography className="Output2">29 Windyridge</Typography>
                </Box>
                <Box>
                  <Typography className="Output">Radiator</Typography>
                  <Typography className="Output2">1000</Typography>
                </Box>
                <Box>
                  <Typography className="Output">Window</Typography>
                  <Typography className="Output2">1000</Typography>
                </Box>
              </Grid>
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
                gridTemplateColumns="repeat(1, 1fr)"
                columnGap="10px"
                columnCount={2}
              >
                <Box>
                  <Typography className="Output">Comments</Typography>
                  <Typography className="Output2">
                    Comments Lorem Ipsum, Lorem Ipsum
                  </Typography>
                </Box>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Card>
    </>
  );
}

export default ViewQuote;
