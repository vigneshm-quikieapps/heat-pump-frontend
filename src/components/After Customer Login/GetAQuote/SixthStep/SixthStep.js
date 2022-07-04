import React, { useState, useEffect } from "react";
import "./SixthStep.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../../GlobalUrl";
import globalAPI from "../../../../GlobalApi";
import { Button, Typography, Box, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import { Card, TextField, ImgIcon } from "../../../../common";
import StyledTextField from "../../../../common/textfield";
import DeleteIcon from "../../../../Img/icon remove.png";
import IconButton from "@mui/material/IconButton";
import {
  bookJobAction,
  bookJobReset,
} from "../../../../Redux/bookJob/bookJob.action";
import { connect, useDispatch } from "react-redux";
const useStyles = makeStyles({
  textfield: {
    "& label.Mui-focused": {
      color: "black",
      fontSize: "18px",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.46vw",
      marginRight: "3.73vw",
      height: "6.71vh",
      fontSize: "18px",
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
  button: {
    backgroundColor: "black",
    width: "20%",
    height: "1.5%",
    borderRadius: "2.5vw",
    marginTop: "5%",
    fontSize: "18px",
    fontFamily: "Outfit",
    fontWeight: "300",
  },
  button1: {
    backgroundColor: "white",
    width: "20%",
    height: "1.5%",
    borderRadius: "2.5vw",
    marginTop: "5%",
    fontSize: "18px",
    fontFamily: "Outfit",
    fontWeight: "300",
    color: "black",
  },
  button2: {
    backgroundColor: "black",
    width: "20%",
    height: "1.5%",
    borderRadius: "2.5vw",
    marginTop: "5%",
    fontSize: "18px",
    fontFamily: "Outfit",
    fontWeight: "300",
    marginLeft: "2%",
  },
});

const SixthStep = ({ myProps, bookJobDetails, bookJobAction }) => {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"));
  const [emptyFlag, setEmptyFlag] = useState(true);
  const [inputList, setInputList] = useState([
    {
      room_desc: "",
      radiator_size: "",
      window_size: "",
    },
  ]);
  const Input = () => {
    return (
      <div style={{ marginTop: "2.5%" }}>
        <StyledTextField
          sx={{ marginRight: "40px", width: "20%" }}
          label="Room Description"
          value={""}
          onChange={""}
        />
        <StyledTextField
          sx={{ marginRight: "40px", width: "20%" }}
          label="Radiator (H x W in mm)"
          value={""}
          onChange={""}
        />
        <StyledTextField
          sx={{ width: "20%" }}
          label="Window (H x W in mm)"
          value={""}
          onChange={""}
        />
      </div>
    );
  };

  useEffect(() => {
    setInputList(bookJobDetails?.radiator_and_window_sizes);
  }, [bookJobDetails]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const onAddBtnClick = (event) => {
    // setInputList(inputList.concat(<Input key={inputList.length} />));
    let temp = [...inputList];
    temp.push({
      room_desc: "",
      radiator_size: "",
      window_size: "",
    });
    setInputList(temp);
  };
  const setData = (index, field, newValue) => {
    let temp = [...inputList];
    temp[index][field] = newValue;
    setInputList(temp);
  };
  return (
    <Card>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <div className="s6text1">
        Step 6 of 9
        <img src={require("../../../../Img/step6.png")} className="s6baricon" />
      </div>

      <Typography
        style={{
          fontSize: "30px",
          fontFamily: "Outfit",
          fontWeight: "600",
          marginTop: "10vh",
        }}
      >
        Radiator and Window Sizes
      </Typography>
      <hr className="s2hr2" />
      <Typography sx={{ color: "gray", fontFamily: "Outfit" }}>
        Please fill in the details for rooms with multiple radiators or windows
        by adding another room.
      </Typography>
      {/* {inputList} */}
      {inputList.length &&
        inputList?.map((item, index) => (
          <div style={{ marginTop: "2.5%" }} key={`inputList${index}`}>
            <StyledTextField
              // error={item?.room_desc === "" && true}
              sx={{ marginRight: "40px", width: "20%" }}
              label="Room Description"
              value={item?.room_desc || ""}
              onChange={(e) => {
                setData(index, "room_desc", e.target.value);
                setEmptyFlag(false);
              }}
              // helperText={
              //   item?.room_desc === "" && "Room description in mandatory"
              // }
            />
            <StyledTextField
              // error={item?.radiator_size === "" && true}
              sx={{ marginRight: "40px", width: "20%" }}
              label="Radiator (H x W in mm)"
              value={item?.radiator_size || ""}
              onChange={(e) => {
                setData(index, "radiator_size", e.target.value);
                setEmptyFlag(false);
              }}
              // helperText={
              //   item?.radiator_size === "" && "Radiator size in mandatory"
              // }
            />
            <StyledTextField
              // error={item?.window_size === "" && true}
              sx={{ width: "20%" }}
              label="Window (H x W in mm)"
              value={item?.window_size || ""}
              onChange={(e) => {
                setData(index, "window_size", e.target.value);
                setEmptyFlag(false);
              }}
              // helperText={
              //   item?.window_size === "" && "Window size in mandatory"
              // }
            />
            {index !== 0 && (
              <Box sx={{ display: "inline", float: "right" }}>
                <Tooltip
                  title="Remove room"
                  placement="bottom-start"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        padding: "12px 22px 13px",
                        width: "205px",
                        height: "50px",
                        fontSize: "20px",
                        fontFamily: "Outfit",
                        backgroundColor: "#fafafa",
                        color: "black",
                        textAlign: "center",
                      },
                    },
                  }}
                >
                  <IconButton
                    onClick={() => {
                      let temp = [...inputList];
                      temp.splice(index, 1);
                      setInputList(temp);
                    }}
                  >
                    <ImgIcon>{DeleteIcon}</ImgIcon>
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </div>
        ))}

      <Typography>
        <Button
          sx={{
            textTransform: "none",
            "&:hover": {
              background: "#000",
            },
          }}
          className={classes.button}
          onClick={() => {
            // if (
            //   inputList[inputList.length - 1]?.room_desc == "" ||
            //   undefined ||
            //   inputList[inputList.length]?.radiator_size == "" ||
            //   undefined ||
            //   inputList[inputList.length]?.window_size == "" ||
            //   undefined
            // ) {
            //   return;
            // } else {
            onAddBtnClick();
            // }
          }}
          variant="contained"
          startIcon={<AddIcon style={{ height: "5vh", width: "2vw" }} />}
        >
          Add Room
        </Button>
      </Typography>
      <Box sx={{ display: "flex", marginTop: "60px" }}>
        <button
          variant="contained"
          className="btn-house btn-icon"
          onClick={() => {
            bookJobAction({ radiator_and_window_sizes: inputList });
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
            // let temp = inputList.some(
            //   (item, index) =>
            //     item?.room_desc == "" ||
            //     undefined ||
            //     item?.radiator_size == "" ||
            //     undefined ||
            //     item?.window_size == "" ||
            //     undefined
            // );
            // if (temp) {
            //   return;
            // } else {
            myProps.getPayloadData(["radiator_and_window_sizes"], [inputList]);
            bookJobAction({ radiator_and_window_sizes: inputList });
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

export default connect(mapStateToProps, mapDispatchToProps)(SixthStep);
// export default SixthStep;
