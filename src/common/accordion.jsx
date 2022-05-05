import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  margin: "10px 20px !important",
  "&.MuiAccordion-root": {
    borderRadius: `20px`,
    boxShadow: "none",
    "&::before": {
      display: "none !important",
    },
  },
  "& .MuiAccordionSummary-root": {
    margin: "10px 20px !important",
    padding: "0",
    height: "68px",
    alignItems: "center",
    borderBottom: "2px solid #e7e7e7",
    "& .MuiTypography-root": {
      fontWeight: "bold",
      fontSize: "20px",
    },
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    borderRadius: `12px`,
    color: `#000`,
    padding: "11px 13px",
  },
  "& .MuiAccordionDetails-root": {
    margin: "10px 20px !important",
  },
}));

export default Accordion;
