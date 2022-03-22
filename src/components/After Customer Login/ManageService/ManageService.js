import "./ManageService.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const fileTypes = ["PDF","PNG","JPEG"];
const ManageService = () => {
  const { state } = useLocation();
  const [loader, setLoader] = useState(false);
  const [notes, setNotes] = useState([]);
  const [details, setDetails] = useState([]);
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

  useEffect(() => {
    fetchData();
    fetchSeconddata();
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
    // const params = { params: { srid: state } };
    setLoader(true);
    axios
      .get(URL + globalAPI.allnotes + `?srid=${state}`, config)
      .then((response) => {
        setLoader(false);
        const res = response.data;
        setNotes(res.data);
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
      .get(URL + globalAPI.myreq + `/${state}`, config)
      .then((response) => {
        setLoader(false);
        const res = response.data;
        setDetails(res.data);
        setavailableFiles(res.data.attachments);
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  }

  async function printTickets(index) {
    const { data } = await getTicketsPdf(index);
    const blob = new Blob([data], { type: "application/pdf" });
    saveAs(blob, `Application${index + 1}.pdf`);
  }

  async function getTicketsPdf(index) {
    const token = JSON.parse(localStorage.getItem("user"));
    const att = availableFiles[index].slice(20, -4);
    return axios.get(URL + globalAPI.getFile + `?fp=${att}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer",
    });
  }

  const removeFile = (index) => {
    const newValue = [...files];
    newValue.splice(index, 1);
    setFiles(newValue);

    //removing attachments
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);

  };

  const addUpdate = (e) => {
    e.preventDefault();
    if (text.length >= 1) {
      setLoader(true);
      setNoupdate(false);
      const token = JSON.parse(localStorage.getItem("user"));
      axios({
        method: "patch",
        url: URL + globalAPI.textupdate + `?nrid=${state}`,
        data: { description: text },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const res = response.data;
          setLoader(false);
          toggleModal();
          if (res.success) {
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
            toast.success("File Added");
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
    const data = {
      attachments: attachments,
    };
    axios({
      method: "post",
      url: URL + globalAPI.documentupdate + `?nrid=${state}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoader(false);
        togglefileModal();
        const res = response.data;
        if (res.success) {
          toast.success("success");
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

  return (
    <div>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <div className="msrcontainer">
        <div className="msrtitle">Manage Service Request</div>
        <hr className="msrcontainerhr" />
        <div className="msrpaper">
          <div className="msrgrid1">
            <div className="msrtitle1">Service Request Summary</div>
            <hr className="msrhr1" />
            <div className="displaygrid">
              <div>Priority</div>
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
              <div>Status</div>
              {details.status == 1 && <div className="displaygrid1">New</div>}
              {details.status == 2 && (
                <div className="displaygrid1">Luths Working</div>
              )}
              {details.status == 3 && (
                <div className="displaygrid1">Need Your Attention</div>
              )}
              {details.status == 4 && (
                <div className="displaygrid1">Closed</div>
              )}
              <div>Last Updated</div>
              <div className="displaygrid1">{moment(details.updatedAt).format('DD/MM/YYYY h:mm a')}</div>
              <div>Created</div>
              <div className="displaygrid1">{moment(details.createdAt).format('DD/MM/YYYY h:mm a')}</div>
              <div>Job Reference</div>
              <div className="displaygrid1">
                {details.job_reference_id
                  ? details.job_reference_id
                  : "-"}
              </div>
              <div>Site</div>
              <div className="displaygrid1">{details.details?details.details:"-"}</div>
            </div>
            <div className="msrtitle2">Attachments</div>
            <hr className="msrhr1" />
            {availableFiles.map((item, index) => (
              <div key={index} className="msrattachment">
                <img
                  src={require("../../../Img/attachIcon1.png")}
                  className="msrattachIcon"
                />
                <div className="div-name" onClick={() => printTickets(index)}>
                  Attachment {index + 1}.pdf
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
            <div className="msrtitle3">
              {details.service_ref_number}-{details.title}
            </div>
            <span className="msrspan1">
              {details.description}
            </span>
            <div style={{ marginTop: "80px" }}>
              <button className="msrbutton1" onClick={() => toggleModal()}>
                Add Update
              </button>
              <button className="msrbutton2" onClick={() => togglefileModal()}>
                Add Attachments
              </button>
              <button className="msrbutton3" onClick={() => togglesrModal()}>
                Close SR
              </button>
            </div>
          </div>
          <div className="msrgrid3">
            <div className="msrupdatesgrid">
              <div className="image">
                <img
                  src={require("../../../Img/customerIcon.png")}
                  className="msrCommonIcon"
                />
              </div>
              <div>
                <span className="msrspan21">Update from customer</span>
                <span className="msrspan3"> 25/01/2022 10:00 AM</span>
                <div className="msrdiv3">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium ducimus rerum eius, facilis assumenda velit, fugit
                  consectetur animi veritatis explicabo ab saepe minus
                </div>
              </div>
            </div>
            <hr className="msrhr1" />
            <div className="msrupdatesgrid">
              <div className="image">
                <img
                  src={require("../../../Img/headIcon.png")}
                  className="msrCommonIcon"
                />
              </div>
              <div>
                <span className="msrspan21">Update from Luths Staff</span>
                <span className="msrspan3"> 25/01/2022 10:00 AM</span>
                <div className="msrdiv3">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium ducimus rerum eius, facilis assumenda velit, fugit
                  consectetur animi veritatis explicabo ab saepe minus
                </div>
              </div>
            </div>
            <hr className="msrhr1" />
            {/* <div className="msrupdatesgrid">
              <div className="image">
                <img
                  src={require("../../../Img/customerIcon.png")}
                  className="msrCommonIcon"
                />
              </div>
              <div>
                <span className="msrspan21">Internal Notes</span>
                <span className="msrspan3"> 25/01/2022 10:00 AM</span>
                <div className="msrdiv3">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium ducimus rerum eius, facilis assumenda velit, fugit
                  consectetur animi veritatis explicabo ab saepe minus
                </div>
              </div>
            </div> */}
            {/* <hr className="msrhr1" /> */}
            <div className="msrupdatesgrid">
              <div className="image">
                <img
                  src={require("../../../Img/systemIcon.png")}
                  className="msrCommonIcon"
                />
              </div>
              <div>
                <span className="msrspan21">System Update</span>
                <span className="msrspan3"> 25/01/2022 10:00 AM</span>
                <div className="msrdiv3">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium ducimus rerum eius, facilis assumenda velit, fugit
                  consectetur animi veritatis explicabo ab saepe minus
                </div>
              </div>
            </div>
            <hr className="msrhr1" />
          </div>
        </div>
      </div>

      <Modal
        isOpen={openupdate}
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div>
          <form>
            <div className="dialogclose">
              <IconButton onClick={toggleModal}>
                <CloseIcon sx={{ color: "black" }}></CloseIcon>
              </IconButton>
            </div>
            <div className="dialog-row1">
              <h5 style={{ fontSize: "22px", margin: "5px 0 0 0" }}>
                Add Update
              </h5>
              <hr className="clhrFirst" />
              <h5 className="dialogname">
                {details.service_ref_number}-{details.title}
              </h5>
            </div>
            <div className="dialog-row2">
              <textarea
                className="modeltextarea"
                value={text}
                onChange={(e) => {setText(e.target.value);setNoupdate(false)}}
                placeholder="Update Details"
              ></textarea>
              {noupdate && (
                <span style={{ color: "red", display: "block" }}>
                  No Updates Given
                </span>
              )}
              <div style={{ marginTop: "10px" }}>
                <button className="submitbtn" onClick={(e) => addUpdate(e)}>
                  Submit
                </button>
                <button className="closebtn" onClick={()=> toggleModal()}>
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
            <h5 style={{ fontSize: "22px", margin: "5px 0 0 0" }}>
              Close Service Request
            </h5>
            <hr className="clhrFirst" />
            <h5 className="dialogname">
              {details.service_ref_number}-{details.title}
            </h5>
          </div>
          <div className="dialog-row2">
            <textarea
              className="modeltextarea"
              value={closetext}
              onChange={(e) => setClosetext(e.target.value)}
              placeholder="Reason for Closing"
              required
            ></textarea>
            {noclose && (
                <span style={{ color: "red", display: "block" }}>
                  No Update Given
                </span>
              )}
            <div style={{ marginTop: "10px" }}>
              <button className="submitbtn">Submit</button>
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
            <h5 style={{ fontSize: "22px", margin: "5px 0 0 0" }}>
              Add Attachment
            </h5>
            <hr className="clhrFirst" />
            <h5 className="dialogname">
              {details.service_ref_number}-{details.title}
            </h5>
          </div>
          <div className="dialog-row2">
            <div>
              <FileUploader
                handleChange={(e) => onFileUpload(e)}
                name="file"
                types={fileTypes}
                onTypeError={(err) =>toast.error("Only pdf,png,jpeg files are allowed")}
                children={
                  <span className="dragndrop">
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
                  onTypeError={(err) =>toast.error("Only pdf,png,jpeg files are allowed")}
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

                    <span className="fileName">Attachment-{index + 1}</span>
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
    </div>
  );
};

export default ManageService;
