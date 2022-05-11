import React, { useEffect, useMemo, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { TailSpin } from "react-loader-spinner";
import { Typography } from "@mui/material";
import { Card, Pagination, Table } from "../../../common";
import { useGetAllQuotes } from "../../../services/services";
import { useNavigate } from "react-router-dom";
const userData = JSON.parse(localStorage.getItem("userData"));
const userName = userData?.name;

const MyQuote = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllQuotes();
  const [dataArr, setDataArr] = useState([]);
  let [page, setPage] = useState(1);

  // const _DATA = usePagination(data, PER_PAGE);
  const [loader, setLoader] = useState(false);

  const formatDate = (date) => {
    let temp = date.split("T")[0].split("-");
    let temp1 = temp[2] + "/" + temp[1] + "/" + temp[0];
    return temp1;
  };

  useEffect(() => {
    let temp;

    if (data?.data.length > 10) {
      temp = data?.data.slice(0, 10);

      setDataArr(temp);
    } else {
      setDataArr(data?.data);
    }
  }, [data]);

  const setDataOfTens = (page) => {
    let temp;
    if (data?.data.length > 10) {
      temp = data?.data.slice(page * 10 - 10, page * 10 + 1);
      setLoader(true);
      setDataArr(temp);
    }
  };

  const pagination = (
    <Pagination
      count={Math.ceil(data?.data.length / 10)}
      page={page}
      disabled={false}
      onChange={(e, p) => {
        console.log(p);
        setPage(p);
        setDataOfTens(p);
      }}
    />
  );

  const tableRows = useMemo(() => {
    return (
      (dataArr &&
        dataArr.map(
          ({
            quote_reference_number,
            //  { address_1, address_2, city, country, postcode }=site_details,
            site_details,
            updatedAt,
            status,
            _id,
          }) => ({
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
              `${status === 1 ? "New" : "Propasal Ready"}`,
              <Button
                style={{
                  background: "Black",
                  color: "white",
                  borderRadius: "32.5px",
                  width: "200px",
                  height: "65px",
                  fontSize: "18px",
                  fontFamily: "Outfit",
                  textTransform: "none",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/common/viewQuote/${_id}`);
                }}
              >
                View Proposal
              </Button>,
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
          fontSize: "60px",
          fontFamily: "Outfit",
          marginLeft: "40px",
        }}
      >
        My Quotes
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
          {userName}
        </Typography>
        <Typography
          style={{
            fontSize: "30px",

            fontFamily: "Outfit",
            fontWeight: "300",
          }}
        >
          {userData?.business_trade_name}, {userData?.city}
        </Typography>
        <hr className="hrFirst" />

        <Box sx={{ marginTop: "5%" }}>
          <Table
            headers={[
              "Quotes Reference",
              "Site Details",
              "Submitted Date",
              "Status",
              "",
            ]}
            rows={tableRows}
            pagination={pagination}
            isLoading={false}
            // isFetching={false}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default MyQuote;
