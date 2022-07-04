import "./RCA2.css";
import React, { useState, useEffect } from "react";

import { makeStyles, createStyles } from "@material-ui/core";
// import { Typography, Button } from "@material-ui/core";
import { width } from "@mui/system";
import Radio from "@mui/material/Radio";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import validator from "validator";
import {
  Box,
  InputAdornment,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import StyledTextField from "../../../common/textfield";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";

import { connect } from "react-redux";

import { customerDetailsAction } from "../../../Redux/customerDetails/customerDetails.action";
import { customerDetailsAutoSuggestion } from "../../../Redux/customerDetails/customerDetails.action";
import { customerDetailsReset } from "../../../Redux/customerDetails/customerDetails.action";
import HPDD from "../../../Img/HPDD.jpeg";
import { setSuggestionListAction } from "../../../Redux/suggestionList/suggestionList.action";
import Modal from "react-modal";

Modal.setAppElement("#root");
/* 
const useStyles = makeStyles({

  radio: {
    height: "1vh",
    width: "1vw",
  },
  button: {
    marginLeft:"2vw",
   // display: "inline-block",
    backgroundColor: "black",
    color: "white",
    width: "7.16vw",
    height: "5.36vh",
    marginTop: "2vh",
    fontSize:"1vw",
    borderRadius: "2.11vw",
    textTransform:"none",
    "&:hover":{
      background: "black",
      color: "white",
    },
  },
    buttons: {
      margin: "2vh 0px 0px 6.51vw ",
      border: "solid 0.134vh #d3d3d3",
      backgroundColor: "#f9f9f9",
      color: " #000",
      fontFamily:"outfit",
      fontSize:"1vw",
      width: "11.7vw",
      height: "5.36vh",
      textTransform: "none",
      borderRadius: "2.11vw",
      "&:hover": {
        textTransform: "none",
        backgroundColor: "#f9f9f9",
        color: "#000",
      },
    },
 
}); */

const useStyles = makeStyles((theme) =>
  createStyles({
    smallRadioButton: {
      "& svg": {
        width: "1vw",
        height: "2vh",
      },
    },
    radio: {
      height: "0.5vh",
      width: "0.5vw",
    },
    button: {
      marginLeft: "2vw",
      // display: "inline-block",
      backgroundColor: "black",
      color: "white",
      width: "7.16vw",
      height: "5.36vh",
      marginTop: "2vh",
      fontSize: "1vw",
      borderRadius: "2.11vw",
      textTransform: "none",
      "&:hover": {
        background: "black",
        color: "white",
      },
    },
    buttons: {
      margin: "2vh 0px 0px 6.51vw ",
      border: "solid 0.134vh #d3d3d3",
      backgroundColor: "#f9f9f9",
      color: " #000",
      fontFamily: "outfit",
      fontSize: "1vw",
      width: "11.7vw",
      height: "5.36vh",
      textTransform: "none",
      borderRadius: "2.11vw",
      "&:hover": {
        textTransform: "none",
        backgroundColor: "#f9f9f9",
        color: "#000",
      },
    },
  })
);

/* const business = {
  registeredName: "",
  tradeName: "",
  type: "",
};

const address = {
  postcode: "",
  startAddress: "",
  line1: "",
  line2: "",
  city: "",
}; */

const data = [
  { id: 0, label: "Limited Company" },
  { id: 1, label: "Limited Liability Patnership" },
  { id: 2, label: "Sole Trader" },
];

function RCA2({
  customerDetails,
  customerDetailsAction,
  suggestionList,
  setSuggestionListAction,
  customerDetailsAutoSuggestion,
  customerDetailsReset,
}) {
  // const [inputBusiness, setInputBusiness] = useState(business);
  // const [inputAddress, setInputAddress] = useState(address);
  const [searchValue, setsearchValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(true);
  const [businesstypecolor, setBusinesstypecolor] = useState(true);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (
  //     window.location.pathname !== "/rca1" ||
  //     window.location.pathname !== "/rca2"
  //   ) {
  //     customerDetailsReset();
  //   }
  // }, [window.location.pathname]);
  useEffect(() => {
    let retainData = sessionStorage.getItem("retainData");
    if (!retainData) {
      customerDetailsReset();
    } else {
      sessionStorage.removeItem("retainData");
    }
  }, []);
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
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpend(!isOpend);

  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
  };

  const changeHandler = (e) => {
    e.preventDefault();
    customerDetailsAction({ [e.target.name]: e.target.value });
    setInput5Error("");
    setInput6Error("");

    setInput9Error("");
    setInput10Error("");
    setInput11Error("");
    setInput12Error("");
  };

  const changeHandler2 = (e) => {
    console.log(e.target.innerHTML);
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
          `https://ws.postcoder.com/pcw/autocomplete/find?query=${searchValue}&country=uk&apikey=PCWV6-VMTG6-XKM5K-6ZHQ5&identifier=HPD`
        )
        //axios.get(`https://ws.postcoder.com/pcw/PCWFQ-4NFQ9-PZY8R-574WR/street/uk/${code}`)
        .then((res) => setSuggestionListAction(res.data));
    }
  }, [searchValue]);

  const clickHandler1 = (e) => {
    //Request failed with status code 403PCWBY-K73QV-5TPTP-7H75B
    if (!parseInt(e.target.id)) {
      axios
        .get(
          `https://ws.postcoder.com/pcw/autocomplete/find?query=${searchValue}&country=uk&apikey=PCWV6-VMTG6-XKM5K-6ZHQ5&pathfilter=${e.target.id}&identifier=HPD`
        )
        .then((res) => {
          // console.log(res);
          setSuggestionListAction(res.data);
        });
    } else {
      axios
        .get(
          `https://ws.postcoder.com/pcw/autocomplete/retrieve/?id=${e.target.id}&query=${searchValue}&country=uk&apikey=PCWV6-VMTG6-XKM5K-6ZHQ5&lines=3&include=posttown,postcode&identifier=HPD`
        )
        .then((res) => res.data[0])

        .then((resp) => {
          console.log(resp);
          customerDetailsAutoSuggestion(resp);
        });
      /* .then(respo => setpostc(respo.postcode)) */

      //setInputAddress(state => ({...state,posttown:resp.posttown ,address_1:resp.addresslane1,address_2:resp.addresslane2 }))

      // console.log("hello");
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
          toast.success("Account Request Submitted");
          customerDetailsReset();
          navigate("/rca3");
        } else {
          toast.error(response?.data?.message);
          customerDetailsReset();
        }
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error?.response?.data?.data?.message);
        customerDetailsReset();
      });
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

  const classes = useStyles();

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100%", height: "max-content" }}>
        <Box sx={{ width: "60%" }}>
          <img
            style={{
              width: "70px",
              height: "70px",
              margin: "40px 965px 60px 55px",
            }}
            src={HPDD}
            alt="HPDD"
          />
          <Typography
            sx={{
              fontSize: "50px",
              fontWeight: "300",
              fontFamily: "Outfit",
              width: "783px",
              height: "88px",
              margin: "0 197px 0px 55px",
              position: "relative",
            }}
          >
            Request a Customer Account
          </Typography>
          <Box style={{ position: "relative" }}>
            <img
              src={require("../../../../src/Img/step8.png")}
              className="s8baricon"
            />
          </Box>
          <Typography
            style={{
              fontSize: "22px",
              fontFamily: "Outfit",
              margin: "40px 70px 20px 59px",
              position: "relative",
            }}
          >
            Your Business Details
          </Typography>
          <form action="">
            <StyledTextField
              sx={{ width: "500px", height: "63px", margin: "0 0 0 60px" }}
              required
              type="text"
              value={customerDetails.business_registered_name}
              onChange={changeHandler}
              name="business_registered_name"
              label="Business Registered Name"
            />
            <Typography
              style={{
                fontSize: "18px",
                fontFamily: "Outfit",
                position: "relative",
                margin: "1px 0px 0px 62px",
                color: "red",
              }}
            >
              {input5Error}
            </Typography>

            <StyledTextField
              sx={{ width: "500px", height: "63px", margin: "8px 0 0 60px" }}
              required
              label="Business Trade Name"
              type="text"
              // onBlur={blurFunc2}
              value={customerDetails.business_trade_name}
              onChange={changeHandler}
              name="business_trade_name"
            />
            <Typography
              style={{
                fontSize: "18px",
                fontFamily: "Outfit",
                margin: "1px 0px 0px 62px",
                position: "relative",
                color: "red",
              }}
            >
              {input6Error}
            </Typography>

            <StyledTextField
              select
              sx={{ width: "500px", height: "63px", margin: "8px 0 0 60px" }}
              required
              label="Business Type"
              // onBlur={blurFunc3}
              placeholder="Business Type"
              onChange={changeHandler}
              name="business_type"
              value={customerDetails.business_type}
            >
              <MenuItem value="1">Limited Company</MenuItem>
              <MenuItem value="2">Limited Liability Partnership</MenuItem>
              <MenuItem value="3">Sole Trader</MenuItem>
            </StyledTextField>
            <Typography
              style={{
                fontSize: "18px",
                fontFamily: "Outfit",
                position: "relative",
                margin: "1px 0px 0px 62px",
                color: "red",
              }}
            >
              {input7Error}
            </Typography>
            <Typography
              style={{
                fontSize: "22px",
                fontFamily: "Outfit",
                margin: "40px 70px 20px 59px",
                position: "relative",
                display: "inline-block",
              }}
            >
              Address
            </Typography>
            <div style={{ display: "inline-block" }}>
              <Typography
                style={{
                  display: "inline",
                  fontSize: "22px",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                }}
              >
                Enter address manually
              </Typography>
              <Radio
                sx={{ float: "right", mt: 1.2, ml: 1 }}
                type="radio"
                name="radio"
                className={classes.radio}
                checked={checked}
                onClick={() => {
                  setsearchValue("");
                  checked ? setChecked(false) : setChecked(true);
                }}
              />
            </div>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <StyledTextField
                // className="step1inputfields input1"
                sx={{
                  width: "500px",
                  height: "63px",
                  margin: "0 0 15px 60px",
                }}
                type="text"
                value={searchValue}
                onChange={changeHandler1}
                name="startAddress"
                label="Start typing address"
                // variant="outlined"
                // disabled={checked === true ? true : false}
              />
              {/* <span className=" rca2inputError input8Error">{input8Error}</span> */}
              {filtered2.length === 0 ? (
                ""
              ) : (
                <ResultBlock results={filtered2} />
              )}

              <StyledTextField
                sx={{ width: "500px", height: "63px", margin: "0 0 15px 60px" }}
                required
                // className="step1inputfields input2"
                type="text"
                variant="outlined"
                value={customerDetails.address_1}
                onChange={changeHandler}
                name="address_1"
                label="Address Line 1"
                placeholder={checked === false ? "Address line 1*" : ""}
                disabled={checked == false ? true : false}
              />
              <Typography
                style={{
                  fontSize: "18px",
                  fontFamily: "Outfit",
                  position: "relative",
                  margin: "1px 0px 0px 62px",
                  color: "red",
                }}
              >
                {input9Error}
              </Typography>
              <StyledTextField
                sx={{ width: "500px", height: "63px", margin: "0 0 15px 60px" }}
                // className="step1inputfields input2"
                type="text"
                value={customerDetails.address_2}
                onChange={changeHandler}
                name="address_2"
                label="Address Line 2"
                variant="outlined"
                placeholder={checked === false ? "Address line 2" : ""}
                disabled={checked === false ? true : false}
              />

              <StyledTextField
                sx={{ width: "500px", height: "63px", margin: "0 0 15px 60px" }}
                required
                // className="step1inputfields input2"
                type="text"
                value={customerDetails.city}
                onChange={changeHandler}
                name="city"
                label="City/Town"
                variant="outlined"
                placeholder={checked === false ? "City/Town*" : ""}
                disabled={checked === false ? true : false}
              />
              <Typography
                style={{
                  fontSize: "18px",
                  fontFamily: "Outfit",
                  position: "relative",
                  margin: "1px 0px 0px 62px",
                  color: "red",
                }}
              >
                {input11Error}
              </Typography>
              <StyledTextField
                sx={{ width: "500px", height: "63px", margin: "0 0 15px 60px" }}
                required
                value={customerDetails.postcode}
                type="text"
                onChange={changeHandler}
                name="postcode"
                label="Postcode"
                variant="outlined"
                placeholder={checked === false ? "PostCode*" : ""}
                disabled={checked === false ? true : false}
              />
              <Typography
                style={{
                  fontSize: "18px",
                  fontFamily: "Outfit",
                  position: "relative",
                  margin: "1px 0px 0px 62px",
                  color: "red",
                }}
              >
                {input12Error}
              </Typography>
            </Box>
          </form>
          <Box sx={{ display: "flex", ml: 6 }}>
            {/* <Link to="/signup" style={{ textDecoration: "none" }}> */}
            <button
              variant="contained"
              className="btn-house btn-icon"
              onClick={() => {
                sessionStorage.setItem("retainData", true);
                navigate("/rca1");
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
              onClick={(e) => handleSubmit(e)}
            >
              <span style={{ margin: "auto" }}>Submit</span>
              {/* <span style={{ height: "27px", width: "27px" }}>
                <ChevronRightSharpIcon sx={{ height: "27px", width: "27px" }} />
              </span> */}
            </button>
            {/* <Button
              sx={{
                fontSize: "18px",
                fontFamily: "Outfit",
                fontWeight: "300",
                color: "white",
                background: "black",
                borderRadius: "32.5px",
                width: "179px",
                height: "65px",
                margin: "20px 420px 0 60px",
                padding: "21px 30px",
                textTransform: "none",
              }}
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button> */}
          </Box>
        </Box>
        <Box class="rca1Rectangle-side">
          <img
            src={require("../../../Img/RCA1.png")}
            className="rca1couplesideImg"
            alt="RCA"
          />
        </Box>
      </Box>
      <Modal
        isOpen={isOpen}
        className="myWarningModal"
        overlayClassName={"myWarningOverlay"}
        closeTimeoutMS={500}
      >
        <div>
          <h2
            style={{ textAlign: "center", color: "#fa5e00", marginTop: "30px" }}
          >
            Warning!
          </h2>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            Mandatory fields cannot be Empty
          </div>
          <button className="ModalButton" onClick={() => setIsOpen(false)}>
            OK
          </button>
        </div>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => ({
  customerDetails: state.cdr,
  suggestionList: state.sl,
});

const mapDispatchToProps = (dispatch) => ({
  customerDetailsAction: (keypair) => dispatch(customerDetailsAction(keypair)),
  setSuggestionListAction: (list) => dispatch(setSuggestionListAction(list)),
  customerDetailsAutoSuggestion: (singleList) =>
    dispatch(customerDetailsAutoSuggestion(singleList)),
  customerDetailsReset: () => dispatch(customerDetailsReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RCA2);
