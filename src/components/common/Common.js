import React, { useState } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import ServiceList from "../After Customer Login/ServiceList/ServiceList";

import "./Common.css";

function Common() {
  const [collapse, setCollapse] = useState(false);
  const [display, setDisplay] = useState("redbar1");
  return (
   
      <div style={{ display: "flex",height:"100%" }}>
        <div className={`${collapse ? " sidebar1" : "sidebar"}`}>
          <div className="HPDSideBar">
            <img
              src={require("../../Img/HPDD.jpeg")}
              height="40px"
              width={"40px"}
            />
          </div>

          <Link
            to="servicerequest"
            style={{ textDecoration: "none", color: "black" }}
          >
            {" "}
            <li
              style={
                display == "redbar1"
                  ? { fontWeight: "600" }
                  : { fontWeight: "300" }
              }
              className="firstli"
              onClick={() => setDisplay("redbar1")}
            >
              {" "}
              <img
                src={require("../../Img/sidebar1.png")}
                height="20px"
                width={"20px"}
              />{" "}
              Get a Quote{" "}
              <img
                src={require("../../Img/redbar.png")}
                height="50px"
                width={"10px"}
                className="redbar1"
                style={
                  display == "redbar1"
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
              />{" "}
            </li>{" "}
          </Link>
          <li
            onClick={() => setDisplay("redbar2")}
            style={
              display == "redbar2"
                ? { fontWeight: "600" }
                : { fontWeight: "300" }
            }
          >
            {" "}
            <img
              src={require("../../Img/sidebar2.png")}
              height="20px"
              width={"20px"}
            />{" "}
            My Quotes{" "}
            <img
              src={require("../../Img/redbar.png")}
              height="50px"
              width={"10px"}
              className="redbar2"
              style={
                display == "redbar2"
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            />{" "}
          </li>
          <li
            onClick={() => setDisplay("redbar3")}
            style={
              display == "redbar3"
                ? { fontWeight: "600" }
                : { fontWeight: "300" }
            }
          >
            {" "}
            <img
              src={require("../../Img/sidebar3.png")}
              height="20px"
              width={"20px"}
            />{" "}
            My Service Requests{" "}
            <img
              src={require("../../Img/redbar.png")}
              height="50px"
              width={"10px"}
              className="redbar3"
              style={
                display == "redbar3"
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            />{" "}
          </li>

          <img
            src={require("../../Img/ellipse.png")}
            height="360px"
            width={"250px"}
            alt=""
            className="ellipse"
          />
        </div>

        <div style={{ width: "100%" }}>
          <div className={`${collapse ? "navbar1" : "navbar"}`}>
            <div>
              <img
                src={require("../../Img/toggleSideBar.png")}
                onClick={() => setCollapse(true)}
                height="40px"
                width={"40px"}
                className="collapse-icon"
              />
              <img
                src={require("../../Img/toggleback.png")}
                onClick={() => setCollapse(false)}
                height="40px"
                width={"40px"}
                className="collapse-left"
              />

              <div style={{ float: "right", marginRight: "100px" }}>
                <img
                  src={require("../../Img/homeIcon.png")}
                  height="40px"
                  width={"40px"}
                  className="home-icon"
                />
                <img
                  src={require("../../Img/bell.png")}
                  height="40px"
                  width={"40px"}
                  className="bell-icon"
                />

                <div className="name-icon">
                  <span
                    style={{
                      position: "relative",
                      bottom: "15px",
                      left: "70px",
                      color: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    Nizam Mongal
                  </span>
                  <img
                    src={require("../../Img/account.png")}
                    height="40px"
                    width={"40px"}
                    className="account-icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    
  );
}

export default Common;
