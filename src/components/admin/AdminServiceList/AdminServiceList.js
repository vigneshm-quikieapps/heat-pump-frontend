import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import "./AdminServiceList.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";
import { TailSpin } from "react-loader-spinner";
import usePagination from "../../Pagination/Pagination";
import moment from "moment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, Button } from "@mui/material";
import { TextField, Typography, Grid, Stack } from "@mui/material";
import { connect } from "react-redux";

import { Card, Pagination, Table } from "../../../common";
import StyledTextField from "../../../common/textfield";

// import { connect } from "react-redux";
import { adminFirstPageAction } from "../../../Redux/AdminFirstPage/adminFirstPage.action";

const theme = createTheme({
  palette: {
    primary: { main: "#000000	" },
  },
});

const useStyles = makeStyles({
  textfield: {
    "& label.Mui-focused": {
      color: "black",
      fontSize: "1vw",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.66vw",
      marginRight: "1.33vw",
      height: "6.71vh",
      fontSize: "1vw",
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
  selectfield: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.66vw",
      marginRight: "1.33vw",
      height: "6.71vh",
      width: "11.06vw",
      fontWeight: "bolder",
      fontFamily: "outfit",
      backgroundColor: "white",

      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
  selectinput: {
    marginBottom: "0.57vh",
    fontFamily: "outfit",
    fontWeight: "bolder",
    fontSize: "1vw",
  },
});

const AdminServiceList = ({ adminFirstPageAction }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [serviceno, setServiceno] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [title, setTitle] = useState("");
  const [updated, setUpdated] = useState("");
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

  useEffect(() => {
    adminFirstPageAction(true);
  }, []);

  useEffect(() => {
    fetchData();
    // fetchSeconddata();
  }, [page, status]);

  function fetchData() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(URL + globalAPI.adminstatus, config)
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
          globalAPI.adminreq +
          `?page=${page}&perPage=${PER_PAGE}&status=${status}&f_title=${title}&f_priority=${
            priority === "0" ? "" : priority
          }&f_srid=${serviceno}&f_name=${customerName}`,
        config
      )
      .then((response) => {
        setLoader(false);
        if (response.data.success) {
          const res = response.data.data;
          setCount(res.total_pages);
          setData(res.data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  }

  const manageService = (item) => {
    console.log(item);
    navigate("/admincommon/adminmsr", { state: item });
  };
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const searchfilter = () => {
    setStatus("1,2,3,4");
    setPage(1);
    fetchSeconddata();
  };
  // const manageService = useCallback(
  //   (id) => navigate("/admincommon/adminmsr", { state: id }),
  //   [navigate]
  // );
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
            creator_name,
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
              creator_name,
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
          fontSize: "60px",
          fontFamily: "outfit",
          marginLeft: "40px",
        }}
      >
        Service Requests
        <hr className="containerhr" />
      </Typography>
      <Card>
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
              sx={{ width: "160px", height: "63px" }}
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
              <MenuItem value="0" style={{ fontWeight: 600 }}>
                All
              </MenuItem>
            </StyledTextField>
          </FormControl>
          <StyledTextField
            sx={{ width: "160px", height: "63px" }}
            label="Service Request No"
            value={serviceno}
            onChange={(e) => setServiceno(e.target.value)}
          />
          <StyledTextField
            sx={{ width: "160px", height: "63px" }}
            label="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <StyledTextField
            sx={{ width: "160px", height: "63px" }}
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            style={{
              fontSize: "18px",
              fontWeight: "300",
              fontFamily: "Outfit",
              width: "160px",
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
                  "Customer Name",
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
        {/* </div> */}
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  adminFirstPageAction: (value) => dispatch(adminFirstPageAction(value)),
});

export default connect(null, mapDispatchToProps)(AdminServiceList);
