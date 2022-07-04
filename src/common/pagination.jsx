import { styled } from "@mui/material/styles";
import { Pagination } from "@mui/material";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& ul": {
    justifyContent: "center",
    "& .MuiButtonBase-root": {
      width: "46px",
      height: "46px",
      borderRadius: "50px",
      fontSize: "18px",
      fontFamily: "Outfit",
      border: "1px solid #d3d3d3",
    },
    "& .Mui-selected": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
}));

export default StyledPagination;
