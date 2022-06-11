import React, { useEffect, useMemo, useState, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Link } from "react-router-dom";
import { Typography, Box, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { AuthContext } from "../ContextApi/AuthProvider";
import AppBar from "@mui/material/AppBar";
import Navbar from "./DashBoardComponents/Navbar";
const MutualFundComponent = (p) => {
  let { user } = useContext(AuthContext);
  let path = `/mutualfunds/${p.data.id}`;
  if (!user) path = "/login";

  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={{
        pathname: path,
      }}
    >
      {p.value}
    </Link>
  );
};
const DeleteMutualFund = (p) => {
  let {removeMFFromWishList } = useContext(AuthContext);

  const click = async() => {
    // console.log(p.data);
    await removeMFFromWishList(p.data.id);
  };
  return (
    <IconButton onClick={click}>
      <DeleteOutlineOutlinedIcon />
    </IconButton>
  );
};
const UserProfile = () => {
  let { user } = useContext(AuthContext);
  const [rowData, setRowData] = useState();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const columnDefs=[
    {
      headerName: "Fund Id",
      field: "id",
      filter: "agTextColumnFilter",
      floatingFilter: true,
      cellRenderer: MutualFundComponent,
      width: 120,
    },
    {
      headerName: "Mutual Fund",
      field: "name",
      filter: "agTextColumnFilter",
      floatingFilter: true,
      cellRenderer: MutualFundComponent,resizable: true,
      width: 260,
    },
    { headerName: "Plan", field: "plan", width: 140 },
    { headerName: "Sub Category", field: "sub_category",resizable: true, width: 240 },
    {
      headerName: "Assets Under Management(Cr)",
      field: "aum",
      width: 250,
      valueFormatter: (params) => params.data.aum.toFixed(2),
    },
    {
      headerName: "Growth Rate",
      field: "cagr",
      valueFormatter: (params) => params.data.cagr.toFixed(2), width: 180
    },
    {
      headerName: "Expense Ratio",
      field: "expense_ratio",
      valueFormatter: (params) => params.data.expense_ratio?.toFixed(2),width: 180
    },
    { headerName: "Risk", field: "sebi_risk", width: 170 },

    { width: 140, cellRenderer: DeleteMutualFund },
  ];
  const defaultColDef = useMemo(() => {
    return {
      // set the default column width
      width: 170,
      sortable: true,
      
    };
  }, []);
  
  useEffect(() => {
    let list = [];
    if (user){
      let name1= user?.returnUserDetails?.userName.substring(0,1).toUpperCase()+user?.returnUserDetails?.userName.substring(1).toLowerCase();
      setName(name1);
      setEmail(user?.returnUserDetails?.email.toLowerCase());
      for (var j = 0; j < user?.returnUserDetails?.wishList?.length; j++) {
        list.push(user.returnUserDetails.wishList[j]);
      }
      // console.log(list);
      setRowData(list);
    }
  }, [user]);
  const divstyle = { boxSizing: "border-box", height: "100%", width: "100%" };
  return (
    
    <> 
    <AppBar position="fixed">
        <Navbar />
      </AppBar>
      <Box sx={{
          display:"flex",
          position:"fixed",
          top:"10vh",
          margin: [2, 2, 10, 10, 10],
          marginTop:[0, 0, 0, 0, 0],
          gap:10,
          alignItems:'center'

      }}>
        <Avatar
          alt={name}
          src={name}
          sx={{ width: 100, height: 100 }}
        />
        <Box>

        <Typography variant="h4" color="primary.main">{name}</Typography>
        <Typography variant="h4" color="primary.main">{email}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: ["50vh"],
          width: ["90vw", "90vw", "85vw", "85vw", "85vw"],
          position: "fixed",
          top: "25vh",
          margin: [2, 2, 10, 10, 10],
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h4" color="primary.light">
          WatchList
        </Typography>
        <Box
          sx={{
            boxSizing: "border-box",
            borderColor: "primary.light",
            border: 1,
            height: ["40vh"],
            width: ["95vw", "95vw", "90vw", "90vw", "90vw"],
          }}
        >
          <div style={divstyle}>
            <div style={divstyle}>
              <div style={divstyle} className="ag-theme-alpine">
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  // paginationAutoPageSize={true}
                  // pagination={true}
                ></AgGridReact>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
