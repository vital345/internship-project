import { useParams } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SpeedIcon from "@mui/icons-material/Speed";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  Slider,
  IconButton,
} from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Navbar from "./DashBoardComponents/Navbar";
import AppBar from "@mui/material/AppBar";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { AuthContext } from "../ContextApi/AuthProvider";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const MutualFundPage = () => {
  const [investmentAmount, setInvestmentAmount] = useState(2000);
  const [duration, setDuration] = useState(2);
  const [result, setResult] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [isMutualFundAdded, setIsMutualFundAdded] = useState(false);
  const [mfDetails, setMFDetails] = useState({});
  const [date, setDate] = useState([]);
  const [nav, setNav] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  let obj = useParams();
  const { user, addMFToWishlist, removeMFFromWishList } =
    useContext(AuthContext);

  useEffect(() => {
    fetch(`https://api.mfapi.in/mf/${obj.id}`)
      .then((resp) => resp.json())
      .then((data) => {
        let filterData = data["data"];
        filterData = filterData.slice(0, 31);
        const dateArr = filterData.map((i) => i.date);
        const navArr = filterData.map((i) => i.nav);
        setDate(dateArr);
        setNav(navArr);
        // console.log(isDataLoading);
      })
      .then(() => {
        fetch(
          `http://localhost:3000/mutual-fund/${obj.id}`
        )
          .then((resp) => resp.json())
          .then((data) => {
            setMFDetails(data);
            // console.log("done loading");
          })
          .then(() => {
            setIsDataLoading(false);
          })
          .then(() => {
            if (user)
              for (var j = 0; j < user.returnUserDetails.wishList.length; j++) {
                if (
                  Number(user.returnUserDetails.wishList[j].id) ===
                  Number(obj.id)
                )
                  setIsMutualFundAdded(true);
              }
          });
      });
  }, [obj, user]);

  const data = {
    labels: date, 
    datasets: [
      {
        label: "Nav value",
        data: nav,
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(0, 0, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Nav Data for ${mfDetails.name}`,
      },
    },
  };
  const calculateResultOfSIP = () => {
    let compoundReturn = mfDetails.cagr / 1200;
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
  }, [calculateResultOfSIP]);
  const handleDurationChange = (e) => {
    let flag1 = e.target.value > 30;
    let flag2 = e.target.value < 1;
    let value = flag1 ? 15 : flag2 ? 1 : e.target.value;
    setDuration(value);
    calculateResultOfSIP();
  };
  const setMutualFundToWishList = async () => {
    if (!isMutualFundAdded) {
      await addMFToWishlist(obj.id);
      setIsMutualFundAdded(true);
      alert(`${mfDetails.name} has been added to the watchlist`);
    } else {
      removeMFFromWishList(obj.id);
      setIsMutualFundAdded(false);
      alert(`${mfDetails.name} has been removed from the watchlist`);
    }
  };

  return (
    <>
      {isDataLoading ? (
        <Typography
          variant="h1"
          color="primary.main"
          sx={{
            position: "fixed",
            top: "40vh",
            left: "40vw",
          }}
        >
          Loading
        </Typography>
      ) : (
        <>
          <AppBar position="fixed" height="5vh">
            <Navbar />
          </AppBar>
          <Box
            sx={{
              position: "fixed",
              top: "5vh",
              height: "95vh",
              width: "100vw",
              left: 0,
            }}
          >
            <Box
              sx={{
                boxSizing: "border-box",
                border: 1,
                borderColor: "primary.light",
                borderRadius: "5%",
                margin: 5,
                marginBottom: 2,
                width: "20vw",
                height: "40vh",
                padding: 2,
              }}
            >
              <IconButton onClick={setMutualFundToWishList}>
                {isMutualFundAdded ? (
                  <BookmarkIcon />
                ) : (
                  <BookmarkBorderOutlinedIcon />
                )}
              </IconButton>
              <Typography variant="h4" color="black" sx={{ marginBottom: 2 }}>
                {mfDetails.name}
              </Typography>

              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {mfDetails.cagr > 0 ? (
                  <ArrowDropUpIcon
                    sx={{
                      backgroundColor: "success.light",
                      color: "white",
                      borderRadius: "50%",
                      marginRight: 1,
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    sx={{
                      backgroundColor: "error.dark",
                      color: "white",
                      borderRadius: "50%",
                      marginRight: 1,
                    }}
                  />
                )}
                Returns
              </Typography>

              <Typography variant="body2" color="black" sx={{ margin: 1 }}>
                {mfDetails.cagr > 0
                  ? " Fund has been able to generate better returns compared to other funds in the same category"
                  : "Other Funds in the same category are generating better returns"}
              </Typography>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {mfDetails.expense_ratio < 1 ? (
                  <ArrowDropUpIcon
                    sx={{
                      backgroundColor: "success.light",
                      color: "white",
                      borderRadius: "50%",
                      marginRight: 1,
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    sx={{
                      backgroundColor: "error.dark",
                      color: "white",
                      borderRadius: "50%",
                      marginRight: 1,
                    }}
                  />
                )}
                Expense Ratio
              </Typography>

              <Typography variant="body2" color="black" sx={{ margin: 1 }}>
                {mfDetails.expense_ratio < 1
                  ? "Less expense ratio implies better returns over the long term"
                  : "Hefty expense ratio implies reduced returns over the long term"}
              </Typography>
            </Box>

            <Box
              sx={{
                height: "40vh",
                width: "70vw",
                position: "absolute",
                right: "5vh",
                top: "1vh",
                margin: 2,
              }}
            >
              <Line data={data} options={options} />
            </Box>
            <Box
              sx={{
                boxSizing: "border-box",
                border: 1,
                borderColor: "primary.light",
                borderRadius: "5%",
                margin: 5,
                marginTop: 2,
                width: "20vw",
                height: "48vh",
                padding: 2,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                gap: 2,
              }}
            >
              <Typography variant="h5" marginTop="1rem">
                SIP Calculator
              </Typography>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, max: 50000 },
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

              <Typography variant="h5" color="success.dark">
                Wealth Gained :
                <Typography variant="h6" display="inline" color="success.main">
                  <CurrencyRupeeIcon />
                  {interest}
                </Typography>
              </Typography>
              <Typography variant="h5" color="success.dark">
                Invested Amount :
                <Typography variant="h6" display="inline" color="success.main">
                  <CurrencyRupeeIcon />
                  {principal}
                </Typography>
              </Typography>
              <Typography variant="h5" color="success.dark">
                Total Wealth :
                <Typography variant="h6" display="inline" color="success.main">
                  <CurrencyRupeeIcon />
                  {result}
                </Typography>
              </Typography>
            </Box>
            <Box
              sx={{
                position: "fixed",
                bottom: "1vh",
                height: "40vh",
                width: "70vw",
                right: 0,
              }}
            >
              <Box
                sx={{
                  position: "fixed",
                  bottom: "20vh",
                  height: "20vh",
                  width: "70vw",
                  right: 0,
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    border: 1,
                    borderRadius: 1,
                    width: "20%",
                    height: "7rem",
                    padding: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    color="primary.main"
                    display="flex"
                    alignItems="center"
                  >
                    Plan
                  </Typography>
                  <Typography variant="h6">{mfDetails.plan}</Typography>
                </Box>
                <Box
                  sx={{
                    border: 1,
                    borderRadius: 1,
                    width: "15rem",
                    height: "7rem",
                    padding: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    color="primary.main"
                    display="flex"
                    alignItems="center"
                  >
                    Sub Category
                  </Typography>
                  <Typography variant="h6">{mfDetails.sub_category}</Typography>
                </Box>

                <Box
                  sx={{
                    border: 1,
                    borderRadius: 1,
                    width: "15rem",
                    height: "7rem",
                    padding: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    color="primary.main"
                    display="flex"
                    alignItems="center"
                  >
                    <PointOfSaleIcon /> Assets Under Management
                  </Typography>
                  <Typography variant="h6">Rs. {mfDetails.aum} cr</Typography>
                </Box>
                <Box
                  sx={{
                    border: 1,
                    borderRadius: 1,
                    width: "15rem",
                    height: "7rem",
                    padding: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    color="primary.main"
                    display="flex"
                    alignItems="center"
                  >
                    <SpeedIcon /> Risk
                  </Typography>
                  <Typography variant="h6">{mfDetails.sebi_risk} </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  position: "fixed",
                  bottom: "1vh",
                  height: "20vh",
                  width: "70vw",
                  right: 0,
                }}
              >
                <Typography variant="h5">Key Metrics</Typography>
                <table width="50%">
                  <tbody>
                    <tr>
                      <td>
                        <h4>Growth Rate</h4>
                      </td>
                      <td>
                        <h4>Expense Ratio</h4>
                      </td>
                    </tr>
                    <tr>
                      <td>{mfDetails.cagr}%</td>
                      <td>{mfDetails.expense_ratio}%</td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default MutualFundPage;
