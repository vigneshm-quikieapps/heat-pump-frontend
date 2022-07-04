import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

import step2ProgressBar from "../../../../Img/step2.png";
import { Card, Radio } from "../../../../common";
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  RadioGroup,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import StyledTextField from "../../../../common/textfield";
import Equipment from "./Equipment";
import HighEquipment from "./HighEquipment";

import {
  bookJobAction,
  bookJobReset,
} from "../../../../Redux/bookJob/bookJob.action";
import { connect, useDispatch } from "react-redux";
const SecondSubStep = ({ myProps, bookJobDetails, bookJobAction }) => {
  const [loader, setLoader] = useState(true);
  const [focused, setFocused] = useState(false);
  const [selectedGuestInWinter, setSelectedGuestInWinter] = useState("0");

  const [highEnergyEquipments, setHighEnergyEquipments] = useState({
    sauna: "0",
    swimmingPool: "0",
    hotTub: "0",
    kilns: "0",
    other: "0",
  });
  const [questions, setQuestions] = useState({
    hotwater_importance: 1,
    heating_then_uk_average: 1,
  });

  const getHighEnergyEquipments = (equip, num) => {
    let temp = highEnergyEquipments;
    temp[equip] = num;
    setHighEnergyEquipments(temp);
  };
  useEffect(() => {
    // let temp = { ...questions };
    // temp.hotwater_importance = bookJobDetails.questions.hotwater_importance;
    // temp.heating_then_uk_average =
    //   bookJobDetails.questions.heating_then_uk_average;
    setSelectedGuestInWinter(bookJobDetails.number_of_guests);
    setHighEnergyEquipments(bookJobDetails.high_energy_equipments);
    setLoader(false);
    setQuestions(bookJobDetails.questions);
  }, [bookJobDetails]);
  useEffect(() => {
    console.log(questions);
  }, [questions]);
  return (
    <>
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
          Guest/Additional People
        </Typography>
        <hr className="s2hr2" />
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: "bold",
            lineHeight: "normal",
            fontFamily: "Outfit",
            letterSpacing: "0.03px",
          }}
        >
          When designing the heating & hot water loads we look at the worst
          scenario. Imagine its christmas day & very cold outside-you may have
          guests in the house. There is likely to be peak demand for heating &
          hot water, and coincides with a time of year with very little solar
          for gain and/or to let any solar thermal or PV systems help.{" "}
        </Typography>
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
        <HighEquipment
          highEnergyEquipments={highEnergyEquipments}
          getHighEnergyEquipments={(equip, num) => {
            getHighEnergyEquipments(equip, num);
          }}
        />

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
          You may consider elderly people etc may need the heating on more and
          at higher temperatures
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
        <Box sx={{ display: "flex" }}>
          <button
            variant="contained"
            className="btn-house btn-icon"
            onClick={() => {
              bookJobAction({
                high_energy_equipments: highEnergyEquipments,
                number_of_guests: selectedGuestInWinter,
                questions: questions,
              });
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
                [
                  // "equipments",
                  "high_energy_equipments",
                  "number_of_guests",
                  "questions",
                ],
                [
                  // equipments,
                  highEnergyEquipments,
                  selectedGuestInWinter,
                  questions,
                ]
              );
              bookJobAction({
                high_energy_equipments: highEnergyEquipments,
                number_of_guests: selectedGuestInWinter,
                questions: questions,
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
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(SecondSubStep);
