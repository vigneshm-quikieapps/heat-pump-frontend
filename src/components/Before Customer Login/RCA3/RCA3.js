import React from "react";
import "./RCA3.css";

// import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  InputAdornment,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";

function RCA3() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", minHeight: "100%", height: "max-content" }}>
      <Box sx={{ width: "60%" }}>
        <img
          style={{
            width: "70px",
            height: "70px",
            margin: "40px 965px 60px 55px",
          }}
          src={require("../../../Img/HPDD.jpeg")}
          alt="HPDD"
        />
        <Typography
          sx={{
            fontSize: "50px",
            fontWeight: "300",
            fontFamily: "Outfit",
            width: "783px",
            height: "88px",
            margin: "0 197px 0px 55px",
            position: "relative",
          }}
        >
          Request a Customer Account
        </Typography>
        <Box style={{ position: "relative" }}>
          <div className="rca3left-bar"></div>{" "}
          <img
            src={require("../../../Img/greentick.png")}
            className="greentick"
          />
        </Box>
        {/* <Box style={{ position: "relative" }}>
          <div className="rca3left-bar"></div>{" "}
          <img
            src={require("../../../Img/greentick.png")}
            className="greentick"
          />
        </Box> */}
        <Box>
          <p className="Text">
            We have received your request to create an account. We will keep you
            informed about status of your account creation though email. Have a
            nice Day!
          </p>
        </Box>
        <Box sx={{ ml: 7 }}>
          <a
            href="https://heatpumpdesigner.com/"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <button
              variant="contained"
              className="btn-house Add btn-icon"
              onClick={() => {
                navigate("/");
              }}
            >
              <span>Visit our website</span>
            </button>
          </a>
        </Box>
      </Box>
      <Box class="rca3Rectangle-side">
        <img
          src={require("../../../Img/RCA3.png")}
          className="rca3couplesideImg"
          alt="RCA"
        />
      </Box>
    </Box>
  );
}

export default RCA3;
