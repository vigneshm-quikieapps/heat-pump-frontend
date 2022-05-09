import React,{useState} from "react";
import { Box, Button } from "@mui/material";
import { Card } from "../../../common";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import StyledTextField from "../../../common/textfield";
import "./ExternalWall.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import moment from "moment";
import Paper from "@mui/material/Paper";
import usePagination from "../../Pagination/Pagination";

const ExternalWall = () => {
  const [data, setData] = useState([]);
  const PER_PAGE = 10;
  const _DATA = usePagination(data, PER_PAGE);
  let [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  return (
    <div>
      <Typography
        variant="h6"
        style={{
          fontWeight: 300,
          fontSize: "60px",
          fontFamily: "outfit",
          marginLeft: "40px",
        }}
      >
        External Wall Type
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
            // InputLabelProps={{ style: { marginTop: "10px" } }}
            // value={serviceno}
            // onChange={(e) => setServiceno(e.target.value)}
            size="small"
          />

          <StyledTextField
            sx={{ width: "275px", height: "63px" }}
            label="Wall Construction"
            // value={title}
            // InputLabelProps={{ style: { marginTop: "10px" } }}
            // onChange={(e) => setTitle(e.target.value)}
            size="small"
          />
          <FormControl>
            <StyledTextField
              select
              sx={{ width: "210px", height: "63px" }}
              //   value={priority}
              //   onChange={(e) => setPriority(e.target.value)}
              //   onFocus={() => setFocused(true)}
              //   onBlur={() => setFocused(false)}
              label="Status"
            >
              <MenuItem value="1" style={{ fontWeight: 600 }}>
                High
              </MenuItem>
              <MenuItem value="2" style={{ fontWeight: 600 }}>
                Medium
              </MenuItem>
              <MenuItem value="3" style={{ fontWeight: 600 }}>
                Low
              </MenuItem>
            </StyledTextField>
          </FormControl>

          <Button
            style={{
              fontSize: "18px",
              fontWeight: "300",
              fontFamily: "Outfit",
              width: "230px",
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
        <Typography
          variant="h6"
          style={{
            fontWeight: 600,
            fontSize: "20px",
            fontFamily: "outfit",
            marginLeft: "40px",
          }}
        >
          External Wall Types List
          <hr className="ewallhr" />
        </Typography>
        <Grid>
          {/* <div className="fourth-row"> */}
            
            <div style={{ overflowX: "auto" }}>
              <TableContainer component={Paper}>
                <Table sx={{ width: "95%",marginLeft:"15px" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          fontSize: "22px",
                          fontFamily: "Outfit",
                          color: "#000",
                          fontWeight: 600,
                        }}
                      >
                        Type
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "22px",
                          fontFamily: "Outfit",
                          color: "#000",
                          fontWeight: 600,
                        }}
                      >
                        Wall Construction
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "22px",
                          fontFamily: "Outfit",
                          color: "#000",
                          fontWeight: 600,
                        }}
                      >
                        Details
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "22px",
                          fontFamily: "Outfit",
                          color: "#000",
                          fontWeight: 600,
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "22px",
                          fontFamily: "Outfit",
                          color: "#000",
                          fontWeight: 600,
                          width: "163px",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    {_DATA.currentData().map((item, index) => (
                      <TableRow
                        // onClick={() => manageService(item)}
                        key={index}
                        style={{
                          borderBottom: "solid 1px #d3d3d3",
                          cursor: "pointer",
                        }}
                      >
                        <TableCell
                          align="left"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Outfit",
                            color: "#000",
                          }}
                        >
                          {item.service_ref_number}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Outfit",
                            color: "#000",
                          }}
                        >
                          {item.title}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Outfit",
                            color: "#000",
                          }}
                        >
                          {item.job_reference_id
                            ? item.job_reference_id.site_details
                            : "-"}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Outfit",
                            color: "#000",
                          }}
                        >
                          {item.type ? item.type : "-"}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Outfit",
                            color: "#000",
                          }}
                        >
                          {moment(item.updatedAt).format("DD/MM/YYYY h:mm a")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}
                </Table>
              </TableContainer>
            </div>
            {/* {_DATA.currentData().length == 0 && (
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                No matching records found
              </h4>
            )} */}
          {/* </div> */}
        </Grid>
      </Card>
    </div>
  );
};

export default ExternalWall;
