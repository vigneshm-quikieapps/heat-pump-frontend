import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import "./HomePage.css";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";
import { TailSpin } from "react-loader-spinner";
import usePagination from "../../Pagination/Pagination";
import moment from "moment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField, Typography, Grid, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { FirstPageAction } from "../../../Redux/FirstPage/FirstPage.action";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Card, Pagination, Table } from "../../../common";
// import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTextField from "../../../common/textfield";
import BookJobIcon from "../../../Img/icon 1@3x.png";
import MSRIcon from "../../../Img/icon 3@3x.png";
import MyJobIcon from "../../../Img/icon 2@3x.png";
const theme = createTheme({
  palette: {
    primary: { main: "#000000	" },
  },
});

const useStyles = makeStyles({
  textfield: {
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
      borderRadius: "10px",
      marginRight: "20px",
      height: "45px",
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    width: "25%",
  },
  selectfield: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      marginRight: "20px",
      height: "45px",
      fontWeight: "bolder",
      fontFamily: "outfit",
      backgroundColor: "white",

      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    width: "25%",
  },
  selectinput: {
    fontFamily: "outfit",
    fontWeight: "bolder",
    fontSize: "16.36px",
  },
  table: {
    fontFamily: "outfit",
    fontWeight: "bolder",
    fontSize: "16.36px",
  },
});

