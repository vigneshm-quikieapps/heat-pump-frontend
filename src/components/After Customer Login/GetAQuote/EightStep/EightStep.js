import React, { useState, useEffect } from "react";
import "./EightStep.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../../GlobalUrl";
import globalAPI from "../../../../GlobalApi";
import { Button, Box, Typography, Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import { Card } from "../../../../common";

const useStyles = makeStyles({});

const EightStep = (props) => {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState("");
  const token = JSON.parse(localStorage.getItem("user"));
  const [pricing, setPricing] = useState(0);
  const [isDiscount, setIsDiscount] = useState(false);
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
        Step 9 of 9
        <img src={require("../../../../Img/step8.png")} className="s8baricon" />
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
          Pricing per job
        </Typography>
        <hr
          style={{
            backgroundColor: "#f2f3f2",
            border: "0.1vh solid #f2f3f2",
          }}
        />
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
                width: "17%",
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
                width: "17%",
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
                width: "17%",
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
                width: "17%",
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
              // defaultChecked={}
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
                width: "17%",
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
          </Box>
        </div>
        <div style={{ width: "19.9%", marginLeft: "4%" }}>
          <Typography
            sx={{
              display: "inline-block",
              fontFamily: "Outfit",
              marginLeft: "83%",
            }}
          >
            Total
          </Typography>
          <hr
            style={{
              backgroundColor: "#f2f3f2",
              border: "0.1vh solid #f2f3f2",
            }}
          />
          <Typography
            sx={{
              width: "40px",
              display: "inline-block",
              fontFamily: "Outfit",
              marginLeft: "83%",
              fontWeight: "900",
              textAlign: "right",
            }}
          >
            £{pricing}
          </Typography>
        </div>
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
          Other
        </Typography>
        <hr
          style={{
            backgroundColor: "#f2f3f2",
            border: "0.1vh solid #f2f3f2",
          }}
        />
        <div style={{ marginTop: "1.5%" }}>
          <textarea
            className="quotetextarea"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Any Other Comments"
          ></textarea>
        </div>
      </div>
      <Box sx={{ display: "flex" }}>
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
            props.getPayloadData(["pricing"], [pricing]);
            props.getPayloadData(["other_details"], [text]);
            props._addNewQuote();
            props.next();
          }}
        >
          <span style={{ marginRight: "100px" }}>Submit</span>
          <span style={{ height: "27px", width: "27px" }}>
            <ChevronRightSharpIcon sx={{ height: "27px", width: "27px" }} />
          </span>
        </button>
      </Box>
    </Card>
  );
};

export default EightStep;
