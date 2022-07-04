/* import "./fpass.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button,} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { changeEmailNum,addCountryCode } from "../../../Redux/emailNum/emailNum.action";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";

import validator from 'validator'

const useStyles = makeStyles({
  subtitle: {
    margin: "2.7vh 0px 0px 6.6vw",
    fontSize: "1vw",
    width: "27vw",
    fontWeight: "600",
  },
  button: {
    margin: "2.7vh 0px 0px 6.6vw",
    backgroundColor: "black",
    color: "white",
    width: "11.71vw",
    height: "6.7vh",
    fontFamily:"outfit",
    borderRadius: "2vw",
    textTransform: "none",
    fontSize:"1vw",
    "&:hover": {
      textTransform: "none",
      background: "black",
      color: "white",
    },
  },
  buttons: {
    margin: "2.7vh 0px 0px 1.3vw ",
    border: "solid 1px #d3d3d3",
    backgroundColor: "#f9f9f9",
    color: " #000",
    fontFamily:"outfit",
    width: "13vw",
    height: "6.7vh",
    textTransform: "none",
    borderRadius: "2vw",
    fontSize:"1vw",
 
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
  const [input13Error, setinput13Error] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailNum === "") {
     setinput13Error("Please enter the Email Address");
      return false;
    }
   

    if(!validator.isEmail(emailNum)){
     setinput13Error("Invalid Email Address")
      return false
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
    }}


  return (
    <div>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#Fa5e00" height="100" width="100" />
        </div>
      )}
      <div className="forgotpassword">
        <div className="fpfirstHalf">
          <div  >
            <img
              src={require("../../../Img/HPDD.jpeg")}
            
              className="fpHPD"
            />
          </div>

          <h1 className="fpdiv1">Forgot Password?</h1>

          <div
            style={{
              margin: "1.5vh 0px 0px 6.6vw",
              width: "38.4vw",
              fontWeight: "300",
              marginTop: "4vh",
              fontSize:"1.2vw"
            }}
          >
            No worries, we’ll send you reset instructions. Enter Email you've used before and we'll try to
            find your account.
          </div>

          <input
            className="fpinputfield input13"
            type="text"
            value={emailNum}
            onChange={(e) => {changeEmailNum(e.target.value);setinput13Error("")}}
            name="emailNum"
            required
          /> <label className="input13-label" >Email Address</label>  <span className="input13Error" > {input13Error} </span>
    
          
          <div>
              <Button
                className={classes.button}
                onClick={(e) => handleSubmit(e)}
              >
                Reset Password
              </Button>
            <Button
              className={classes.buttons}
              style={{ paddingLeft: "3.3vw", position: "relative" }}
              onClick={()=>navigate("/")}
            >
              Back to Login
            </Button>
            <ArrowBackIosNewIcon
              style={{
                position: "relative",
                right: "13.36vw",
                top: "1.85vh",
                height:"2.2vh",
                width:"4vw"
              }}
            />
          </div>
          <hr className="fphr" />
          <div style={{margin:"0.7vh 0px 0px 6.6vw",fontWeight:"600",fontSize:"1vw"}} >Need more Help?<Link to = "/" className="learnmore" ><span>Learn more</span></Link></div>
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
  addCountryCode: (emailNum) => dispatch(addCountryCode(emailNum))
});

export default connect(mapStateToProps, mapDispatchToProps)(Fpass);
 */
