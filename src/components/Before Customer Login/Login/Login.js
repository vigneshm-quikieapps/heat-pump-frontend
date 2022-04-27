import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";
import validator from "validator";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import StyledTextField from "../../../common/textfield";
// import MailIcon from "../../../Img/icon.png";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
const passwords = {
  value: "",
  type: "password",
  showpassword: false,
};

const Login = () => {
  const [password, setPassword] = useState(passwords);
  const [emailValue, setEmailValue] = useState("");
  const [remember, setRemember] = useState(false);
  const [visibility, setVisibility] = useState("hidden");

  const [inputLogin1Error, setInputLogin1Error] = useState("");

  const [inputLogin2Error, setInputLogin2Error] = useState("");

  const [loader, setLoader] = useState(false);
  const [color, setColor] = useState("#a4a4a4");

  const navigate = useNavigate();

  const togglePassword = () => {
    if (password.showpassword) {
      setPassword((state) => ({
        ...state,
        type: "password",
        showpassword: false,
      }));
    } else {
      setPassword((state) => ({ ...state, type: "text", showpassword: true }));
    }
  };

  const changeHandler = (e) => {
    setInputLogin1Error("");
    setInputLogin2Error("");
    if (e.target.name === "password") {
      setPassword((state) => ({ ...state, value: e.target.value }));
    } else if (e.target.name === "email") {
      setEmailValue(e.target.value);
    }
  };

  const blurFunc = () => {
    if (emailValue == "") {
      return false;
    }
    if (!validator.isEmail(emailValue)) {
      setInputLogin1Error("Please enter valid Email");
      return false;
    }
  };

  const blurFunc1 = () => {
    if (password.value == "") {
      return false;
    }
    if (!validator.isLength(password.value, { min: 8, max: undefined })) {
      setInputLogin2Error("Must be at least 8 characters");
      return false;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validator.isEmail(emailValue)) {
      setInputLogin1Error("Please enter valid Email");
      /* return false; */
    }
    if (emailValue == "") {
      setInputLogin1Error("Email Address cannot be Empty");
      /* return false; */
    }
    if (!validator.isLength(password.value, { min: 8, max: undefined })) {
      setInputLogin2Error("Must be at least 8 characters");
      return false;
    }

    if (password.value == "") {
      setInputLogin2Error("Password cannot be Empty");
      /* return false; */
    }

    if (emailValue !== "" && password.value !== "" && !loader) {
      setLoader(true);
      const data = {
        email: emailValue,
        password: password.value,
      };
      axios
        .post(URL + globalAPI.login, data)
        .then((response) => {
          const res = response.data;
          console.log(res);
          if (res.sucess) {
            localStorage.setItem("userData", JSON.stringify(res.data));
            localStorage.setItem("user", JSON.stringify(res.data.token));
            setLoader(false);
            if (res.data.admin) {
              navigate("/admincommon/accountrequest");
              return;
            }
            navigate("/common/servicerequest");
          } else {
            setLoader(false);
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          setLoader(false);
          toast.error("Something Went Wrong");
        });
    } else {
    }
  };

  /* useEffect(() => {
    console.log(emailValue);
  }, [emailValue]); */

  return (
    <div>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#Fa5e00" height="100" width="100" />
        </div>
      )}
      <div className="-Login">
        <div className="firstHalf">
          <div className="HPD-Existing-Logo---01-11">
            <img
              src={require("../../../Img/HPDD.jpeg")}
              /* height="50px"
              width={"50px"} */
              style={{ height: "6.5vh" }}
            />
          </div>
          <div className="Login">Login</div>

          <form action="">
            <div style={{ position: "relative" }}>
              <StyledTextField
                sx={{ width: "500px", height: "63px", margin: "0 0 0 60px" }}
                required
                type="text"
                value={emailValue}
                onChange={changeHandler}
                name="email"
                label="Email Address"
                onBlur={blurFunc}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{ fontSize: "22px", fontWeight: "800" }}
                      position="start"
                    >
                      <EmailIcon sx={{ color: "#000 !important" }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { background: "#fff" },
                }}
              />
              {/* <img
                src={require("../../../Img/icon.png")}
                alt=""
                className="emailIcon"
              /> */}
              <Typography
                style={{
                  fontSize: "18px",
                  fontFamily: "Outfit",
                  position: "relative",
                  margin: "1px 0px 0px 62px",
                  color: "red",
                }}
              >
                {inputLogin1Error}
              </Typography>
              {/* <input
                type="text"
                className="email "
                value={emailValue}
                onChange={changeHandler}
                name="email"
                required
                onBlur={blurFunc}
              />
              <img
                src={require("../../../Img/icon.png")}
                alt=""
                className="emailIcon"
              />
              <label className="email-label">Email Address </label>{" "}
              <span className="inputLogin1Error inputLoginError">
                {inputLogin1Error}
              </span>
              <span
                style={{ visibility: `${visibility}` }}
                className="loginspan2"
              >
                Both passwords should match
              </span> */}
            </div>
            <div style={{ position: "relative" }}>
              <StyledTextField
                sx={{ width: "500px", height: "63px", margin: "8px 0 0 60px" }}
                required
                label="Password"
                type="password"
                value={password.value}
                onChange={changeHandler}
                onBlur={blurFunc1}
                name="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      sx={{ fontSize: "22px", fontWeight: "800" }}
                      position="start"
                    >
                      <LockIcon sx={{ color: "#000 !important" }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { background: "#fff" },
                }}
              />
              {password.showpassword ? (
                <img
                  src={require("../../../Img/iconEyeOpen.png")}
                  alt=""
                  className="npeyeIconOpen"
                  onClick={togglePassword}
                />
              ) : (
                <img
                  src={require("../../../Img/icon3.png")}
                  alt=""
                  className="npeyeIcon"
                  onClick={togglePassword}
                />
              )}
              <Typography
                style={{
                  fontSize: "18px",
                  fontFamily: "Outfit",
                  position: "relative",
                  margin: "1px 0px 0px 62px",
                  color: "red",
                }}
              >
                {inputLogin2Error}
              </Typography>

              {/* <input
                type={password.type}
                value={password.value}
                onChange={changeHandler}
                className="password"
                name="password"
                required
                onBlur={blurFunc1}
              />
              <img
                src={require("../../../Img/icon2.png")}
                alt=""
                className="passwordIcon"
              />
              {password.showpassword ? (
                <img
                  src={require("../../../Img/iconEyeOpen.png")}
                  alt=""
                  className="eyeIconOpen"
                  onClick={togglePassword}
                />
              ) : (
                <img
                  src={require("../../../Img/icon3.png")}
                  alt=""
                  className="eyeIcon"
                  onClick={togglePassword}
                />
              )}
              <label className="password-label">Password</label>{" "}
              <span className="inputLogin2Error inputLoginError">
                {inputLogin2Error}
              </span>
              <span className="loginspan1" style={{ color: `${color}` }}>
                Must be at least 8 characters
              </span> */}
            </div>
            <div className="icontick">
              <div>
                {remember ? (
                  <div
                    style={{
                      border: "1px solid black",
                      // display: "inline-block",
                    }}
                    className="remember-me1"
                    onClick={() => setRemember(false)}
                  />
                ) : (
                  <img
                    src={require("../../../Img/icontick.png")}
                    /*  height="12px"
                  width={"12px"} */
                    className="remember-me1"
                    alt=""
                    onClick={() => setRemember(true)}
                  />
                )}
                <span className="remember">Remember me</span>
              </div>
              <div>
                <Link to="/forgotpassword" style={{ margin: "0px" }}>
                  <span className="Forgot-password">Forgot password?</span>{" "}
                </Link>
              </div>
            </div>

            <button className="login-button" onClick={(e) => handleLogin(e)}>
              Login
            </button>
          </form>

          <div style={{ margin: "auto" }}>
            <span
              class="Dont-have-an-account-Sign-Up"
              style={{ fontWeight: "600", marginLeft: "19%" }}
            >
              Don’t have an account?
              <Link to="/signup" style={{ color: "#fa5e00", marginLeft: "1%" }}>
                <span
                  style={{
                    fontWeight: 600,
                    color: "#fa5e00",
                    cursor: "pointer",
                    fontSize: "18px",
                    fontFamily: "Outfit",
                  }}
                >
                  {" "}
                  Sign-Up
                </span>{" "}
              </Link>
            </span>
          </div>

          <div
            style={{
              marginLeft: "20%",
              marginTop: "3%",
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "Outfit",
            }}
          >
            <span>By continuing, you agree to our</span>
          </div>

          <div className="terms-policies">
            <span style={{ fontWeight: "300" }}>Terms of Service</span>
            <span style={{ marginLeft: "3%", fontWeight: "300" }}>
              Privacy Policy
            </span>
          </div>
        </div>
        <div class="Rectangle-2">
          {" "}
          <img
            src={require("../../../Img/couple1.png")}
            className="couple1Img"
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
