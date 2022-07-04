import "./ForgotPassword.css";
import React, { useState } from "react";
import axios from "axios";
import HPD from "../../../Img/HPDD.jpeg";
import forgotPasswordImage from "../../../Img/forgotpassword.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  changeEmailNum,
  addCountryCode,
} from "../../../Redux/emailNum/emailNum.action";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";

import validator from "validator";
import { Box, Divider, Typography } from "@mui/material";
import { fontFamily } from "@mui/system";
import StyledTextField from "../../../common/textfield";

const useStyles = makeStyles({
  subtitle: {
    margin: "2.7vh 0px 0px 6.6vw",
    fontSize: "18px",
    width: "27vw",
    fontWeight: "600",
    fontFamily: "Outfit",
  },
  button: {
    margin: "2.7vh 0px 0px 10px ",

    backgroundColor: "black",
    color: "white",
    width: "254px",
    height: "59px",
    fontFamily: "Outfit",
    borderRadius: "30px",
    textTransform: "none",
    position: "absolute",

    fontSize: "18px",
    "&:hover": {
      textTransform: "none",
      background: "black",
      color: "white",
    },
  },
  buttons: {
    margin: "2.7vh 0px 0px 59px",
    border: "solid 0.134vh #d3d3d3",
    backgroundColor: "#f9f9f9",
    color: " #000",
    fontFamily: "Outfit",
    width: "254px",
    height: "59px",
    position: "relative",

    textTransform: "none",
    borderRadius: "30px",
    fontSize: "18px",

    "&:hover": {
      textTransform: "none",
      backgroundColor: "#f9f9f9",
      color: "#000",
    },
  },
});

function Fpass({ emailNum, changeEmailNum }) {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [input13Error, setinput13Error] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailNum === "") {
      setinput13Error("Please enter an email address");
      return false;
    }

    if (!validator.isEmail(emailNum)) {
      setinput13Error("Invalid email address");
      return false;
    }

    if (emailNum !== "" && !loader) {
      setLoader(true);
      const data = {
        email: emailNum,
      };

      axios
        .post(URL + globalAPI.forgotPassword, data)
        .then((response) => {
          const res = response.data;
          setLoader(false);
          console.log(res.otp_not_to_display);
          if (res.success) {
            toast.success(response.data.message);
            localStorage.setItem(
              "otp_token",
              JSON.stringify(res.data.otp_token)
            );
            setLoader(false);
            navigate("/otp");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          setLoader(false);
          toast.error("Something Went Wrong");
        });
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100%", height: "max-content" }}>
        {loader && (
          <div className="customLoader">
            <TailSpin color="#Fa5e00" height="100" width="100" />
          </div>
        )}
        <Box sx={{ width: "60%" }}>
          <img
            style={{
              width: "70px",
              height: "70px",
              margin: "40px 965px 60px 55px",
            }}
            src={HPD}
            alt="HPD"
          />
          <Typography
            sx={{
              fontSize: "55px",
              fontWeight: "300",
              fontFamily: "Outfit",
              position: "relative",
              width: "783px",
              height: "60px",
              margin: "0 197px 40px 55px",
            }}
          >
            Forgot Password?
          </Typography>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: "300",
              fontFamily: "Outfit",
              width: "597px",
              lineHeight: "normal",
              letterSpacing: "0.03px",
              height: "84px",
              position: "relative",
              margin: "0px 379px 25px 59px",
            }}
          >
            No worries, we’ll send you reset instructions. Enter Email you've
            used before and we'll try to find your account.
          </Typography>
          <StyledTextField
            sx={{ width: "500px", height: "63px", margin: "0 0 0 60px" }}
            value={emailNum}
            label="Email Address"
            onChange={(e) => {
              changeEmailNum(e.target.value);
              setinput13Error("");
            }}
            name="emailNum"
            required
          />{" "}
          <Typography
            style={{
              fontSize: "18px",
              fontFamily: "Outfit",
              position: "relative",
              margin: "1px 0px 0px 62px",
              color: "red",
            }}
          >
            {input13Error}
          </Typography>
          <div style={{ marginTop: "2vh" }}>
            <Button
              className={classes.buttons}
              style={{ position: "relative" }}
              onClick={() => navigate("/")}
            >
              <ChevronLeftSharpIcon
                sx={{ height: "27px", width: "27px", marginRight: "25px" }}
              />
              Back to Login
            </Button>

            <Button className={classes.button} onClick={(e) => handleSubmit(e)}>
              Reset Password
            </Button>
          </div>
          <Divider
            sx={{
              width: "500px",
              margin: "65px 0 0 59px",
              border: "2px solid #f4f4f4",
              background: "#f4f4f4",
            }}
          />
          <div
            style={{
              margin: "0.7vh 0px 100px 59px",
              fontWeight: "600",
              fontSize: "18px",
              fontFamily: "Outfit",
            }}
          >
            Need more Help?
            <span
              onClick={() => {
                window.open("https://heatpumpdesigner.com/faqs/");
              }}
              className="learnmore"
            >
              <span>Learn more</span>
            </span>
          </div>
        </Box>
        <Box class="fpRectangle-side">
          {" "}
          <img src={forgotPasswordImage} className="fpcouplesideImg" />{" "}
        </Box>
      </Box>
    </>
  );
}

const mapStateToProps = (state) => ({
  emailNum: state.fp.emailNum,
});

const mapDispatchToProps = (dispatch) => ({
  changeEmailNum: (emailNum) => dispatch(changeEmailNum(emailNum)),
  addCountryCode: (emailNum) => dispatch(addCountryCode(emailNum)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Fpass);
