import "./ManageServiceRequest.css";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import StyledTextField from "../../../../src/common/textfield";
import {
  IconButton,
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import { saveAs } from "file-saver";
import { FileUploader } from "react-drag-drop-files";
import moment from "moment";

import globalAPI from "../../../GlobalApi";
import URL from "../../../GlobalUrl";
import axios from "axios";

import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

import { connect } from "react-redux";
import { FirstPageAction } from "../../../Redux/FirstPage/FirstPage.action";

const fileTypes = ["PDF", "PNG", "JPEG"];

const useStyles = makeStyles({
  selectfield: {
    marginTop: "20px",
    "& label.Mui-focused": {
      color: "black",
      fontFamily: "outfit",
      fontWeight: "bold",
      fontSize: "16px",
    },
    "& .MuiFormLabel-root": {
      fontWeight: "bold",
      fontSize: "16px",
      fontFamily: "outfit",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "9px",
      marginRight: "17px",
      width: "400px",
      height: "45px",
      fontWeight: "bolder",
      fontFamily: "outfit",
      backgroundColor: "white",

      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    icons: {
      fontSize: "8px",
    },
  },
  selectinput: {
    marginBottom: "4.5px",
    fontFamily: "outfit",
    fontWeight: "bold",
    fontSize: "16px",
  },
  rowfield: {
    "&:hover": {
      borderColor: "#cdcdcd !important",
    },
    "& .MuiFilledInput-root": {
      backgroundColor: "white",
      "&::after ,::before": { display: "none" },
      "& .MuiFilledInput-input": {
        "&:focus": { backgroundColor: "transparent" },
      },
    },
    "& label.Mui-focused": {
      color: "red",
      background: "#fff",
    },
    "& .MuiFormLabel-root": {
      fontWeight: "300",
      fontSize: "18px",
      fontFamily: "outfit",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "9px",
      marginRight: "17px",
      width: "500px",
      // fontWeight: "bolder",
      fontFamily: "outfit",
      backgroundColor: "white",

      "&.Mui-focused fieldset": {
        borderColor: "#cdcdcd",
      },

      "&::after ,::before": { display: "none" },
      "& .MuiFilledInput-input": {
        "&:focus": { backgroundColor: "transparent" },
      },
    },
    icons: {
      fontSize: "8px",
    },
  },
});

const ManageServiceRequest = ({ FirstPageAction }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [notes, setNotes] = useState([]);
  const [details, setDetails] = useState({});
  const [attachments, setAttachments] = useState([]);
  const [openupdate, setOpenupdate] = useState(false);
  const [opensr, setOpensr] = useState(false);
  const [addfiles, setAddfiles] = useState(false);
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");
  const [closetext, setClosetext] = useState("");
  const [availableFiles, setavailableFiles] = useState([]);
  const [noupdate, setNoupdate] = useState(false);
  const [noclose, setNoclose] = useState(false);
  const [fname, SetFname] = useState([]);
  const [efname, SetEFname] = useState([]);

  useEffect(() => {
    fetchData();
    fetchSeconddata();
  }, [state]);
  const toggleModal = (e) => {
    e.preventDefault();
    setOpenupdate(!openupdate);
    // setText("");
  };

  const togglesrModal = () => {
    setOpensr(!opensr);
    setClosetext("");
  };

  const togglefileModal = () => {
    setAddfiles(!addfiles);
    setAttachments([]);
    setFiles([]);
    SetFname([]);
  };

  useEffect(() => {
    FirstPageAction(false);
  }, []);

  function fetchData() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(URL + globalAPI.allnotes + `?srid=${state}`, config)
      .then((response) => {
        setLoader(false);
        const res = response.data;
        setNotes(res.data.reverse());
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  }

  async function fetchSeconddata() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(URL + globalAPI.myreq + `/${state}`, config)
      .then((response) => {
        setLoader(false);
        const res = response.data;
        //
        setDetails(res.data);
        console.log("details", details);
        setavailableFiles(res.data.attachments);
        const newArray = [];
        res.data.attachments &&
          res.data.attachments.map((item, index) => {
            let a = item.slice(25);
            if (a.length > 20) {
              let b = a.slice(0, 21);
              let c = b + "...";
              // newArray.push(item.slice(25));
              newArray.push(c);
            } else {
              newArray.push(a);
            }
          });
        SetEFname(newArray);
        console.log(efname);
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  }

  async function printTickets(index) {
    const { data } = await getTicketsPdf(index);
    const blob = new Blob([data]);
    const att = availableFiles[index].split(".").pop();
    saveAs(blob, `Application${index + 1}.${att}`);
  }

  async function getTicketsPdf(index) {
    const token = JSON.parse(localStorage.getItem("user"));
    const att = availableFiles[index];
    return axios.get(URL + globalAPI.getFile + `?fp=${att}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer",
    });
  }

  const removeFile = (index) => {
    const newValue = [...availableFiles];
    newValue.splice(index, 1);
    setLoader(true);
    const token = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "patch",
      url: URL + globalAPI.myreq + `/${state}`,
      data: { attachments: newValue },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoader(false);
        const res = response.data;
        if (res.success) {
          toast.success("File deleted successfully");
          const newName = [...efname];
          newName.splice(index, 1);
          SetEFname(newName);
          fetchData();
          fetchSeconddata();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  };
  const removeTFile = (index) => {
    const newValue = [...files];
    newValue.splice(index, 1);
    setFiles(newValue);

    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);

    const newName = [...fname];
    newName.splice(index, 1);
    SetFname(newName);
  };

  const addUpdate = (e) => {
    e.preventDefault();
    if (text.length >= 1) {
      setLoader(true);
      setNoupdate(false);
      const token = JSON.parse(localStorage.getItem("user"));
      axios({
        method: "post",
        url: URL + globalAPI.addnotes + `?srid=${state}`,
        data: { description: text, title: text, type: 1 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const res = response.data;
          setLoader(false);
          console.log(res);
          if (res.success) {
            fetchData();
            fetchSeconddata();

            // toggleModal();
            toast.success("Updated Successfully");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          setLoader(false);

          toast.error("Something Went Wrong");
        });
    } else {
      setNoupdate(true);
      return false;
    }
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
            attachments.push(res.data.message[0]);
            setFiles([...files, e]);
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
  const newUpload = (e) => {
    if (attachments.length >= 1) {
      setLoader(true);
      const token = JSON.parse(localStorage.getItem("user"));
      console.log(attachments);
      axios({
        method: "post",
        url: URL + globalAPI.addnotes + `?srid=${state}`,
        data: {
          description: "Added a new attachment",
          title: "Added a new attachment",
          attachments: attachments,
          type: 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setLoader(false);
          togglefileModal();
          const res = response.data;
          if (res.success) {
            fetchData();
            fetchSeconddata();
            toast.success("File added successfully");
            SetFname([]);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch(() => {
          setLoader(false);
          togglefileModal();
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Add Files");
    }
  };
  const closingsr = (e) => {
    if (closetext.length >= 1) {
      setLoader(true);
      const token = JSON.parse(localStorage.getItem("user"));
      axios({
        method: "post",
        url: URL + globalAPI.addnotes + `?srid=${state}`,
        data: { description: closetext, type: 4, title: "--closed--" },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setLoader(false);
          togglesrModal();
          const res = response.data;
          if (res.success) {
            let temp = { ...details };
            temp.status = 4;
            setDetails(temp);
            // fetchData();
            // fetchSeconddata();
            toast.success("Updated Successfully");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch(() => {
          setLoader(false);
          togglesrModal();
          toast.error("Something went wrong");
        });
    } else {
      setNoclose(true);
    }
  };

  return (
    <div>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <div className="msrcontainer">
        {/* <Container> */}

        <div className="msrtitle">Manage Service Request</div>
        <hr className="msrcontainerhr" />

        {/* <Paper> */}
        <div className="msrpaper">
          <div className="msrgrid1">
            <div className="msrtitle1">Service Request Summary</div>
            <hr className="msrhr1" />
            <div className="displaygrid">
              <div
                className="displayleft"
                style={{ fontWeight: "500 !important" }}
              >
                Priority
              </div>
              {details.priority == 1 && (
                <div className="displaygrid1">
                  <div className="hroundcircle">H</div>
                </div>
              )}
              {details.priority == 2 && (
                <div className="displaygrid1">
                  <div className="mroundcircle">M</div>
                </div>
              )}
              {details.priority == 3 && (
                <div className="displaygrid1">
                  <div className="lroundcircle">L</div>
                </div>
              )}
              <div className="displayleft">Status</div>
              {details.status == 1 && <div className="displaygrid1">New</div>}
              {details.status == 2 && (
                <div className="displaygrid1">HPD Working</div>
              )}
              {details.status == 3 && (
                <div className="displaygrid1">Need Your Attention</div>
              )}
              {details.status == 4 && (
                <div className="displaygrid1">Closed</div>
              )}
              {details.status == 5 && (
                <div className="displaygrid1">HPD To Review</div>
              )}
              <div className="displayleft">Last Updated</div>
              <div className="displaygrid1">
                {moment(details.updatedAt).format("DD/MM/YYYY h:mm a")}
              </div>
              <div className="displayleft">Created</div>
              <div className="displaygrid1">
                {moment(details.createdAt).format("DD/MM/YYYY h:mm a")}
              </div>
              <div className="displayleft">Job Reference</div>
              <div className="displaygrid1">
                {details.job_reference_id
                  ? details.job_reference_id.job_ref_number
                  : "-"}
              </div>
              <div className="displayleft">Site</div>
              <div className="displaygrid1">
                {details.job_reference_id
                  ? details.job_reference_id.site_details
                  : "-"}
              </div>
            </div>
            <div className="msrtitle2">Attachments</div>
            <hr className="msrhr1" />
            {availableFiles &&
              availableFiles.map((item, index) => (
                <div key={index} className="msrattachment">
                  <img
                    src={require("../../../Img/attachIcon1.png")}
                    className="msrattachIcon"
                  />
                  <div className="div-name" onClick={() => printTickets(index)}>
                    {efname[index]}
                  </div>
                  <span>
                    <img
                      src={require("../../../Img/cross1.png")}
                      className="msrcross1"
                      onClick={() => removeFile(index)}
                    />
                  </span>
                </div>
              ))}
          </div>
          <div className="msrgrid2">
            <div style={{ padding: "30px" }}>
              <div className="msrtitle3">
                {details.service_ref_number} - {details.title}
              </div>
              <span className="msrspan1">{details.description}</span>
            </div>
            <div
              style={{ padding: "20px", display: "flex", flexDirection: "row" }}
            >
              <button className="msrbutton1" onClick={toggleModal}>
                Add Update
              </button>
              <button
                className="msrbutton2 msrbutton2block"
                onClick={() => togglefileModal()}
              >
                Add Attachments
              </button>
              <button
                className="msrbutton3 msrbutton3block"
                onClick={() => togglesrModal()}
              >
                Close SR
              </button>
            </div>
          </div>
          <div className="msrgrid3">
            {notes &&
              notes.map((item, index) => {
                return (
                  <div key={index}>
                    {item.type != 3 && (
                      <div className="msrupdatesgrid">
                        <div className="msrimage">
                          {item.type == 1 && (
                            <img
                              src={require("../../../Img/type1.png")}
                              className="msrCommonIcon"
                            />
                          )}
                          {item.type == 2 && (
                            <img
                              src={require("../../../Img/type2.png")}
                              className="msrCommonIcon1"
                            />
                          )}
                          {item.type == 4 && (
                            <img
                              src={require("../../../Img/type4.png")}
                              className="msrCommonIcon"
                            />
                          )}
                        </div>
                        <div className="msrbox1">
                          {item.type == 1 && (
                            <span className="msrspan21">
                              Update from Customer
                            </span>
                          )}
                          {item.type == 2 && (
                            <span className="msrspan21">
                              Update from HPD Staff
                            </span>
                          )}
                          {item.type == 4 && (
                            <span className="msrspan21">System Update</span>
                          )}
                          <span className="msrspan3">
                            {" "}
                            {moment(item.updatedAt).format("DD/MM/YYYY h:mm a")}
                          </span>
                          <div className="msrdiv3">{item.description}</div>
                        </div>
                      </div>
                    )}
                    {item.type != 3 && <hr className="msrhr11" />}
                  </div>
                );
              })}
            {notes.length === 0 && (
              <div style={{ textAlign: "center" }}>No Notes Found</div>
            )}
          </div>
        </div>
        {/* </Paper> */}

        <div style={{ height: "8.72vh" }}></div>
        {/* </Container> */}
      </div>

      <Modal
        isOpen={openupdate}
        className="mymodal1"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
        sx={{ maxWidth: "60%" }}
      >
        <div>
          <form>
            <div className="dialogclose">
              <IconButton onClick={toggleModal}>
                <CloseIcon sx={{ color: "black" }}></CloseIcon>
              </IconButton>
            </div>
            <div className="dialog-row1">
              <h5 style={{ fontSize: "40px", margin: "6.448px 0 0 0" }}>
                Add Update
              </h5>
              <hr className="clhrFirst" />
              <h5 className="dialogname">
                {details.service_ref_number} - {details.title}
              </h5>
            </div>
            <div className="dialog-row2">
              <TextField
                // required
                sx={{
                  "&:hover": { borderColor: "none" },
                }}
                label="Details*"
                variant="outlined"
                multiline
                rows={5}
                className={classes.rowfield}
                value={text}
                placeholder="Update details"
                onChange={(e) => {
                  setText(e.target.value);
                  setNoupdate(false);
                }}
              />
              {/* <textarea
                className="modeltextarea"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setNoupdate(false);
                }}
                placeholder="Update details"
              ></textarea> */}
              {noupdate && (
                <span style={{ color: "red", display: "block" }}>
                  No Updates Given
                </span>
              )}
              <div style={{ marginTop: "1.34vh" }}>
                <button className="submitbtn" onClick={(e) => addUpdate(e)}>
                  Submit
                </button>
                <button className="closebtn" onClick={toggleModal}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={opensr}
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div>
          <div className="dialogclose">
            <IconButton onClick={togglesrModal}>
              <CloseIcon sx={{ color: "black" }}></CloseIcon>
            </IconButton>
          </div>
          <div className="dialog-row1">
            <h5 style={{ fontSize: "40px", margin: "0.67vh 0 0 0" }}>
              Close Service Request
            </h5>
            <hr className="clhrFirst" />
            <h5 className="dialogname">
              {details.service_ref_number} - {details.title}
            </h5>
          </div>
          <div className="dialog-row2">
            <TextField
              required
              sx={{
                "&:hover": { borderColor: "none" },
              }}
              label="Details"
              variant="outlined"
              multiline
              rows={5}
              className={classes.rowfield}
              value={closetext}
              // placeholder="Update details"
              onChange={(e) => setClosetext(e.target.value)}
              placeholder="Reason for closing"
            />

            {noclose && (
              <span style={{ color: "red", display: "block" }}>
                No Reason Given
              </span>
            )}
            <div style={{ marginTop: "1.34vh" }}>
              <button className="submitbtn" onClick={() => closingsr()}>
                Submit
              </button>
              <button className="closebtn" onClick={() => togglesrModal()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

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
            <h5 style={{ fontSize: "1.34vw", margin: "0.67vh 0 0 0" }}>
              Add Attachment
            </h5>
            <hr className="clhrFirst" />
            <h5 className="dialogname">
              {details.service_ref_number} - {details.title}
            </h5>
          </div>
          <div className="dialog-row2">
            <div style={{ height: "150px" }}>
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
                        marginLeft: "1.22vw",
                        height: "25px",
                        width: "20px",
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
            {files.map((item, index) => {
              return (
                <div
                  className="file"
                  style={{ borderRadius: "1.92vw" }}
                  key={index}
                >
                  <span style={{ float: "left", marginLeft: "0.9vw" }}>
                    <img
                      src={require("../../../Img/attachIcon.png")}
                      style={{ height: "2.68vh", width: "0.91vw" }}
                    />
                    <span className="fileName">{fname[index]}</span>
                  </span>

                  <img
                    src={require("../../../Img/iconDelete.png")}
                    onClick={() => removeTFile(index)}
                    style={{
                      marginRight: "1.22vw",
                      height: "2.68vh",
                      width: "0.91vw",
                    }}
                  />
                </div>
              );
            })}
            <div style={{ marginTop: "1.34vh" }}>
              <button className="submitbtn" onClick={() => newUpload()}>
                Submit
              </button>
              <button className="closebtn" onClick={() => togglefileModal()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div style={{ height: "8.18vh" }}></div>
    </div>
  );
};

const mapDispatchtoProps = (dispatch) => ({
  FirstPageAction: (value) => dispatch(FirstPageAction(value)),
});

export default connect(null, mapDispatchtoProps)(ManageServiceRequest);
