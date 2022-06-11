import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../ContextApi/AuthProvider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import { validate } from "react-email-validator";
import {
  TextField,
  Box,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import img1 from "./utility/img1.jpg";
let ForgetPassword = () => {
  let { forgotPassword } = useContext(AuthContext);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [serverError, setServerError] = useState("");
  const [invalidEmailId, setInvalidEmailId] = useState("");
  const [sent, setSent] = useState(false);
  const handleFP = async () => {
    if (username === "") {
      setUsernameError("Please enter a username");
    } else {
      setUsernameError("");
    }
    validateEmail();

    if (!usernameError && !invalidEmailId) {
      const data = await forgotPassword(username, emailId, password);
      if (data.data === "email has been sent!") {
        setSent(true);
        setServerError("");
      } else {
        setServerError("Please enter correct Credentials");
      }
    }
  };
  const validateEmail = () => {
    if (!emailId) {
      setInvalidEmailId("Please enter an emial Id");
    } else {
      if (validate(emailId)) setInvalidEmailId("");
      else {
        setInvalidEmailId("Please enter a valid emial Id");
      }
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
          Forgot Password
        </Typography>
        <TextField
          required
          id="standard-required"
          label="User Name"
          variant="standard"
          value={username}
          error={usernameError}
          helperText={usernameError ? "Username required" : ""}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          required
          id="standard-required"
          label="Email Id"
          variant="standard"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          error={invalidEmailId}
          helperText={invalidEmailId !== "" ? invalidEmailId : ""}
        />
        
        {sent ? (
          <Button
            size="large"
            variant="outlined"
            endIcon={<LoginIcon />}
            onClick={handleFP}
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
          <>
            <Button
              size="large"
              variant="outlined"
              endIcon={<LoginIcon />}
              onClick={handleFP}
            >
              Sent Reset Link
            </Button>
            <Box>
              <Typography variant="subtitle1">
                <Link
                  display={"inline"}
                  color="primary.main"
                  variant="subtitle1"
                  style={{ textDecoration: "none" }}
                  to="/login"
                >
                  Login
                </Link>
              </Typography>
            </Box>
            
          </>
        )}
        {serverError ? (
          <Typography variant="subtitle1" color="error.main">
            {serverError}
          </Typography>
        ) : sent ? (
          <Typography variant="subtitle1" color="success.main">
           Link sent on registered email id
          </Typography>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};
export default ForgetPassword;
