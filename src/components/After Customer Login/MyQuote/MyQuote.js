import React, { useEffect, useMemo, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { TailSpin } from "react-loader-spinner";
import { Typography } from "@mui/material";
import { Card, Pagination, Table } from "../../../common";
import { useGetAllQuotes, getAllQuotes1 } from "../../../services/services";
import { useNavigate } from "react-router-dom";
import { FirstPageAction } from "../../../Redux/FirstPage/FirstPage.action";
import { connect } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: { main: "#000000	" },
  },
});
// const userData = JSON.parse(localStorage.getItem("userData"));
// const userName = userData?.name;

const MyQuote = ({ FirstPageAction }) => {
  useEffect(() => {
    FirstPageAction(true);
  }, []);
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllQuotes();
  const [dataArr, setDataArr] = useState([]);
  let [page, setPage] = useState(1);
  let [count, setCount] = useState(1);
  const [userData1, setUserData1] = useState();
  // const _DATA = usePagination(data, PER_PAGE);
  const [loader, setLoader] = useState(true);

  const formatDate = (date) => {
    let temp = date.split("T")[0].split("-");
    let temp1 = temp[2] + "/" + temp[1] + "/" + temp[0];
    return temp1;
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    userData && setUserData1(userData);
  }, [localStorage.getItem("userData")]);

  useEffect(() => {
    setLoader(true);
    setCount(data?.total_pages);
    setDataArr(data?.data);
    setLoader(false);
  }, [data]);
  useEffect(() => {
    setLoader(true);
    getAllQuotes1(page).then((res) => {
      setDataArr(res?.data?.data);

      setLoader(false);
    });
  }, [page]);

  const pagination = (
    <Pagination
      count={count}
      page={page}
      disabled={false}
      onChange={(e, p) => {
        setPage(p);
      }}
    />
  );

  const tableRows = useMemo(() => {
    return (
      (dataArr &&
        dataArr?.map(
          ({
            quote_reference_number,
            //  { address_1, address_2, city, country, postcode }=site_details,
            site_details,
            updatedAt,
            status,
            _id,
          }) => ({
            onClick: (e) => {
              // e.stopPropagation();
              navigate(`/common/viewQuote/${_id}`);
            },
            items: [
              quote_reference_number,
              `${
                site_details?.address_1 ? site_details?.address_1 + "," : ""
              } ${
                site_details?.address_2 ? site_details?.address_2 + "," : ""
              } ${site_details?.city ? site_details?.city + "," : ""} ${
                site_details?.country ? site_details?.country + "," : ""
              } ${site_details?.postcode || ""} `,
              formatDate(updatedAt),
              `${
                status === 1
                  ? "New-Unpaid"
                  : status === 2
                  ? "New-Paid"
                  : status === 3
                  ? "In Progress"
                  : status === 4
                  ? "Complete"
                  : status === 5
                  ? "Snagging"
                  : "-"
              }`,
              // <Button
              //   style={{
              //     background: "Black",
              //     color: "white",
              //     borderRadius: "32.5px",
              //     width: "200px",
              //     height: "65px",
              //     fontSize: "18px",
              //     fontFamily: "Outfit",
              //     textTransform: "none",
              //   }}
              //   // onClick={(e) => {}}
              // >
              //   View Proposal
              // </Button>,
            ],
          })
        )) ||
      []
    );
  }, [dataArr]);
  return (
    <Box>
      {" "}
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
          fontFamily: "Outfit",
          marginLeft: "40px",
        }}
      >
        My Jobs
        <hr className="containerhr" />
      </Typography>
      <Card>
        <Typography
          style={{
            color: "#fa5e00",
            fontSize: "40px",
            fontWeight: "600",
            fontFamily: "Outfit",
          }}
        >
          {userData1?.name}
        </Typography>
        <Typography
          style={{
            fontSize: "30px",

            fontFamily: "Outfit",
            fontWeight: "300",
          }}
        >
          {userData1?.business_trade_name}, {userData1?.city}
        </Typography>
        <hr className="hrFirst" />

        <Box sx={{ marginTop: "5%" }}>
          {dataArr?.length >= 1 && (
            <Table
              headers={[
                "Job Reference",
                "Site Details",
                "Submitted Date",
                "Status",
                "",
              ]}
              rows={tableRows}
              // pagination={pagination}
              isLoading={false}
              // isFetching={false}
            />
          )}
          {dataArr?.length == 0 && (
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
          {dataArr?.length >= 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "18px",
              }}
            >
              <ThemeProvider theme={theme}>
                <Pagination
                  className="pagination"
                  count={count}
                  page={page}
                  /*  variant="outlined" */
                  onChange={(e, p) => {
                    setPage(p);
                  }}
                  color="primary"
                />
              </ThemeProvider>
            </div>
          )}
        </Box>
      </Card>
    </Box>
  );
};
const mapDispatchtoProps = (dispatch) => ({
  FirstPageAction: (value) => dispatch(FirstPageAction(value)),
});

export default connect(null, mapDispatchtoProps)(MyQuote);
// export default MyQuote;
