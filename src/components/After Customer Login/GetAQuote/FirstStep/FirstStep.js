import React, { useState, useEffect } from "react";
import "./FirstStep.css";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
// import Radio from "@mui/material/Radio";
import { makeStyles, createStyles } from "@material-ui/core";
import { setSuggestionListAction } from "../../../../Redux/suggestionList/suggestionList.action";
import { connect, useDispatch } from "react-redux";
import { customerDetailsAction } from "../../../../Redux/customerDetails/customerDetails.action";
import { customerDetailsAutoSuggestion } from "../../../../Redux/customerDetails/customerDetails.action";
import { customerDetailsReset } from "../../../../Redux/customerDetails/customerDetails.action";
import { Box, Typography } from "@mui/material";
import StyledTextField from "../../../../common/textfield";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import { Card, Grid, Radio } from "../../../../common";
import {
  bookJobAction,
  bookJobReset,
} from "../../../../Redux/bookJob/bookJob.action";

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

const FirstStep = ({
  customerDetails,
  customerDetailsAction,
  suggestionList,
  setSuggestionListAction,
  customerDetailsAutoSuggestion,
  customerDetailsReset,
  myProps,
}) => {
  const [plans, setPlans] = useState([]);
  const [loader, setLoader] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"));
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(true);
  const [pathname, setPathname] = useState(window.location.pathname);
  const [searchValue, setsearchValue] = useState("");
  const [site_details, setsite_details] = useState({
    address_1: "",
    address_2: "",
    city: "",
    postcode: "",
  });
  const classes = useStyles();
  const filtered =
    searchValue &&
    suggestionList.suggestionList.filter((suggestion) => {
      return suggestion.summaryline
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });

  useEffect(() => {
    let temp = { ...customerDetails };
    temp.address_1 = customerDetails.address_1;
    temp.address_2 = customerDetails.address_2;
    temp.city = customerDetails.city;
    temp.postcode = customerDetails.postcode;
    setsite_details(temp);
  }, [customerDetails]);
  useEffect(() => {
    if (!sessionStorage.getItem("customerCheck")) {
      customerDetailsReset();
    } else {
      sessionStorage.removeItem("customerCheck");
    }
  }, []);
  const filtered1 =
    searchValue &&
    suggestionList.suggestionList.filter((suggestion) => {
      return !suggestion.summaryline
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
  const filtered2 = [...filtered, ...filtered1];

  const changeHandler1 = (e) => {
    e.preventDefault();
    setsearchValue(e.target.value);
    // console.log("ddd", e.target.value);
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
          setSuggestionListAction(res.data);
        });
    } else {
      axios
        .get(
          `https://ws.postcoder.com/pcw/autocomplete/retrieve/?id=${e.target.id}&query=${searchValue}&country=uk&apikey=PCWV6-VMTG6-XKM5K-6ZHQ5&lines=3&include=posttown,postcode&identifier=HPD`
        )
        .then((res) => res.data[0])
        .then((resp) => customerDetailsAutoSuggestion(resp));
      /* .then(respo => setpostc(respo.postcode)) */

      //setInputAddress(state => ({...state,posttown:resp.posttown ,address_1:resp.addresslane1,address_2:resp.addresslane2 }))

      // console.log("hello");
      setSuggestionListAction([]);
      setsearchValue("");
      // console.log("dfdd", searchValue);
      setShow(false);
    }
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
      <div className="result-block11">
        <ul>
          {results.map((r, i) => (
            <Result key={i} result={r} />
          ))}
        </ul>
      </div>
    );
  };

  const changeHandler = (e) => {
    e.preventDefault();
    customerDetailsAction({ [e.target.name]: e.target.value });
    const temp = site_details;
    temp[e.target.name] = e.target.value;
    setsite_details(temp);
  };
  return (
    <Card>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <div className="s1text1">
        Step 1 of 9
        <img src={require("../../../../Img/step1.png")} className="s1baricon" />
      </div>
      <Typography
        style={{
          fontSize: "30px",
          fontFamily: "Outfit",
          fontWeight: "600",
          marginTop: "10vh",
        }}
      >
        Site Details
      </Typography>
      <hr className="s1hr2" />
      <Grid sx={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        <Box sx={{ height: "65px" }}>
          <StyledTextField
            // className="step1inputfields input1"
            sx={{ width: "100%" }}
            type="text"
            // error={!checked && searchValue === "" && true}
            value={searchValue}
            onChange={changeHandler1}
            name="startAddress"
            label="Start typing address"
            variant="outlined"
            // disabled={checked === true ? true : false}
            // helperText={!checked && searchValue === "" && "Address in mandatory"}
          />
          {/* <span className=' rca2inputError input8Error' >{input8Error}</span> */}
          {filtered2.length === 0 ? "" : <ResultBlock results={filtered2} />}
        </Box>
        <div style={{ padding: "0px", display: "flex" }}>
          <Typography
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              fontFamily: "Outfit",
              marginLeft: "50px",
              marginRight: "9px",
              marginTop: "2px",
            }}
          >
            Enter address manually
          </Typography>
          <Radio
            sx={{ marginTop: "11px" }}
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <StyledTextField
            sx={{ mb: 1.5 }}
            // required
            // error={customerDetails.address_1 === "" ? true : false}
            type="text"
            variant="outlined"
            value={site_details.address_1}
            onChange={changeHandler}
            name="address_1"
            label="Address Line 1"
            placeholder={checked === false ? "Address line 1*" : ""}
            disabled={checked == false ? true : false}
            // helperText={
            //   checked &&
            //   customerDetails.address_1 === "" &&
            //   "Address Line 1 in mandatory"
            // }
          />
          {/*<span className=" rca2inputError input9Error">{input9Error}</span>*/}
          <StyledTextField
            sx={{ mb: 1.5 }}
            // className="step1inputfields input2"

            type="text"
            value={site_details.address_2}
            onChange={changeHandler}
            name="address_2"
            label="Address Line 2"
            variant="outlined"
            placeholder={checked === false ? "Address line 2" : ""}
            disabled={checked === false ? true : false}
          />
          <StyledTextField
            sx={{ mb: 1.5 }}
            // required
            // className="step1inputfields input2"
            // error={customerDetails.city === "" ? true : false}
            type="text"
            value={site_details.city}
            onChange={changeHandler}
            name="city"
            label="City/Town"
            variant="outlined"
            placeholder={checked === false ? "City/Town*" : ""}
            disabled={checked === false ? true : false}
            // helperText={
            //   checked &&
            //   customerDetails.city === "" &&
            //   "City/Country in mandatory"
            // }
          />
          <StyledTextField
            sx={{ mb: 1.5 }}
            // required
            // error={customerDetails.postcode === "" ? true : false}
            value={site_details.postcode}
            type="text"
            onChange={changeHandler}
            name="postcode"
            label="Postcode"
            variant="outlined"
            placeholder={checked === false ? "PostCode*" : ""}
            disabled={checked === false ? true : false}
            // helperText={
            //   checked &&
            //   customerDetails.postcode === "" &&
            //   "Postcode in mandatory"
            // }
          />
        </Box>
      </Grid>
      <Box sx={{ display: "flex" }}>
        <button
          variant="contained"
          className="btn-house Add btn-icon"
          onClick={() => {
            const { address_1, address_2, city, postcode } = site_details;
            myProps.getPayloadData(
              ["site_details"],
              [
                {
                  address_1: address_1 || "",
                  address_2: address_2 || "",
                  city: city || "",
                  postcode: postcode || "",
                },
              ]
            );
            bookJobAction({
              site_details: {
                address_1: address_1 || "",
                address_2: address_2 || "",
                city: city || "",
                postcode: postcode || "",
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
      {/*<span className=" rca2inputError input12Error">{input12Error}</span>*/}
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log("ownProps", ownProps);
  return {
    bookJobDetails: state.bkjb,
    customerDetails: state.cdr,
    suggestionList: state.sl,
    myProps: ownProps,
  };
};

const mapDispatchToProps = (dispatch) => ({
  customerDetailsAction: (keypair) => dispatch(customerDetailsAction(keypair)),
  bookJobAction: (keypair) => dispatch(bookJobAction(keypair)),
  setSuggestionListAction: (list) => dispatch(setSuggestionListAction(list)),
  customerDetailsAutoSuggestion: (singleList) =>
    dispatch(customerDetailsAutoSuggestion(singleList)),
  customerDetailsReset: () => dispatch(customerDetailsReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstStep);

// export default FirstStep;
