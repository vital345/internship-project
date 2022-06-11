import { useParams } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../ContextApi/AuthProvider";
import LoginIcon from "@mui/icons-material/Login";
import {
  TextField,
  Box,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import img1 from "./utility/img1.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const ConfirmEmail = () => {
  let obj = useParams();
  const [confirmed, setConfirmed] = useState(false);
  let { confirmEmail } = useContext(AuthContext);
  const clickFunction = async () => {
    let data = await confirmEmail(obj.username);
    if (data.data === "email confirmed") {
      setConfirmed(true);
    }
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        boxSizing: "border-box",
        margin: "0",
        padding: "0",
        backgroundImage: `url(${img1})`,
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: ["75vw", "62.5vw", "25vw", "25vw", "25vw"],
          height: "50vh",
          border: 1,
          borderRadius: "1vw",
          borderColor: "primary.main",
          padding: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          position: "fixed",
          top: "20vh",
          right: [0, "12vw", "12vw", "12vw", "12vw"],
          backgroundColor: "white",
        }}
      >
        <Typography variant="h3" color={"primary.main"}>
          Email Verification
        </Typography>
        {confirmed ? (
          <Button
            size="large"
            variant="outlined"
            endIcon={<LoginIcon />}
          >
            <Link
              display={"inline"}
              color="primary.main"
              variant="h5"
              style={{ textDecoration: "none" }}
              to="/login"
            >
              Back to Login
            </Link>
          </Button>
        ) : (
          <Button
            size="large"
            variant="outlined"
            endIcon={<LoginIcon />}
            onClick={clickFunction}
          >
            Click to activate account
          </Button>
        )}
         {confirmed ? (
          <Typography variant="subtitle1" color="success.main">
          Email Activated please Login
          </Typography>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};
export default ConfirmEmail;
