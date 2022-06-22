import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
// import "./AccountRequest.css";

import { Box, Button, Typography } from "@mui/material";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import { connect } from "react-redux";
import { adminFirstPageAction } from "../../../Redux/AdminFirstPage/adminFirstPage.action";
import { Card, Grid, Pagination, Table } from "../../../common";
import StyledTextField from "../../../common/textfield";

const theme = createTheme({
  palette: {
    primary: { main: "#000000	" },
  },
});
const useStyles = makeStyles({
  textfield: {
    fontSize: "1vw",
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.66vw",
      marginRight: "1.33vw",
      height: "6.71vh",
      width: "16vw",

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
      width: "13.67vw",
      height: "6.7vh",
      fontWeight: "bolder",
      fontSize: "1vw",
      fontFamily: "outfit",
      backgroundColor: "white",

      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
  selectinput: {
    marginBottom: "0.67vh",
    fontFamily: "outfit",
    fontWeight: "bolder",
    fontSize: "1.1vw",
  },
});
const QuoteList = ({ adminFirstPageAction }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [box, setBox] = useState([]);
  const [search, setSearch] = useState("");
  const [mobno, setMobno] = useState("");
  const [business, setBusiness] = useState("");
  const [data, setData] = useState({});
  let [page, setPage] = useState(1);
  const [site_details, setSite_details] = useState("");
  const [count, setCount] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState(1);

  useEffect(() => {
    adminFirstPageAction(true);
  }, []);
  useEffect(() => {
    jobStatus();
  }, []);

  //   function fetchData() {
  //     const token = JSON.parse(localStorage.getItem("user"));
  //     const config = {
  //       headers: { Authorization: `Bearer ${token}` },
  //     };
  //     setLoader(true);
  //     axios
  //       .get(URL + globalAPI.accountstatus, config)
  //       .then((response) => {
  //         setLoader(false);
  //         const res = response.data;
  //         setBox(res.data);
  //       })
  //       .catch((e) => {
  //         setLoader(false);
  //         toast.error("Something went wrong");
  //       });
  //   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function jobStatus() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(
        `https://heat-pump-backend-test.herokuapp.com/api/v1/services/quote-status`,
        config
      )
      .then((response) => {
        console.log(response?.data?.data);
        setLoader(false);
        setData(response?.data?.data);
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
        `https://heat-pump-backend-test.herokuapp.com/api/v1/services/all-quote?page=${page}&perPage=10&siteDetails=${site_details}&customerName=${customerName}&status=${status}`,
        config
      )
      .then((response) => {
        console.log(response);
        setLoader(false);
        setCount(response?.data?.total_pages);
        setBox(response?.data?.data);
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  }
  const handleChange = (e, p) => {
    setPage(p);
    // _DATA.jump(p);
  };
  const manageJob = (id) => {
    navigate(`/admincommon/manageJob/${id}`);
  };

  //   const manageJob = useCallback(
  //     (id) => navigate("/admincommon/manageJob", { id: id }),
  //     [navigate]
  //   );
  function searchfilter() {
    // setStatus("1,2,3,4");
    setPage(1);
    fetchSeconddata();
  }

  const tableRows = useMemo(() => {
    return (
      box &&
      box?.map((item, index) => ({
        onClick: () => manageJob(item?._id),
        key: { index },

        items: [
          item?.quote_reference_number || "",
          item?.creator_customer_id.name || "",
          "" +
            item?.site_details.address_1 +
            (item?.site_details.address_1 === "" &&
            item?.site_details.address_2 === ""
              ? ""
              : ", ") +
            item?.site_details.address_2 +
            (item?.site_details.address_2 === "" &&
            item?.site_details.city === ""
              ? ""
              : ", ") +
            item?.site_details.city +
            (item?.site_details.city === "" &&
            item?.site_details.postcode === ""
              ? ""
              : ", ") +
            item?.site_details.postcode,
          moment(item?.updatedAt).format("DD/MM/YYYY h:mm a"),
          item?.status === 1
            ? "New-Unpaid"
            : item?.status === 2
            ? "New-Paid"
            : item?.status === 3
            ? "In Progress"
            : item?.status === 4
            ? "Complete"
            : item?.status === 5
            ? "Snaggy"
            : "-",
        ],
      }))
    );
  }, [box, manageJob]);
  useEffect(() => {
    fetchSeconddata();
  }, [page, status]);
  return (
    <div className="arcontainer">
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
        Job Requests
      </Typography>
      <hr className="arcontainerhr" />
      <Card>
        <div className="arsecondrow">
          <div
            className="arouterbox"
            onClick={() => {
              setStatus(2);
              setPage(1);
            }}
          >
            <div className="arsquarebox">
              <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                {data.newPaid || 0}
              </Typography>
            </div>
            <div className="arsecond-row-text">New - Paid</div>
          </div>
          <div
            className="arouterbox"
            onClick={() => {
              setStatus(1);
              setPage(1);
            }}
          >
            <div className="arsquarebox">
              <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                {/* {box.active ? box.active : 0} */}
                {data.newUnpaid || 0}
              </Typography>
            </div>
            <div className="arsecond-row-text">New - Unpaid</div>
          </div>
          <div
            className="arouterbox"
            onClick={() => {
              setStatus(3);
              setPage(1);
            }}
          >
            <div className="arsquarebox">
              <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                {/* {box.inprogress ? box.inprogress : 0} */}
                {data.inprogress || 0}
              </Typography>
            </div>
            <div className="arsecond-row-text">Inprogress</div>
          </div>
          <div
            className="arouterbox"
            onClick={() => {
              setStatus(4);
              setPage(1);
            }}
          >
            <div className="arsquarebox">
              <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                {data.complete || 0}
                {/* {box.active ? box.active : 0} */}
              </Typography>
            </div>
            <div className="arsecond-row-text">Complete</div>
          </div>
          <div
            className="arouterbox"
            onClick={() => {
              setStatus(5);
              setPage(1);
            }}
          >
            <div className="arsquarebox">
              <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                {/* {box.new ? box.new : 0} */}
                {data.snagging || 0}
              </Typography>
            </div>
            <div className="arsecond-row-text">Snagging</div>
          </div>
        </div>
        <div className="arthird-row">
          <Typography
            style={{
              fontSize: "22px",
              fontFamily: "Outfit",
              width: "130px",
              fontWeight: "600",
            }}
            className="arsearch-by"
          >
            Search By
          </Typography>
          <div
            style={{
              width: "85%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <StyledTextField
              text
              sx={{ width: "370px", height: "63px" }}
              value={site_details}
              onChange={(e) => setSite_details(e.target.value)}
              label="Site Details"
            ></StyledTextField>

            <StyledTextField
              label="Customer Name"
              sx={{ width: "370px", height: "63px" }}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <Button
              type={"button"}
              value={business}
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
          </div>
        </div>

        <div className="arfourth-row">
          <Box sx={{ marginTop: "1%" }}>
            <Table
              headers={[
                "Job Reference No.",
                "Customer Name",
                "Site Details",
                "Submitted Date Time",
                "Status",
              ]}
              rows={tableRows}
              // pagination={pagination}
              isLoading={false}
              // isFetching={false}
            />
          </Box>

          {box && box?.length === 0 && (
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

        {box && box?.length >= 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <ThemeProvider theme={theme}>
              <Pagination
                className="pagination"
                count={count}
                page={page}
                onChange={handleChange}
                color="primary"
              />
            </ThemeProvider>
          </div>
        )}
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  adminFirstPageAction: (value) => dispatch(adminFirstPageAction(value)),
});

export default connect(null, mapDispatchToProps)(QuoteList);
