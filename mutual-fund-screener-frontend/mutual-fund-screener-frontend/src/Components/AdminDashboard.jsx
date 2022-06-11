import React, { useEffect, useState, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Typography, Box, IconButton } from "@mui/material";
import { AuthContext } from "./ContextApi/AuthProvider";
import AppBar from "@mui/material/AppBar";
import Navbar from "./UserComponents/DashBoardComponents/Navbar";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Title, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Title, Legend);

const DeleteUser = (p) => {
  const { deleteUser, user } = useContext(AuthContext);
  const flag = p.data.id === user.returnUserDetails.id;
  const click = async () => {
    deleteUser(p.data.id);
  };

  return (
    <>
      {flag ? (
        <IconButton disabled>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      ) : (
        <IconButton onClick={click}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      )}
    </>
  );
};
const AdminDashboard = () => {
  const { getAllUsers, userList } = useContext(AuthContext);
  const [label, setLabel] = useState([]);
  const [countArray, setCountArray] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const data = {
    labels: label,
    datasets: [
      {
        label: label,
        data: countArray,
        backgroundColor: colorArray,
        hoverOffset: 5,
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Users Registraton Map",
        position: "bottom",
      },
    },
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 10,
      },
    },
  };

  const columnDefs = [
    {
      headerName: "Id",
      field: "id",
      sortable: true,
      width: 100,
    },
    {
      headerName: "Username",
      field: "username",
      width: 180,
    },
    {
      headerName: "Email Id",
      field: "email",
      width: 280,
    },
    {
      headerName: "Registered On",
      field: "createdAt",
      sortable: true,
      width: 280,
    },

    { width: 80, cellRenderer: DeleteUser },
  ];
  function random(number) {
    return Math.floor(Math.random() * number);
  }
  function randomColor() {
    return "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
  }
  useEffect(() => {
    fetchAndSetUser();
    const labels = [...new Set(userList?.map((item) => item.createdAt))];
    setLabel(labels);
  }, [userList]);
  useEffect(() => {
    let countArray = [];
    let colorArray = [];
    for (let i = 0; i < label.length; i++) {
      countArray.push(
        userList.filter((obj) => obj.createdAt === label[i]).length
      );

      colorArray.push(randomColor());
    }
    if(countArray.length!=0)setIsDataLoading(false)
    setColorArray(colorArray);
    setCountArray(countArray);
  }, [label]);
  // console.log(isAdmin);
  async function fetchAndSetUser() {
    getAllUsers();
  }
  const divstyle = { boxSizing: "border-box", height: "100%", width: "100%" };
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
          <AppBar position="fixed">
            <Navbar />
          </AppBar>
          <Box
            sx={{
              height: ["40vh", "40vh", "90vh", "90vh", "90vh"],
              width: ["100vw", "100vw", "50vw", "50vw", "50vw"],
              position: "fixed",
              top: ["8vh", "8vh", "6vh", "6vh", "6vh"],
              margin: [2, 2, 2, 2, 2],
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="h3" color="primary.light">
              Registered Users
            </Typography>
            <Box
              sx={{
                overflow: "auto",
                boxSizing: "border-box",
                borderColor: "primary.light",
                border: 1,
                height: ["80vh"],
                width: "100%",
              }}
            >
              <div style={divstyle}>
                <div style={divstyle}>
                  <div style={divstyle} className="ag-theme-alpine">
                    <AgGridReact
                      rowData={userList}
                      columnDefs={columnDefs}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
          <Box
            sx={{
              height: ["40vh", "40vh", "70vh", "70vh", "70vh"],
              width: ["30vw", "30vw", "30vw", "30vw", "30vw"],
              position: "fixed",
              top: ["50vh", "50vh", "20vh", "20vh", "20vh"],
              right: ["10vw"],
              margin: [2, 2, 2, 2, 2],
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Pie data={data} options={options}></Pie>
          </Box>
        </>
      )}
    </>
  );
};

export default AdminDashboard;
