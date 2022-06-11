import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
const MF = () => {
  const theme = useTheme();

  return (
    <>
      <Card
        sx={{
          boxSizing: "border-box",
          display: "flex",
          width: "45vw",
          height: "40vh",
          border: 2,
          borderColor: "primary.light",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "52vw",
            height: "100%",
            justifyContent: "space-around",
            backgroundColor: "#E2E0DF",
          }}
        >
          <CardContent sx={{ height: "15%", boxSizing: "border-box" }}>
            <Typography component="div" variant="h4">
              What Is Mutual Fund?
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              height: "85%",
              alignItems: "center",
              gap: 1,
              padding: 2,
              flexWrap: "wrap",
              overflow: "auto",
            }}
          >
            <Typography variant="subtitle1" color="text.secondary">
              A mutual fund is a type of financial vehicle made up of a pool of
              money collected from many investors to invest in securities like
              stocks, bonds, money market instruments, and other assets. Mutual
              funds are operated by professional money managers, who allocate
              the fund's assets and attempt to produce capital gains or income
              for the fund's investors. A mutual fund's portfolio is structured
              and maintained to match the investment objectives stated in its
              prospectus.<br></br>
              Mutual funds give small or individual investors access to
              professionally managed portfolios of equities, bonds, and other
              securities. Each shareholder, therefore, participates
              proportionally in the gains or losses of the fund. Mutual funds
              invest in a vast number of securities, and performance is usually
              tracked as the change in the total market cap of the fund—derived
              by the aggregating performance of the underlying investments.
            </Typography>
          </Box>
        </Box>
      </Card>

    </>
  );
};

export default MF;
