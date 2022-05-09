import React, { useEffect, useState } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Modal from "react-modal";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

  console.log(adminFirstPageStatus);
  return (
    // <div style={{ display: "flex", height: "100%" }}>
    //   <div className={`${collapse ? " sidebar1" : "sidebar"}`}>
    //     <div className="HPDSideBar">
    //       <img
    //         style={{
    //           width: "70px",
    //           height: "70px",
    //           margin: "1px 915px 0px 0px;",
    //         }}
    //         src={require("../../Img/HPDD.jpeg")}
    //         alt="HPD"
    //       />
    //     </div>

    //     <Link
    //       to="accountrequest"
    //       style={{ textDecoration: "none", color: "black" }}
    //     >
    //       {" "}
    //       <li
    //         style={
    //           display == "redbar1"
    //             ? { fontWeight: "600" }
    //             : { fontWeight: "300" }
    //         }
    //         className="firstli li"
    //         onClick={() => setDisplay("redbar1")}
    //       >
    //         {" "}
    //         <img
    //           src={require("../../Img/sidebaradmin1.png")}
    //           className="sidbar-icon"
    //         />{" "}
    //         Account Requests{" "}
    //         <img
    //           src={require("../../Img/redbar.png")}
    //           height="50px"
    //           width={"10px"}
    //           className="redbar1"
    //           style={
    //             display == "redbar1"
    //               ? { visibility: "visible" }
    //               : { visibility: "hidden" }
    //           }
    //         />{" "}
    //       </li>{" "}
    //     </Link>
    //     <Link to="myQuote" style={{ textDecoration: "none", color: "black" }}>
    //       <li
    //         onClick={() => setDisplay("redbar2")}
    //         style={
    //           display == "redbar2"
    //             ? { fontWeight: "600" }
    //             : { fontWeight: "300" }
    //         }
    //         className="myquotes-text li"
    //       >
    //         {" "}
    //         <img
    //           src={require("../../Img/sidebaradmin3.png")}
    //           className="sidbar-icon"
    //         />{" "}
    //         My Quotes{" "}
    //         <img
    //           src={require("../../Img/redbar.png")}
    //           height="50px"
    //           width={"10px"}
    //           className="redbar2"
    //           style={
    //             display == "redbar2"
    //               ? { visibility: "visible" }
    //               : { visibility: "hidden" }
    //           }
    //         />{" "}
    //       </li>
    //     </Link>
    //     <Link
    //       to="servicerequest"
    //       style={{ textDecoration: "none", color: "black" }}
    //     >
    //       <li
    //         onClick={() => setDisplay("redbar3")}
    //         style={
    //           display == "redbar3"
    //             ? { fontWeight: "600" }
    //             : { fontWeight: "300" }
    //         }
    //         className="my-servicerequest li"
    //       >
    //         {" "}
    //         <img
    //           src={require("../../Img/sidebar3.png")}
    //           className="sidbar-icon"
    //         />{" "}
    //         My Service Requests{" "}
    //         <img
    //           src={require("../../Img/redbar.png")}
    //           height="50px"
    //           width={"10px"}
    //           className="redbar3"
    //           style={
    //             display == "redbar3"
    //               ? { visibility: "visible" }
    //               : { visibility: "hidden" }
    //           }
    //         />{" "}
    //       </li>
    //     </Link>

    //     <img
    //       src={require("../../Img/ellipse.png")}
    //       /*  height="360px"
    //       width={"250px"} */
    //       alt=""
    //       className="ellipse"
    //     />
    //   </div>

    //   <div style={{ width: "100%" }}>
    //     <div className={`${collapse ? "navbar1" : "navbar"}`}>
    //       <div>
    //         <img
    //           src={require("../../Img/toggleSideBar.png")}
    //           onClick={() => setCollapse(!collapse)}
    //           className="collapse-icon"
    //         />
    //         {!adminFirstPageStatus /* {<Link
    //           to="servicerequest"
    //           style={{ textDecoration: "none", color: "black" }} >} */ ? (
    //           <img
    //             src={require("../../Img/toggleback.png")}
    //             onClick={() => {
    //               window.history.back();
    //             }}
    //             className="collapse-left"
    //           />
    //         ) : null}

    //         <div style={{ float: "right", marginRight: "6.11vw" }}>
    //           <img
    //             src={require("../../Img/homeIcon.png")}
    //             className="home-icon"
    //           />
    //           <img src={require("../../Img/bell.png")} className="bell-icon" />

    //           <div className="name-icon">
    //             <span
    //               style={{
    //                 position: "absolute",
    //                 // bottom: "2vh",
    //                 // top: "3vh",
    //                 // left: "2.55vw",
    //                 marginLeft: "17px",
    //                 color: "rgba(0, 0, 0, 0.6)",
    //                 fontSize: "18px",
    //                 fontWeight: "600",
    //               }}
    //             >
    //               {userInfo.name}
    //             </span>
    //             <div>
    //               <Button
    //                 ref={anchorRef}
    //                 id="composition-button"
    //                 aria-controls={open ? "composition-menu" : undefined}
    //                 aria-expanded={open ? "true" : undefined}
    //                 aria-haspopup="true"
    //                 onClick={handleToggle}
    //                 style={{
    //                   // width: "3.25vw",
    //                   // height: "6.71vh",
    //                   marginLeft: "7.81vw",
    //                   position: "relative",
    //                   bottom: "3vh",
    //                   display: "inline-block",
    //                   left: "3vw",
    //                 }}
    //                 size="small"
    //               >
    //                 <img
    //                   src={require("../../Img/account.png")}
    //                   className="account-icon"
    //                 />
    //               </Button>
    //               <Popper
    //                 open={open}
    //                 anchorEl={anchorRef.current}
    //                 role={undefined}
    //                 placement="bottom-start"
    //                 transition
    //                 disablePortal
    //               >
    //                 {({ TransitionProps, placement }) => (
    //                   <Grow
    //                     {...TransitionProps}
    //                     style={{
    //                       transformOrigin:
    //                         placement === "bottom-start"
    //                           ? "left top"
    //                           : "left bottom",
    //                     }}
    //                   >
    //                     <Paper>
    //                       <ClickAwayListener onClickAway={handleClose}>
    //                         <MenuList
    //                           autoFocusItem={open}
    //                           id="composition-menu"
    //                           aria-labelledby="composition-button"
    //                           onKeyDown={handleListKeyDown}
    //                           sx={{ width: "150px" }}
    //                         >
    //                           <MenuItem
    //                             style={{
    //                               fontWeight: 600,
    //                               fontSize: "18px",
    //                               width: "150px",
    //                             }}
    //                             onClick={handleClose}
    //                           >
    //                             Profile
    //                           </MenuItem>
    //                           <MenuItem
    //                             style={{
    //                               fontWeight: 600,
    //                               fontSize: "18px",
    //                               width: "150px",
    //                             }}
    //                             onClick={handleClose}
    //                           >
    //                             My Account
    //                           </MenuItem>
    //                           <MenuItem
    //                             style={{
    //                               fontWeight: 600,
    //                               fontSize: "18px",
    //                               width: "150px",
    //                             }}
    //                             onClick={() => toggleModal()}
    //                           >
    //                             Logout
    //                           </MenuItem>
    //                         </MenuList>
    //                       </ClickAwayListener>
    //                     </Paper>
    //                   </Grow>
    //                 )}
    //               </Popper>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <Modal
    //       isOpen={logout}
    //       className="logoutmodal"
    //       overlayClassName="myoverlay"
    //       closeTimeoutMS={500}
    //     >
    //       <div>
    //         <form>
    //           <div className="logclose">
    //             <IconButton onClick={toggleModal}>
    //               <CloseIcon sx={{ color: "black" }}></CloseIcon>
    //             </IconButton>
    //           </div>
    //           <div className="log-row1">
    //             <h5
    //               style={{
    //                 fontSize: "22px",
    //                 fontFamily: "Outfit",
    //                 margin: "0.67vh 0 0 0",
    //               }}
    //             >
    //               Are you sure you want to logout?
    //             </h5>
    //           </div>
    //           <div className="log-row2">
    //             <div style={{ marginTop: "1.6vh" }}>
    //               <button className="yesbtn" onClick={() => signout()}>
    //                 Yes
    //               </button>
    //               <button className="nobtn" onClick={toggleModal}>
    //                 No
    //               </button>
    //             </div>
    //           </div>
    //         </form>
    //       </div>
    //     </Modal>
    //     <Outlet />
    //   </div>
    // </div>

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
            onClick={() => setDisplay("redbar1")}
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
            onClick={() => setDisplay("redbar2")}
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
        {/* <li
          onClick={() => setDisplay("redbar2")}
          style={
            display == "redbar2" ? { fontWeight: "600" } : { fontWeight: "300" }
          }
          className="adminmyquotes-text li"
        >
          {" "}
          <img
            src={require("../../Img/sidebaradmin2.png")}
            className="adminsidbar-icon"
          />{" "}
          Quotes Request{" "}
          <img
            src={require("../../Img/redbar.png")}
            className="adminredbar2"
            style={
              display == "redbar2"
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          />{" "}
        </li> */}
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
            onClick={() => setDisplay("redbar3")}
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
        {/* <Link to="adminsrl" style={{ textDecoration: "none", color: "black" }}>
          <li
            onClick={() => setDisplay("redbar3")}
            style={
              display == "redbar3"
                ? { fontWeight: "600" }
                : { fontWeight: "300" }
            }
            className="adminmy-servicerequest li"
          >
            {" "}
            <img
              src={require("../../Img/sidebaradmin3.png")}
              className="adminsidbar-icon"
            />{" "}
            Service Requests{" "}
            <img
              src={require("../../Img/redbar.png")}
              className="adminredbar3"
              style={
                display == "redbar3"
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            />{" "}
          </li>
        </Link> */}
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
            onClick={() => setDisplay("redbar4")}
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
        {/* <Link
          to="businessuser"
          style={{ textDecoration: "none", color: "black" }}
        >
          <li
            onClick={() => setDisplay("redbar4")}
            style={
              display == "redbar4"
                ? { fontWeight: "600" }
                : { fontWeight: "300" }
            }
            className="adminmy-servicerequest li"
          >
            {" "}
            <img
              src={require("../../Img/sidebaradmin41.jpg")}
              style={{ borderRadius: "0.33vw" }}
              className="adminsidbar-icon"
            />{" "}
            Business Users{" "}
            <img
              src={require("../../Img/redbar.png")}
              className="adminredbar4"
              style={
                display == "redbar4"
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            />{" "}
          </li>
        </Link> */}
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
