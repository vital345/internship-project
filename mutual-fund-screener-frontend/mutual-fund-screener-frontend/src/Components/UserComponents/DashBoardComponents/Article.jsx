import React, { useState,  } from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import GridTable from "./GridTable";
import Navbar from "./Navbar";
import { Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PlanFilter from "./Filters/PlanFilter";
import SubCategoryFilter from "./Filters/SubCategoryFilter";
import RiskFilter from "./Filters/RiskFilter";

const Filters = () => {
  const [plan, setPlan] = useState("All");
  const [risk, setRisk] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  const [isSCFilterVisible, setIsSCFilterVisible] = useState(false);
  const [isPlanFilterVisible, setIsPlanFilterVisible] = useState(false);
  const [isRiskFilterVisible, setIsRiskFilterVisible] = useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Navbar />
      </AppBar>

      <Box
        variant="permanent"
        sx={{
          overflow: "hidden",
          boxSizing: "border-box",
          borderColor: "primary.main",
          border: 1,
          height: ["90vh"],
          width: [0, 0, "18vw", "18vw", "18vw"],
          position: "fixed",
          left: ["0vh"],
          top: ["7vh"],
          margin: ["1vh"],
        }}
      >
        <Typography margin="1vh" variant="h5" color={"primary.main"}>
          {" "}
          FILTERS <FilterAltIcon />
        </Typography>
        <Box
          sx={{
            overflow: "auto",
            
            height: ["100%"],
            display: "flex",
            flexDirection: "column",
            margin:"1vh 0 3vh 1vh"
          }}
        >
          <Box sx={{padding:1}}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="primary.main">
                Plans
              </Typography>
              <IconButton
                onClick={() => {
                  setIsPlanFilterVisible(!isPlanFilterVisible);
                }}
              >
                {isPlanFilterVisible ? <CloseIcon /> : <AddIcon />}
              </IconButton>
            </Box>
            {isPlanFilterVisible ? (
              <PlanFilter plan={plan} setPlan={setPlan} />
            ) : (
              ""
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="primary.main">
                Sub Category
              </Typography>
              <IconButton
                onClick={() => {
                  setIsSCFilterVisible(!isSCFilterVisible);
                }}
              >
                {isSCFilterVisible ? <CloseIcon /> : <AddIcon />}
              </IconButton>
            </Box>
            {isSCFilterVisible ? (
              <SubCategoryFilter
                subCategory={subCategory}
                setSubCategory={setSubCategory}
              />
            ) : (
              ""
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="primary.main">
                Risk
              </Typography>
              <IconButton
                onClick={() => {
                  setIsRiskFilterVisible(!isRiskFilterVisible);
                }}
              >
                {isRiskFilterVisible ? <CloseIcon /> : <AddIcon />}
              </IconButton>
            </Box>
            {isRiskFilterVisible ? (
              <RiskFilter risk={risk} setRisk={setRisk} />
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>

      <GridTable plan={plan} subCategory={subCategory} risk={risk}></GridTable>
    </Box>
  );
};
export default Filters;
