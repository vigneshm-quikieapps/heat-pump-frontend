import React, { useState, useEffect, useRef } from "react";
import "./AdminRCA.css";
import { Box } from "@material-ui/core";
// import { useParams } from "react-router";
import {
  Typography,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
} from "@mui/material";
import { Card, Accordion, ImgIcon, Grid } from "../../../common";
import StyledTextField from "../../../common/textfield";
import Radio from "@mui/material/Radio";
import { makeStyles } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import { toast } from "react-toastify";

import Modal from "react-modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FileUploader } from "react-drag-drop-files";
import globalAPI from "../../../GlobalApi";
import URL from "../../../GlobalUrl";
import axios from "axios";
import DropdownIcon from "../../../Img/icon dropdown.png";
import { connect } from "react-redux";
import { adminFirstPageAction } from "../../../Redux/AdminFirstPage/adminFirstPage.action";

const fileTypes = ["PDF", "PNG", "JPEG"];
const useStyles = makeStyles({
  radio: {
    height: "2.8vh",
    width: "1.33vw",
  },
});

function AdminRCA({ adminFirstPageAction }) {
  const { state } = useLocation();
  const [i, seti] = useState(false);
  const [i1, seti1] = useState(false);
  const [i2, seti2] = useState(false);
  const [i3, seti3] = useState(false);
  const [loader, setLoader] = useState(false);
  const [addfiles, setAddfiles] = useState(false);
  const [isOpend, setIsOpend] = useState(false);
  const [inputData, setInputData] = useState(useLocation().state);
  const [show, setShow] = useState(true);
  const [checked, setChecked] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"));
  const initialStatus = inputData.status;
  const [status, setStatus] = useState(initialStatus);
  const [fname, SetFname] = useState([]);
  const [efname, SetEFname] = useState([]);
  // const ExistingLen = inputData.evidences.length;

  useEffect(() => {
    adminFirstPageAction(false);
  }, []);

  useEffect(() => {
    console.log("inputdata", inputData);
    const newArray = [];
    inputData &&
      inputData.evidences.map((item, index) => {
        let a = item.slice(25);
        if (a.length > 20) {
          let b = a.slice(0, 20);
          let c = b + "...";
          newArray.push(c);
        } else {
          newArray.push(a);
        }
      });
    SetEFname(newArray);
  }, [inputData]);

  const changeHandler = (e) => {
    setInputData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  const changeHandler2 = (e) => {
    e.target.blur();
    setInputData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const changestatus = (e) => {
    if (e.target.name == "inprogress") {
      setStatus(2);
    }
    if (e.target.name == "approve") {
      setStatus(3);
    }
    if (e.target.name == "reject") {
      setStatus(5);
    }
    if (e.target.name == "inactive") {
      setStatus(6);
    }
  };

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setLoader(true);

      const data = { ...inputData, status: status };
      setInputData({ ...inputData, status: status });
      axios({
        method: "patch",
        url: URL + globalAPI.adminedituser + `?id=${state._id}`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setLoader(false);
          const res = response.data;
          console.log(res);
          if (res.success) {
            toast.success("Status changed");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch(() => {
          setLoader(false);
          toast.error("Something went wrong");
        });
    }
  }, [status]);

  const togglefileModal = () => {
    setAddfiles(!addfiles);
    SetFname([]);
  };

  const onFileUpload = (e) => {
    if (e) {
      let formData = new FormData();
      formData.append("attachments", e);
      setLoader(true);
      const token = JSON.parse(localStorage.getItem("user"));
      axios({
        method: "post",
        url: URL + globalAPI.fileupload,
        data: formData,
        headers: {
          "Content-Type": "application/pdf",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const res = response.data;
          setLoader(false);
          if (res.success) {
            toast.success("File Added");
            inputData.evidences.push(res.data.message[0]);
            const newUpload = [];
            let a = res.data.message[0].slice(25);
            if (a.length > 20) {
              let b = a.slice(0, 20);
              let c = b + "...";
              newUpload.push(c);
            } else {
              newUpload.push(a);
            }
            const newName = [...fname];
            newName.push(newUpload);
            SetFname(newName);

            const newFile = [...efname];
            newFile.push(newUpload);
            SetEFname(newFile);
            // efname.push(newUpload);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          setLoader(false);
          toast.error("Something Went Wrong");
        });
    } else {
      setLoader(false);
      toast.error("Please add Attachments");
    }
  };

  const removeFile = (index) => {
    const newValue = [...inputData.evidences];
    newValue.splice(index, 1);
    setInputData((state) => ({ ...state, evidences: newValue }));

    const newName = [...efname];
    newName.splice(index, 1);
    SetEFname(newName);
  };

  const removeTFile = (index) => {
    // const oldLen = ExistingLen + index;
    const newValue = [...inputData.evidences];
    newValue.splice(index, 1);
    setInputData((state) => ({ ...state, evidences: newValue }));

    const newName = [...fname];
    newName.splice(index, 1);
    SetFname(newName);
  };

  const newUpload = (e) => {
    setLoader(true);
    const data = { ...inputData };
    axios({
      method: "patch",
      url: URL + globalAPI.adminedituser + `?id=${state._id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoader(false);
        const res = response.data;
        console.log(res);
        if (res.success) {
          toast.success("Updated successfully");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  };

  const classess = useStyles();

  return (
    <>
      <div className="adminRCAcontainer">
        {loader && (
          <div className="customLoader">
            <TailSpin color="#fa5e00" height="100" width="100" />
          </div>
        )}
        <h1 className="get-a-quote">Manage Customer Account Request</h1>
        <hr className="quote" />
        {/* <div className="adminRCAtitle" style={{ fontSize: "2.9vw" }}>
        Manage Customer Account Request
      </div> */}
        {/* <hr className="adminRCAcontainerhr" /> */}
        <Card>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ width: "60%" }}>
              <Typography
                style={{
                  color: "#fa5e00",
                  fontSize: "28px",
                  fontWeight: "600",
                  fontFamily: "Outfit",
                }}
              >
                {inputData.name}
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",

                  fontFamily: "Outfit",
                  fontWeight: "900",
                }}
              >
                {`${inputData.address_1}, ${inputData.city}`}
              </Typography>
              <hr className="under_quote" />
            </Box>
            <Box>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  fontFamily: "Outfit",
                }}
              >
                {status == 1
                  ? "New"
                  : status == 2
                  ? "In Progress"
                  : status == 3
                  ? "Approved"
                  : status == 5
                  ? "Rejected"
                  : status == 6
                  ? "Inactive"
                  : "New"}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 2,
              width: "70%",
              display: "flex",
              flexDirection: "row",
              // justifyContent: "space-evenly",
              gap: "20px",
            }}
          >
            <button
              className={`${
                status == 2 || status == 3 || status == 5
                  ? "disbtn"
                  : "progressbtn"
              }`}
              name="inprogress"
              onClick={(e) => changestatus(e)}
            >
              In Progress
            </button>
            <button
              className={`${
                status == 3 || status == 5 ? "disbtn" : "approvebtn"
              }`}
              name="approve"
              onClick={(e) => changestatus(e)}
            >
              Approve
            </button>
            <button
              className={`${
                status == 3 || status == 5 ? "disbtn" : "rejectbtn"
              }`}
              name="reject"
              onClick={(e) => changestatus(e)}
            >
              Reject
            </button>
            <button
              className={`${
                status == 1 || status == 2 || status == 5
                  ? "disbtn"
                  : "Inactivebtn"
              }`}
              name="inactive"
              onClick={(e) => changestatus(e)}
            >
              Inactive
            </button>
          </Box>
          <Box>
            <Accordion
              sx={{ margin: "0px -10px !important" }}
              expanded={i}
              onChange={() => {
                seti(!i);
                seti1(false);
                seti2(false);
                seti3(false);
              }}
            >
              <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
                <Typography
                  sx={{
                    fontSize: "25px !important",
                    fontWeight: "900 !important",
                    fontFamily: "Outfit !important",
                  }}
                >
                  Customer Contact Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0, m: 0 }}>
                <Grid
                  gridTemplateColumns="repeat(1, 1fr)"
                  columnGap="10px"
                  columnCount={2}
                >
                  <Box>
                    <StyledTextField
                      sx={{ width: "450px", height: "60px" }}
                      required
                      type="text"
                      value={inputData.name}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      name="name"
                      label="Full Name"
                    />
                  </Box>
                  <Box>
                    <StyledTextField
                      sx={{ width: "450px", height: "60px" }}
                      required
                      type="text"
                      onChange={changeHandler}
                      value={inputData.email}
                      label="Email Address"
                      name="email"
                    />
                  </Box>
                  {/* <Box>
                    <StyledTextField
                      sx={{ width: "450px", height: "60px" }}
                      required
                      type="password"
                      onChange={changeHandler}
                      value={inputData.password}
                      name="password"
                      label="Password"
                    />
                  </Box> */}
                  <Box>
                    <StyledTextField
                      sx={{ width: "450px", height: "60px" }}
                      required
                      type="text"
                      onChange={changeHandler}
                      value={inputData.mobile}
                      name="mobile"
                      label="Mobile Number"
                    />
                  </Box>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ margin: "0px -10px !important" }}
              expanded={i1}
              onChange={() => {
                seti1(!i1);
                seti(false);
                seti2(false);
                seti3(false);
              }}
            >
              <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
                <Typography
                  sx={{
                    fontSize: "25px !important",
                    fontWeight: "900 !important",
                    fontFamily: "Outfit !important",
                  }}
                >
                  Business Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <Grid
                  gridTemplateColumns="repeat(1, 1fr)"
                  columnGap="10px"
                  columnCount={2}
                >
                  <Box>
                    <StyledTextField
                      sx={{ width: "450px", height: "60px" }}
                      required
                      type="text"
                      value={inputData.business_registered_name}
                      onChange={changeHandler}
                      name="business_registered_name"
                      label="Business Registered Name"
                    />
                  </Box>
                  <Box>
                    <StyledTextField
                      sx={{ width: "450px", height: "60px" }}
                      required
                      type="text"
                      value={inputData.business_trade_name}
                      onChange={changeHandler}
                      name="business_trade_name"
                      label="Business Trade Name"
                    />
                  </Box>

                  <Box>
                    <StyledTextField
                      sx={{ width: "450px", height: "60px" }}
                      required
                      select
                      onChange={changeHandler}
                      value={inputData.business_type}
                      name="business_type"
                      label="Business Type"
                    >
                      <MenuItem value="1">Limited Company</MenuItem>
                      <MenuItem value="2">
                        Limited Liability Partnership
                      </MenuItem>
                      <MenuItem value="3">Sole Trader</MenuItem>
                    </StyledTextField>
                  </Box>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ margin: "0px -10px !important" }}
              expanded={i2}
              onChange={() => {
                seti2(!i2);
                seti1(false);
                seti(false);
                seti3(false);
              }}
            >
              <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
                <Typography
                  sx={{
                    fontSize: "25px !important",
                    fontWeight: "900 !important",
                    fontFamily: "Outfit !important",
                  }}
                >
                  Business Address
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <Grid
                  gridTemplateColumns="repeat(1, 1fr)"
                  columnGap="10px"
                  columnCount={2}
                >
                  <Box>
                    <StyledTextField
                      sx={{ width: "450px", height: "60px" }}
                      required
                      type="text"
                      value={inputData.name}
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                      name="name"
                      label="Full Name"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Radio
                      type="radio"
                      name="radio"
                      label="Enter Address manually"
                      className={classess.radio}
                      checked={checked}
                      onClick={() => {
                        checked ? setChecked(false) : setChecked(true);
                        show === false && setShow(!show);
                      }}
                    />
                    <Typography
                      style={{
                        fontSize: "18px",
                        marginLeft: "2%",
                        fontFamily: "Outfit",
                        fontWeight: "900",
                      }}
                    >
                      Enter Address manually
                    </Typography>
                  </Box>
                  <Box>
                    <StyledTextField
                      sx={{ width: "450px", height: "60px" }}
                      required
                      type="text"
                      value={inputData.address_1}
                      onChange={changeHandler}
                      name="address_1"
                      disabled={checked == false ? true : false}
                      label="Address Line 1"
                    />
                  </Box>
                  <Box>
                    <StyledTextField
                      sx={{ width: "450px", height: "60px" }}
                      required
                      type="text"
                      value={inputData.address_2}
                      onChange={changeHandler}
                      name="address_2"
                      disabled={checked === false ? true : false}
                      label="Address Line 2"
                    />
                  </Box>
                  <Box>
                    <StyledTextField
                      sx={{ width: "450px", height: "60px" }}
                      required
                      type="text"
                      value={inputData.city}
                      onChange={changeHandler}
                      name="city"
                      disabled={checked === false ? true : false}
                      label="City/Town"
                    />
                  </Box>
                  <Box>
                    <StyledTextField
                      sx={{ width: "450px", height: "60px" }}
                      required
                      type="text"
                      value={inputData.postcode}
                      onChange={changeHandler}
                      name="postcode"
                      disabled={checked === false ? true : false}
                      label="Postcode"
                    />
                  </Box>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ margin: "0px -10px !important" }}
              expanded={i3}
              onChange={() => {
                seti3(!i3);
                seti1(false);
                seti2(false);
                seti(false);
              }}
            >
              <AccordionSummary expandIcon={<ImgIcon>{DropdownIcon}</ImgIcon>}>
                <Typography
                  sx={{
                    fontSize: "25px !important",
                    fontWeight: "900 !important",
                    fontFamily: "Outfit !important",
                  }}
                >
                  Supporting Documents
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <Box
                  sx={{
                    width: "300px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    className="adminDocumentBtn"
                    onClick={() => togglefileModal()}
                  >
                    Add Supporting Documents
                  </button>
                  <Typography
                    sx={{
                      mt: 2,
                      color: "#fa5e00",
                      fontSize: "22px",
                      fontWeight: "600",
                      fontFamily: "Outfit",
                      textAlign: "center",
                    }}
                  >
                    Attachments
                  </Typography>
                  <hr className="attach-Quote" />
                  <Box sx={{ m: 0, p: 0 }}>
                    {efname ? (
                      efname.map((item, index) => {
                        return (
                          <div
                            className="adminRCAfile"
                            style={{ borderRadius: "1.9vw" }}
                            key={index}
                          >
                            <span style={{ float: "left", marginLeft: "1vw" }}>
                              <img
                                src={require("../../../Img/attachIcon.png")}
                                style={{
                                  height: "25px",
                                  width: "25px",
                                }}
                              />

                              <span
                                className="adminfileName"
                                style={{ fontSize: "18px" }}
                              >
                                {efname[index]}
                              </span>
                            </span>

                            <img
                              src={require("../../../Img/iconDelete.png")}
                              onClick={() => removeFile(index)}
                              height="22px"
                              width={"20px"}
                              style={{
                                marginRight: "1.33vw",
                                height: "3vh",
                                width: "1.33vw",
                              }}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <span style={{ marginLeft: "1.9vw", fontSize: "0.9vw" }}>
                        No attachments found
                      </span>
                    )}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Box>
              <button className="adminsavebtn" onClick={() => newUpload()}>
                Save
              </button>
            </Box>
          </Box>
        </Card>
        <Modal
          isOpen={addfiles}
          className="myattachmodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <div>
            <div className="dialogclose">
              <IconButton onClick={() => togglefileModal()}>
                <CloseIcon sx={{ color: "black" }}></CloseIcon>
              </IconButton>
            </div>
            <div className="dialog-row1">
              <h5 style={{ fontSize: "22px", margin: "0.67vh 0 0 0" }}>
                Add Attachment
              </h5>
              <hr className="clhrFirst" />
              <h5 className="dialogname">{inputData.name}</h5>
            </div>
            <div className="dialog-row2">
              <div>
                <FileUploader
                  handleChange={(e) => onFileUpload(e)}
                  name="file"
                  types={fileTypes}
                  onTypeError={(err) =>
                    toast.error("Only pdf, png, jpeg files are allowed")
                  }
                  children={
                    <span className="dragndrop">
                      Drag and Drop Here
                      <img
                        src={require("../../../Img/iconcloud.png")}
                        style={{
                          marginLeft: "1.33vw",
                          height: "3.3vh",
                          width: "1.6vw",
                        }}
                      />
                    </span>
                  }
                />

                <span className="or">OR</span>

                <span>
                  <FileUploader
                    handleChange={(e) => onFileUpload(e)}
                    name="file"
                    types={fileTypes}
                    onTypeError={(err) =>
                      toast.error("Only pdf, png, jpeg files are allowed")
                    }
                    children={
                      <span className="browse">
                        <button className="browsebtn">Browse</button>
                      </span>
                    }
                  />
                </span>
              </div>
              {fname &&
                fname.map((item, index) => {
                  return (
                    <div
                      className="file"
                      style={{ borderRadius: "1.9vw" }}
                      key={index}
                    >
                      <span style={{ float: "left", marginLeft: "1vw" }}>
                        <img
                          src={require("../../../Img/attachIcon.png")}
                          style={{
                            height: "2.8vh",
                            width: "1vw",
                          }}
                        />

                        <span className="fileName">{fname[index]}</span>
                      </span>

                      <img
                        src={require("../../../Img/iconDelete.png")}
                        onClick={() => removeTFile(index)}
                        style={{
                          marginRight: "1.33vw",
                          height: "3vh",
                          width: "1.33vw",
                        }}
                      />
                    </div>
                  );
                })}
            </div>
            {/* <span className="browse"> */}
            <button
              className="browsebtn"
              onClick={() => {
                setAddfiles(false);
              }}
            >
              Submit
            </button>
            {/* </span> */}
            {/* <span className="browse"> */}
            <button
              className="cancel"
              onClick={() => {
                setAddfiles(false);
              }}
            >
              Cancel
            </button>
            {/* </span> */}
          </div>
        </Modal>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  adminFirstPageAction: (value) => dispatch(adminFirstPageAction(value)),
});

export default connect(null, mapDispatchToProps)(AdminRCA);
