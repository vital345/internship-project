import React, { useContext, useState } from "react";
import { AuthContext } from "../ContextApi/AuthProvider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import { validate } from "react-email-validator";
import { Link } from "react-router-dom";
import img1 from "./utility/img1.jpg"
import {
  TextField,
  Box,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";

let Signup = () => {
  const { signup } = useContext(AuthContext);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [invalidEmailId, setInvalidEmailId] = useState("");
  const [signupSuccessful, setSignupSuccessful] = useState(false)

  const handleSignUp = async () => {
    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (username==="") {
      setUsernameError("Please enter a username");
    } else {
      setUsernameError("");
    }
    validateEmail();

    if (!passwordError && !usernameError && !invalidEmailId) {
      const data = await signup(username, emailId, password);
      if(data.status===401){
        if(data.data==="User already exists try logging in!"){
          setUsernameError(data.data);
        }
        else{
          setInvalidEmailId(data.data);
        }

      }
      else{
        setSignupSuccessful(true);
      }
    }
  };
  const validateEmail = () => {
    if (!emailId) {
      setInvalidEmailId("Please enter an emial Id");
    } 
    else {
      if (validate(emailId)) setInvalidEmailId("");
      else {
        setInvalidEmailId("Please enter a valid emial Id");
      }
    }
  };
  return (
    <Box
      sx={{
        position:"fixed",
        top:0,
        left:0,
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
          backgroundColor:'white'
        }}
      >
        <Typography variant="h3" color={"primary.main"}>
          Sign Up
        </Typography>

        <TextField
          required
          id="standard-required"
          label="User Name"
          variant="standard"
          value={username}
          error={usernameError}
          helperText={usernameError!=="" ? usernameError : ""}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          id="standard-required"
          label="Email Id"
          variant="standard"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          error={invalidEmailId}
          helperText={
            invalidEmailId!=="" ? invalidEmailId: ""
          }
        />
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
          error={passwordError}
          helperText={passwordError ? "Please enter a password" : ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        {signupSuccessful?
        <Button
        size="large"
        variant="outlined"
        endIcon={<LoginIcon />}
        color="success"
        >
           <Link style={{ textDecoration: "none" }} to="/login">
              {" "}
            Signup Successful please verify and go to Login page
            </Link>
        </Button>
        :
        <>
        <Button
        size="large"
        variant="outlined"
        endIcon={<LoginIcon />}
        onClick={handleSignUp}
        >
          Signup
        </Button>
        <Box>
          <Typography variant="subtitle1">
            Already have an account ?{" "}
            <Link style={{ textDecoration: "none" }} to="/login">
              {" "}
              Login
            </Link>
          </Typography>
        </Box>
        </>
        }
      </Box>
    </Box>
  );
};
export default Signup;
