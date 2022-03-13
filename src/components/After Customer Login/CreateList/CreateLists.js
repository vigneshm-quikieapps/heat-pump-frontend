import React, { useState } from "react";
import {IconButton, Pagination } from "@mui/material";
import { useDropzone } from "react-dropzone";
import Modal from "react-modal";
import "./CreateList.css";
import CloseIcon from '@mui/icons-material/Close';

Modal.setAppElement("#root");

const CreateList = () => {
  const [high, setHigh] = useState(false);
  const [medium, setMedium] = useState(false);
  const [low, setLow] = useState(false);
  const [files, setFiles] = useState([]);
  const [open, setOpen] = React.useState(false);

  const list = [
    {
      id: "JR12345678",
      site: "10 windyridge Hamilton ML37TR",
      status: "completed",
    },
    {
      id: "JR90815678",
      site: "7 Covalburn Avenue Hamilton ML37TR",
      status: "inprogress",
    },
    {
      id: "JR12345678",
      site: "7 windyridge Avenue Hamilton ML37TR",
      status: "completed",
    },
  ];

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      setFiles([...files, acceptedFiles[0]]);
    },
  });

  const changeHandler = (event) => {
    console.log("hello", event.target.files);
    setFiles([...files, event.target.files[0]]);
    console.log(files);
  };

  const handleClick = (name) => {
    if (name === "high") {
      setHigh(true);
      setMedium(false);
      setLow(false);
    } else if (name === "medium") {
      setHigh(false);
      setMedium(true);
      setLow(false);
    } else {
      setHigh(false);
      setMedium(false);
      setLow(true);
    }
  };

  const removeFile = (index) => {
    console.log(index);
    const newValue = [...files];
    newValue.splice(index, 1);
    setFiles(newValue);
    console.log(files);
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div className="clcontainer">
      <div className="cltitle">Create a Service Requests</div>
      <hr className="clcontainerhr" />
      <div className="clpaper">
        <div className="clfirstrow">
          <div className="clnames">Joe Bloggs</div>
          <div style={{ fontSize: "small" }}>Heat Pump Scotland,Glasgow</div>
          <hr className="clhrFirst" />
        </div>
        <button className="btnjob" onClick={() => setOpen(true)}>
          Job Reference
        </button>
        <div className="gridmove">
          <div className="gridbox1">
            <div>Site</div>
            <div>29 Windyridge Hamilton,ML3 7PS</div>
            <div>Job ID</div>
            <div>JR12345678</div>
          </div>
        </div>

        <hr className="clhr1" />

        <div>
          <select className="servicetype">
            <option value="volvo">Service Type</option>
            <option value="saab">Service 1</option>
            <option value="mercedes">Service 2</option>
            <option value="audi">Service 3</option>
          </select>
        </div>

        <div>
          <input type="text" className="clinput" placeholder="Title" />
        </div>
        <div>
          <textarea
            id="w3review"
            name="w3review"
            rows="10"
            cols=""
            placeholder="Details"
            className="cltextarea"
          ></textarea>

          <h4 className="name1">Attachments</h4>

          <hr className="clhr2" />

          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <span className="dragndrop">
              Drag and Drop Here
              <img
                src={require("../../../Img/iconcloud.png")}
                height="25px"
                width={"25px"}
                style={{ marginLeft: "20px" }}
              />
            </span>

            <span className="or">OR</span>

            <span className="browse">
              <input
                style={{ display: "none" }}
                id="plans"
                type="file"
                name="file"
                onChange={changeHandler}
              />
              <label htmlFor="plans">
                <button className="browsebtn">Browse</button>
              </label>
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

          <h4 className="name2">Priority</h4>

          <hr className="clhr2" />

          <button
            className={high ? "highBtnActive highBtn " : " highBtn"}
            value="high"
            onClick={(e) =>
              high ? setHigh(false) : handleClick(e.target.value)
            }
          >
            High
          </button>

          <button
            className={medium ? "mediumBtnActive  mediumBtn " : " mediumBtn"}
            value="medium"
            onClick={(e) =>
              medium ? setMedium(false) : handleClick(e.target.value)
            }
          >
            Medium
          </button>

          <button
            className={low ? "lowBtnActive lowBtn " : " lowBtn"}
            value="low"
            onClick={(e) => (low ? setLow(false) : handleClick(e.target.value))}
          >
            Low
          </button>

          <div>
            <button className="submitBtn">Submit</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={open}
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div>
          <div className="dialogclose">
            <IconButton onClick={toggleModal}>
              <CloseIcon
                sx={{ color: "black"}}
              ></CloseIcon>
            </IconButton>
          </div>
          <div className="dialog-row1">
            <h5 className="dialogname">Joe Bloggs</h5>
            <h6 style={{ fontSize: "22px", margin: "5px 0 5px 0" }}>My Jobs</h6>
            <hr className="clhrFirst" />
          </div>
          <div className="dialog-row2">
            <table sx={{ border: "none" }}>
              <thead className="thead">
                <tr>
                  <th className="header">Job Reference</th>
                  <th className="header">Site Details</th>
                  <th className="header">Status</th>
                </tr>
              </thead>
              {list &&
                list.map((item, index) => {
                  return (
                    <tbody className="tbody">
                      <tr key={index}
                      // style={index == 1 ? { backgroundColor: "lightgrey" } : ""}
                      >
                        <td className="">{item.id}</td>
                        <td className="">{item.site}</td>
                        <td className="">{item.status}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              className="pagination"
              count={3}
              color="primary"
              variant="outlined "
              page={1}
              onChange={() => {}}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateList;
