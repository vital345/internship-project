import React, { useState, useEffect } from "react";
import Navbar from "./UserComponents/DashBoardComponents/Navbar";
import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  Slider,
} from "@mui/material";
import Terminologies from "./InfoPageComponents/Terminologies";
import AppBar from "@mui/material/AppBar";
import MF from "./InfoPageComponents/MF";
import Carousel from "./InfoPageComponents/Carousel";
const InformationPage = () => {
  return (
    <>
      <AppBar position="fixed">
        <Navbar />
      </AppBar>
      <Box
        sx={{
          overflow: "auto",
          display: "flex",
          heigth: "85vh",
          flexDirection: "column",
          flexWrap:"wrap",
          position: "fixed",
          top: "5vh",
          width: "50vw",
          boxSizing: "border-box",
          padding: "4rem",
          marginLeft: "3vw",
          gap: 4,
          alignItems: "left",
        }}
      >
        <MF />
        <Carousel />
      </Box>
      <Box
        sx={{
          overflow: "auto",
          display: "flex",
          heigth: "85vh",
          flexDirection: "column",
          flexWrap:"wrap",
          position: "fixed",
          top: "5vh",
          right:0,
          width: "45vw",
          boxSizing: "border-box",
          padding: "4rem",
          marginRight: "3vw",
          gap: 4,
          alignItems: "left",
        }}
      >
        <Terminologies/>
      </Box>
    </>
  );
};

export default InformationPage;