const HomePage = ({ FirstPageAction }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [serviceno, setServiceno] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [box, setBox] = useState([]);
  const [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const [count, setCount] = useState(1);
  const _DATA = usePagination(data, PER_PAGE);
  const [status, setStatus] = useState("1");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userName = userData.name;
  const [focused, setFocused] = React.useState("");
  const formatDate = (date) => {
    let temp = date.split("T")[0].split("-");
    let temp1 =
      temp[2] + "/" + temp[1] + "/" + temp[0] + "" + temp[3] + ":" + temp[4];
    return temp1;
  };

  //   useEffect(() => {
  //     fetchData();
  //     // fetchSeconddata();
  //   }, [page, status]);

  //   useEffect(() => {
  //     FirstPageAction(true);
  //   }, []);

  //   function fetchData() {
  //     const token = JSON.parse(localStorage.getItem("user"));
  //     const config = {
  //       headers: { Authorization: `Bearer ${token}` },
  //     };
  //     setLoader(true);
  //     axios
  //       .get(URL + globalAPI.mystatus, config)
  //       .then((response) => {
  //         setLoader(false);
  //         const res = response.data;
  //         setBox(res.data);
  //         fetchSeconddata();
  //       })
  //       .catch((e) => {
  //         setLoader(false);
  //         toast.error("Something went wrong");
  //       });
  //   }
  //   function fetchSeconddata() {
  //     const token = JSON.parse(localStorage.getItem("user"));
  //     const config = {
  //       headers: { Authorization: `Bearer ${token}` },
  //     };
  //     setLoader(true);
  //     axios
  //       .get(
  //         URL +
  //           globalAPI.myreq +
  //           `?page=${page}&perPage=${PER_PAGE}&status=${status}&f_title=${title}&f_priority=${priority}&f_srid=${serviceno}`,
  //         config
  //       )
  //       .then((response) => {
  //         setLoader(false);
  //         if (response.data.success) {
  //           const res = response.data.data;
  //           setCount(res.total_pages);
  //           setData(res.data);
  //           //
  //         } else {
  //           toast.error(response.data.message);
  //         }
  //       })
  //       .catch((e) => {
  //         setLoader(false);
  //         toast.error("Something went wrong");
  //       });
  //   }

  //   const handleChange = (e, p) => {
  //     setPage(p);
  //     _DATA.jump(p);
  //   };
  //   const searchfilter = () => {
  //     setStatus("1,2,3,4,5");
  //     setPage(1);
  //     fetchSeconddata();
  //   };
  //   const manageService = useCallback(
  //     (id) => navigate("/common/manageservice", { state: id }),
  //     [navigate]
  //   );
  //   console.log("_DATA.currentData().map", _DATA.currentData());
  //   const tableRows = useMemo(() => {
  //     return (
  //       _DATA &&
  //       _DATA
  //         ?.currentData()
  //         .map(
  //           ({
  //             priority,
  //             _id,
  //             service_ref_number,
  //             title,
  //             job_reference_id,
  //             type,
  //             updatedAt,
  //             status,
  //           }) => ({
  //             onClick: () => manageService(_id),
  //             key: { _id },
  //             items: [
  //               priority === 1 ? (
  //                 <div className="hroundcircle">H</div>
  //               ) : priority === 2 ? (
  //                 <div className="mroundcircle">M</div>
  //               ) : (
  //                 <div className="lroundcircle">L</div>
  //               ),
  //               service_ref_number,
  //               title,
  //               `${job_reference_id ? job_reference_id.site_details : "-"}`,
  //               `${type ? type : "-"}`,
  //               moment(updatedAt).format("DD/MM/YYYY h:mm a"),

  //               status === 1
  //                 ? "New"
  //                 : status === 2
  //                 ? "HPD Working"
  //                 : status === 3
  //                 ? "Need Your Attention"
  //                 : status === 4
  //                 ? "Closed"
  //                 : status === 5
  //                 ? "HPD To Review"
  //                 : "-",
  //             ],
  //           })
  //         )
  //     );
  //   }, [_DATA, manageService]);

  // const manageService = (item) => {
  //   console.log("item", item);
  //   navigate("/common/manageservice", { state: item._id });
  // };
  return (
    <div>
      {/* {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )} */}
      <Typography
        variant="h6"
        style={{
          fontWeight: 300,
          fontSize: "45px",
          fontFamily: "outfit",
          marginLeft: "40px",
        }}
      >
        Hi, {userName}
        <hr className="containerhr" />
      </Typography>
      <Card sx={{ backgroundColor: "#f9f9f9", height: "300px" }}>
        <Typography
          sx={{ fontFamily: "Outfit", fontSize: "18px", fontWeight: "600" }}
        >
          Apps
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "15px",
          }}
        >
          <Box sx={{ width: "20%" }}>
            <div
              className="tiles"
              onClick={() => {
                // console.log("LOL");
                navigate("/common/createJob");
              }}
            >
              <img
                src={BookJobIcon}
                alt="Book Job"
                width="45px"
                height="45px"
              />
            </div>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "18px",
              }}
            >
              Book a Job
            </Typography>
          </Box>
          <Box sx={{ width: "20%" }}>
            <div
              className="tiles"
              onClick={() => {
                // console.log("LOL");
                navigate("/common/myQuote");
              }}
            >
              <img src={MyJobIcon} alt="Book Job" width="45px" height="45px" />
            </div>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "18px",
              }}
            >
              My Jobs
            </Typography>
          </Box>
          <Box sx={{ width: "20%" }}>
            <div
              className="tiles"
              onClick={() => {
                // console.log("LOL");
                navigate("/common/servicerequest");
              }}
            >
              <img src={MSRIcon} alt="Book Job" width="45px" height="45px" />
            </div>
            <Typography
              sx={{
                // width: "150px",
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "18px",
              }}
            >
              My Service Requests
            </Typography>
          </Box>
        </Box>
      </Card>
      <hr className="containerhr" />
      <Card sx={{ backgroundColor: "#f9f9f9", minHeight: "400px" }}>
        <Box>
          <Typography
            sx={{ fontFamily: "Outfit", fontSize: "18px", fontWeight: "600" }}
          >
            Notifications
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: "18px",
              fontWeight: "300",
              color: "#aaa",
            }}
          >
            You have no notification at this time
          </Typography>
        </Box>
      </Card>
    </div>
  );
};

const mapDispatchtoProps = (dispatch) => ({
  FirstPageAction: (value) => dispatch(FirstPageAction(value)),
});

export default connect(null, mapDispatchtoProps)(HomePage);
