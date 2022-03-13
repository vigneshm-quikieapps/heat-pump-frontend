import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, Pagination } from "@mui/material";
import Modal from "react-modal";
import "./CreateList.css";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { FileUploader } from "react-drag-drop-files";
import { Triangle } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";
import {formDataHeader,header} from '../../../utils/headers';

Modal.setAppElement("#root");

const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

const CreateList = () => {
  const [high, setHigh] = useState(false);
  const [medium, setMedium] = useState(false);
  const [low, setLow] = useState(false);
  const [files, setFiles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [servicetype,setServicetype] = useState([]);
  const [title,setTitle] = useState("");
  const [details,setDetails] = useState("");
  const [priority,setPriority] = useState("");

  const FIVE_MB_SIZE = 5242880;
  const pdfMIME = "data:application/pdf";

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

  const changeHandler = (event) => {
    console.log("hello", event.target.files);
    setFiles([...files, event.target.files[0]]);
    console.log(files);
  };

  const handleSelectChange = (event) =>{
    setServicetype(event.target.value);
    console.log('service type',servicetype)
}

  const handleChange = async (e) => {
    let fileReader = new FileReader();
    let file = e;
    fileReader.onload = () => {
      const singlefile = {
        data: fileReader.result,
      };
      let o = singlefile.data.split(";");
      if (file && file.size < FIVE_MB_SIZE) {
        debugger
        if (o[0] === pdfMIME) {
          console.log(singlefile, file);
          // upload.push(file);
          setFiles([...files, file]);
          console.log(files);
        } else {
          toast.error("Only .pdf files allowed");
        }
      } else {
        toast.error("File Size should be less than 5 MB");
      }
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  const handleClick = (name) => {
    if (name === "high") {
      setHigh(true);
      setPriority("1");
      setMedium(false);
      setLow(false);
    } else if (name === "medium") {
      setPriority("2");
      setHigh(false);
      setMedium(true);
      setLow(false);
    } else {
      setHigh(false);
      setPriority("3");
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

  const uploadMapping = (e) => {
    e.preventDefault();
    if (files.length >=1) {
      let formData = new FormData();
      const data ={
        title:title,
        description:details,
        priority:priority,
        servicetype:servicetype,
      };
      formData.append("file_data", files);

      setLoader(true);
      axios
        .post(URL +'', data,formData, formDataHeader())
        .then((response) => {
          setLoader(false);
          const res = response.data;
          if (res.upload_error) {
            toast.error("Some Records are not Sucessfully Inserted");
          } else {
            toast.success(res.message);
          }
        })
        .catch(() => {
          setLoader(false);
          toast.error("Something went wrong");
        });
    } else {
      setLoader(false);
      toast.error("Please add Attachments");
    }
  };

  return (
    <div>
      {loader && (
        <div className="customLoader">
          <Triangle color="#007bff" height="130" width="130" />
        </div>
      )}
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
            <select className="servicetype" value={servicetype} onChange={handleSelectChange}>
              <option value="one">Service 1</option>
              <option value="two">Service 2</option>
              <option value="three">Service 3</option>
            </select>
          </div>

          <div>
            <input type="text" className="clinput" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          </div>
          <div>
            <textarea
              id="details"
              name="details"
              rows="10"
              placeholder="Details"
              className="cltextarea"
              value={details}
              onChange={(e)=>setDetails(e.target.value)}
            ></textarea>

            <h4 className="name1">Attachments</h4>

            <hr className="clhr2" />

            <div>
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
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
              onClick={(e) =>
                low ? setLow(false) : handleClick(e.target.value)
              }
            >
              Low
            </button>

            <div>
              {servicetype !== ""&&priority !== ""&&title !== ""&&details!== "" &&<button className="submitBtn" onClick={(e) => uploadMapping(e)}>
                Submit
              </button>}
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
                <CloseIcon sx={{ color: "black" }}></CloseIcon>
              </IconButton>
            </div>
            <div className="dialog-row1">
              <h5 className="dialogname">Joe Bloggs</h5>
              <h6 style={{ fontSize: "22px", margin: "5px 0 5px 0" }}>
                My Jobs
              </h6>
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
                        <tr
                          key={index}
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
    </div>
  );
};

export default CreateList;
