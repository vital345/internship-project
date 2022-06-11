import React, { useState, useEffect } from "react";
import Navbar from "./UserComponents/DashBoardComponents/Navbar";
import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  Slider,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import AppBar from "@mui/material/AppBar";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Title, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Title, Legend);
const Calculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState(2000);
  const [duration, setDuration] = useState(2);
  const [expectedReturns, setExpectedReturns] = useState(12);
  const [result, setResult] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const data = {
    labels: ["Interest", "Principal"],

    datasets: [
      {
        data: [interest, principal],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };
  const calculateResultOfSIP = () => {
    let compoundReturn = expectedReturns / 1200;
    let numberOfMonths = duration * 12;
    let cal = Math.floor(
      (investmentAmount *
        [(1 + compoundReturn) ** numberOfMonths - 1] *
        (1 + compoundReturn)) /
        compoundReturn
    );
    setResult(cal);
    let principal = Math.floor(investmentAmount * numberOfMonths);
    let interest = cal - principal;
    setPrincipal(principal);
    setInterest(interest);
  };
  useEffect(() => {
    calculateResultOfSIP();
  });
  const handleDurationChange = (e) => {
    let flag1 = e.target.value > 30;
    let flag2 = e.target.value < 1;
    let value = flag1 ? 15 : flag2 ? 1 : e.target.value;
    setDuration(value);
    calculateResultOfSIP();
  };
  const handleExpectedReturnsChange = (e) => {
    let flag1 = e.target.value > 30;
    let flag2 = e.target.value < 5;
    let value = flag1 ? 30 : flag2 ? 5 : e.target.value;
    setExpectedReturns(value);
    calculateResultOfSIP();
  };
  return (
    <>
      <AppBar position="fixed">
        <Navbar />
      </AppBar>
      <Box
        sx={{
          position:"fixed",
          top:"5vh",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: ["column", "column", "row", "row", "row"],
          justifyContent: "space-around",
          alignItems: ["center", "center", null, null, null],
          height: "95vh",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            width: ["80vw", "80vw", "40vw", "40vw", "40vw"],
            height: ["70vh", "70vh", "80vh", "80vh", "80vh"],
            border: 2,
            borderRadius: 4,
            padding: 5,
            borderColor: "primary.main",
          }}
        >
          <Link style={{ color: "#000" }} to="/">
            <ArrowBackIcon />
          </Link>
          <Typography variant="h2" color="primary.main">
            SIP Calculator
          </Typography>
          <Box
            sx={{
              padding: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "80%",
            }}
          >
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupeeIcon />
                  </InputAdornment>
                ),
                inputProps: { min:0, max: 50000 },
              }}
              id="standard-required"
              label="SIP Amount"
              size="large"
              variant="outlined"
              value={investmentAmount}
              type="number"
              onChange={(e) => {
                let flag1 = e.target.value > 50000;
                let flag2 = e.target.value < 0;
                let value = flag1 ? 50000 : flag2 ? 0 : e.target.value;
                setInvestmentAmount(value);
                calculateResultOfSIP();
              }}
            />
            <Slider
              value={investmentAmount}
              min={100}
              max={50000}
              size="medium"
              onChange={(e) => {
                setInvestmentAmount(e.target.value);
                calculateResultOfSIP();
              }}
            />

            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">years</InputAdornment>
                ),
                inputProps: { min: 1, max: 30 },
              }}
              id="standard-required"
              label="SIP Period"
              size="large"
              variant="outlined"
              value={duration}
              type="number"
              onChange={(e) => {
                handleDurationChange(e);
              }}
            />

            <Slider
              size="medium"
              value={duration}
              min={1}
              max={30}
              onChange={(e) => {
                handleDurationChange(e);
              }}
            />

            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <b>%</b>
                  </InputAdornment>
                ),
                inputProps: { min: 5.0, max: 30.0 },
              }}
              id="standard-required"
              label="Expected Returns per annum"
              size="large"
              variant="outlined"
              value={expectedReturns}
              type="number"
              onChange={(e) => {
                handleExpectedReturnsChange(e);
              }}
            />

            <Slider
              value={expectedReturns}
              step={0.1}
              min={5}
              max={30}
              size="medium"
              onChange={(e) => {
                handleExpectedReturnsChange(e);
              }}
            />

            <Typography variant="h4" color="success.dark">
              Wealth Gained :
              <Typography variant="h4" display="inline" color="success.main">
                <CurrencyRupeeIcon />
                {interest}
              </Typography>
            </Typography>
            <Typography variant="h4" color="success.dark">
              Invested Amount :
              <Typography variant="h4" display="inline" color="success.main">
                <CurrencyRupeeIcon />
                {principal}
              </Typography>
            </Typography>
            <Typography variant="h4" color="success.dark">
              Total Wealth :
              <Typography variant="h4" display="inline" color="success.main">
                <CurrencyRupeeIcon />
                {result}
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            boxSizing: "border-box",
            width: ["80vw", "80vw", "40vw", "40vw", "40vw"],
            height: ["15vh", "15vh", "60vh", "80vh", "100vh"],
            display: "flex",
            flexDirection: ["row", "row", "column", "column", "column"],
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              boxSizing: "border-box",
              width: ["60%", "60%", "80%", "80%", "80%"],
              height: ["80%", "80%", "60%", "60%", "60%"],
            }}
          >
            <Doughnut data={data}></Doughnut>
          </Box>
          <Typography variant="h5" color="primary.main">
            Returns BreakUp
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Calculator;
