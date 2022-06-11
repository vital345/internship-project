import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
const Terminologies = () => {
  return (
    <Card
      sx={{
        boxSizing: "border-box",
        display: "flex",
        width: "40vw",
        height: "84vh",
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
        <CardContent sx={{ height: "10%", boxSizing: "border-box" }}>
          <Typography component="div" variant="h4">
            Basic Terminology
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            height: "90%",
            alignItems: "center",
            gap: 2,
            padding: 2,
            paddingTop: 0,
            flexWrap: "wrap",
            overflow: "auto",
          }}
        >
          <div>
            <Typography variant="h6">NET ASSET VALUE(NAV):</Typography>
            <Typography variant="body1" color="text.secondary">
              The net asset value (NAV) represents the net value of an entity
              and is calculated as the total value of the entity’s assets minus
              the total value of its liabilities.
            </Typography>
          </div>
          <div>
            <Typography variant="h6">PORTFOLIO:</Typography>
            <Typography variant="body1" color="text.secondary">
              Portfolio the collection of assets owned by the mutual fund or
              even you as an individual. It includes all the financial
              instruments invested in like stocks, bonds, and other securities.
            </Typography>
          </div>
          <div>
            <Typography variant="h6">EXPENSE RATIO:</Typography>
            <Typography variant="body1" color="text.secondary">
              An expense ratio measures how much of a fund's assets are used for
              administrative and other operating expenses.
            </Typography>
          </div>
          <div>
            <Typography variant="h6">SHARPE RATIO:</Typography>
            <Typography variant="body1" color="text.secondary">
              Measure of risk adjusted performance of the fund, calculated as
              returns divided by standard deviation of returns
            </Typography>
          </div>
          <div>
            <Typography variant="h6">SORTINO RATIO:</Typography>
            <Typography variant="body1" color="text.secondary">
              Measure of risk adjusted performance of the fund, calculated as
              returns divided by downside deviation of returns
            </Typography>
          </div>
          <div>
            <Typography variant="h6"> DIVERSIFICATION:</Typography>
            <Typography variant="body1" color="text.secondary">
              Diversification is one of the key benefits as
              well as characteristic of a mutual fund. It is the practice of
              investing in different types of securities or asset classes. This
              is done to reduce risk.
            </Typography>
          </div>
          <div>
            <Typography variant="h6">RISK/RETURN TRADEOFF:</Typography>
            <Typography variant="body1" color="text.secondary">
              This is the total amount of profits an investor makes keeping in
              mind the dividends, capital gains from selling units, distribution
              of fund income as well as returns earned on reinvestments.
            </Typography>
          </div>
        </Box>
      </Box>
    </Card>
  );
};

export default Terminologies;
