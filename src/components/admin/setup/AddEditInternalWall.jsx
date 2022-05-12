// import React from "react";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { TailSpin } from "react-loader-spinner";
import { Typography } from "@mui/material";
import { Card, Pagination, Table } from "../../../common";
import { useGetAllQuotes } from "../../../services/services";
import { useNavigate } from "react-router-dom";
import StyledTextField from "../../../common/textfield";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import { useGetFabricType } from "../../../services/services";
import { useParams } from "react-router";
// import { getFabricType } from "../../../services/services";
import {
  getFabricType,
  createFabricType,
  updateFabricType,
} from "../../../services/services";
import "./Style/AddEditExternalWall.css";
import {
  IconButton,
  Container,
  Paper,
  Grid,
  // Typography,
  TextField,
} from "@mui/material";
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
function AddEditInternalWall() {
  const { id: fabricId } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const [loader, setLoader] = useState(fabricId ? true : false);
  const [internalWallData, setInternalWallData] = useState({
    fabric_type: "",
    status: "1",
    description: "",
    // detail: "",
    image_url: "",
  });
  const [isSavedStatus, setIsSavedStatus] = useState(false);
  const changeHandler = (e) => {
    let temp = { ...internalWallData };
    temp[`${e.target.name}`] = e.target.value;
    setInternalWallData(temp);
  };
  useEffect(() => {
    fabricId &&
      getFabricType(fabricId).then((res) => {
        setInternalWallData(res.data.data);
        setLoader(false);
      });
  }, [fabricId]);
  const createUpdateFabric = () => {
    fabricId
      ? updateFabricType(fabricId, { ...internalWallData, type: 2 })
          .then((res) => navigate(`/admincommon/internalType/`))
          .catch((error) => console.log(error))
      : createFabricType({ ...internalWallData, type: 2 })
          .then((res) => navigate(`/admincommon/internalType/`))
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
        Internal Wall Type
        <hr className="containerhr" />
      </Typography>
      <Card>
        <Box sx={{ display: "flex", flexDirection: "column", ml: 5 }}>
          <Box sx={{ display: "flex", flexDirection: "row", mb: 10 }}>
            <StyledTextField
              required
              type="text"
              error={internalWallData?.fabric_type === "" && isSavedStatus}
              value={internalWallData?.fabric_type}
              onChange={changeHandler}
              name="fabric_type"
              label="Type"
              variant="outlined"
              helperText={
                internalWallData?.fabric_type === "" &&
                isSavedStatus &&
                "Type in mandatory"
              }
            />
            <StyledTextField
              select
              required
              error={internalWallData?.status === "" && isSavedStatus}
              sx={{ width: "210px", height: "63px", ml: 5 }}
              InputLabelProps={{ style: { background: "#FFF" } }}
              value={internalWallData?.status}
              onChange={changeHandler}
              name="status"
              //   onFocus={() => setFocused(true)}
              //   onBlur={() => setFocused(false)}
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
            error={internalWallData?.description === "" && isSavedStatus}
            label="Wall Construction"
            variant="outlined"
            multiline
            rows={5}
            className={classes.rowfield}
            value={internalWallData?.description}
            // placeholder="Update details"
            onChange={changeHandler}
            name="description"
            helperText={
              internalWallData?.description === "" &&
              isSavedStatus &&
              "Internal Wall in mandatory"
            }
          />

          <Box sx={{ width: "20%", mb: 15 }}>
            <Typography
              sx={{
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
            <hr className="imagehr" />
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
                navigate(`/admincommon/internalType/`);
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

export default AddEditInternalWall;
