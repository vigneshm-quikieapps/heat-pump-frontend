import React, { useState, useEffect } from "react";
import "./EightStep.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../../GlobalUrl";
import globalAPI from "../../../../GlobalApi";
import { Button, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import { Card, Checkbox } from "../../../../common";
import {
  bookJobAction,
  bookJobReset,
} from "../../../../Redux/bookJob/bookJob.action";
import { connect, useDispatch } from "react-redux";
const useStyles = makeStyles({});

const EightStep = ({ myProps, bookJobDetails, bookJobAction }) => {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState("");
  const token = JSON.parse(localStorage.getItem("user"));
  const [pricing, setPricing] = useState({
    data: ["0", "0", "0", "0"],
    discount: false,
  });
  const [isDiscount, setIsDiscount] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    myProps.getPayloadData(["pricing", "other_details"], [pricing, text]);
  }, [pricing, text]);
  useEffect(() => {
    setPricing(bookJobDetails.pricing);
    setText(bookJobDetails.other_details);
    setIsDiscount(bookJobDetails.pricing.disabled);
  }, [bookJobDetails]);
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
              checked={pricing.data[0] === "299"}
              onChange={(e) => {
                let temp = { ...pricing };
                e.target.checked
                  ? (temp.data[0] = "299")
                  : (temp.data[0] = "0");
                setPricing(temp);
              }}
            />
            <Typography
              sx={{
                display: "inline-block",
                fontFamily: "Outfit",
                width: "17%",
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
              checked={pricing.data[1] === "75"}
              // defaultChecked={}
              onChange={(e) => {
                let temp = { ...pricing };
                e.target.checked ? (temp.data[1] = "75") : (temp.data[1] = "0");
                setPricing(temp);
              }}
            />
            <Typography
              sx={{
                display: "inline-block",
                fontFamily: "Outfit",
                width: "17%",
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
              checked={pricing.data[2] === "10"}
              onChange={(e) => {
                let temp = { ...pricing };
                e.target.checked ? (temp.data[2] = "10") : (temp.data[2] = "0");
                setPricing(temp);
              }}
            />
            <Typography
              sx={{
                display: "inline-block",
                fontFamily: "Outfit",
                width: "17%",
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
              checked={pricing.data[3] === "10"}
              onChange={(e) => {
                let temp = { ...pricing };
                e.target.checked ? (temp.data[3] = "10") : (temp.data[3] = "0");
                setPricing(temp);
              }}
            />
            <Typography
              sx={{
                display: "inline-block",
                fontFamily: "Outfit",
                width: "17%",
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
              // defaultChecked={}
              checked={pricing.discount}
              onChange={(e) => {
                let temp = { ...pricing };
                if (e.target.checked) {
                  setIsDiscount(true);
                  temp.discount = true;
                  temp.data = [];
                } else {
                  setIsDiscount(false);
                  temp.discount = false;
                }
                setPricing(temp);
              }}
            />
            <Typography
              sx={{
                display: "inline-block",
                fontFamily: "Outfit",
                width: "17%",
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
                marginLeft: "20%",
                textAlign: "right",
                mt: 4,
                // float: "right",
              }}
            >
              Total
            </Typography>
            <hr
              style={{
                width: "23%",
                backgroundColor: "#f2f3f2",
                border: "0.1vh solid #f2f3f2",
              }}
            />
            <Typography
              sx={{
                width: "40px",
                // display: "inline-block",
                fontFamily: "Outfit",
                marginLeft: "20%",
                fontWeight: "900",
                textAlign: "right",
                // float: "right",
              }}
            >
              {pricing.discount
                ? "£349"
                : pricing?.data?.length > 0
                ? `£${pricing.data.reduce((a, b) => Number(a) + Number(b))}`
                : "£0"}
            </Typography>
          </Box>
        </div>
        <div style={{ maxWidth: "17.817223198594025vw" }}></div>
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
          onClick={() => {
            bookJobAction({ pricing: pricing, other_details: text });
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
            myProps._addNewQuote();
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
const mapStateToProps = (state, ownProps) => {
  return {
    myProps: ownProps,
    bookJobDetails: state.bkjb,
  };
};

const mapDispatchToProps = (dispatch) => ({
  bookJobAction: (keypair) => dispatch(bookJobAction(keypair)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EightStep);
// export default EightStep;
