import "./MainQuote.css";
import React, { useState, useEffect, useRef } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAddQuote } from "../../../services/services";

import Step from "./QuoteSteps/Step";
import FourthStep from "./FourthStep/FourthStep";
import FirstStep from "./FirstStep/FirstStep";
import FifthStep from "./FifthStep/FifthStep";
import SixthStep from "./SixthStep/SixthStep";
import SecondStep from "./SecondStep/SecondStep";
import SecondSubStep from "./SecondStep/SecondSubStep";
import ThirdStep from "./ThirdStep/ThirdStep";
import SeventhStep from "./SeventhStep/SeventhStep";
import EightStep from "./EightStep/EightStep";
import NewEightStep from "./NewEightStep/NewEightStep";
import { customerDetailsReset } from "../../../Redux/customerDetails/customerDetails.action";

import {
  bookJobAction,
  bookJobReset,
} from "../../../Redux/bookJob/bookJob.action";
import { connect, useDispatch } from "react-redux";
import NinethStep from "./NinethStep/NinethStep";
import ViewQuote from "../ViewQuote/ViewQuote";

const useStyles = makeStyles({
  radio: {
    height: "1vh",
    width: "1vw",
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
});

const MainQuote = ({ customerDetailsReset, bookJobReset }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [payload, setPayload] = useState({});
  const [flag, setFlag] = useState(0);
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });
  const myRef = useRef(null);
  useEffect(() => {
    myRef.current.scrollIntoView();
  }, [currentStep]);
  const [res, setres] = useState();
  const { isLoading: isLoading, mutate: addQuote } = useAddQuote({
    onSuccess: (response) => {
      customerDetailsReset();
      bookJobReset();
      setres(response?.data?.data?.quote_reference_number);
      setCurrentStep(10);
    },
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });

  const _jumpToFirst = () => {
    setCurrentStep(0);
  };
  const _next = () => {
    let currentStep1 = currentStep;
    currentStep1 = currentStep1 + 1;
    setCurrentStep(currentStep1);
  };

  const _prev = () => {
    let currentStep1 = currentStep;
    currentStep1 = currentStep1 < 0 ? 0 : currentStep1 - 1;
    setCurrentStep(currentStep1);
  };

  const _addNewQuote = () => {
    addQuote(payload);
  };
  const getPayloadData = (label, data) => {
    let temp = { ...payload };
    for (let index = 0; index < label.length; index++) {
      temp[label[index]] = data[index];
    }
    setPayload(temp);

    console.log(temp);
  };

  return (
    <React.Fragment>
      <h1 ref={myRef} className="get-a-quote">
        Book a Job
      </h1>
      <hr className="quote-hr" />

      {currentStep === 0 && (
        <FirstStep
          next={_next}
          getPayloadData={(label, data) => {
            getPayloadData(label, data);
          }}
        />
      )}
      {currentStep === 1 && (
        <SecondStep
          prev={_prev}
          next={_next}
          getPayloadData={(label, data) => {
            getPayloadData(label, data);
          }}
        />
      )}
      {currentStep === 2 && (
        <SecondSubStep
          prev={_prev}
          next={_next}
          getPayloadData={(label, data) => {
            getPayloadData(label, data);
          }}
        />
      )}
      {currentStep === 3 && (
        <ThirdStep
          prev={_prev}
          next={_next}
          getPayloadData={(label, data) => {
            getPayloadData(label, data);
          }}
        />
      )}
      {currentStep === 4 && (
        <FourthStep
          prev={_prev}
          next={_next}
          getPayloadData={(label, data) => {
            getPayloadData(label, data);
          }}
        />
      )}
      {currentStep === 5 && (
        <FifthStep
          prev={_prev}
          next={_next}
          getPayloadData={(label, data) => {
            getPayloadData(label, data);
          }}
        />
      )}
      {currentStep === 6 && (
        <SixthStep
          prev={_prev}
          next={_next}
          getPayloadData={(label, data) => {
            getPayloadData(label, data);
          }}
        />
      )}
      {currentStep === 7 && (
        <SeventhStep
          prev={_prev}
          next={_next}
          getPayloadData={(label, data) => {
            getPayloadData(label, data);
          }}
        />
      )}
      {currentStep === 8 && (
        <NewEightStep
          prev={_prev}
          next={_next}
          getPayloadData={(label, data) => {
            getPayloadData(label, data);
          }}
          _addNewQuote={_addNewQuote}
        />
      )}
      {currentStep === 9 && (
        <EightStep
          prev={_prev}
          next={_next}
          getPayloadData={(label, data) => {
            getPayloadData(label, data);
          }}
          _addNewQuote={_addNewQuote}
        />
      )}
      {currentStep === 10 && (
        <NinethStep _jumpToFirst={_jumpToFirst} response={res} />
      )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  customerDetails: state.cdr,
});

const mapDispatchToProps = (dispatch) => ({
  customerDetailsReset: () => dispatch(customerDetailsReset()),
  bookJobReset: () => dispatch(bookJobReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainQuote);
// export default MainQuote;
