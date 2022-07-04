import { styled } from "@mui/material/styles";
import { Box, Table } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

export const CustomContainer = styled(Box)(({ theme }) => ({
  border: `1px solid "#f2f1f6"`,
  borderRadius: "20px",
}));

const TableMui = styled(Table)(({ theme }) => ({
  "& .MuiTableCell-root": {
    [`&.${tableCellClasses.head}`]: {
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.root}`]: { border: 0 },
  },
  "& .MuiTableBody-root": {
    "& .MuiTableRow-root": {
      cursor: "pointer",
      border: 0,
      height: 70,
      "&:nth-of-type(odd)": {
        backgroundColor: "#f4f4f4",
      },
      // hide last border
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    },
  },
}));

export default TableMui;
