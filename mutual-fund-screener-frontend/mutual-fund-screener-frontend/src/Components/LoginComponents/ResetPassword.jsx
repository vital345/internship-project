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
let ResetPassword = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [repasswordVisibility, setRePasswordVisibility] = useState(false);
  const [password, setPassword] = useState("");
  const [repasswordError, setRePasswordError] = useState(false);
  const [repassword, setRePassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [error,setError] = useState("");
  let obj = useParams();
  const { resetPassword } = useContext(AuthContext);
  const handleReset = async () => {
    // console.log(password, repassword);
    const data = await resetPassword(obj.username, password);
    if(data.data==='password updated!'){
        setResetSuccess(true);
        setError(false)
      }
      else{
      setResetSuccess(false);
      setError(true);

    }
  };
  useEffect(() => {
    if (repassword == "") {
      if (password !== "") {
        setRePasswordError("Please re-enter the password here");
      }
    } else {
      if (repassword !== password) {
        setRePasswordError("Doesn't match with the password");
      } else {
        setRePasswordError("");
      }
    }
  }, [repassword, password]);
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
          Reset Password
        </Typography>
        <TextField
          id="standard-password-input"
          required
          label="Password"
          type={passwordVisibility ? "text" : "password"}
          autoComplete="current-password"
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {passwordVisibility ? (
                  <Visibility
                    onClick={() => {
                      setPasswordVisibility(!passwordVisibility);
                    }}
                  />
                ) : (
                  <VisibilityOff
                    onClick={() => {
                      setPasswordVisibility(!passwordVisibility);
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="standard-password-input"
          required
          label="ReEnter-Password"
          type={repasswordVisibility ? "text" : "password"}
          autoComplete="current-password"
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {passwordVisibility ? (
                  <Visibility
                    onClick={() => {
                      setRePasswordVisibility(!repasswordVisibility);
                    }}
                  />
                ) : (
                  <VisibilityOff
                    onClick={() => {
                      setRePasswordVisibility(!repasswordVisibility);
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          value={repassword}
          error={repasswordError}
          helperText={repasswordError == "" ? "" : repasswordError}
          onChange={(e) => setRePassword(e.target.value)}
        />
        {resetSuccess ? (
          <Button
            size="large"
            variant="outlined"
            endIcon={<LoginIcon />}
            onClick={handleReset}
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
        ) : repasswordError !== "" ? (
          <Button
            size="large"
            variant="outlined"
            endIcon={<LoginIcon />}
            onClick={handleReset}
            disabled
          >
            Reset Password
          </Button>
        ) : (
          <Button
            size="large"
            variant="outlined"
            endIcon={<LoginIcon />}
            onClick={handleReset}
          >
            Reset Password
          </Button>
        )}
        {resetSuccess ? (
          <Typography variant="subtitle1" color="success.main">
          Password Reset Successful!!
          </Typography>
        ) : (
          ""
        )}
        {error ? (
          <Typography variant="subtitle1" color="error.main">
              Oops!!! Bad Server
          </Typography>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};
export default ResetPassword;
