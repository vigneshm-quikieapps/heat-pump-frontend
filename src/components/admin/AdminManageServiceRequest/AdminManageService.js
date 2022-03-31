import "./AdminManageService.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { IconButton } from "@mui/material";
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
import { adminFirstPageAction } from "../../../Redux/AdminFirstPage/adminFirstPage.action";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const useStyles = makeStyles({
  selectfield: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      marginRight: "20px",
      width: "280px",
      height: "45px",
      fontWeight: "bolder",
      fontFamily: "outfit",
      backgroundColor: "white",

      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
});

const fileTypes = ["PDF", "PNG", "JPEG"];

const AdminManageService = ({ adminFirstPageAction }) => {
  const classes = useStyles();
  const { state } = useLocation();
  const navigate = useNavigate();
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
  const [inputData, setInputData] = useState(useLocation().state);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assigned,setAssigned] = useState("");
  const [focused, setFocused] = React.useState("");

  const [updatedBy, setUpdatedBy] = useState("");
  const [checkedtype, setCheckedType] = useState(2);

  const [d3, setd3] = useState(false);

  useEffect(() => {
    fetchData();
    fetchSeconddata();
  }, []);

  useEffect(() => {
    adminFirstPageAction(false);
  }, []);

  const toggleModal = () => {
    setOpenupdate(!openupdate);
    setText("");
  };

  const togglesrModal = () => {
    setOpensr(!opensr);
    setClosetext("");
  };

  const togglefileModal = () => {
    setAddfiles(!addfiles);
    setAttachments([]);
    setFiles([]);
  };

  function fetchData() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(URL + globalAPI.allnotes + `?srid=${state._id}`, config)
      .then((response) => {
        setLoader(false);
        const res = response.data;
        debugger;
        setNotes(res.data.reverse());
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  }

  function fetchSeconddata() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(URL + globalAPI.myreq + `/${state._id}`, config)
      .then((response) => {
        setLoader(false);
        const res = response.data;
        setDetails(res.data);
        setStatus(res.data.status);
        setPriority(res.data.priority);
        setAssigned(res.data.assigned_to);
        console.log("details", details);
        setavailableFiles(res.data.attachments);
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
    // const att = availableFiles[index].replace(`${details.creator_id}/`, "");
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
      url: URL + globalAPI.myreq + `/${state._id}`,
      data: { attachments: newValue },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoader(false);
        const res = response.data;
        if (res.success) {
          // toast.success("success");
          setTimeout(() => {
            /*  window.location.reload(false); */
            fetchData();
            fetchSeconddata();
          }, 2000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  };

  console.log(state);
  const addUpdate = (e) => {
    e.preventDefault();
    debugger;
    if (text.length >= 1) {
      setLoader(true);
      setNoupdate(false);
      const token = JSON.parse(localStorage.getItem("user"));
      axios({
        method: "post",
        url: URL + globalAPI.addnotes + `?srid=${state._id}`,
        data: { description: text, title: text, type: checkedtype },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const res = response.data;
          setLoader(false);
          toggleModal();
          console.log(res);
          if (res.success) {
            // toast.success("Successfully Added");
            /* setTimeout(() => {
              window.location.reload(false);
            }, 2000); */
            setCheckedType(2);
            fetchData();
            fetchSeconddata();
            toast.success("Updated Successfully");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          setLoader(false);
          toggleModal();
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
            // toast.success("File Added");
            attachments.push(res.data.message[0]);
            setFiles([...files, e]);
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
    setLoader(true);
    const token = JSON.parse(localStorage.getItem("user"));
    // const data = {
    //   attachments: attachments,
    // };
    // const newVal = availableFiles.concat(attachments);
    axios({
      method: "post",
      url: URL + globalAPI.addnotes + `?srid=${state._id}`,
      data: {
        description: "Added a new attachment",
        title: "Added a new attachment",
        attachments: attachments,
        type: 2,
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
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        setLoader(false);
        togglefileModal();
        toast.error("Something went wrong");
      });
  };
  const closingsr = (e) => {
    debugger;
    if (closetext.length >= 1) {
      setLoader(true);
      const token = JSON.parse(localStorage.getItem("user"));
      axios({
        method: "patch",
        url: URL + globalAPI.myreq + `/${state._id}`,
        data: { status: 2, description: closetext, type: 2 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setLoader(false);
          togglesrModal();
          const res = response.data;
          if (res.success) {
            fetchData();
            fetchSeconddata();
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
  const updatingSR = (e) => {
    debugger;
    setLoader(true);
    const token = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "patch",
      url: URL + globalAPI.myreq + `/${state._id}`,
      data: details,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoader(false);
        const res = response.data;

        if (res.success) {
          // setTimeout(() => {
          //   navigate("/admincommon/adminsrl");
          // }, 1000);
          toast.success("Updated Successfully");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  };
  const stateHandler = (e) => {
    debugger;
    if (e.target.name == "status") {
      setStatus(e.target.value);
      setDetails((details) => ({
        ...details,
        [e.target.name]: e.target.value,
      }));
      return;
    }
    if (e.target.name == "priority") {
      setPriority(e.target.value);
      setDetails((details) => ({
        ...details,
        [e.target.name]: e.target.value,
      }));
      return;
    }
    if (e.target.name == "assigned_to") {
      setAssigned(e.target.value);
      setDetails((details) => ({
        ...details,
        [e.target.name]: e.target.value,
      }));
      return;
    }
  };

  const stateHandler2 = (e) => {
    /* setInputData(inputData => ({...inputData,job_reference_id:{...inputData.job_reference_id,job_ref_number:e.target.value}})) */
    setDetails((details) => ({
      ...details,
      job_ref_number: e.target.value,
      job_reference_id: {
        ...details.job_reference_id,
        job_ref_number: e.target.value,
      },
    }));
  };

  console.log(inputData);
  const handleChecked = (e) => {
    debugger;
    if (e.target.checked) {
      setCheckedType(3);
      console.log("checked");
    } else {
      setCheckedType(2);
      console.log("not checked");
    }
  };

  return (
    <div>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <div className="adminmsrcontainer">
        <div className="adminmsrtitle">Manage Service Request</div>
        <hr className="adminmsrcontainerhr" />
        <div className="adminmsrpaper">
          <div className="adminmsrgrid1">
            <div className="adminmsrtitle1">Service Request Summary </div>
            <hr className="adminmsrhr1" />
            <div className="admsrselect1">
              <label htmlFor="" className="priorityLabel">
                Priority
              </label>
              <FormControl className={classes.selectfield}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={priority}
                  onChange={stateHandler}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  name="priority"
                  IconComponent={() =>
                    focused ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowUpIcon />
                    )
                  }
                >
                  <MenuItem value="1"> High </MenuItem>
                  <MenuItem value="2"> Medium</MenuItem>
                  <MenuItem value="3"> Low </MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="admsrselect1">
              <label htmlFor="" className="statusLabel">
                Status
              </label>
              <FormControl className={classes.selectfield}>
                {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  // label="Status"
                  onChange={stateHandler}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  name="status"
                  IconComponent={() =>
                    focused ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowUpIcon />
                    )
                  }
                >
                  <MenuItem value="1"> New </MenuItem>
                  <MenuItem value="2"> Luths Working </MenuItem>
                  <MenuItem value="3"> Need Your Attention </MenuItem>
                  <MenuItem value="4"> Resolved </MenuItem>
                </Select>
              </FormControl>
            </div>

            <div></div>

            <div style={{ marginTop: "30px", marginLeft: "5px" }}>
              <label htmlFor="" className="jobReferenceLabel">
                Job Reference
              </label>{" "}
              <br />
              <input
                className="admsrinput1"
                value={
                  details.job_reference_id
                    ? details.job_reference_id.job_ref_number
                    : ""
                }
                onChange={stateHandler2}
                name="job_reference_id"
                id=""
              ></input>
              <img
                src={require("../../../Img/adminSearchIcon.png")}
                className={"adminSearchIcon"}
              />
            </div>

            <div className="admindisplaygrid">
              <div className="miniadmindisplaygrid1">Site</div>
              <div className="minidisplaygrid1">
                {details.job_reference_id
                  ? details.job_reference_id.site_details
                  : "-"}
              </div>
            </div>

            <div style={{ marginLeft: "5px",marginTop:"20px" }}>
              <label htmlFor="" className="statusLabel">
                Assigned To
              </label>
              <FormControl className={classes.selectfield}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={assigned}
                  onChange={stateHandler}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  name="assigned_to"
                  IconComponent={() =>
                    focused ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowUpIcon />
                    )
                  }
                >
                  <MenuItem value="1"> New </MenuItem>
                  {/* <MenuItem value="2"> Luths Working </MenuItem>
                  <MenuItem value="3"> Need Your Attention </MenuItem>
                  <MenuItem value="4"> Resolved </MenuItem> */}
                </Select>
              </FormControl>
            </div>

            <div className="admindisplaygrid">
              {/* <div>Status</div>
              {details.status == 1 && <div className="admindisplaygrid1">New</div>}
              {details.status == 2 && (
                <div className="admindisplaygrid1">Luths Working</div>
              )}
              {details.status == 3 && (
                <div className="admindisplaygrid1">Need Your Attention</div>
              )}
              {details.status == 4 && (
                <div className="admindisplaygrid1">Closed</div>
              )}
              <div>Last Updated</div>
              <div className="admindisplaygrid1">
                {moment(details.updatedAt).format("DD/MM/YYYY h:mm a")}
              </div>
              <div>Created</div>
              <div className="admindisplaygrid1">
                {moment(details.createdAt).format("DD/MM/YYYY h:mm a")}
              </div>
              <div>Job Reference</div>
              <div className="admindisplaygrid1">
                {details.job_reference_id
                  ? details.job_reference_id.job_ref_number
                  : "-"}
              </div>
              <div>Site</div>
              <div className="admindisplaygrid1">
                {details.job_reference_id
                  ? details.job_reference_id.site_details
                  : "-"}
              </div> */}
              <div className="miniadmindisplaygrid1">Last Updated</div>
              <div className="minidisplaygrid1">
                {moment(details.updatedAt).format("DD/MM/YYYY h:mm a")}
              </div>
              <div className="miniadmindisplaygrid1">Last Updated by</div>
              <div className="minidisplaygrid1">
                {details.last_updated_by ? details.last_updated_by : "-"}
              </div>
              <div className="miniadmindisplaygrid1">Created</div>
              <div className="minidisplaygrid1">
                {moment(details.createdAt).format("DD/MM/YYYY h:mm a")}
              </div>
              <div className="miniadmindisplaygrid1">Created By</div>
              <div className="minidisplaygrid1">{details.creator_name}</div>
            </div>

            <div>
              <button
                className="adminUpdateStatusBtn"
                onClick={(e) => updatingSR(e)}
              >
                Update Status
              </button>
            </div>
            <div className="adminmsrtitle2">Attachments</div>
            <hr className="adminmsrhr1" />
            {availableFiles &&
              availableFiles.map((item, index) => (
                <div key={index} className="adminmsrattachment">
                  <img
                    src={require("../../../Img/attachIcon1.png")}
                    className="adminmsrattachIcon"
                  />
                  <div
                    className="admindiv-name"
                    onClick={() => printTickets(index)}
                  >
                    Attachment {index + 1}
                  </div>
                  <span>
                    <img
                      src={require("../../../Img/cross1.png")}
                      className="adminmsrcross1"
                      onClick={() => removeFile(index)}
                    />
                  </span>
                </div>
              ))}
          </div>
          <div className="adminmsrgrid2">
            <div className="adminmsrtitle3">
              {details.service_ref_number} - {details.title}
            </div>
            <span className="adminmsrspan1">{details.description}</span>
            <div style={{ marginTop: "80px" }}>
              <button className="adminmsrbutton1" onClick={() => toggleModal()}>
                Add Update
              </button>
              <button
                className="adminmsrbutton2"
                onClick={() => togglefileModal()}
              >
                Add Attachments
              </button>
              <button
                className="adminmsrbutton3"
                onClick={() => togglesrModal()}
              >
                Close SR
              </button>
            </div>
          </div>
          <div className="adminmsrgrid3">
            {notes.length > 0 &&
              notes.map((item, index) => {
                return (
                  <>
                    <div className="adminmsrupdatesgrid" key={index}>
                      <div className="adminmsrimage">
                        {item.type == 1 && (
                          <img
                            src={require("../../../Img/type1.png")}
                            className="adminmsrCommonIcon"
                          />
                        )}
                        {item.type == 2 && (
                          <img
                            src={require("../../../Img/type2.png")}
                            className="adminmsrCommonIcon"
                          />
                        )}
                        {item.type == 3 && (
                          <img
                            src={require("../../../Img/type3.png")}
                            className="adminmsrCommonIcon"
                          />
                        )}
                        {item.type == 4 && (
                          <img
                            src={require("../../../Img/type4.png")}
                            className="adminmsrCommonIcon"
                          />
                        )}
                      </div>
                      <div className="adminmsrbox1">
                        {item.type == 1 && (
                          <span className="adminmsrspan21">
                            Update from customer
                          </span>
                        )}
                        {item.type == 2 && (
                          <span className="adminmsrspan21">
                            Update from Luths Staff
                          </span>
                        )}
                        {item.type == 3 && (
                          <span className="adminmsrspan21">Internal Notes</span>
                        )}

                        {item.type == 4 && (
                          <span className="adminmsrspan21">System Update</span>
                        )}
                        <span className="adminmsrspan3">
                          {" "}
                          {moment(item.updatedAt).format("DD/MM/YYYY h:mm a")}
                        </span>
                        <div className="adminmsrdiv3">{item.description}</div>
                      </div>
                    </div>
                    <hr className="adminmsrhr1" />
                  </>
                );
              })}
            {notes.length === 0 && (
              <div style={{ textAlign: "center" }}>No Notes Found</div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={openupdate}
        className="adminmymodal"
        overlayClassName="adminmyoverlay"
        closeTimeoutMS={500}
      >
        <div>
          <form>
            <div className="admindialogclose">
              <IconButton onClick={toggleModal}>
                <CloseIcon sx={{ color: "black" }}></CloseIcon>
              </IconButton>
            </div>
            <div className="admindialog-row1">
              <h5 style={{ fontSize: "22px", margin: "5px 0 0 0" }}>
                Add Update
              </h5>
              <hr className="adminclhrFirst" />
              <h5 className="admindialogname">
                {details.service_ref_number} - {details.title}
              </h5>
            </div>
            <div className="admindialog-row2">
              <textarea
                className="adminmodeltextarea"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setNoupdate(false);
                }}
                placeholder="Update details"
              ></textarea>
              <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                <input
                  className="admincheckbox"
                  type="checkbox"
                  onChange={handleChecked}
                />
                <label
                  style={{
                    marginLeft: "5px",
                    position: "relative",
                    bottom: "4px",
                  }}
                >
                  Internal Notes
                </label>
              </div>
              {noupdate && (
                <span style={{ color: "red", display: "block" }}>
                  No Updates Given
                </span>
              )}
              <div style={{ marginTop: "10px" }}>
                <button
                  className="adminsubmitbtn"
                  onClick={(e) => addUpdate(e)}
                >
                  Submit
                </button>
                <button className="adminclosebtn" onClick={() => toggleModal()}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={opensr}
        className="adminmymodal"
        overlayClassName="adminmyoverlay"
        closeTimeoutMS={500}
      >
        <div>
          <div className="admindialogclose">
            <IconButton onClick={togglesrModal}>
              <CloseIcon sx={{ color: "black" }}></CloseIcon>
            </IconButton>
          </div>
          <div className="admindialog-row1">
            <h5 style={{ fontSize: "22px", margin: "5px 0 0 0" }}>
              Close Service Request
            </h5>
            <hr className="adminclhrFirst" />
            <h5 className="admindialogname">
              {details.service_ref_number} - {details.title}
            </h5>
          </div>
          <div className="admindialog-row2">
            <textarea
              className="adminmodeltextarea"
              value={closetext}
              onChange={(e) => setClosetext(e.target.value)}
              placeholder="Reason for Closing"
              required
            ></textarea>
            {noclose && (
              <span style={{ color: "red", display: "block" }}>
                No Reason Given
              </span>
            )}
            <div style={{ marginTop: "10px" }}>
              <button className="adminsubmitbtn" onClick={() => closingsr()}>
                Submit
              </button>
              <button className="adminclosebtn" onClick={() => togglesrModal()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={addfiles}
        className="adminmyattachmodal"
        overlayClassName="adminmyoverlay"
        closeTimeoutMS={500}
      >
        <div>
          <div className="admindialogclose">
            <IconButton onClick={() => togglefileModal()}>
              <CloseIcon sx={{ color: "black" }}></CloseIcon>
            </IconButton>
          </div>
          <div className="admindialog-row1">
            <h5 style={{ fontSize: "22px", margin: "5px 0 0 0" }}>
              Add Attachment
            </h5>
            <hr className="adminclhrFirst" />
            <h5 className="admindialogname">
              {details.service_ref_number} - {details.title}
            </h5>
          </div>
          <div className="admindialog-row2">
            <div>
              <FileUploader
                handleChange={(e) => onFileUpload(e)}
                name="file"
                types={fileTypes}
                onTypeError={(err) =>
                  toast.error("Only pdf,png,jpeg files are allowed")
                }
                children={
                  <span className="admindragndrop">
                    Drag and Drop Here
                    <img
                      src={require("../../../Img/iconcloud.png")}
                      height="25px"
                      width={"25px"}
                      style={{ marginLeft: "20px" }}
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
                    toast.error("Only pdf,png,jpeg files are allowed")
                  }
                  children={
                    <span className="adminbrowse">
                      <button className="adminbrowsebtn">Browse</button>
                    </span>
                  }
                />
              </span>
            </div>
            {files.map((item, index) => {
              return (
                <div
                  className="adminfile"
                  style={{ borderRadius: "30px" }}
                  key={index}
                >
                  <span style={{ float: "left", marginLeft: "15px" }}>
                    <img
                      src={require("../../../Img/attachIcon.png")}
                      height="20px"
                      width={"15px"}
                      style={{ marginLeft: "20px" }}
                    />

                    <span className="adminfileName">
                      Attachment-{index + 1}
                    </span>
                  </span>

                  <img
                    src={require("../../../Img/iconDelete.png")}
                    onClick={() => removeFile(index)}
                    height="22px"
                    width={"20px"}
                    style={{ marginRight: "20px" }}
                  />
                </div>
              );
            })}
            <div style={{ marginTop: "10px" }}>
              <button className="adminsubmitbtn" onClick={() => newUpload()}>
                Submit
              </button>
              <button
                className="adminclosebtn"
                onClick={() => togglefileModal()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  adminFirstPageAction: (value) => dispatch(adminFirstPageAction(value)),
});

export default connect(null, mapDispatchToProps)(AdminManageService);
