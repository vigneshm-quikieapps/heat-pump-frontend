import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";

import Modal from "react-modal";
import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

import "./Common.css";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { customerDetailsReset } from "../../Redux/customerDetails/customerDetails.action";

function Common({ firstPageStatus, customerDetailsReset }) {
  const Navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);
  const [display, setDisplay] = useState("");
  const [logout, setLogout] = useState(false);
  const myRef = useRef(null);
  // useEffect(() => {
  //   myRef.current.scrollIntoView();
  // }, []);
  useEffect(() => {
    setDisplay("");
  }, [window.location.pathname]);

  const userInfo = JSON.parse(localStorage.getItem("userData"));

  console.log(userInfo.name);

  const toggleModal = () => {
    setLogout(!logout);
  };
  const signout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    customerDetailsReset();
    /* localStorage.clear(); */
    Navigate("/");
  };
  console.log(firstPageStatus);

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

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <div className={`${collapse ? " sidebar1" : "sidebar"}`}>
        <div className="HPDSideBar">
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

        <Link to="createJob" style={{ textDecoration: "none", color: "black" }}>
          {" "}
          <li
            style={
              display == "redbar1"
                ? { fontWeight: "600" }
                : { fontWeight: "300" }
            }
            className="firstli li"
            onClick={() => setDisplay("redbar1")}
          >
            {" "}
            <img
              src={require("../../Img/sidebar1.png")}
              className="sidbar-icon"
            />{" "}
            Book a Job{" "}
            {
              <img
                src={require("../../Img/redbar.png")}
                height="50px"
                width={"10px"}
                className="redbar1"
                style={
                  window.location.pathname == "/common/createJob" ||
                  display == "redbar1"
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
              />
            }{" "}
          </li>{" "}
        </Link>
        <Link to="myQuote" style={{ textDecoration: "none", color: "black" }}>
          <li
            onClick={() => setDisplay("redbar2")}
            style={
              display == "redbar2"
                ? { fontWeight: "600" }
                : { fontWeight: "300" }
            }
            className="myquotes-text li"
          >
            {" "}
            <img
              src={require("../../Img/myjob icon.png")}
              className="sidbar-icon"
            />{" "}
            My Jobs{" "}
            {
              <img
                src={require("../../Img/redbar.png")}
                height="50px"
                width={"10px"}
                className="redbar2"
                style={
                  window.location.pathname == "/common/myQuote" ||
                  display == "redbar2"
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
              />
            }{" "}
          </li>
        </Link>
        <Link
          to="servicerequest"
          style={{ textDecoration: "none", color: "black" }}
        >
          <li
            onClick={() => setDisplay("redbar3")}
            style={
              display == "redbar3"
                ? { fontWeight: "600" }
                : { fontWeight: "300" }
            }
            className="my-servicerequest li"
          >
            {" "}
            <img
              src={require("../../Img/msr icon.png")}
              className="sidbar-icon"
            />{" "}
            My Service Requests{" "}
            {
              <img
                src={require("../../Img/redbar.png")}
                height="50px"
                width={"10px"}
                className="redbar3"
                style={
                  window.location.pathname == "/common/servicerequest" ||
                  display == "redbar3"
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
              />
            }{" "}
          </li>
        </Link>

        <img
          src={require("../../Img/ellipse.png")}
          /*  height="360px"
            width={"250px"} */
          alt=""
          className="ellipse"
        />
      </div>

      <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
        <div className={`${collapse ? "navbar1" : "navbar"}`}>
          <div>
            {!collapse ? (
              <img
                src={require("../../Img/toggleSideBar.png")}
                onClick={() => setCollapse(!collapse)}
                className="collapse-icon"
              />
            ) : (
              <img
                src={require("../../Img/icon Menu with back.png")}
                onClick={() => setCollapse(!collapse)}
                className="collapse-icon"
              />
            )}
            {!firstPageStatus /* {<Link 
                to="servicerequest"
                style={{ textDecoration: "none", color: "black" }} >} */ ? (
              <img
                src={require("../../Img/toggleback.png")}
                onClick={() => {
                  window.history.back();
                }}
                className="collapse-left"
              />
            ) : null}

            <div
              style={{
                float: "right",

                width: "310px",
              }}
            >
              <Box
                ref={myRef}
                sx={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img
                  className="home-icon"
                  onClick={() => {
                    Navigate("/common/HomePage");
                  }}
                  src={require("../../Img/homeIcon.png")}
                  // className="home-icon"
                />
                {/* <img src={require("../../Img/bell.png")} /> */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                >
                  {/* <div> */}
                  <span style={{}}>{userInfo.name}</span>
                  {/* <div> */}
                  <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    size="small"
                  >
                    <img
                      src={require("../../Img/account.png")}
                      // className="account-icon"
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
                              sx={{ width: "150px" }}
                            >
                              <MenuItem
                                style={{
                                  // margin: "8px 8px 8px 20px",
                                  fontWeight: 600,
                                  fontSize: "18px",
                                  // width: "150px",
                                  justifyContent: "flex-start",
                                }}
                                onClick={() => {
                                  Navigate("/common/MyProfile");
                                }}
                              >
                                <img
                                  style={{ marginRight: "8px" }}
                                  // className="home-icon"
                                  src={require("../../Img/icon my account.png")}
                                  // className="home-icon"
                                />{" "}
                                My Profile
                              </MenuItem>

                              <MenuItem
                                style={{
                                  // margin: "8px 8px 8px 20px",
                                  fontWeight: 600,
                                  fontSize: "18px",
                                  // width: "150px",
                                  justifyContent: "flex-start",
                                }}
                                onClick={() => toggleModal()}
                              >
                                <img
                                  // className="home-icon"
                                  style={{ marginRight: "8px" }}
                                  src={require("../../Img/icon logout 1.png")}
                                  // className="home-icon"
                                />{" "}
                                Logout
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Box>
              </Box>
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
                <h5
                  style={{
                    fontSize: "22px",
                    fontFamily: "Outfit",
                    margin: "0.67vh 0 0 0",
                  }}
                >
                  Are you sure you want to logout?
                </h5>
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
  firstPageStatus: state.fpr.firstPageStatus,
  customerDetails: state.cdr,
});

const mapDispatchToProps = (dispatch) => ({
  customerDetailsReset: () => dispatch(customerDetailsReset()),
});
export default connect(mapStatetoProps, mapDispatchToProps)(Common);
