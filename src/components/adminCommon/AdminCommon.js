import React, { useEffect, useState } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Drawer,
  List,
  // ListItemIcon,
  // ListItemText,
  Collapse,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,

  // ListItemButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "react-modal";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import "./AdminCommon.css";
import { connect } from "react-redux";
// import * as React from 'react';
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

function AdminCommon({ adminFirstPageStatus }) {
  const Navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);
  const [display, setDisplay] = useState("redbar1");
  const [logout, setLogout] = useState(false);
  const [toggleSetup, setToggleSetup] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userData"));

  const toggleModal = () => {
    setLogout(!logout);
  };
  const signout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    Navigate("/");
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // console.log(adminFirstPageStatus);
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div className={`${collapse ? " adminsidebar1" : "adminsidebar"}`}>
        <div className="HPDSideBar1">
          <img
            style={{
              width: "70px",
              height: "70px",
              margin: "1px 915px 0px 0px;",
            }}
            src={require("../../Img/HPDD.jpeg")}
            alt="HPD"
          />
        </div>

        <Link
          to="accountrequest"
          style={{
            textDecoration: "none",
            color: "black",
            marginBottom: "10%",
          }}
        >
          <li
            style={
              display == "redbar1"
                ? { fontWeight: "600" }
                : { fontWeight: "300" }
            }
            className="navList"
            onClick={() => {
              setDisplay("redbar1");
              setToggleSetup(false);
            }}
          >
            {/* <span style={{ marginLeft: "5%" }}> */}
            <img
              src={require("../../Img/sidebaradmin1.png")}
              className="adminsidbar-icon"
            />
            <span style={{ marginRight: "20%" }}>Account Requests</span>
            {/* </span> */}
            <img
              src={require("../../Img/redbar.png")}
              height="70px"
              width="8px"
              // className="adminredbar1"
              style={
                display == "redbar1"
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            />
          </li>
        </Link>
        <Link
          to=""
          style={{
            textDecoration: "none",
            color: "black",
            marginTop: "10%",
          }}
        >
          <li
            style={
              display == "redbar2"
                ? { fontWeight: "600" }
                : { fontWeight: "300" }
            }
            className="navList"
            onClick={() => {
              setDisplay("redbar2");
              setToggleSetup(false);
            }}
          >
            <img
              src={require("../../Img/sidebaradmin2.png")}
              className="adminsidbar-icon"
            />
            <span style={{ marginRight: "20%" }}>Quote Requests</span>

            <img
              src={require("../../Img/redbar.png")}
              height="70px"
              width="8px"
              // className="adminredbar1"
              style={
                display == "redbar2"
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            />
          </li>
        </Link>

        <Link
          to="adminsrl"
          style={{
            textDecoration: "none",
            color: "black",
            marginTop: "10%",
          }}
        >
          <li
            style={
              display == "redbar3"
                ? { fontWeight: "600" }
                : { fontWeight: "300" }
            }
            className="navList"
            onClick={() => {
              setDisplay("redbar3");
              setToggleSetup(false);
            }}
          >
            <img
              src={require("../../Img/sidebaradmin3.png")}
              className="adminsidbar-icon"
            />{" "}
            <span style={{ marginRight: "20%" }}>Service Requests</span>
            <img
              src={require("../../Img/redbar.png")}
              height="70px"
              width="8px"
              // className="adminredbar1"
              style={
                display == "redbar3"
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            />
          </li>
        </Link>

        <Link
          to="businessuser"
          style={{
            textDecoration: "none",
            color: "black",
            marginTop: "10%",
          }}
        >
          <li
            style={
              display == "redbar4"
                ? { fontWeight: "600" }
                : { fontWeight: "300" }
            }
            className="navList"
            onClick={() => {
              setDisplay("redbar4");
              setToggleSetup(false);
            }}
          >
            <img
              src={require("../../Img/sidebaradmin41.jpg")}
              className="adminsidbar-icon"
            />{" "}
            <span style={{ marginRight: "20%" }}>Business Users</span>
            <img
              src={require("../../Img/redbar.png")}
              height="70px"
              width="8px"
              // className="adminredbar1"
              style={
                display == "redbar4"
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            />
          </li>
        </Link>
        <div>
          <Accordion
            sx={{ backgroundColor: "transparent", boxShadow: "none" }}
            expanded={toggleSetup}
            onChange={() => {
              setToggleSetup(!toggleSetup);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <SettingsIcon />
              <Typography
                sx={
                  toggleSetup
                    ? {
                        fontSize: "18px",
                        ml: 3,
                        width: "100%",
                        fontWeight: "600",
                        fontFamily: "Outfit",
                      }
                    : {
                        fontSize: "18px",
                        ml: 3,
                        width: "100%",
                        fontWeight: "300",
                        fontFamily: "Outfit",
                      }
                }
              >
                Setup
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Link
                to="ewall"
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginBottom: "5%",
                }}
              >
                <li
                  style={
                    display == "redbar5"
                      ? { fontWeight: "600" }
                      : { fontWeight: "300" }
                  }
                  className="navList"
                  onClick={() => setDisplay("redbar5")}
                >
                  <span style={{ marginLeft: "20%" }}>External Wall Type</span>

                  <img
                    src={require("../../Img/redbar.png")}
                    height="40px"
                    width="8px"
                    // className="adminredbar1"
                    style={
                      display == "redbar5"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  />
                </li>
              </Link>
              <Link
                to="internalType"
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginBottom: "5%",
                }}
              >
                <li
                  style={
                    display == "redbar6"
                      ? { fontWeight: "600" }
                      : { fontWeight: "300" }
                  }
                  className="navList"
                  onClick={() => setDisplay("redbar6")}
                >
                  <span style={{ marginLeft: "20%" }}>Internal Wall Type</span>

                  <img
                    src={require("../../Img/redbar.png")}
                    height="40px"
                    width="8px"
                    // className="adminredbar1"
                    style={
                      display == "redbar6"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  />
                </li>
              </Link>
              <Link
                to="roofType"
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginBottom: "5%",
                }}
              >
                <li
                  style={
                    display == "redbar7"
                      ? { fontWeight: "600" }
                      : { fontWeight: "300" }
                  }
                  className="navList"
                  onClick={() => setDisplay("redbar7")}
                >
                  <span style={{ marginLeft: "20%" }}>Roof Type</span>

                  <img
                    src={require("../../Img/redbar.png")}
                    height="40px"
                    width="8px"
                    // className="adminredbar1"
                    style={
                      display == "redbar7"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  />
                </li>
              </Link>
              <Link
                to="windowType"
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginBottom: "5%",
                }}
              >
                <li
                  style={
                    display == "redbar8"
                      ? { fontWeight: "600" }
                      : { fontWeight: "300" }
                  }
                  className="navList"
                  onClick={() => setDisplay("redbar8")}
                >
                  <span style={{ marginLeft: "20%" }}>Window Type</span>

                  <img
                    src={require("../../Img/redbar.png")}
                    height="40px"
                    width="8px"
                    // className="adminredbar1"
                    style={
                      display == "redbar8"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  />
                </li>
              </Link>
              <Link
                to="suspendedFloorType"
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginBottom: "5%",
                }}
              >
                <li
                  style={
                    display == "redbar9"
                      ? { fontWeight: "600" }
                      : { fontWeight: "300" }
                  }
                  className="navList"
                  onClick={() => setDisplay("redbar9")}
                >
                  <span style={{ marginLeft: "20%" }}>
                    Suspended Floor Type
                  </span>

                  <img
                    src={require("../../Img/redbar.png")}
                    height="40px"
                    width="8px"
                    // className="adminredbar1"
                    style={
                      display == "redbar9"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  />
                </li>
              </Link>
              <Link
                to="internalFloorType"
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginBottom: "5%",
                }}
              >
                <li
                  style={
                    display == "redbar10"
                      ? { fontWeight: "600" }
                      : { fontWeight: "300" }
                  }
                  className="navList"
                  onClick={() => setDisplay("redbar10")}
                >
                  <span style={{ marginLeft: "20%" }}>Internal Floor Type</span>

                  <img
                    src={require("../../Img/redbar.png")}
                    height="40px"
                    width="8px"
                    // className="adminredbar1"
                    style={
                      display == "redbar10"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  />
                </li>
              </Link>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* <Drawer>Setup</Drawer> */}

        <img
          src={require("../../Img/ellipse.png")}
          alt=""
          className="adminellipse"
        />
      </div>

      <div style={{ width: "100%" }}>
        <div className={`${collapse ? "adminnavbar1" : "adminnavbar"}`}>
          <div>
            <img
              src={require("../../Img/toggleSideBar.png")}
              onClick={() => setCollapse(!collapse)}
              /*     height="5.5vh"
              width={"2.6vw"} */
              className="admincollapse-icon"
            />
            {!adminFirstPageStatus ? (
              <img
                src={require("../../Img/toggleback.png")}
                onClick={() => {
                  window.history.back();
                }}
                /*     height="40px"
                width={"40px"} */
                className="admincollapse-left"
              />
            ) : null}

            <div style={{ float: "right", marginRight: "10.41vw" }}>
              <img
                src={require("../../Img/homeIcon.png")}
                className="adminhome-icon"
              />
              <img
                src={require("../../Img/bell.png")}
                className="adminbell-icon"
              />

              <div className="adminname-icon">
                <span
                  style={{
                    position: "relative",
                    // top: "0.3vh",
                    // color: "rgba(0, 0, 0, 0.6)",
                    // fontSize: "18px",
                    // fontWeight: "600",
                    // float: "right",
                    marginLeft: "30px",
                    color: "rgba(0, 0, 0, 0.6)",
                    fontSize: "18px",
                    fontWeight: "600",
                    top: "23px",
                  }}
                >
                  {userInfo.name}
                </span>

                <div>
                  <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    style={{
                      // width: "3.25vw",
                      // height: "6.71vh",
                      marginLeft: "7.81vw",
                      position: "relative",
                      bottom: "3vh",
                      display: "inline-block",
                      left: "3vw",
                    }}
                  >
                    <img
                      src={require("../../Img/account.png")}
                      className="adminaccount-icon"
                    />
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom-start"
                              ? "left top"
                              : "left bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem
                                style={{
                                  fontWeight: 600,
                                  fontSize: "18px",
                                }}
                                onClick={handleClose}
                              >
                                Profile
                              </MenuItem>
                              <MenuItem
                                style={{
                                  fontWeight: 600,
                                  fontSize: "18px",
                                }}
                                onClick={handleClose}
                              >
                                My Account
                              </MenuItem>
                              <MenuItem
                                style={{
                                  fontWeight: 600,
                                  fontSize: "18px",
                                }}
                                onClick={() => toggleModal()}
                              >
                                Logout
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={logout}
          className="logoutmodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <div>
            <form>
              <div className="logclose">
                <IconButton onClick={toggleModal}>
                  <CloseIcon sx={{ color: "black" }}></CloseIcon>
                </IconButton>
              </div>
              <div className="log-row1">
                <Typography
                  style={{
                    fontSize: "22px",
                    fontFamily: "Outfit",
                    margin: "0.67vh 0 0 0",
                  }}
                >
                  Are you sure you want to logout?
                </Typography>
              </div>
              <div className="log-row2">
                <div style={{ marginTop: "1.6vh" }}>
                  <button className="yesbtn" onClick={() => signout()}>
                    Yes
                  </button>
                  <button className="nobtn" onClick={toggleModal}>
                    No
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
        <Outlet />
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  adminFirstPageStatus: state.afpr.adminfirstPageStatus,
});

export default connect(mapStatetoProps)(AdminCommon);
