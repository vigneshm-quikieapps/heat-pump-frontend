import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import "./ServiceList.css";
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

const ServiceList = ({ FirstPageAction }) => {
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

  useEffect(() => {
    fetchData();
    // fetchSeconddata();
  }, [page, status]);

  useEffect(() => {
    FirstPageAction(true);
  }, []);

  function fetchData() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(URL + globalAPI.mystatus, config)
      .then((response) => {
        setLoader(false);
        const res = response.data;
        setBox(res.data);
        fetchSeconddata();
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
      .get(
        URL +
          globalAPI.myreq +
          `?page=${page}&perPage=${PER_PAGE}&status=${status}&f_title=${title}&f_priority=${priority}&f_srid=${serviceno}`,
        config
      )
      .then((response) => {
        setLoader(false);
        if (response.data.success) {
          const res = response.data.data;
          setCount(res.total_pages);
          setData(res.data);
          //
        } else {
          toast.error(response.data.message);
        }
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
  const searchfilter = () => {
    setStatus("1,2,3,4,5");
    setPage(1);
    fetchSeconddata();
  };
  const manageService = useCallback(
    (id) => navigate("/common/manageservice", { state: id }),
    [navigate]
  );
  console.log("_DATA.currentData().map", _DATA.currentData());
  const tableRows = useMemo(() => {
    return (
      _DATA &&
      _DATA
        ?.currentData()
        .map(
          ({
            priority,
            _id,
            service_ref_number,
            title,
            job_reference_id,
            type,
            updatedAt,
            status,
          }) => ({
            onClick: () => manageService(_id),
            key: { _id },
            items: [
              priority === 1 ? (
                <div className="hroundcircle">H</div>
              ) : priority === 2 ? (
                <div className="mroundcircle">M</div>
              ) : (
                <div className="lroundcircle">L</div>
              ),
              service_ref_number,
              title,
              `${job_reference_id ? job_reference_id.site_details : "-"}`,
              `${type ? type : "-"}`,
              moment(updatedAt).format("DD/MM/YYYY h:mm a"),

              status === 1
                ? "New"
                : status === 2
                ? "HPD Working"
                : status === 3
                ? "Need Your Attention"
                : status === 4
                ? "Closed"
                : status === 5
                ? "HPD To Review"
                : "-",
            ],
          })
        )
    );
  }, [_DATA, manageService]);

  // const manageService = (item) => {
  //   console.log("item", item);
  //   navigate("/common/manageservice", { state: item._id });
  // };
  return (
    <div>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <Typography
        variant="h6"
        style={{
          fontWeight: 300,
          fontSize: "45px",
          fontFamily: "outfit",
          marginLeft: "40px",
        }}
      >
        My Service Requests
        <hr className="containerhr" />
      </Typography>
      <Card>
        <Grid>
          <Stack>
            <Typography>
              <div className="names">{userName}</div>
              <div
                style={{
                  fontSize: "30px",
                  fontFamily: "Outfit",
                  fontWeight: "300",
                  textTransform: "none",
                }}
              >
                {userData.business_trade_name}, {userData.city}
              </div>
              <hr className="hrFirst" />
            </Typography>
          </Stack>
        </Grid>

        <Grid>
          <div className="secondrow">
            <div className="outerbox">
              <div
                className="squarebox"
                onClick={() => {
                  setStatus(1);
                  setPage(1);
                }}
              >
                <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                  {box.new}
                </Typography>
              </div>
              <div className="second-row-text">New</div>
            </div>
            <div className="outerbox">
              <div
                className="squarebox"
                onClick={() => {
                  setStatus(5);
                  setPage(1);
                }}
              >
                <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                  {box.hpd_review}
                </Typography>
              </div>
              <div className="second-row-text">HPD To Review</div>
            </div>
            <div className="outerbox">
              <div
                className="squarebox"
                onClick={() => {
                  setStatus(2);
                  setPage(1);
                }}
              >
                <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                  {box.working}
                </Typography>
              </div>
              <div className="second-row-text">HPD Working</div>
            </div>
            <div className="outerbox">
              <div
                className="squarebox"
                onClick={() => {
                  setStatus(3);
                  setPage(1);
                }}
              >
                <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                  {box.need_attention}
                </Typography>
              </div>
              <div className="second-row-text">Need Your Attention</div>
            </div>
            <div className="outerbox">
              <div
                className="squarebox"
                onClick={() => {
                  setStatus(4);
                  setPage(1);
                }}
              >
                <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                  {box.closed}
                </Typography>
              </div>
              <div className="second-row-text">Closed</div>
            </div>
          </div>
        </Grid>
        {/* <Grid sx={{ gridTemplateColumns: "repeat(4, 1fr)" }}> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: "30px",
            marginBottom: "40px",
          }}
        >
          <Typography
            style={{
              fontSize: "22px",
              fontFamily: "Outfit",
              width: "130px",

              fontWeight: "600",
            }}
          >
            Search By
          </Typography>
          <FormControl>
            <StyledTextField
              select
              sx={{ width: "210px", height: "63px" }}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              label="Priority"
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
          </FormControl>
          <StyledTextField
            sx={{ width: "210px", height: "63px" }}
            label="Service Request No"
            // InputLabelProps={{ style: { marginTop: "10px" } }}
            value={serviceno}
            onChange={(e) => setServiceno(e.target.value)}
          />

          <StyledTextField
            sx={{ width: "275px", height: "63px" }}
            label="Title"
            value={title}
            // InputLabelProps={{ style: { marginTop: "10px" } }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            style={{
              fontSize: "18px",
              fontWeight: "300",
              fontFamily: "Outfit",
              width: "130px",
              height: "63px",
              background: "black",
              color: "white",
              textTransform: "none",
              borderRadius: "32.5px",
            }}
            onClick={() => searchfilter()}
          >
            Search
          </Button>
        </Box>
        {/* </Grid> */}

        <Grid>
          <div className="fourth-row">
            <div style={{ fontSize: "30px", fontWeight: "600" }}>
              Service Requests List
            </div>
            <hr className="hrFirst" />
            <Box sx={{ marginTop: "1%" }}>
              <Table
                headers={[
                  " Priority",
                  "SR No.",
                  "Title",
                  "Site Details",
                  "SR Type",
                  "Last Updated Date & Time",
                  "Status",
                ]}
                rows={tableRows}
                // pagination={pagination}
                isLoading={false}
                // isFetching={false}
              />
            </Box>
            {_DATA.currentData().length == 0 && (
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                No matching records found
              </h4>
            )}
          </div>
        </Grid>

        {_DATA.currentData().length >= 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "18px",
            }}
          >
            <ThemeProvider theme={theme}>
              <Pagination
                className="pagination"
                count={count}
                page={page}
                /*  variant="outlined" */
                onChange={handleChange}
                color="primary"
              />
            </ThemeProvider>
          </div>
        )}
        <button
          className="btnjob"
          onClick={(e) => navigate("/common/createlist")}
          style={{
            fontWeight: 300,
            fontSize: "18px",
            fontFamily: "Outfit",
            width: "275px",
            height: "65px",
          }}
        >
          Create a Service Request
        </button>
        {/* </div> */}
      </Card>
    </div>
  );
};

const mapDispatchtoProps = (dispatch) => ({
  FirstPageAction: (value) => dispatch(FirstPageAction(value)),
});

export default connect(null, mapDispatchtoProps)(ServiceList);
