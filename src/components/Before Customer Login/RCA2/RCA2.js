import "./RCA2.css";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import { width } from "@mui/system";
import Radio from "@mui/material/Radio";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Triangle } from "react-loader-spinner";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";

import { connect } from "react-redux";

import { customerDetailsAction } from "../../../Redux/customerDetails/customerDetails.action";

const useStyles = makeStyles({
  subtitle: {
    fontSize: "15px",
    fontWeight: "300",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    color: "rgb(59,59,59)",
    letterSpacing: "0.03px",
    margin: "25px 0px 0px 100px",
    width: "450px",
    fontWeight: "600",
    fontSize: "17px",
  },
  radio: {
    height: "20px",
    width: "20px",
  },
  button: {
    left: "100px",
    display: "block",
    backgroundColor: "black",
    color: "white",
    width: "110px",
    height: "40px",
    marginTop: "10px",
    borderRadius: "32.5px",
    "&:hover": {
      background: "black",
      color: "white",
    },
  },
});

const business = {
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
};

function RCA2({ customerDetails, customerDetailsAction }) {
  // const [inputBusiness, setInputBusiness] = useState(business);
  // const [inputAddress, setInputAddress] = useState(address);
  const [searchValue, setsearchValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    e.preventDefault();
    customerDetailsAction({ [e.target.name]: e.target.value });
  };

  const changeHandler1 = (e) => {
    e.preventDefault();
    setsearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customerDetails.email !=""){
    setLoader(true);
    const data = {
      email:customerDetails.email ,
      password:customerDetails.password ,
      name:customerDetails.name ,
      mobile:customerDetails.mobile ,
      business_registered_name:customerDetails.business_registered_name ,
      business_trade_name:customerDetails.business_trade_name ,
      business_type:customerDetails.business_type ,
      address_1:customerDetails.address_1 ,
      address_2:customerDetails.address_2 ,
      country:customerDetails.country ,
      city:customerDetails.city ,
      postcode:customerDetails.postcode ,
      admin: false,
    };
    axios
      .post(URL + globalAPI.register, data)
      .then((response) => {
        if (response.data.sucess) {
          setLoader(false);
          toast.success('Account Created')
          navigate("/rca3");
        }
        else{
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        setLoader(false);
        toast.error("Something Went Wrong");
      });
     }
  };
  const classes = useStyles();
  return (
    <div>
      <div className="rca2">
        <div className="rca2firstHalf">
          <div className="rca2HPD">
            <img
              src={require("../../../Img/HPD.png")}
              height="50px"
              width={"50px"}
            />
          </div>
          <h1 className="rca2div1">Request a Customer Account</h1>

          <div className="rca2left-bar"></div>
          <div className="rca2circle"></div>
          <div className="rca2right-bar"></div>

          <Typography variant="h6" className={classes.subtitle}>
            Your Business Details
          </Typography>

          <form action="">
            <input
              required
              className="rca2inputfields top"
              type="text"
              value={customerDetails.business_registered_name}
              onChange={changeHandler}
              name="business_registered_name"
              placeholder="Business Registered Name*"
            />
            <input
              required
              className="rca2inputfields"
              type="text"
              value={customerDetails.business_trade_name}
              onChange={changeHandler}
              name="business_trade_name"
              placeholder="Business Trade Name*"
            />
            <input
              required
              className="rca2inputfields"
              type="text"
              value={customerDetails.business_type}
              onChange={changeHandler}
              name="business_type"
              placeholder="Business Type*"
            />

            <div className={classes.subtitle}>
              <Typography
                variant="h6"
                style={{
                  display: "inline-block",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                Address
              </Typography>
              <div
                className="right"
                style={{ display: "inline-block", float: "right" }}
              >
                <Typography
                  variant="h6"
                  style={{
                    display: "inline-block",
                    fontSize: "15px",
                    marginRight: "10px",
                    fontWeight: "600",
                  }}
                >
                  Enter Address manually
                </Typography>
                <Radio
                  type="radio"
                  name="radio"
                  className={classes.radio}
                  checked={checked}
                  onClick={() => {
                    checked ? setChecked(false) : setChecked(true);
                  }}
                />
              </div>
            </div>

            <input
              className="rca2inputfields"
              type="text"
              value={searchValue}
              onChange={changeHandler1}
              name="startAddress"
              placeholder="Start typing address*"
              disabled={checked === true ? true : false}
            />
            <input
              required
              className="rca2inputfields"
              type="text"
              value={customerDetails.address_1}
              onChange={changeHandler}
              name="address_1"
              placeholder="Address line 1*"
              disabled={checked == false ? true : false}
            />
            <input
              required
              className="rca2inputfields"
              type="text"
              value={customerDetails.address_2}
              onChange={changeHandler}
              name="address_2"
              placeholder="Address line 2*"
              disabled={checked === false ? true : false}
            />
            <input
              required
              className="rca2inputfields"
              type="text"
              value={customerDetails.city}
              onChange={changeHandler}
              name="city"
              placeholder="City/Town*"
              disabled={checked === false ? true : false}
            />
            <input
              required
              value={customerDetails.postcode}
              className="rca2inputfields top"
              type="number"
              onChange={changeHandler}
              name="postcode"
              placeholder="Postcode*"
              disabled={checked === false ? true : false}
            />

            <Button
              type="submit"
              className={classes.button}
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </form>
        </div>

        <div class="rca2Rectangle-side">
          {" "}
          <img
            src={require("../../../Img/RCA2.png")}
            className="rca2couplesideImg"
          />{" "}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  customerDetails: state.cdr,
});

const mapDispatchToProps = (dispatch) => ({
  customerDetailsAction: (keypair) => dispatch(customerDetailsAction(keypair)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RCA2);
