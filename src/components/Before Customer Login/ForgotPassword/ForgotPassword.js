import "./ForgotPassword.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button,} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { changeEmailNum } from "../../../Redux/emailNum/emailNum.action";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Triangle } from "react-loader-spinner";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";

const useStyles = makeStyles({
  subtitle: {
    margin: "20px 0px 0px 100px",
    fontSize: "15px",
    width: "420px",
    fontWeight: "600",
  },
  button: {
    margin: "20px 0px 0px 100px ",
    backgroundColor: "black",
    color: "white",
    width: "180px",
    height: "50px",
    fontFamily:"outfit",
    borderRadius: "32.5px",
    textTransform: "none",
    "&:hover": {
      textTransform: "none",
      background: "black",
      color: "white",
    },
  },
  buttons: {
    margin: "20px 0px 0px 20px ",
    border: "solid 1px #d3d3d3",
    backgroundColor: "#f9f9f9",
    color: " #000",
    fontFamily:"outfit",
    width: "200px",
    height: "50px",
    textTransform: "none",
    borderRadius: "32.5px",
    "&:hover": {
      textTransform: "none",
      backgroundColor: "#f9f9f9",
      color: "#000",
    },
  },
});

function ForgotPassword({ emailNum, changeEmailNum }) {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailNum === "") {
      toast.error("Please enter the Email...");
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
          const res =response.data
          setLoader(false);
          console.log(res.otp_not_to_display);
          if (res.success) {
            localStorage.setItem("otp_token", JSON.stringify(res.data.otp_token));
            setLoader(false);
            navigate("/otp");
          }
          else {
            toast.error(res.data.messsage);
          }
        })
        .catch((err) => {
          setLoader(false);
          toast.error("Something Went Wrong");
        });
    }
  };

  return (
    <div>
      {loader && (
        <div className="customLoader">
          <Triangle color="#007bff" height="130" width="130" />
        </div>
      )}
      <div className="forgotpassword">
        <div className="fpfirstHalf">
          <div className="fpHPD">
            <img
              src={require("../../../Img/HPDD.jpeg")}
              height="50px"
              width={"50px"}
            />
          </div>

          <h1 className="fpdiv1">Forgot Password?</h1>

          <div
            style={{
              margin: "10px 0px 0px 100px",
              width: "590px",
              fontWeight: "300",
              marginTop: "30px",
            }}
          >
            No worries, we’ll send you reset instructions. Enter any email or
            phone number with country code you've used before and we'll try to
            find your account.
          </div>

          <input
            className="fpinputfield"
            type="text"
            value={emailNum}
            onChange={(e) => changeEmailNum(e.target.value)}
            name="emailNum"
            placeholder="Email or Number"
          />

          <div>
              <Button
                className={classes.button}
                onClick={(e) => handleSubmit(e)}
              >
                Reset Password
              </Button>
            <Button
              className={classes.buttons}
              style={{ paddingLeft: "50px", position: "relative" }}
              onClick={()=>navigate("/")}
            >
              Back to Login
            </Button>
            <ArrowBackIosNewIcon
              style={{
                position: "relative",
                right: "190px",
                top: "15px",
                fontSize: "medium",
              }}
            />
          </div>
          <hr className="fphr" />
          <div style={{margin:"5px 0px 0px 100px",fontWeight:"600",fontSize:"15px"}} >Need more Help?<Link to = "/" className="learnmore" ><span>Learn more</span></Link></div>
        </div>
         
        <div class="fpRectangle-side">
          {" "}
          <img
            src={require("../../../Img/forgotpassword.png")}
            className="fpcouplesideImg"
          />{" "}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  emailNum: state.fp.emailNum,
});

const mapDispatchToProps = (dispatch) => ({
  changeEmailNum: (emailNum) => dispatch(changeEmailNum(emailNum)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
