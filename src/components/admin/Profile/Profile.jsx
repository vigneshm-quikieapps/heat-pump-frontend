import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
// import "./ServiceList.css";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";
import { TailSpin } from "react-loader-spinner";
import usePagination from "../../Pagination/Pagination";
import moment from "moment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField, Typography, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { FirstPageAction } from "../../../Redux/FirstPage/FirstPage.action";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Card, Pagination, Table, Radio, Grid } from "../../../common";
// import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTextField from "../../../common/textfield";
import { Style } from "@mui/icons-material";
import { getCustomer, updateCustomer } from "../../../services/services";

// import { Typography, Button } from "@material-ui/core";
import { width } from "@mui/system";

import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import validator from "validator";

import "react-toastify/dist/ReactToastify.css";

import { customerDetailsAction } from "../../../Redux/customerDetails/customerDetails.action";
import { customerDetailsAutoSuggestion } from "../../../Redux/customerDetails/customerDetails.action";
import { customerDetailsReset } from "../../../Redux/customerDetails/customerDetails.action";
import HPDD from "../../../Img/HPDD.jpeg";
import { setSuggestionListAction } from "../../../Redux/suggestionList/suggestionList.action";
import Modal from "react-modal";

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

const MyProfile = (
  customerDetails,
  customerDetailsAction,
  suggestionList,
  setSuggestionListAction,
  customerDetailsAutoSuggestion,
  customerDetailsReset
) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [loader, setLoader] = useState(true);
  const [data1, setData1] = useState({});
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userName = userData.name;

  const [searchValue, setsearchValue] = useState("");
  const [checked, setChecked] = useState(true);

  const [show, setShow] = useState(true);
  const [businesstypecolor, setBusinesstypecolor] = useState(true);

  const filtered =
    searchValue &&
    suggestionList.suggestionList.filter((suggestion) => {
      return suggestion.summaryline
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
  const filtered1 =
    searchValue &&
    suggestionList.suggestionList.filter((suggestion) => {
      return !suggestion.summaryline
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
  const filtered2 = [...filtered, ...filtered1];
  const [isOpen, setIsOpen] = useState(false);

  const [input5Error, setInput5Error] = useState("");
  const [input6Error, setInput6Error] = useState("");
  const [input7Error, setInput7Error] = useState("");
  const [input8Error, setInput8Error] = useState(
    "Mandatory field cannot be empty"
  );
  const [input9Error, setInput9Error] = useState("");
  const [input10Error, setInput10Error] = useState("");
  const [input11Error, setInput11Error] = useState("");
  const [input12Error, setInput12Error] = useState("");

  //Dropdown

  const [isOpend, setOpend] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpend(!isOpend);

  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
  };
  const [payload, setPayload] = useState({});
  const changeHandler = (e) => {
    let temp = { ...payload };
    let tmp = { ...data1 };
    // customerDetailsAction({ [e.target.name]: e.target.value });
    temp[e.target.name] = e.target.value;
    tmp[e.target.name] = e.target.value;
    setPayload(temp);
    setData1(tmp);
    setInput5Error("");
    setInput6Error("");

    setInput9Error("");
    setInput10Error("");
    setInput11Error("");
    setInput12Error("");
  };

  const changeHandler2 = (e) => {
    //console.log(e.target.innerHTML);
    e.preventDefault();
    customerDetailsAction({ business_type: e.target.innerHTML });
    setBusinesstypecolor(false);
    setInput7Error("");
  };

  const changeHandler1 = (e) => {
    e.preventDefault();
    setsearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue.length > 2) {
      axios
        .get(
          `https://ws.postcoder.com/pcw/autocomplete/find?query=${searchValue}&country=uk&apikey=PCWFQ-4NFQ9-PZY8R-574WR`
        )
        //axios.get(`https://ws.postcoder.com/pcw/PCWFQ-4NFQ9-PZY8R-574WR/street/uk/${code}`)
        .then((res) => setSuggestionListAction(res.data));
    }
  }, [searchValue]);

  useEffect(() => {
    //console.log(customerDetails);
  }, [customerDetails]);

  const clickHandler1 = (e) => {
    //Request failed with status code 403PCWBY-K73QV-5TPTP-7H75B
    if (!parseInt(e.target.id)) {
      axios
        .get(
          `https://ws.postcoder.com/pcw/autocomplete/find?query=${searchValue}&country=uk&apikey=PCWBY-K73QV-5TPTP-7H75B&pathfilter=${e.target.id}`
        )
        .then((res) => {
          setSuggestionListAction(res.data);
        });
    } else {
      axios
        .get(
          `https://ws.postcoder.com/pcw/autocomplete/retrieve/?id=${e.target.id}&query=${searchValue}&country=uk&apikey=PCWBY-K73QV-5TPTP-7H75B&lines=3&include=posttown,postcode`
        )
        .then((res) => res.data[0])
        .then((resp) => customerDetailsAutoSuggestion(resp));
      /* .then(respo => setpostc(respo.postcode)) */

      //setInputAddress(state => ({...state,posttown:resp.posttown ,address_1:resp.addresslane1,address_2:resp.addresslane2 }))

      //console.log("hello");
      setSuggestionListAction([]);
      setsearchValue("");
      setShow(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !validator.isLength(customerDetails.business_registered_name, {
        min: 1,
        max: undefined,
      })
    ) {
      setInput5Error("Mandatory field cannot be empty");
      return false;
    }
    if (
      !validator.isLength(customerDetails.business_trade_name, {
        min: 1,
        max: undefined,
      })
    ) {
      setInput6Error("Mandatory field cannot be empty");
      return false;
    }

    // if (
    //   !validator.isLength(customerDetails.business_type, {
    //     min: 1,
    //     max: undefined,
    //   })
    // ) {
    //   setInput7Error("Mandatory field cannot be empty");
    //   return false;
    // }
    if (customerDetails.address_1 == "") {
      setInput9Error("Mandatory field cannot be empty");
      return false;
    }
    // if (customerDetails.address_2 == "") {
    //   setInput10Error("Mandatory field cannot be empty");
    //   return false;
    // }
    if (customerDetails.city == "") {
      setInput11Error("Mandatory field cannot be empty");
      return false;
    }
    if (customerDetails.postcode == "") {
      setInput12Error("Mandatory field cannot be empty");
      return false;
    }

    // if (
    //   customerDetails.business_registered_name != "" &&
    //   customerDetails.business_trade_name != "" &&
    //   customerDetails.business_type != "" &&
    //   customerDetails.address_1 != "" &&
    //   // customerDetails.address_2 != "" &&
    //   customerDetails.city != "" &&
    //   customerDetails.postcode != ""
    // ) {
    //   setLoader(true);
    const data = {
      email: customerDetails.email,
      password: customerDetails.password,
      name: customerDetails.name,
      mobile: customerDetails.mobile,
      business_registered_name: customerDetails.business_registered_name,
      business_trade_name: customerDetails.business_trade_name,
      business_type: customerDetails.business_type,
      address_1: customerDetails.address_1,
      address_2: customerDetails.address_2,
      country: customerDetails.country,
      city: customerDetails.city,
      postcode: customerDetails.postcode,
      admin: false,
    };

    axios
      .post(URL + globalAPI.register, data)
      .then((response) => {
        if (response.data.sucess) {
          setLoader(false);
          toast.success("Data Updated");
          customerDetailsReset();
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        //console.log(error?.response);
        setLoader(false);
        toast.error(error?.response?.data?.data?.message);
      });
    // } else {
    //   toast.error("Something Went Wrong");
    // }
  };

  const Result = ({ result }) => {
    return (
      <li
        className="item"
        id={`${result.id}`}
        onClick={(e) => clickHandler1(e)}
      >{`${result.summaryline} ${
        result.locationsummary && result.locationsummary
      }`}</li>
    );
  };

  const ResultBlock = ({ results }) => {
    return (
      <div className="result-block">
        <ul>
          {results.map((r, i) => (
            <Result key={i} result={r} />
          ))}
        </ul>
      </div>
    );
  };

  useEffect(() => {
    getCustomer().then((res) => {
      setData1(res?.data?.data?.data);
      setLoader(false);
    });
  }, []);
  //console.log(customerDetails.password);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
        My Profile
        <hr className="containerhr" />
      </Typography>
      <Card>
        <Grid>
          <Stack>
            <Typography sx={{ width: "1080px" }}>
              <div className="names">{userName}</div>
              <div
                style={{
                  width: "500px",
                  fontSize: "30px",
                  fontFamily: "Outfit",
                  fontWeight: "300",
                  textTransform: "none",
                }}
              >
                Luths Services Ltd, Glasgow
              </div>
              <hr
                style={{
                  width: "85%",
                  marginLeft: "20%",
                  marginBottom: "3%",
                  backgroundColor: "#f2f3f2",
                  border: "2px solid #f2f3f2",
                }}
              />
            </Typography>
          </Stack>
        </Grid>
        <Box sx={{ mt: 5, mb: 5 }}>
          <Typography sx={{ fontFamily: "Outfit", fontSize: "30px" }}>
            Contact Details
          </Typography>
          <hr
            style={{
              width: "100%",

              marginBottom: "3%",
              backgroundColor: "#f2f3f2",
              border: "2px solid #f2f3f2",
            }}
          />
          <Grid
            gridTemplateColumns="repeat(1, 1fr)"
            columnCount={2}
            columnGap="10px"
          >
            <StyledTextField
              type="text"
              sx={{ width: "450px", height: "60px" }}
              label="Email Address"
              disabled
              value={userData?.email || ""}
            />
            <StyledTextField
              type="password"
              sx={{ width: "450px", height: "60px" }}
              label="Password"
              name="password"
              onChange={changeHandler}
              value={data1?.password || ""}
            />
            <StyledTextField
              sx={{ width: "450px", height: "60px" }}
              label="Phone Number"
              name="mobile"
              value={data1?.mobile || ""}
              onChange={changeHandler}
            />
          </Grid>
        </Box>
        <button
          className="browsebtn"
          onClick={() => {
            updateCustomer(userData?.id, payload).then((res) => {
              toast.success("Admin details updated successfully");
            });
          }}
        >
          Save
        </button>
      </Card>
    </div>
  );
};

const mapDispatchtoProps = (dispatch) => ({
  FirstPageAction: (value) => dispatch(FirstPageAction(value)),
});

export default connect(null, mapDispatchtoProps)(MyProfile);
