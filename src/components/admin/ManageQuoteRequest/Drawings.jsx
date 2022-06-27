import React, { useState, useEffect } from "react";
// import "./FourthStep.css";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";
import { Box, Typography } from "@mui/material";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import { Card } from "../../../common";
import { set } from "react-hook-form";
import { getQuote, UpdateJob } from "../../../services/services";

import { connect, useDispatch } from "react-redux";

const fileTypes = ["PDF", "PNG", "JPEG"];
// let flag = false;
const FourthStep = (props) => {
  const [plans, setPlans] = useState([]);
  const [pattachments, setPattachments] = useState([]);
  const [elevations, setElevations] = useState([]);
  const [eattachments, setEattachments] = useState([]);
  const [sections, setSections] = useState([]);
  const [sattachments, setSattachments] = useState([]);
  const [loader, setLoader] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setElevations(props?.quoteData?.drawings?.elevations || elevations);
    setSections(props?.quoteData?.drawings?.sections || sections);
    setPlans(props?.quoteData?.drawings?.plans || plans);
  }, [props]);
  const updateStatus = (e) => {
    UpdateJob(props?.quoteData?._id, {
      drawings: { plans: plans, sections: sections, elevations: elevations },
    }).then((res) => {
      toast.success("Updated successfully");
    });
  };
  const onFileUpload = (e, name) => {
    if (e) {
      let formData = new FormData();
      formData.append("attachments", e);
      setLoader(true);
      axios({
        method: "post",
        url: URL + globalAPI.fileupload,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const res = response.data;
          setLoader(false);
          if (res?.success) {
            if (name == "plans") {
              pattachments.push(res.data.message[0]);
              setPlans([...plans, e.name]);
            } else if (name == "sections") {
              sattachments.push(res.data.message[0]);
              setSections([...sections, e.name]);
            } else {
              eattachments.push(res.data.message[0]);
              setElevations([...elevations, e.name]);
            }
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

  const removeFile = (name, index) => {
    if (name == "plans") {
      const newValue = [...plans];
      newValue.splice(index, 1);
      setPlans(newValue);
      const newAttachments = [...pattachments];
      newAttachments.splice(index, 1);
      setPattachments(newAttachments);
    }
    if (name == "elevations") {
      const newValue = [...elevations];
      newValue.splice(index, 1);
      setElevations(newValue);
      const newAttachments = [...sattachments];
      newAttachments.splice(index, 1);
      setSattachments(newAttachments);
    } else {
      const newValue = [...sections];
      newValue.splice(index, 1);
      setSections(newValue);
      const newAttachments = [...sattachments];
      newAttachments.splice(index, 1);
      setSattachments(newAttachments);
    }
  };

  return (
    <>
      {/* <Card sx={{ m: 0 }}> */}
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <h4 className="s4name1">Plans</h4>
      <hr className="s4hr2" />
      <div>
        <FileUploader
          handleChange={(e) => onFileUpload(e, "plans")}
          name="plans"
          types={fileTypes}
          onTypeError={(err) =>
            toast.error("Only pdf, png, jpeg files are allowed")
          }
          children={
            <span className="s4dragndrop">
              Drag and Drop Here
              <img
                src={require("../../../Img/iconcloud.png")}
                style={{
                  marginLeft: "20px",
                  height: "3.35vh",
                  width: "1.63vw",
                }}
              />
            </span>
          }
        />

        <span className="s4or">OR</span>

        <FileUploader
          handleChange={(e) => onFileUpload(e, "plans")}
          name="plans"
          types={fileTypes}
          onTypeError={(err) =>
            toast.error("Only pdf, png, jpeg files are allowed")
          }
          children={
            <span className="s4browse">
              <button className="s4browsebtn">Browse</button>
            </span>
          }
        />
      </div>

      {plans &&
        plans?.map((item, index) => {
          return (
            <div
              className="s4filemap"
              style={{ borderRadius: "1.8vw" }}
              key={index}
            >
              <span style={{ float: "left", marginLeft: "1vw" }}>
                <img
                  src={require("../../../Img/attachIcon.png")}
                  style={{
                    marginLeft: "20px",
                    height: "2.8vh",
                    width: "1vw",
                  }}
                />

                <span className="s4fileName">{item}</span>
              </span>

              <img
                src={require("../../../Img/iconDelete.png")}
                onClick={(e) => removeFile(e.target.name, index)}
                style={{
                  marginRight: "20px",
                  width: "1.3vw",
                  height: "2.9vh",
                }}
                name="plans"
              />
            </div>
          );
        })}

      <h4 className="s4name1">Elevations</h4>
      <hr className="s4hr2" />
      <div>
        <FileUploader
          handleChange={(e) => onFileUpload(e, "elevations")}
          name="elevations"
          types={fileTypes}
          onTypeError={(err) =>
            toast.error("Only pdf, png, jpeg files are allowed")
          }
          children={
            <span className="s4dragndrop">
              Drag and Drop Here
              <img
                src={require("../../../Img/iconcloud.png")}
                style={{
                  marginLeft: "20px",
                  height: "3.35vh",
                  width: "1.63vw",
                }}
              />
            </span>
          }
        />

        <span className="s4or">OR</span>

        <FileUploader
          handleChange={(e) => onFileUpload(e, "elevations")}
          name="elevations"
          types={fileTypes}
          onTypeError={(err) =>
            toast.error("Only pdf, png, jpeg files are allowed")
          }
          children={
            <span className="s4browse">
              <button className="s4browsebtn">Browse</button>
            </span>
          }
        />
      </div>
      {elevations &&
        elevations?.map((item, index) => {
          return (
            <div
              className="s4filemap"
              style={{ borderRadius: "1.8vw" }}
              key={index}
            >
              <span style={{ float: "left", marginLeft: "1vw" }}>
                <img
                  src={require("../../../Img/attachIcon.png")}
                  style={{
                    marginLeft: "20px",
                    height: "2.8vh",
                    width: "1vw",
                  }}
                />

                <span className="s4fileName">{item}</span>
              </span>

              <img
                src={require("../../../Img/iconDelete.png")}
                onClick={(e) => removeFile(e.target.name, index)}
                style={{
                  marginRight: "20px",
                  width: "1.3vw",
                  height: "2.9vh",
                }}
                name="elevations"
              />
            </div>
          );
        })}

      <h4 className="s4name1">Sections</h4>
      <hr className="s4hr2" />
      <div>
        <FileUploader
          handleChange={(e) => onFileUpload(e, "sections")}
          name="sections"
          types={fileTypes}
          onTypeError={(err) =>
            toast.error("Only pdf, png, jpeg files are allowed")
          }
          children={
            <span className="s4dragndrop">
              Drag and Drop Here
              <img
                src={require("../../../Img/iconcloud.png")}
                style={{
                  marginLeft: "20px",
                  height: "3.35vh",
                  width: "1.63vw",
                }}
              />
            </span>
          }
        />

        <span className="s4or">OR</span>

        <FileUploader
          handleChange={(e) => onFileUpload(e, "sections")}
          name="sections"
          types={fileTypes}
          onTypeError={(err) =>
            toast.error("Only pdf, png, jpeg files are allowed")
          }
          children={
            <span className="s4browse">
              <button className="s4browsebtn">Browse</button>
            </span>
          }
        />
      </div>
      {sections &&
        sections?.map((item, index) => {
          return (
            <div
              className="s4filemap"
              style={{ borderRadius: "1.8vw" }}
              key={index}
            >
              <span style={{ float: "left", marginLeft: "1vw" }}>
                <img
                  src={require("../../../Img/attachIcon.png")}
                  style={{
                    marginLeft: "20px",
                    height: "2.8vh",
                    width: "1vw",
                  }}
                />

                <span className="s4fileName">{item}</span>
              </span>

              <img
                src={require("../../../Img/iconDelete.png")}
                onClick={(e) => removeFile(e.target.name, index)}
                style={{
                  marginRight: "20px",
                  width: "1.3vw",
                  height: "2.9vh",
                }}
                name="sections"
              />
            </div>
          );
        })}

      <Box sx={{ display: "flex" }}></Box>
      {/* </Card> */}
      <button
        className="browsebtn"
        name="status"
        style={{ marginTop: "5%", marginLeft: "-5px" }}
        onClick={(e) => {
          updateStatus(e);
        }}
      >
        Save
      </button>
    </>
  );
};

export default FourthStep;
