import React, { useContext, useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";
import CalculateIcon from "@mui/icons-material/Calculate";
import { AuthContext } from "../../ContextApi/AuthProvider";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { border } from "@mui/system";
const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const [name, setName] = useState("");
  useEffect(() => {
    let name =
      user?.returnUserDetails?.userName.substring(0, 1).toUpperCase() +
      user?.returnUserDetails?.userName.substring(1).toLowerCase();
    setName(name);
  }, [user]);
  const clickFunc = () => {
    logout();
  };
  return (
    <Toolbar>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        <Link style={{ color: "#FFF", textDecoration: "none" }} to="/">
          Mutual Fund Screener
        </Link>
      </Typography>
      <Box
        sx={{
          boxSizing: "border-box",
          width: ["40vh"],
          display: "flex",
          justifyContent: "space-around ",
          alignItems: "center",
          marginRight: "1vh",
        }}
      >
        {" "}
        <Tooltip title="Knowledge Center">
          <Link style={{ color: "#FFF" }} to="/about">
            <LibraryBooksIcon fontSize="large" />
          </Link>
        </Tooltip>
        <Tooltip title="SIP Calculator ">
          <Link style={{ color: "#FFF" }} to="/calculator">
            <CalculateIcon fontSize="large" />
          </Link>
        </Tooltip>
        {isAdmin ? (
          <Tooltip title="Admin Dashboard">
            <Link style={{ color: "#FFF" }} to={isAdmin ? "/admin" : "/"}>
              <AdminPanelSettingsIcon fontSize="large" />
            </Link>
          </Tooltip>
        ) : (
          ""
        )}
        {user ? (
          <>
            <Tooltip title="User Profile">
              <Link
                style={{
                  color: "#FFF",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  // width: "10vw"
                }}
                to={user ? "/userprofile" : "/login"}
              >
                <AccountCircle fontSize="large" />
                <Typography display="inline" variant="h6">
                  {name}
                </Typography>
              </Link>
            </Tooltip>
            <Button
              variant="outline"
              disableElevation
              disableRipple
              sx={{
                background: "white",
                color: "primary.main",
              }}
              onClick={clickFunc}
            >
              {" "}
              Logout
            </Button>
          </>
        ) : (
          <Link style={{ textDecoration: "none", border: "none" }} to="/login">
            <Button
              variant="outline"
              disableElevation
              disableRipple
              sx={{
                background: "white",
                color: "primary.main",
              }}
            >
              {" "}
              Login
            </Button>
          </Link>
        )}
      </Box>
    </Toolbar>
  );
};
export default Navbar;
