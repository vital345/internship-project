import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Avatar from "@mui/material/Avatar";
import img0 from "./images/0.svg";
import img1 from "./images/1.svg";
import img2 from "./images/2.svg";
import img3 from "./images/3.svg";
import img4 from "./images/4.svg";
import img5 from "./images/5.svg";
const Carousel = () => {
  const [startPoint, setStartPoint] = useState(0);
  const headers = [
    "Professionally Managed",
    "Liquidity",
    "Returns",
    "Affordability",
    "Diversification",
    "Well Regulated",
  ];
  const information = [
    "One of the key benefits of mutual fund investing is that your money is managed by professional money managers who have years of investing experience.",
    "It is the ease of buying and selling an investment. Mutual Funds offer superior liquidity compared to some of the other instruments as you can buy and sell them anytime you want.",
    "The performance of mutual funds is measured in terms of the returns it delivers. Mutual funds have historically delivered returns better than every other investment option like Bank FDs.",
    "You can start your investments in mutual funds with as low as ₹500. Therefore, you don't need large sums to start investing.",
    "As mutual funds invest in a basket of stocks, bonds, etc., you can own a diversified portfolio even with a small investment amount, this helps reduce risk as well.",
    "Mutual funds are regulated by the SEBI. The tight regulations ensure that the mutual funds follow transparent processes and that investors' interests are protected.",
  ];
  const iconImg = [img0, img1, img2, img3, img4, img5];
  const theme = useTheme();
  useEffect(() => {}, [startPoint]);
  return (
    <Card
      sx={{
        boxSizing: "border-box",
        display: "flex",
        width: "45vw",
        height: "40vh",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#E2E0DF",
        border: 2,
        borderColor: "primary.light",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "10vw" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Advantages Of MutualFunds
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton
            onClick={() => {
              console.log("clickd");
              if (startPoint === 0) {
                setStartPoint(5);
              } else {
                setStartPoint(startPoint - 1);
              }
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              console.log("clickd");
              if (startPoint === 5) {
                setStartPoint(0);
              } else {
                setStartPoint(startPoint + 1);
              }
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "16vw",
          boxSizing: "border-box",
          padding: 2,
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            border: 1,
            boxSizing: "border-box",
            borderRadius: 2,
            backgroundColor: "#424E4A",
            display:'flex',
            flexDirection:"column",
            gap:2
          }}
        >
          <Avatar
            sx={{ backgroundColor: "white", height: 66, width: 66 }}
            // variant="square"
            alt={headers[startPoint ]}
            src={iconImg[startPoint ]}
          />
          <Typography variant="h5" color="white">{headers[startPoint]}</Typography>
          <Typography variant="subtitle1"color="white">
            {information[startPoint]}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "16vw",
          boxSizing: "border-box",
          padding: 2,
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            border: 1,
            boxSizing: "border-box",
            borderRadius: 2,
            backgroundColor: "#424E4A",
            display:'flex',
            flexDirection:"column",
            gap:2
          }}
        >
          <Avatar
            sx={{ backgroundColor: "white", height: 66, width:66 }}
            // variant="square"
            alt={headers[(startPoint + 1) % 6]}
            src={iconImg[(startPoint + 1) % 6]}
          />
          <Typography variant="h5" color="white">{headers[(startPoint + 1) % 6]}</Typography>
          <Typography variant="subtitle1"color="white">
            {information[(startPoint + 1) % 6]}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
export default Carousel;
