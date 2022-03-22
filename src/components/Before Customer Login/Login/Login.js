import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { toast,} from "react-toastify";
import { Triangle } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";

const passwords = {
  value: "",
  type: "password",
  showpassword: false,
};

const Login = () => {
  const [password, setPassword] = useState(passwords);
  const [emailValue, setEmailValue] = useState("");
  const [remember, setRemember] = useState(false);
  const [loader, setLoader] = useState(false);
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
    if (e.target.name === "password") {
      setPassword((state) => ({ ...state, value: e.target.value }));
    } else if (e.target.name === "email") {
      setEmailValue(e.target.value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (emailValue === "") {
      toast.error("Please enter the Username...");
      return false;
    }
    if (password.value === "") {
      toast.error("Please enter the Password...");
      return false;
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
          const res =response.data
          if (res.sucess) {
            localStorage.setItem("userData", JSON.stringify(res.data));
            localStorage.setItem("user", JSON.stringify(res.data.token));
            setLoader(false);
            navigate('/common/servicerequest');
          }
          else{
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

  useEffect(() => {
  }, [emailValue]);

  return (
    <div>
      {loader && (
        <div className="customLoader">
          <Triangle color="#007bff" height="130" width="130" />
        </div>
      )}
      <div className="-Login">
        <div className="firstHalf">
          <div className="HPD-Existing-Logo---01-1">
            <img
              src={require("../../../Img/HPD.png")}
              height="50px"
              width={"50px"}
              className="HBD"
            />
          </div>
          <div className="Login">Login</div>
          <form action="">
            <input
              type="text"
              className="email"
              value={emailValue}
              onChange={changeHandler}
              name="email"
              placeholder="Email Address"
            />
            <img
              src={require("../../../Img/icon.png")}
              height="12px"
              width={"16px"}
              alt=""
              className="emailIcon"
            />

            <input
              type={password.type}
              value={password.value}
              onChange={changeHandler}
              className="password"
              name="password"
              placeholder="Password"
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

            <div className="icontick">
              {remember ? (
                <div
                  style={{
                    border: "2px solid black",
                    display: "inline-block",
                    height: "12px",
                    width: "12px",
                  }}
                  onClick={() => setRemember(false)}
                />
              ) : (
                <img
                  src={require("../../../Img/icontick.png")}
                  height="12px"
                  width={"12px"}
                  alt=""
                  onClick={() => setRemember(true)}
                />
              )}
              <span style={{}} className="remember">
                Remember me
              </span>
              <Link to="/forgotpassword">
                <span className="Forgot-password">Forgot password?</span>{" "}
              </Link>
            </div>

            <button className="login-button" onClick={(e) => handleLogin(e)}>
              Login
            </button>
          </form>

          <div style={{ margin: "22px 0px 0px 165px" }}>
            <span
              class="Dont-have-an-account-Sign-Up"
              style={{ fontWeight: "600" }}
            >
              Don’t have an account?
              <Link
                to="/signup"
                style={{ color: "#fa5e00", marginLeft: "2px" }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    color: "#fa5e00",
                    cursor: "pointer",
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
              margin: "30px 0px 0px 185px",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            <span>By continuing, you agree to our</span>
          </div>

          <div className="terms-policies">
            <span style={{ fontWeight: "300" }}>Terms of Service</span>
            <span style={{ marginLeft: "5px", fontWeight: "300" }}>
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
