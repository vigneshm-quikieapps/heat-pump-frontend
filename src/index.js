import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import deviceNotSupported from "./deviceNotSupported";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import HPD from "./Img/HPDD.jpeg";
import icon from "./Img/illustration moving.webp";
import error from "./Img/icon error.webp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {isMobile ? (
        <div
          style={{
            minHeight: "100%",
            minWidth: "100%",
            backgroundImage:
              "linear-gradient(to bottom, #f4f2ea 0%, #d9d6c9 100%)",
          }}
        >
          {/* <div style={{ position: "absolute", top: "110px", height: "60%" }}> */}
          <img
            src={require("./Img/ellipse.png")}
            alt=""
            style={{ position: "absolute", top: "24%", width: "40%" }}
            // height={"100%"}
            // width={"60%"}
            // className="ellipse"
          />
          {/* </div> */}
          <div>
            <img
              style={{
                width: "10%",
                height: "10%",
                margin: "20px",
              }}
              src={HPD}
              alt="HPD"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "60%",
                height: "60%",
              }}
              src={icon}
              alt="icon"
            />
          </div>
          <div
            style={{
              marginTop: "20%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "70%",
                height: "85px",
                flexGrow: "0",
                borderRadius: "10px",
                backgroundColor: "#f4f2ea",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: "30px",
                padding: "0px 30px 0px 30px",
              }}
            >
              <div>
                <img
                  // style={{
                  //   width: "60px",
                  //   height: "60px",
                  //   margin: "20px",
                  // }}
                  src={error}
                  alt="error"
                />
              </div>

              <div
                style={{
                  // width: "60%",
                  flexGrow: "0",
                  // margin: "0 0 0 70px",
                  fontFamily: "Outfit",
                  fontSize: "1.5vh",
                  letterSpacing: " 0.03px",
                  textAlign: "left",
                  color: "#000",
                  fontWeight: "600",
                }}
              >
                This app is not optimised for your Mobile / Tablet. Kindly check
                this on a Desktop / Laptop.
              </div>
            </div>
            <div
              style={{
                width: "60%",
                minWidth: "200px",
                maxWidth: "250px",
              }}
            >
              <a
                href="https://heatpumpdesigner.com/"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    color: "white",
                    backgroundColor: "black",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                  variant="contained"
                  className="btn-house btn-icon"
                >
                  <span style={{ height: "27px", width: "27px" }}>
                    <ChevronLeftSharpIcon
                      sx={{ height: "27px", width: "27px" }}
                    />
                  </span>
                  <span style={{ marginLeft: "5px", fontSize: "1.8vh" }}>
                    Back to Website
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <App />
      )}
      {/* <App /> */}
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
