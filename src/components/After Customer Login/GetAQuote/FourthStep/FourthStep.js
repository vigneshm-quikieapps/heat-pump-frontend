import React, { useState, useEffect } from "react";
import "./FourthStep.css";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../../GlobalUrl";
import globalAPI from "../../../../GlobalApi";
import { Box, Typography } from "@mui/material";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import { Card } from "../../../../common";
import { set } from "react-hook-form";
import {
  bookJobAction,
  bookJobReset,
} from "../../../../Redux/bookJob/bookJob.action";
import { connect, useDispatch } from "react-redux";

const fileTypes = ["PDF", "PNG", "JPEG"];
// let flag = false;
const FourthStep = ({ myProps, bookJobDetails, bookJobAction }) => {
  const [plans, setPlans] = useState([]);
  const [pattachments, setPattachments] = useState([]);
  const [elevations, setElevations] = useState([]);
  const [eattachments, setEattachments] = useState([]);
  const [sections, setSections] = useState([]);
  const [sattachments, setSattachments] = useState([]);
  const [loader, setLoader] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setPlans(bookJobDetails.drawings.plans);
    setElevations(bookJobDetails.drawings.elevations);
    setSections(bookJobDetails.drawings.sections);
  }, [bookJobDetails]);
  const onFileUpload = (e, name) => {
    console.log(name);
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
          if (res.success) {
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
  console.log(plans);
  return (
    <Card>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <div className="step4text1">
        Step 4 of 9
        <img src={require("../../../../Img/step4.png")} className="s4baricon" />
      </div>

      <Typography
        style={{
          fontSize: "30px",
          fontFamily: "Outfit",
          fontWeight: "600",
          marginTop: "10vh",
        }}
      >
        Upload Drawings
      </Typography>
      <hr className="s2hr2" />
      <h4 className="s4name1">Plans-GF/1F/2F</h4>
      <hr className="s4hr2" />
      <div>
        <FileUploader
          handleChange={(e) => onFileUpload(e, "plans")}
          name="file"
          types={fileTypes}
          onTypeError={(err) =>
            toast.error("Only pdf, png, jpeg files are allowed")
          }
          children={
            <span className="s4dragndrop">
              Drag and Drop Here
              <img
                src={require("../../../../Img/iconcloud.png")}
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
          name="file"
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
                  src={require("../../../../Img/attachIcon.png")}
                  style={{
                    marginLeft: "20px",
                    height: "2.8vh",
                    width: "1vw",
                  }}
                />

                <span className="s4fileName">{item}</span>
              </span>

              <img
                src={require("../../../../Img/iconDelete.png")}
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
          name="file"
          types={fileTypes}
          onTypeError={(err) =>
            toast.error("Only pdf, png, jpeg files are allowed")
          }
          children={
            <span className="s4dragndrop">
              Drag and Drop Here
              <img
                src={require("../../../../Img/iconcloud.png")}
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
          name="file"
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
                  src={require("../../../../Img/attachIcon.png")}
                  style={{
                    marginLeft: "20px",
                    height: "2.8vh",
                    width: "1vw",
                  }}
                />

                <span className="s4fileName">{item}</span>
              </span>

              <img
                src={require("../../../../Img/iconDelete.png")}
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
          name="file"
          types={fileTypes}
          onTypeError={(err) =>
            toast.error("Only pdf, png, jpeg files are allowed")
          }
          children={
            <span className="s4dragndrop">
              Drag and Drop Here
              <img
                src={require("../../../../Img/iconcloud.png")}
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
          name="file"
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
                  src={require("../../../../Img/attachIcon.png")}
                  style={{
                    marginLeft: "20px",
                    height: "2.8vh",
                    width: "1vw",
                  }}
                />

                <span className="s4fileName">{item}</span>
              </span>

              <img
                src={require("../../../../Img/iconDelete.png")}
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
      {/* {flag && (
        <span style={{ fontSize: "20px", color: "red", marginBottom: "5%" }}>
          At least 1 drawing is mandatory for each topics
        </span>
      )} */}
      <Box sx={{ display: "flex" }}>
        <button
          variant="contained"
          className="btn-house btn-icon"
          onClick={() => {
            bookJobAction({
              drawings: {
                plans: plans,
                elevations: elevations,
                sections: sections,
              },
            });
            myProps.prev();
          }}
        >
          <span style={{ height: "27px", width: "27px" }}>
            <ChevronLeftSharpIcon sx={{ height: "27px", width: "27px" }} />
          </span>
          <span style={{ marginLeft: "100px" }}>Previous</span>
        </button>
        <button
          variant="contained"
          className="btn-house Add btn-icon"
          onClick={() => {
            // flag = true;
            // if (
            //   plans.length < 1 ||
            //   sections.length < 1 ||
            //   elevations.length < 1
            // ) {
            //   setFlag(true);
            // } else {
            //   setFlag(false);
            myProps.getPayloadData(
              ["drawings"],
              [{ plans: plans, elevations: elevations, sections: sections }]
            );
            bookJobAction({
              drawings: {
                plans: plans,
                elevations: elevations,
                sections: sections,
              },
            });
            myProps.next();
            // }
          }}
        >
          <span style={{ marginRight: "100px" }}>Continue</span>
          <span style={{ height: "27px", width: "27px" }}>
            <ChevronRightSharpIcon sx={{ height: "27px", width: "27px" }} />
          </span>
        </button>
      </Box>
    </Card>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    myProps: ownProps,
    bookJobDetails: state.bkjb,
  };
};

const mapDispatchToProps = (dispatch) => ({
  bookJobAction: (keypair) => dispatch(bookJobAction(keypair)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FourthStep);
// export default FourthStep;
