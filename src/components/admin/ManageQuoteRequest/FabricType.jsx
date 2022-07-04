import React, { useState, useEffect, useMemo } from "react";
// import "./ThirdStep.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";
import { Button, TextField, Typography, Box, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import { Close as CloseIcon } from "@mui/icons-material";
import { fontSize, textAlign } from "@mui/system";
import Table from "../../After Customer Login/GetAQuote/ThirdStep/Components/table";
import Pagination from "../../After Customer Login/GetAQuote/ThirdStep/Components/Pagination";
import IconButton from "@mui/material/IconButton";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import { Card, ImgIcon } from "../../../common";
import { getFabricDetails, UpdateJob } from "../../../services/services";
import StyledTextField from "../../../common/textfield";
import DeleteIcon from "../../../Img/icon remove.png";
import { MenuItem } from "@material-ui/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};
const TableHeading = (
  <Typography sx={{ fontSize: "20px", fontWeight: "bold", padding: "20px" }}>
    Enrolment Details
  </Typography>
);

const useStyles = makeStyles({
  textfield: {
    "& label.Mui-focused": {
      color: "black",
      fontSize: "1vw",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.46vw",
      marginRight: "3.73vw",
      height: "6.71vh",
      fontSize: "1vw",
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
  button: {
    backgroundColor: "black",
    width: "20%",
    height: "1.5%",
    borderRadius: "2.5vw",
    marginTop: "5%",
    fontSize: "1vw",
  },
});
const headers = {
  "External Walls": ["Type", "Wall Construction", "Detail", "Image"],
  "Internal Walls": ["Type", "Wall Construction", "Detail", "Image"],
  "Roof Type": ["Type", "Roof description", "Roof detail", "Image"],
  Windows: ["Type", "Window description", "Window detail", "Image"],
  "Suspended Floors": [
    "Type",
    "Floor description",
    "Length of exposed wall(a+b)",
    "Short a(m)",
    "Long b(m)",
    "Image",
  ],
  "Inner Floors": [
    "Type",
    "Roof Light description",
    "Roof Light Detail",
    "Image",
  ],
};
const aka = {
  "External Walls": 1,
  "Roof Type": 3,
  Windows: 4,
  "Suspended Floors": 5,
  "Inner Floors": 6,
};
const ThirdStep = (props) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"));
  const [dataArr, setDataArr] = useState([
    {
      label: "Main Building",
      "External Walls": {
        fabric_type: "",
        description: "",
        detail: "",
      },
      "Internal Walls": {
        fabric_type: "",
        description: "",
        detail: "",
      },
      "Roof Type": {
        fabric_type: "",
        description: "",
        detail: "",
      },
      Windows: {
        fabric_type: "",
        description: "",
        detail: "",
      },
      "Suspended Floors": {
        fabric_type: "",
        description: "",
        detail: "",
      },
      "Inner Floors": {
        fabric_type: "",
        description: "",
        detail: "",
      },
      Age: "",
    },
  ]);
  const [flag, setFlag] = useState(false);
  const [selectedFabricType, setSelectedFabricType] = useState("");
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState("");
  const [fabricDetails, setFabricDetails] = useState([]);

  let [page, setPage] = useState(1);

  const [count, setCount] = useState(1);

  useEffect(() => {
    setDataArr(props?.quoteData?.fabric_details || dataArr);
  }, [props]);

  const addNewFabric = () => {
    let temp = [...dataArr];
    temp.push({
      label: `Extension ${temp.length}`,
      "External Walls": {},
      "Internal Walls": {},
      "Roof Type": {},
      Windows: {},
      "Suspended Floors": {},
      "Inner Floors": {},
      Age: "",
    });
    setDataArr(temp);
  };

  const getFabricData = (fabric_type, page = 1) => {
    setLoader(true);
    getFabricDetails(fabric_type, page).then((res) => {
      if (res?.success) {
        // console.log(res);
        let temp = [...res?.data];
        setFabricDetails(temp);
        setCount(res?.total_pages);
      }
      setLoader(false);
    });
  };
  const onSelect = (fabric_type, description, detail, short, long) => {
    // console.log(selectedFabricType, selectedBuildingIndex);
    let temp = dataArr;
    temp[selectedBuildingIndex][selectedFabricType].fabric_type = fabric_type;
    temp[selectedBuildingIndex][selectedFabricType].description = description;
    temp[selectedBuildingIndex][selectedFabricType].detail = detail;
    temp[selectedBuildingIndex][selectedFabricType]["length"] =
      Number(short) + Number(long) || 0;
    setDataArr(temp);
  };

  const onClose = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    getFabricData(aka[`${selectedFabricType}`], page);
  }, [page]);
  const handleChange = (e, p) => {
    setPage(p);
  };
  const pagination = (
    <Pagination
      className="pagination"
      count={count}
      page={page}
      onChange={handleChange}
    />
  );
  const updateStatus = (e) => {
    UpdateJob(props.quoteData?._id, { fabric_details: dataArr }).then((res) => {
      toast.success("Updated successfully");
    });
  };
  const tableRows = useMemo(() => {
    return (
      (fabricDetails &&
        fabricDetails?.map((item) => ({
          onClick: () => {
            onSelect(
              item?.fabric_type,
              item?.description,
              item?.details,
              item?.shortness_of_suspended_floor,
              item?.longness_of_suspended_floor
              // item?.image_url
            );
            onClose();
          },
          items:
            selectedFabricType == "Suspended Floors"
              ? [
                  item?.fabric_type,
                  item?.description,

                  Number(item?.shortness_of_suspended_floor) +
                    Number(item?.longness_of_suspended_floor),

                  item?.shortness_of_suspended_floor,

                  item?.longness_of_suspended_floor,
                  item?.image_url,
                ]
              : [
                  item?.fabric_type,
                  item?.description,
                  item?.details,
                  item?.image_url,
                ],
        }))) ||
      []
    );
  }, [onSelect, onClose]);

  return (
    <>
      {/* <Card sx={{ m: 0 }}> */}
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}

      {dataArr?.map((fabric, index) => (
        <Box sx={{ marginTop: "2%" }} key={index}>
          {index !== 0 && (
            <Box sx={{ float: "right" }}>
              <Tooltip
                title="Remove extension"
                placement="bottom-start"
                componentsProps={{
                  tooltip: {
                    sx: {
                      padding: "12px 22px 13px",
                      width: "205px",
                      height: "50px",
                      fontSize: "20px",
                      fontFamily: "Outfit",
                      backgroundColor: "#fafafa",
                      color: "black",
                    },
                  },
                }}
              >
                <IconButton
                  onClick={() => {
                    let temp = [...dataArr];
                    temp.splice(index, 1);
                    setDataArr(temp);
                  }}
                >
                  <ImgIcon>{DeleteIcon}</ImgIcon>
                </IconButton>
              </Tooltip>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <h4
                style={{
                  width: "257px",
                  fontSize: "22px",
                  fontFamily: "Outfit",
                  letterSpacing: "0.03",
                  fontWeight: "300",
                  color: "#fa5e00",
                  // fontWeight: "500",
                  // fontFamily: "Outfit",
                  lineHeight: "normal",
                  textAlign: "right",
                }}
              >
                {fabric["label"]}
                <hr
                  style={{
                    width: "100%",
                    backgroundColor: "#f2f3f2",
                    border: "0.1vw solid #f2f3f2",
                  }}
                />
              </h4>
            </Box>

            <StyledTextField
              sx={{ width: "20%", mt: 4, mb: 4 }}
              select
              value={fabric?.Age}
              label="Age"
              onChange={(e) => {
                const temp = [...dataArr];
                temp[index].Age = e.target.value;
                setDataArr(temp);
              }}
            >
              <MenuItem value="Band A before 1919">Band A before 1919</MenuItem>
              <MenuItem value="Band B 1919-1929">Band B 1919-1929</MenuItem>
              <MenuItem value="Band C 1930-1949">Band C 1930-1949</MenuItem>
              <MenuItem value="Band D 1950-1964">Band D 1950-1964</MenuItem>
              <MenuItem value="Band E 1965-1975">Band E 1965-1975</MenuItem>
              <MenuItem value="Band F 1976-1983">Band F 1976-1983</MenuItem>
              <MenuItem value="Band G 1984-1991">Band G 1984-1991</MenuItem>
              <MenuItem value="Band H 1992-1998">Band H 1992-1998</MenuItem>
              <MenuItem value="Band I 1999-2002">Band I 1999-2002</MenuItem>
              <MenuItem value="Band J 2003-2007">Band J 2003-2007</MenuItem>
              <MenuItem value="Band K 2008-2011">Band K 2008-2011</MenuItem>
              <MenuItem value="Band L 2012+">Band L 2012+</MenuItem>
            </StyledTextField>
            <Box
              sx={{
                display: "flex !important",
                flexDirection: "row !important",
                alignItems: "center",
                width: "100%",
                // justifyContent: "center",
              }}
            >
              <Box>
                <button
                  sx={{
                    fontFamily: "Outfit",
                  }}
                  variant="contained"
                  className="btn-house"
                  onClick={() => {
                    setSelectedFabricType("External Walls");
                    setSelectedBuildingIndex(index);
                    getFabricData(1);
                    setOpenModal(true);
                  }}
                >
                  External Walls Type
                </button>
              </Box>

              {fabric["External Walls"]?.fabric_type && (
                <Box
                  sx={{
                    width: "100%",
                    marginLeft: "110px",
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "120px",
                      minWidth: "120px",
                      borderRight: "2px solid #d3d3d3",
                      padding: "2%",
                      margin: "16.5px 0 16.5px 0",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#fa5e00",
                        fontWeight: "bold",
                        fontFamily: "Outfit",
                        lineHeight: "normal",
                      }}
                    >
                      Type {fabric["External Walls"]?.fabric_type}
                    </Typography>
                  </Box>
                  <Box sx={{ marginLeft: "5%" }}>
                    {fabric["External Walls"]?.description && (
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontFamily: "Outfit",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            fontFamily: "Outfit",
                            lineHeight: "normal",
                          }}
                        >
                          Description:{" "}
                        </span>
                        {fabric["External Walls"]?.description}
                      </Typography>
                    )}

                    {fabric["External Walls"]?.detail && (
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontFamily: "Outfit",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            fontFamily: "Outfit",
                            lineHeight: "normal",
                          }}
                        >
                          Details:{" "}
                        </span>{" "}
                        {fabric["External Walls"].detail}
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: "flex !important",
                flexDirection: "row !important",
                alignItems: "center",
                width: "100%",
                // justifyContent: "center",
              }}
            >
              <Box>
                <button
                  style={{
                    fontFamily: "Outfit",
                  }}
                  variant="contained"
                  className="btn-house"
                  onClick={() => {
                    setSelectedFabricType("Roof Type");
                    setSelectedBuildingIndex(index);
                    getFabricData(3);
                    setOpenModal(true);
                  }}
                >
                  Roof Type
                </button>
              </Box>
              {fabric["Roof Type"]?.fabric_type && (
                <Box
                  sx={{
                    width: "100%",
                    marginLeft: "110px",
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "120px",
                      minWidth: "120px",
                      borderRight: "2px solid #d3d3d3",
                      padding: "2%",
                      margin: "16.5px 0 16.5px 0",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#fa5e00",
                        fontWeight: "bold",
                        fontFamily: "Outfit",
                        lineHeight: "normal",
                      }}
                    >
                      Type {fabric["Roof Type"]?.fabric_type}
                    </Typography>
                  </Box>
                  <Box sx={{ marginLeft: "5%" }}>
                    {fabric["Roof Type"]?.description && (
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontFamily: "Outfit",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            fontFamily: "Outfit",
                            lineHeight: "normal",
                          }}
                        >
                          Description:{" "}
                        </span>
                        {fabric["Roof Type"].description}
                      </Typography>
                    )}

                    {fabric["Roof Type"]?.detail && (
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontFamily: "Outfit",
                          lineHeight: "normal",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>Details: </span>{" "}
                        {fabric["Roof Type"].detail}
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex !important",
                flexDirection: "row !important",
                alignItems: "center",
                width: "100%",
                // justifyContent: "center",
              }}
            >
              <Box>
                <button
                  style={{
                    fontFamily: "Outfit",
                  }}
                  variant="contained"
                  className="btn-house"
                  onClick={() => {
                    setSelectedFabricType("Windows");
                    setSelectedBuildingIndex(index);
                    getFabricData(4);
                    setOpenModal(true);
                  }}
                >
                  Windows Type
                </button>
              </Box>
              {fabric["Windows"]?.fabric_type && (
                <Box
                  sx={{
                    width: "100%",
                    marginLeft: "110px",
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "120px",
                      minWidth: "120px",
                      borderRight: "2px solid #d3d3d3",
                      padding: "2%",
                      margin: "16.5px 0 16.5px 0",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#fa5e00",
                        fontWeight: "bold",
                        fontFamily: "Outfit",
                        lineHeight: "normal",
                      }}
                    >
                      Type {fabric["Windows"]?.fabric_type}
                    </Typography>
                  </Box>
                  <Box sx={{ marginLeft: "5%" }}>
                    {fabric["Windows"]?.description && (
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontFamily: "Outfit",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            fontFamily: "Outfit",
                            lineHeight: "normal",
                          }}
                        >
                          Description:{" "}
                        </span>
                        {fabric["Windows"].description}
                      </Typography>
                    )}

                    {fabric["Windows"]?.detail && (
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontFamily: "Outfit",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            fontFamily: "Outfit",
                            lineHeight: "normal",
                          }}
                        >
                          Details:{" "}
                        </span>{" "}
                        {fabric["Windows"].detail}
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex !important",
                flexDirection: "row !important",
                alignItems: "center",
                width: "100%",
                // justifyContent: "center",
              }}
            >
              <Box>
                <button
                  style={{
                    fontFamily: "Outfit",
                    lineHeight: "normal",
                    padding: "0px",
                  }}
                  variant="contained"
                  className="btn-house"
                  onClick={() => {
                    setSelectedFabricType("Suspended Floors");
                    setSelectedBuildingIndex(index);
                    getFabricData(5);
                    setOpenModal(true);
                  }}
                >
                  External Floors Type
                </button>
              </Box>
              {fabric["Suspended Floors"]?.fabric_type && (
                <Box
                  sx={{
                    width: "100%",
                    marginLeft: "110px",
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "120px",
                      minWidth: "120px",
                      borderRight: "2px solid #d3d3d3",
                      padding: "2%",
                      margin: "16.5px 0 16.5px 0",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#fa5e00",
                        fontWeight: "bold",
                        fontFamily: "Outfit",
                        lineHeight: "normal",
                      }}
                    >
                      Type {fabric["Suspended Floors"]?.fabric_type}
                    </Typography>
                  </Box>
                  <Box sx={{ marginLeft: "5%" }}>
                    {fabric["Suspended Floors"]?.description && (
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontFamily: "Outfit",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{ fontWeight: "bold", lineHeight: "normal" }}
                        >
                          Description:{" "}
                        </span>
                        {fabric["Suspended Floors"].description}
                      </Typography>
                    )}

                    {fabric["Suspended Floors"]?.detail && (
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontFamily: "Outfit",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            fontFamily: "Outfit",
                            lineHeight: "normal",
                          }}
                        >
                          Length(m):{" "}
                        </span>{" "}
                        {fabric["Suspended Floors"]["length"]}
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex !important",
                flexDirection: "row !important",
                alignItems: "center",
                width: "100%",
                // justifyContent: "center",
              }}
            >
              <Box>
                <button
                  variant="contained"
                  className="btn-house"
                  onClick={() => {
                    setSelectedFabricType("Inner Floors");
                    setSelectedBuildingIndex(index);
                    getFabricData(6);
                    setOpenModal(true);
                  }}
                >
                  Roof Lights Type
                </button>
              </Box>
              {fabric["Inner Floors"]?.fabric_type && (
                <Box
                  sx={{
                    width: "100%",
                    marginLeft: "110px",
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "120px",
                      minWidth: "120px",
                      borderRight: "2px solid #d3d3d3",
                      padding: "2%",
                      margin: "16.5px 0 16.5px 0",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#fa5e00",
                        fontWeight: "bold",
                        fontFamily: "Outfit",
                        lineHeight: "normal",
                      }}
                    >
                      Type {fabric["Inner Floors"]?.fabric_type}
                    </Typography>
                  </Box>
                  <Box sx={{ marginLeft: "5%" }}>
                    {fabric["Inner Floors"]?.description && (
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontFamily: "Outfit",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            fontFamily: "Outfit",
                            lineHeight: "normal",
                          }}
                        >
                          Description:{" "}
                        </span>
                        {fabric["Inner Floors"].description}
                      </Typography>
                    )}

                    {fabric["Inner Floors"]?.detail && (
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontFamily: "Outfit",
                          lineHeight: "normal",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            fontFamily: "Outfit",
                            lineHeight: "normal",
                          }}
                        >
                          Details:{" "}
                        </span>{" "}
                        {fabric["Inner Floors"].detail}
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      ))}

      <Box>
        <button
          variant="contained"
          className="btn-house Add btn-icon"
          onClick={addNewFabric}
        >
          <span style={{ height: "27px", width: "27px" }}>
            <AddIcon sx={{ height: "27px", width: "27px" }} />
          </span>
          <span style={{ marginLeft: "20px" }}>Add Extension</span>
        </button>
      </Box>
      {/* </Card> */}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Box sx={style}>
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              bgcolor: "ternary.main",
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box component="span">
            <Typography
              variant="h5"
              component="h2"
              sx={{ color: "#fa5e00", fontWeight: "Bold", mb: 1.5 }}
            >
              {selectedFabricType === "Suspended Floors"
                ? "External Floors"
                : selectedFabricType === "Inner Floors"
                ? "Roof Lights"
                : selectedFabricType}
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "Bold", mb: 0.7 }}
            >
              Fabric Details
            </Typography>
            <hr className="quote" style={{ width: "16%" }} />
          </Box>
          {/* Table List */}
          <Box sx={{ marginTop: "5%" }}>
            <Table
              headers={headers[selectedFabricType]}
              rows={tableRows}
              pagination={pagination}
              isLoading={false}
              isFetching={false}
              cellWidth="200xp"
            />
          </Box>
        </Box>
      </Modal>
      <button
        className="browsebtn"
        name="status"
        style={{ marginTop: "5%", marginLeft: "-5px" }}
        onClick={(e) => {
          updateStatus(e);
        }}
      >
        Save
      </button>
    </>
  );
};

export default ThirdStep;
