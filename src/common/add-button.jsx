import { Button } from "@mui/material";
import { ImgIcon } from ".";
import addIcon from "../Img/icon-add.png";

const AddButton = ({ sx, ...otherProps }) => (
  <Button
    sx={{
      px: 0,
      minWidth: "52px",
      ...sx,

      "&:hover": {
        backgroundColor: "#fa5e00",
      },
    }}
    {...otherProps}
  >
    <ImgIcon>{addIcon}</ImgIcon>
  </Button>
);
export default AddButton;
