import "./AdminManageService.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { saveAs } from "file-saver";
import { FileUploader } from "react-drag-drop-files";
import moment from "moment";
import Pagination from "../../../common/pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import globalAPI from "../../../GlobalApi";
import URL from "../../../GlobalUrl";
import axios from "axios";

import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

import { connect } from "react-redux";
import { adminFirstPageAction } from "../../../Redux/AdminFirstPage/adminFirstPage.action";
// import { useGetAllQuotes } from "../../../services/services";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StyledTextField from "../../../common/textfield";
import usePagination from "../../Pagination/Pagination";
const theme = createTheme({
  palette: {
    primary: { main: "#000000	" },
  },
});
const useStyles = makeStyles({
  selectfield: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.61vw",
      marginRight: "2.68vw",
      width: "285px",
      height: "6.04vh",
      fontWeight: "bolder",
      fontFamily: "outfit",
      backgroundColor: "white",
      fontSize: "1vw",
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
  icons: {
    fontSize: "2vw",
  },
});

const fileTypes = ["PDF", "PNG", "JPEG"];

const AdminManageService = ({ adminFirstPageAction }) => {
  // const { isLoading, isError, error, allQuoteData, isFetching, isPreviousData } =
  // useGetAllQuotes()
  const classes = useStyles();
  const { state } = useLocation();
  console.log(state);
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
  const [assigned, setAssigned] = useState("");
  const [focused, setFocused] = React.useState("");
  const [focused1, setFocused1] = React.useState("");
  const [focused2, setFocused2] = React.useState("");
  const [baUser, setBauser] = useState([]);

  const [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const _DATA = usePagination(data, PER_PAGE);
  const [count, setCount] = useState(1);
  const [checkedtype, setCheckedType] = useState(2);
  const [open, setOpen] = useState(false);
  const [jobid, setJobid] = useState();
  const [site, setSite] = useState("");
  const [fname, SetFname] = useState([]);
  const [efname, SetEFname] = useState([]);

  useEffect(() => {
    fetchData();
    fetchSeconddata();
    fetchUserAdmin();
  }, []);

  useEffect(() => {
    adminFirstPageAction(false);
  }, []);
  const toggleModalJR = () => {
    setOpen(!open);
    jbModal();
  };
  const toggleModal = (e) => {
    e.preventDefault();
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
    SetFname([]);
  };
  const jbModal = () => {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(URL + globalAPI.myjobs + `?page=${page}&perPage=${PER_PAGE}`, config)
      .then((response) => {
        setLoader(false);
        const res = response.data;
        if (res.success) {
          setCount(res.data.total_pages);
          setData(res.data.data);
        } else {
          toast.error("Something went wrong");
          setOpen(!open);
        }
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
        setOpen(!open);
      });
  };
  const settingJobref = (item) => {
    setJobid(item.job_ref_number);
    setSite(item.site_details);
    setOpen(!open);
  };
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
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  function fetchSeconddata() {
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
        setDetails(res.data);
        setStatus(res.data.status);
        setPriority(res.data.priority);
        setAssigned(res.data.assigned_to);
        console.log("details", details);
        setavailableFiles(res.data.attachments);
        const newArray = [];
        res.data.attachments &&
          res.data.attachments.map((item, index) => {
            let a = item.slice(25);
            if (a.length > 20) {
              let b = a.slice(0, 21);
              let c = b + "...";
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
  function fetchUserAdmin() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(
        URL + globalAPI.accountlist + `?page=1&perPage=10&status=3&badm=1`,
        config
      )
      .then((response) => {
        setLoader(false);

        if (response) {
          const res = response.data.data.data;
          setBauser(res);
        } else {
          toast.error("error");
        }
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

  console.log(state);
  const addUpdate = (e) => {
    e.preventDefault();

    if (text.length >= 1) {
      setLoader(true);
      setNoupdate(false);
      const token = JSON.parse(localStorage.getItem("user"));
      axios({
        method: "post",
        url: URL + globalAPI.addnotes + `?srid=${state}`,
        data: { description: text, title: text, type: checkedtype },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const res = response.data;
          setLoader(false);
          console.log(res);
          if (res.success) {
            setText("");
            setOpenupdate(!openupdate);
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
      axios({
        method: "post",
        url: URL + globalAPI.addnotes + `?srid=${state}`,
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
          const res = response.data;
          if (res.success) {
            togglefileModal();
            fetchData();
            fetchSeconddata();
            toast.success("File added successfully");
            SetFname([]);
          } else {
            toast.error(res.data.message);
          }
        })
        .then((response) => {
          setLoader(false);
          const res = response.data;
          if (res.success) {
            togglefileModal();
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
        data: { description: closetext, type: 2, title: "--closed--" },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setLoader(false);
          const res = response.data;
          if (res.success) {
            togglesrModal();
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
    setLoader(true);
    const token = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "patch",
      url: URL + globalAPI.myreq + `/${state}`,
      data: details,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoader(false);
        const res = response.data;

        if (res.success) {
          //   navigate("/admincommon/adminsrl");
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
    if (e.target.checked) {
      setCheckedType(3);
      console.log("checked");
    } else {
      setCheckedType(2);
      console.log("not checked");
    }
  };
  console.log("detaillll", details);

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

            <div>
              <div
                style={{
                  display: "flex",
                  gap: "30px",
                  marginBottom: "15px",
                  marginTop: "15px",
                }}
              >
                <div className="miniadmindisplaygrid1">Customer Name</div>
                <div className="minidisplaygrid1">{details.creator_name}</div>
              </div>
              <label
                style={{ display: "block" }}
                htmlFor=""
                className="priorityLabel"
              >
                Priority
              </label>
              <FormControl className={classes.selectfield}>
                <StyledTextField
                  select
                  sx={{ width: "160px", height: "63px" }}
                  value={priority}
                  onChange={stateHandler}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  name="priority"
                  // label="Priority"
                >
                  <MenuItem value="1" style={{ fontWeight: 600 }}>
                    High
                  </MenuItem>
                  <MenuItem value="2" style={{ fontWeight: 600 }}>
                    Medium
                  </MenuItem>
                  <MenuItem value="3" style={{ fontWeight: 600 }}>
                    Low
                  </MenuItem>
                </StyledTextField>
                {/* <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={priority}
                  onChange={stateHandler}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  name="priority"
                  IconComponent={() =>
                    focused ? (
                      <KeyboardArrowUpIcon className={classes.icons} />
                    ) : (
                      <KeyboardArrowDownIcon className={classes.icons} />
                    )
                  }
                >
                  <MenuItem value="1" style={{ fontWeight: 600 }}>
                    {" "}
                    High{" "}
                  </MenuItem>
                  <MenuItem value="2" style={{ fontWeight: 600 }}>
                    {" "}
                    Medium
                  </MenuItem>
                  <MenuItem value="3" style={{ fontWeight: 600 }}>
                    {" "}
                    Low{" "}
                  </MenuItem>
                </Select> */}
              </FormControl>
            </div>

            <div>
              <label
                style={{ display: "block" }}
                htmlFor=""
                className="statusLabel"
              >
                Status
              </label>
              <FormControl className={classes.selectfield}>
                {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
                <StyledTextField
                  select
                  sx={{ width: "160px", height: "63px" }}
                  value={status}
                  onChange={stateHandler}
                  onFocus={() => setFocused1(true)}
                  onBlur={() => setFocused1(false)}
                  name="status"
                  // label="Priority"
                >
                  <MenuItem value="1" style={{ fontWeight: 600 }}>
                    {" "}
                    New{" "}
                  </MenuItem>
                  <MenuItem value="5" style={{ fontWeight: 600 }}>
                    {" "}
                    HPD To Review{" "}
                  </MenuItem>
                  <MenuItem value="2" style={{ fontWeight: 600 }}>
                    {" "}
                    HPD Working{" "}
                  </MenuItem>
                  <MenuItem value="3" style={{ fontWeight: 600 }}>
                    {" "}
                    Need Your Attention{" "}
                  </MenuItem>
                  <MenuItem value="4" style={{ fontWeight: 600 }}>
                    {" "}
                    Resolved{" "}
                  </MenuItem>
                </StyledTextField>
                {/* <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  // label="Status"
                  onChange={stateHandler}
                  onFocus={() => setFocused1(true)}
                  onBlur={() => setFocused1(false)}
                  name="status"
                  IconComponent={() =>
                    focused1 ? (
                      <KeyboardArrowUpIcon className={classes.icons} />
                    ) : (
                      <KeyboardArrowDownIcon className={classes.icons} />
                    )
                  }
                >
                  <MenuItem value="1" style={{ fontWeight: 600 }}>
                    {" "}
                    New{" "}
                  </MenuItem>
                  <MenuItem value="5" style={{ fontWeight: 600 }}>
                    {" "}
                    HPD To Review{" "}
                  </MenuItem>
                  <MenuItem value="2" style={{ fontWeight: 600 }}>
                    {" "}
                    HPD Working{" "}
                  </MenuItem>
                  <MenuItem value="3" style={{ fontWeight: 600 }}>
                    {" "}
                    Need Your Attention{" "}
                  </MenuItem>
                  <MenuItem value="4" style={{ fontWeight: 600 }}>
                    {" "}
                    Resolved{" "}
                  </MenuItem>
                </Select> */}
              </FormControl>
            </div>

            <div>
              <label
                style={{ display: "block" }}
                htmlFor=""
                className="jobReferenceLabel"
              >
                Job Reference
              </label>{" "}
              <br />
              <StyledTextField
                text
                sx={{ width: "285px", height: "35px" }}
                value={jobid}
                onChange={stateHandler2}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                // name="priority"
                // label="Priority"
              />
              {/* <input
                className="admsrinput1"
                value={
                  details.job_reference_id
                    ? details.job_reference_id.job_ref_number
                    : ""
                }
                onChange={stateHandler2}
                name="job_reference_id"
                id=""
              ></input> */}
              <img
                src={require("../../../Img/adminSearchIcon.png")}
                className={"adminSearchIcon"}
                onClick={() => {
                  toggleModalJR();
                }}
              />
            </div>

            <div className="admindisplaygrid">
              <div className="miniadmindisplaygrid1">Site</div>
              <div className="minidisplaygrid1">{site || "-"}</div>
            </div>

            <div style={{ marginTop: "1.5vh" }}>
              <label
                style={{ display: "block" }}
                htmlFor=""
                className="statusLabel"
              >
                Assigned To
              </label>
              <FormControl className={classes.selectfield}>
                <StyledTextField
                  select
                  sx={{ width: "160px", height: "63px" }}
                  value={assigned}
                  onChange={stateHandler}
                  onFocus={() => setFocused2(true)}
                  onBlur={() => setFocused2(false)}
                  defaultValue="..."
                  name="assigned_to"
                >
                  <MenuItem value={assigned} style={{ fontWeight: 600 }}>
                    {" "}
                    {assigned}{" "}
                  </MenuItem>
                  {baUser &&
                    baUser.map((item, index) => {
                      return (
                        <MenuItem
                          key={item._id}
                          value={item.name}
                          style={{ fontWeight: 600 }}
                        >
                          {" "}
                          {item.name}{" "}
                        </MenuItem>
                      );
                    })}
                </StyledTextField>
                {/* <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={assigned}
                  onChange={stateHandler}
                  onFocus={() => setFocused2(true)}
                  onBlur={() => setFocused2(false)}
                  name="assigned_to"
                  defaultValue="..."
                  IconComponent={() =>
                    focused2 ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                >
                  <MenuItem value={assigned} style={{ fontWeight: 600 }}>
                    {" "}
                    {assigned}{" "}
                  </MenuItem>
                  {baUser &&
                    baUser.map((item, index) => {
                      return (
                        <MenuItem
                          key={item._id}
                          value={item.name}
                          style={{ fontWeight: 600 }}
                        >
                          {" "}
                          {item.name}{" "}
                        </MenuItem>
                      );
                    })}
                </Select> */}
              </FormControl>
            </div>

            <div className="admindisplaygrid">
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
                Save
              </button>
            </div>
            <div className="adminmsrtitle2">Attachments</div>
            <hr className="adminmsrhr1" />
            {efname &&
              efname.map((item, index) => (
                <div key={index} className="adminmsrattachment">
                  <img
                    src={require("../../../Img/attachIcon1.png")}
                    className="adminmsrattachIcon"
                  />
                  <div
                    className="admindiv-name"
                    onClick={() => printTickets(index)}
                  >
                    {efname[index]}
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
            <div
              style={{ padding: "20px", display: "flex", flexDirection: "row" }}
            >
              <button className="msrbutton1" onClick={(e) => toggleModal(e)}>
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
                            className="adminmsrCommonIcon1"
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
                            Update from Customer
                          </span>
                        )}
                        {item.type == 2 && (
                          <span className="adminmsrspan21">
                            Update from HPD Staff
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
                    <hr className="adminmsrhr2" />
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
                <CloseIcon
                  sx={{ color: "black", height: "1.5vw", width: "2.5vh" }}
                ></CloseIcon>
              </IconButton>
            </div>
            <div className="admindialog-row1">
              <h5 style={{ fontSize: "1.34vw", margin: "0.81vh 0 0 0" }}>
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
              <div style={{ marginTop: "1.25vh", marginBottom: "2.68vh" }}>
                <input
                  className="admincheckbox"
                  type="checkbox"
                  onChange={handleChecked}
                />
                <label
                  style={{
                    marginLeft: "0.30vw",
                    position: "relative",
                    bottom: "4px",
                    fontSize: "1vw",
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
              <div style={{ marginTop: "1.344vh" }}>
                <button
                  className="adminsubmitbtn"
                  onClick={(e) => addUpdate(e)}
                >
                  Submit
                </button>
                <button
                  className="adminclosebtn"
                  onClick={(e) => toggleModal(e)}
                >
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
              <CloseIcon
                sx={{ color: "black", height: "1.5vw", width: "2.5vh" }}
              ></CloseIcon>
            </IconButton>
          </div>
          <div className="admindialog-row1">
            <h5 style={{ fontSize: "1.34vw", margin: "0.67vh 0 0 0" }}>
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
            <div style={{ marginTop: "1.34vh" }}>
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
              <CloseIcon
                sx={{ color: "black", height: "1.5vw", width: "2.5vh" }}
              ></CloseIcon>
            </IconButton>
          </div>
          <div className="admindialog-row1">
            <h5 style={{ fontSize: "1.34vw", margin: "0.67vh 0 0 0" }}>
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
                  toast.error("Only pdf, png, jpeg files are allowed")
                }
                children={
                  <span className="admindragndrop">
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
                    <span className="adminbrowse">
                      <button className="adminbrowsebtn">Browse</button>
                    </span>
                  }
                />
              </span>
            </div>
            {fname &&
              fname.map((item, index) => {
                return (
                  <div
                    className="adminfile"
                    style={{ borderRadius: "1.83vw" }}
                    key={index}
                  >
                    <span style={{ float: "left", marginLeft: "0.91vw" }}>
                      <img
                        src={require("../../../Img/attachIcon.png")}
                        style={{ height: "2.68vh", width: "0.91vw" }}
                      />

                      <span className="adminfileName">{fname[index]}</span>
                    </span>

                    <img
                      src={require("../../../Img/iconDelete.png")}
                      onClick={() => removeTFile(index)}
                      style={{
                        marginRight: "1.2vw",
                        height: "2.68vh",
                        width: "0.91vw",
                      }}
                    />
                  </div>
                );
              })}
            <div style={{ marginTop: "1.34vh" }}>
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
      <Modal
        isOpen={open}
        className="createmodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div>
          <div className="dialogclose">
            <IconButton onClick={() => setOpen(!open)}>
              <CloseIcon sx={{ color: "black" }}></CloseIcon>
            </IconButton>
          </div>
          <div className="dialog-row1">
            {/* <h5 className="dialogname">{userName}</h5> */}
            <h6 style={{ fontSize: "22px", margin: "5px 0 5px 0" }}>My Jobs</h6>
            <hr className="clhrFirst" />
          </div>
          <div style={{ paddingLeft: "25px" }}>
            <table sx={{ border: "none" }}>
              <thead className="thead">
                <tr>
                  <th className="header">Job Reference</th>
                  <th className="header">Site Details</th>
                  <th className="header">Status</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {_DATA.currentData().length >= 1 &&
                  _DATA.currentData().map((item, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => settingJobref(item)}
                        className="sortabletr"
                      >
                        <td style={{ fontSize: "18px" }}>
                          {item.job_ref_number}
                        </td>
                        <td style={{ fontSize: "18px" }}>
                          {item.site_details}
                        </td>
                        {item.status == 1 && (
                          <td style={{ fontSize: "18px" }}>New</td>
                        )}
                        {item.status == 2 && (
                          <td style={{ fontSize: "18px" }}>HPD Working</td>
                        )}
                        {item.status == 3 && (
                          <td style={{ fontSize: "18px" }}>
                            Need Your Attention
                          </td>
                        )}
                        {item.status == 4 && (
                          <td style={{ fontSize: "18px" }}>Resolved</td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {_DATA.currentData().length === 0 && (
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                No Records Found
              </h4>
            )}
          </div>
          {_DATA.currentData().length >= 1 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ThemeProvider theme={theme}>
                <Pagination
                  className="pagination"
                  count={count}
                  color="primary"
                  // variant="outlined"
                  page={page}
                  onChange={handleChange}
                />
              </ThemeProvider>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  adminFirstPageAction: (value) => dispatch(adminFirstPageAction(value)),
});

export default connect(null, mapDispatchToProps)(AdminManageService);
