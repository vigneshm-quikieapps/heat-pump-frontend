import React, { useState, useMemo, useEffect, useCallback } from "react";
import axios from "axios";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";
import { Box, Button } from "@mui/material";
import { Actions, AddButton, Card, Pagination, Table } from "../../../common";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import StyledTextField from "../../../common/textfield";
import "./ExternalWall.css";
import usePagination from "../../Pagination/Pagination";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useDeleteExternalId, delFabric } from "../../../services/services";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { adminFirstPageAction } from "../../../Redux/AdminFirstPage/adminFirstPage.action";
import { connect } from "react-redux";
const theme = createTheme({
  palette: {
    primary: { main: "#000000	" },
  },
});
const RoofWall = ({ adminFirstPageAction }) => {
  const [loader, setLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [box, setBox] = useState([]);
  const [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const [count, setCount] = useState(1);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dataArr, setDataArr] = useState([]);
  const navigate = useNavigate();
  const _DATA = usePagination(data, PER_PAGE);

  const { isLoading: isDeleteLoading, mutate: deleteExternalId } =
    useDeleteExternalId({
      onError: (error) => {
        setShowError(true);
        setError(error);
      },
    });
  const setDataOfTens = (page) => {
    let temp;
    if (dataArr?.atlength > 10) {
      temp = dataArr?.slice(page * 10 - 10, page * 10 + 1);
      setLoader(true);
      setBox(temp);
    }
  };
  useEffect(() => {
    adminFirstPageAction(true);
  }, []);
  const editHandler = useCallback((e, id) => {
    e.stopPropagation();
    navigate(`/admincommon/add_editRoofType/${id}`);
  }, []);

  // const deleteHandler = useCallback(
  //   (e, id) => {
  //     e.stopPropagation();
  //     deleteExternalId(id);
  //   },
  //   [deleteExternalId]
  // );
  const deleteHandler = (e, id) => {
    e.stopPropagation();
    delFabric(id)
      .then((res) => {
        //console.log(res);
        toast.success("Fabric deleted successfully");
        fetchData();
      })

      .catch((error) => {
        toast.error("Something went wrong");
      });
    // deleteExternalId(id);
  };
  const searchfilter = () => {
    // setStatus("1,2,3,4");
    setPage(1);
    fetchSeconddata();
  };
  const tableRows = useMemo(() => {
    return box.map(({ fabric_type, _id, description, details, status }) => ({
      items: [
        fabric_type,
        description,
        details,
        status === 1 ? "Active" : status === 2 ? "Inactive" : "-",
        <Actions
          onEdit={(e) => editHandler(e, _id)}
          onDelete={(e) => deleteHandler(e, _id)}
        />,
      ],
    }));
  }, [box, editHandler, deleteHandler]);
  function fetchData() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(URL + globalAPI.roofType, config)
      .then((response) => {
        setLoader(false);
        const res = response.data;
        setDataArr(res.data);
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  }
  useEffect(() => {
    fetchSeconddata();
  }, []);
  useEffect(() => {
    let temp;

    if (dataArr?.length > 10) {
      temp = dataArr?.slice(0, 10);

      setBox(temp);
    } else {
      setBox(dataArr);
    }
  }, [dataArr]);
  // //console.log("Roofres", box);
  function fetchSeconddata() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);

    axios
      .get(
        URL +
          globalAPI.setup +
          `?page=${page}&perPage=${PER_PAGE}&type=3&f_ftype=${type}&f_desc=${description}&f_status=${
            status === 0 ? "" : status
          }`,
        config
      )
      .then((response) => {
        setLoader(false);
        if (response.data.success) {
          const res = response.data;
          setCount(res?.total_pages);
          setBox(res?.data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  }
  useEffect(() => {
    fetchSeconddata();
  }, [page]);
  const handleChange = (e, p) => {
    setPage(p);
  };
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
        Roof Type
        <hr className="containerhr" />
      </Typography>
      <Card>
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
              width: "110px",
              marginTop: "10px",
              fontWeight: "600",
            }}
          >
            Search By
          </Typography>
          <StyledTextField
            sx={{ width: "210px", height: "63px" }}
            label="Type"
            InputLabelProps={{ style: { background: "#FFF" } }}
            value={type}
            onChange={(e) => setType(e.target.value)}
            // size="small"
          />

          <StyledTextField
            sx={{ width: "275px", height: "63px" }}
            label="Roof Description"
            InputLabelProps={{ style: { background: "#FFF" } }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // size="small"
          />
          <FormControl>
            <StyledTextField
              select
              sx={{ width: "210px", height: "63px" }}
              InputLabelProps={{ style: { background: "#FFF" } }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              //   onFocus={() => setFocused(true)}
              //   onBlur={() => setFocused(false)}
              label="Status"
            >
              <MenuItem value={1} style={{ fontWeight: 600 }}>
                Active
              </MenuItem>
              <MenuItem value={2} style={{ fontWeight: 600 }}>
                Inactive
              </MenuItem>
              <MenuItem value={0} style={{ fontWeight: 600 }}>
                All
              </MenuItem>
            </StyledTextField>
          </FormControl>

          <Button
            style={{
              fontSize: "18px",
              fontWeight: "300",
              fontFamily: "Outfit",
              width: "160px",
              height: "63px",
              background: "black",
              color: "white",
              borderRadius: "50px",
              textTransform: "none",
            }}
            onClick={() => searchfilter()}
          >
            Search
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {" "}
          <Typography
            variant="h6"
            style={{
              fontWeight: 600,
              fontSize: "30px",
              fontFamily: "outfit",
            }}
          >
            Roof Types List
            <hr className="ewallhr" />
          </Typography>
          <AddButton
            sx={{ background: "#fa5e00" }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admincommon/add_editRoofType/`);
            }}
          />
        </Box>

        <Box sx={{ marginTop: "1%" }}>
          <Table
            headers={[
              "Type",
              "Roof Description",
              "Roof Detail",
              "Status",
              "Action",
            ]}
            rows={tableRows}
            // pagination={pagination}
            isLoading={false}
            // isFetching={false}
          />
        </Box>
        {box.length >= 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "18px",
            }}
          >
            <ThemeProvider theme={theme}>
              <Pagination
                count={count}
                page={page}
                /*  variant="outlined" */
                // onChange={handleChange}
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

export default connect(null, mapDispatchToProps)(RoofWall);
// export default RoofWall;
