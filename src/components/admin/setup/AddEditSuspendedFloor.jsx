// import React from "react";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { TailSpin } from "react-loader-spinner";
import { Typography } from "@mui/material";
import { Card, Pagination, Table } from "../../../common";
import {
  getFabricType,
  createFabricType,
  updateFabricType,
} from "../../../services/services";
import { useNavigate } from "react-router-dom";
import StyledTextField from "../../../common/textfield";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router";
import "./Style/AddEditExternalWall.css";
import { useGetFabricType } from "../../../services/services";
import { toast } from "react-toastify";
import {
  IconButton,
  Container,
  Paper,
  Grid,
  // Typography,
  TextField,
} from "@mui/material";
import { connect } from "react-redux";
import { adminFirstPageAction } from "../../../Redux/AdminFirstPage/adminFirstPage.action";
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
function AddEditSuspendedFloor({ adminFirstPageAction }) {
  const { id: fabricId } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const [suspendedFloorData, setSuspendedFloorData] = useState({
    fabric_type: "",
    status: "1",
    description: "",
    image_url: "",
    longness_of_suspended_floor: "",
    shortness_of_suspended_floor: "",
  });
  const [cal, setCal] = useState("");
  useEffect(() => {
    suspendedFloorData?.shortness_of_suspended_floor !== "" &&
      suspendedFloorData?.longness_of_suspended_floor !== "" &&
      setCal(
        Number(suspendedFloorData?.shortness_of_suspended_floor) +
          Number(suspendedFloorData?.longness_of_suspended_floor)
      );
  }, [suspendedFloorData]);
  useEffect(() => {
    adminFirstPageAction(false);
  }, []);
  const [loader, setLoader] = useState(fabricId ? true : false);
  const [isSavedStatus, setIsSavedStatus] = useState(false);
  useEffect(() => {
    fabricId &&
      getFabricType(fabricId).then((res) => {
        setSuspendedFloorData(res.data.data);
        setLoader(false);
      });
  }, [fabricId]);
  const changeHandler = (e) => {
    let temp = { ...suspendedFloorData };
    temp[`${e.target.name}`] = e.target.value;
    setSuspendedFloorData(temp);
  };
  const createUpdateFabric = () => {
    fabricId
      ? updateFabricType(fabricId, { ...suspendedFloorData, type: 5 })
          .then((res) => {
            toast.success("This fabric updated successfully");
            // navigate(`/admincommon/suspendedFloorType/`);
          })
          .catch((error) => console.log(error))
      : createFabricType({ ...suspendedFloorData, type: 5 })
          .then((res) => {
            toast.success("New fabric created successfully");
            // navigate(`/admincommon/suspendedFloorType/`);
          })
          .catch((error) => console.log(error));
  };
  return (
    <>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <Typography
        variant="h6"
        style={{
          fontWeight: 300,
          fontSize: "60px",
          fontFamily: "Outfit",
          marginLeft: "40px",
        }}
      >
        Suspended Floor Type
        <hr className="containerhr" />
      </Typography>
      <Card>
        <Box sx={{ display: "flex", flexDirection: "column", ml: 5 }}>
          <Box sx={{ display: "flex", flexDirection: "row", mb: 10 }}>
            <StyledTextField
              required
              type="number"
              error={suspendedFloorData?.fabric_type === "" && isSavedStatus}
              value={suspendedFloorData?.fabric_type}
              onChange={changeHandler}
              name="fabric_type"
              label="Type"
              variant="outlined"
              helperText={
                suspendedFloorData?.fabric_type === "" &&
                isSavedStatus &&
                "Type in mandatory"
              }
            />
            <StyledTextField
              select
              required
              error={suspendedFloorData?.status === "" && isSavedStatus}
              sx={{ width: "210px", height: "63px", ml: 5 }}
              InputLabelProps={{ style: { background: "#FFF" } }}
              value={suspendedFloorData?.status}
              onChange={changeHandler}
              name="status"
              label="Status"
            >
              <MenuItem value={1} style={{ fontWeight: 600 }}>
                Active
              </MenuItem>
              <MenuItem value={2} style={{ fontWeight: 600 }}>
                Inactive
              </MenuItem>
            </StyledTextField>
          </Box>
          <TextField
            required
            sx={{
              "&:hover": { borderColor: "none" },
              mb: 10,
            }}
            error={suspendedFloorData?.description === "" && isSavedStatus}
            label="Floor Description"
            variant="outlined"
            multiline
            rows={5}
            className={classes.rowfield}
            name="description"
            value={suspendedFloorData?.description}
            // placeholder="Update details"
            onChange={changeHandler}
            helperText={
              suspendedFloorData?.description === "" &&
              isSavedStatus &&
              "Wall Construction in mandatory"
            }
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
              ml: 0,
            }}
          >
            <StyledTextField
              sx={{ width: "400px" }}
              type="number"
              //   error={suspendedFloorData?.fabric_type === "" && isSavedStatus}
              value={cal || ""}
              //   onChange={changeHandler}
              name="cal"
              label="Length of exposed wall (a+b)"
              variant="outlined"
              disabled
              //   helperText={
              //     suspendedFloorData?.fabric_type === "" &&
              //     isSavedStatus &&
              //     "Type in mandatory"
              //   }
            />
            <StyledTextField
              required
              type="number"
              error={
                suspendedFloorData?.shortness_of_suspended_floor === "" &&
                isSavedStatus
              }
              value={suspendedFloorData?.shortness_of_suspended_floor}
              onChange={changeHandler}
              name="shortness_of_suspended_floor"
              label="Short a(m)"
              variant="outlined"
              helperText={
                suspendedFloorData?.shortness_of_suspended_floor === "" &&
                isSavedStatus &&
                "Short a(m) in mandatory"
              }
            />
            <StyledTextField
              required
              type="number"
              error={
                suspendedFloorData?.longness_of_suspended_floor === "" &&
                isSavedStatus
              }
              value={suspendedFloorData?.longness_of_suspended_floor}
              onChange={changeHandler}
              name="longness_of_suspended_floor"
              label="Long b(m)"
              variant="outlined"
              helperText={
                suspendedFloorData?.longness_of_suspended_floor === "" &&
                isSavedStatus &&
                "Long b(m) in mandatory"
              }
            />
          </Box>
          {/* <TextField
            required
            sx={{
              "&:hover": { borderColor: "none" },
              mb: 10,
            }}
            error={suspendedFloorData?.details === "" && isSavedStatus}
            label="Window Details"
            variant="outlined"
            multiline
            rows={5}
            name="details"
            className={classes.rowfield}
            value={suspendedFloorData?.details}
            // placeholder="Update details"
            onChange={changeHandler}
            helperText={
              suspendedFloorData?.details === "" &&
              isSavedStatus &&
              "Details are mandatory"
            }
          /> */}
          <Box sx={{ mb: 15 }}>
            <Typography
              sx={{
                width: "20%",
                mt: 2,
                color: "#fa5e00",
                fontSize: "22px",
                fontWeight: "600",
                fontFamily: "Outfit",
                textAlign: "right",
              }}
            >
              Image
            </Typography>

            <hr
              // className="imagehr"
              style={{
                width: "20%",
                backgroundColor: "#f2f3f2",
                border: "1px solid #f2f3f2",
                marginTop: "10px",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box sx={{ width: "200px", mr: 10 }}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontFamily: "Outfit",
                    fontSize: "18px",
                  }}
                >
                  Not Available
                </Typography>
              </Box>
              <button
                variant="contained"
                className="btn-house btn-icon"
                // onClick={props.prev()}
              >
                <span style={{ height: "27px", width: "27px" }}>
                  <img src={require("../../../Img/icon attach.png")} />
                </span>
                <span>Add Image</span>
              </button>
            </Box>
          </Box>
          <Box>
            <button
              className="browsebtn"
              onClick={() => {
                setIsSavedStatus(true);
                createUpdateFabric();
              }}
            >
              Save
            </button>
            <button
              className="cancel"
              onClick={() => {
                navigate(`/admincommon/suspendedFloorType/`);
              }}
            >
              Discard
            </button>
          </Box>
        </Box>
      </Card>
    </>
  );
}
const mapDispatchToProps = (dispatch) => ({
  adminFirstPageAction: (value) => dispatch(adminFirstPageAction(value)),
});

export default connect(null, mapDispatchToProps)(AddEditSuspendedFloor);
// export default AddEditSuspendedFloor;
