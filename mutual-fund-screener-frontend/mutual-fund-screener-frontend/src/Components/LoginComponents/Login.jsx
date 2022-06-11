import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../ContextApi/AuthProvider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
let Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [serverError, setServerError] = useState("");
  const { login } = useContext(AuthContext);
  const handleLogin = async () => {
    // console.log("password : ", password)
    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (!username) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if (!usernameError && !passwordError) {
      try {
        let data = await login(username, password);
        // console.log(data.data);
        if (!data.returnUserDetails) {
          if(data?.data=== "Confirm your email before logging in!"){
            setServerError("Confirm your email before logging in!");
          }
          else{
            setServerError("Incorrect Email Id or Password");

          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {}, [serverError]);
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
          Login
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
          id="standard-password-input"
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
          error={passwordError}
          helperText={passwordError ? "Please enter a password" : ""}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          size="large"
          variant="outlined"
          endIcon={<LoginIcon />}
          onClick={handleLogin}
        >
          Login
        </Button>
        {serverError ? (
            <Typography variant="subtitle1" color="error.main">
              {serverError}
            </Typography>
          ) : ""}
        <Box>
          <Typography variant="subtitle1">
            <Link style={{ textDecoration: "none" }} to="/">
              Go Back to Home
            </Link>
          </Typography>
          <Typography variant="subtitle1">
            <Link style={{ textDecoration: "none" }} to="/forgot-password">
              Forgot-Password
            </Link>
          </Typography>
          <Typography variant="subtitle1">
            Don't have an account ?{" "}
            <Link
              display={"inline"}
              color="primary.main"
              variant="subtitle1"
              style={{ textDecoration: "none" }}
              to="/signup"
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Login;
