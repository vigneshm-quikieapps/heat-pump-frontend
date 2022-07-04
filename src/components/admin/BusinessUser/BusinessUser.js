import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./BusinessUser.css";
import { adminFirstPageAction } from "../../../Redux/AdminFirstPage/adminFirstPage.action";
import Modal from "react-modal";
import { Box, IconButton, MenuItem, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import usePagination from "../../Pagination/Pagination";
// import { Pagination } from "@mui/material";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";
import validator from "validator";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Card, Table, Pagination, Grid } from "../../../common";
import StyledTextField from "../../../common/textfield";
const theme = createTheme({
  palette: {
    primary: { main: "#000000	" },
  },
});

const passwords = {
  value: "",
  type: "password",
  showpassword: false,
};

function BusinessUser({ adminFirstPageAction }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mob, setMob] = useState("");
  const [modifyUser, setModifyUser] = useState({});
  useEffect(() => {
    adminFirstPageAction(true);
    fetchSeconddata();
  }, []);
  const [popup, setPop] = useState(false);
  const [popup1, setPop1] = useState(false);
  const [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const [count, setCount] = useState(1);
  const _DATA = usePagination(data, PER_PAGE);
  const [status, setStatus] = useState(1);
  const [loader, setLoader] = useState(false);
  const [inputLogin1Error, setInputLogin1Error] = useState("");
  const [inputLogin2Error, setInputLogin2Error] = useState("");
  const [input4Error, setInput4Error] = useState("");

  const onPopup = () => {
    setPop(!popup);
    setInputLogin1Error("");
    setInputLogin2Error("");
    setInput4Error("");
    setPassword("");
    setName("");
    setEmail("");
  };
  const onPopup1 = () => {
    console.log(modifyUser);
    setPop1(!popup1);
  };

  useEffect(() => {}, [modifyUser]);

  function fetchSeconddata() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(
        URL +
          globalAPI.accountlist +
          `?page=${page}&perPage=${PER_PAGE}&status=3,6&badm=1`,
        config
      )
      .then((response) => {
        setLoader(false);

        if (response) {
          const res = response.data.data.data;
          setCount(response.data.total_pages);
          setData(res);
        } else {
          toast.error("error");
        }
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();

    if (email == "") {
      setInputLogin1Error("Email Address cannot be Empty");
    }
    if (password == "") {
      setInputLogin2Error("Password cannot be Empty");
    }
    if (password.value == "") {
      setInputLogin2Error("Password cannot be Empty");
    }
    if (name == "") {
      setInput4Error("Name cannot be empty");
      return false;
    }

    if (!validator.isEmail(email)) {
      setInputLogin1Error("Please enter a valid Email");
    }
    if (!validator.isLength(password.value, { min: 8, max: undefined })) {
      setInputLogin2Error("Must be at least 8 characters");
    }
    if (!validator.isLength(password.value, { min: 8, max: undefined })) {
      setInputLogin2Error("Must be at least 8 characters");
      return false;
    }

    if (email !== "" && password.value !== "" && name !== "" && !loader) {
      setLoader(true);
      const data = {
        email: email,
        password: password.value,
        name: name,
        mobile: mob.length > 0 ? mob : "1234567890",
        admin: true,
        business_admin: true,
        status: 3,
        business_registered_name: "customerDetails",
        business_trade_name: "ustomerDetails",
        business_type: "customerDetails",
        address_1: "customerDetails",
        address_2: "customerDetails",
        country: "customerDetails",
        city: "customerDetails",
        postcode: "12323",
      };
      axios
        .post(URL + globalAPI.register, data)
        .then((response) => {
          if (response.data.sucess) {
            setLoader(false);
            toast.success("Account Created Successfully");
            onPopup();
            fetchSeconddata();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => {
          setLoader(false);
          toast.error("Something Went Wrong");
        });
    } else {
    }
  };
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const statusChange = (item, e) => {
    e.preventDefault();
    setLoader(true);
    const token = JSON.parse(localStorage.getItem("user"));
    const data = {
      status: parseInt(e.target.value),
    };
    axios({
      method: "patch",
      url: URL + globalAPI.adminedituser + `?id=${item}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoader(false);
        const res = response.data;
        if (res.success) {
          toast.success("Status Changed Successfully");
          fetchSeconddata();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  };

  const modifyUserdetails = (e) => {
    setModifyUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const statusChange1 = (e) => {
    e.preventDefault();
    setLoader(true);
    const token = JSON.parse(localStorage.getItem("user"));
    /*  const data = {
      status:parseInt(e.target.value)
    }; */
    axios({
      method: "patch",
      url: URL + globalAPI.adminedituser + `?id=${modifyUser._id}`,
      data: modifyUser,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoader(false);
        const res = response.data;
        if (res.success) {
          fetchSeconddata();
          onPopup1();
          toast.success("Data Updated Succesfully");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  };
  const togglePassword = () => {
    if (password.showpassword) {
      setPassword((state) => ({
        ...state,
        type: "password",
        showpassword: false,
      }));
    } else {
      setPassword((state) => ({ ...state, type: "text", showpassword: true }));
    }
  };
  const changeHandler = (e) => {
    setInputLogin1Error("");
    setInputLogin2Error("");
    if (e.target.name === "password") {
      setPassword((state) => ({ ...state, value: e.target.value }));
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  const blurFunc = () => {
    if (email == "") {
      return false;
    }
    if (!validator.isEmail(email)) {
      setInputLogin1Error("Please enter a valid Email");
      return false;
    }
  };

  const blurFunc1 = () => {
    if (password.value == "") {
      return false;
    }
    if (!validator.isLength(password.value, { min: 8, max: undefined })) {
      setInputLogin2Error("Must be at least 8 characters");
      return false;
    }
  };
  const blurFunc4 = () => {
    if (name == "") {
      setInput4Error("Name cannot be empty");
      return false;
    }
  };
  console.log("_DATA.currentData().map", _DATA.currentData());
  const tableRows = useMemo(() => {
    return (
      _DATA &&
      _DATA
        ?.currentData()
        .map((item, index, { email, _id, name, mobile, status }) => ({
          //  onClick: () => manageService(_id),
          onClick: () => {
            setModifyUser(item);
            onPopup1();
          },
          key: { _id },
          items: [
            item?.email,
            item?.name,
            item?.mobile,
            <StyledTextField
              select
              sx={{ width: "200px" }}
              value={item.status}
              onChange={(e) => statusChange(item?._id, e)}
            >
              <MenuItem value="3">Active</MenuItem>
              <MenuItem value="6">Inactive</MenuItem>
            </StyledTextField>,
          ],
        }))
    );
  }, [_DATA]);

  return (
    <div className="bucontainer">
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
        Business Users
        <hr className="containerhr" />
      </Typography>

      <Card>
        {" "}
        <Box sx={{ marginTop: "1%" }}>
          <Table
            headers={["Email", "Full Name", "Mobile Number", "Status"]}
            rows={tableRows}
            // pagination={pagination}
            isLoading={false}
            // isFetching={false}
          />
          {_DATA.currentData().length == 0 && (
            <h4
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5.5vh",
              }}
            >
              No matching records found
            </h4>
          )}
          {_DATA.currentData().length >= 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2vh",
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
          <Button
            sx={{
              width: "300px",
              height: "63px",
              background: "black",
              color: "white",
              fontSize: "18px",
              borderRadius: "32.5px",
              fontFamily: "Outfit",
              textTransform: "none",
              "&:hover": { background: "black" },
            }}
            onClick={() => onPopup()}
          >
            Create Business User
          </Button>
        </Box>
      </Card>

      <Modal
        isOpen={popup}
        className="bausermodal"
        overlayClassName="bauseroverlay"
        closeTimeoutMS={500}
      >
        <div className="bauserdialogclose">
          <IconButton onClick={() => onPopup()}>
            <CloseIcon sx={{ color: "black" }}></CloseIcon>
          </IconButton>
        </div>
        <div className="bauserdialog-row1">
          <Typography
            style={{
              fontSize: "30px",
              fontWeight: "600",
              fontFamily: "Outfit",
              margin: "10px 0 1px 0",
            }}
          >
            New Business User
          </Typography>
          <hr className="clhrFirst" />
        </div>
        <Grid sx={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: "40px" }}>
          <Box>
            <StyledTextField
              sx={{ width: "370px" }}
              type="text"
              // className="bainput"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              onBlur={blurFunc4}
              label="Full Name"
            />
            <Typography
              style={{
                fontSize: "18px",
                fontWeight: "300",
                fontFamily: "Outfit",
                marginLeft: "20px",
                color: "rgba(255, 0, 0, 0.699)",
                position: "relative",
              }}
            >
              {input4Error}
            </Typography>
          </Box>
          <Box>
            <StyledTextField
              type="text"
              sx={{ width: "370px" }}
              // className="ba2input"
              value={email}
              name="email"
              onChange={changeHandler}
              onBlur={blurFunc}
              required
              label="Email"
            />
            <Typography
              // className="inputLogin1Error "
              style={{
                fontSize: "18px",
                fontWeight: "300",
                fontFamily: "Outfit",
                marginLeft: "20px",
                color: "rgba(255, 0, 0, 0.699)",
                position: "relative",
              }}
            >
              {inputLogin1Error}
            </Typography>
          </Box>

          {/*<div>
            <span className="inputLogin1Error">{input4Error}</span>
            <span
              className="inputLogin1Error "
              style={{ marginLeft: "25.45vw" }}
            >
              {inputLogin1Error}
            </span>
          </div>
          */}
          <Box>
            <StyledTextField
              // className="bainput"
              sx={{ width: "370px" }}
              type={password.type}
              value={password.value}
              onChange={changeHandler}
              name="password"
              onBlur={blurFunc1}
              label="Password"
              required
            />
            {password.showpassword ? (
              <img
                src={require("../../../Img/iconEyeOpen.png")}
                alt=""
                className="eyeeIconOpen"
                onClick={togglePassword}
              />
            ) : (
              <img
                src={require("../../../Img/icon3.png")}
                alt=""
                className="eyeeIcon"
                onClick={togglePassword}
              />
            )}
            <Typography
              style={{
                fontSize: "18px",
                fontWeight: "300",
                fontFamily: "Outfit",
                marginLeft: "20px",
                color: "rgba(255, 0, 0, 0.699)",
                position: "relative",
              }}
            >
              {inputLogin2Error}
            </Typography>
          </Box>
          <Box>
            <StyledTextField
              sx={{ width: "370px" }}
              type="text"
              label="Mobile No"
              // className="ba2input"
              value={mob}
              onChange={(e) => setMob(e.target.value)}
              required
            />
          </Box>
        </Grid>
        <div style={{ marginTop: "40px" }}>
          <button className="submitbtn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="closebtn" onClick={() => onPopup()}>
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={popup1}
        className="bausermodal"
        overlayClassName="bauseroverlay"
        closeTimeoutMS={500}
      >
        <div>
          <div className="bauserdialogclose">
            <IconButton onClick={() => onPopup1()}>
              <CloseIcon sx={{ color: "black" }}></CloseIcon>
            </IconButton>
          </div>
          <div className="bauserdialog-row1">
            <Typography
              style={{
                fontSize: "30px",
                fontWeight: "600",
                fontFamily: "Outfit",
                margin: "10px 0 1px 0",
              }}
            >
              Update Business User details
            </Typography>
            <hr className="clhrFirst" />
          </div>
          <div className="bauserdialog-row2">
            <Grid
              sx={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: "40px" }}
            >
              <StyledTextField
                type="text"
                // className="bainput"
                value={modifyUser.name}
                onChange={modifyUserdetails}
                name="name"
                label="Full Name"
                required
              />
              <StyledTextField
                type="text"
                // className="ba2input"
                value={modifyUser.email}
                onChange={modifyUserdetails}
                name="email"
                required
                label="Email"
              />

              <StyledTextField
                type="text"
                // className="bainput"
                value={modifyUser.password}
                onChange={modifyUserdetails}
                name="password"
                required
                label="Password"
              />

              <StyledTextField
                type="number"
                // className="ba2input"
                value={modifyUser.mobile}
                onChange={modifyUserdetails}
                name="mobile"
                required
                label="Mobile No"
              />
            </Grid>
            {/*   <div>
              <div style={{ display: "inline-block" }}>
                <input
                  type="text"
                  className="bainput"
                  value={modifyUser.business_admin_status}
                  onChange={""}
                  required
                />
                <label className="bainput-label">Status</label>
              </div>
            </div> */}
            <div style={{ marginTop: "2.8vh" }}>
              <button className="submitbtn" onClick={statusChange1}>
                Submit
              </button>
              <button className="closebtn" onClick={() => onPopup1()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  adminFirstPageAction: (value) => dispatch(adminFirstPageAction(value)),
});

export default connect(null, mapDispatchToProps)(BusinessUser);
