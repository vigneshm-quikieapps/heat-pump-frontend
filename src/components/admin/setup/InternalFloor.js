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
import { useDeleteExternalId } from "../../../services/services";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const theme = createTheme({
  palette: {
    primary: { main: "#000000	" },
  },
});
const InternalFloor = () => {
  const [loader, setLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [box, setBox] = useState([]);
  const [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const [count, setCount] = useState(1);
  const _DATA = usePagination(data, PER_PAGE);
  const navigate = useNavigate();
  const { isLoading: isDeleteLoading, mutate: deleteExternalId } =
    useDeleteExternalId({
      onError: (error) => {
        setShowError(true);
        setError(error);
      },
    });

  const editHandler = useCallback((e, id) => {
    e.stopPropagation();
  }, []);

  const deleteHandler = useCallback(
    (e, id) => {
      e.stopPropagation();
      deleteExternalId(id);
    },
    [deleteExternalId]
  );

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
      .get(URL + globalAPI.InternalFloorType, config)
      .then((response) => {
        setLoader(false);
        const res = response.data;
        setBox(res.data);
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  }
  useEffect(() => {
    fetchData();
    // fetchSeconddata();
  }, []);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  console.log("internlfloorres", box);
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
        Internal Floor Type
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
            // value={serviceno}
            // onChange={(e) => setServiceno(e.target.value)}
            size="small"
          />

          <StyledTextField
            sx={{ width: "275px", height: "63px" }}
            label="Internal Floor Description"
            // value={title}
            InputLabelProps={{ style: { background: "#FFF" } }}
            // onChange={(e) => setTitle(e.target.value)}
            size="small"
          />
          <FormControl>
            <StyledTextField
              select
              sx={{ width: "210px", height: "63px" }}
              InputLabelProps={{ style: { background: "#FFF" } }}
              //   value={priority}
              //   onChange={(e) => setPriority(e.target.value)}
              //   onFocus={() => setFocused(true)}
              //   onBlur={() => setFocused(false)}
              label="Status"
            >
              <MenuItem value="1" style={{ fontWeight: 600 }}>
                Active
              </MenuItem>
              <MenuItem value="2" style={{ fontWeight: 600 }}>
                Inactive
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
            }}
            // onClick={() => searchfilter()}
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
            Internal Floor Types List
            <hr className="ewallhr" />
          </Typography>
          <AddButton
            sx={{ background: "#fa5e00" }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admincommon/add_editInternalWall/`);
            }}
          />
        </Box>

        <Box sx={{ marginTop: "1%" }}>
          <Table
            headers={[
              "Type",
              "Internal Floors Description",
              "Internal Floors Detail",
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

export default InternalFloor;
