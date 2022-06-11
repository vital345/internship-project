import { AuthContext } from "./Components/ContextApi/AuthProvider";
import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Calculator from "./Components/Calculator";
import Login from "./Components/LoginComponents/Login";
import Signup from "./Components/LoginComponents/Signup";
import MutualFundPage from "./Components/UserComponents/MutualFundPage";
import UserDashboard from "./Components/UserComponents/UserDashboard";
import UserProfile from "./Components/UserComponents/UserProfile";
import AdminDashboard from "./Components/AdminDashboard";
import ForgetPassword from "./Components/LoginComponents/ForgotPassword";
import ResetPassword from "./Components/LoginComponents/ResetPassword";
import ConfirmEmail from "./Components/LoginComponents/ConfirmEmail";
import InformationPage from './Components/InformationPage'
let App = () => {
  const { user, isAdmin } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        {user ? (
          <>
            <Route path="/" component={UserDashboard} exact></Route>
            <Route path="/calculator" component={Calculator}></Route>
            <Route path="/userprofile" component={UserProfile} exact></Route>
            <Route
              path="/mutualfunds/:id"
              component={MutualFundPage}
              exact
            ></Route>
            {isAdmin ? (
              <Route path="/admin" exact>
                <AdminDashboard />
              </Route>
            ) : (
              <Route path="/admin" exact>
                <Redirect to="/"></Redirect>{" "}
              </Route>
            )}
            <Route path="/login" exact>
              {" "}
              <Redirect to="/"></Redirect>{" "}
            </Route>
            <Route path="/about" component={InformationPage} exact></Route>
          </>
        ) : (
          <>
            <Route path="/" component={UserDashboard} exact></Route>
            <Route path="/about" component={InformationPage} exact></Route>
            <Route path="/calculator" component={Calculator}></Route>
            <Route path="/login" component={Login} exact></Route>
            <Route
              path="/forgot-password"
              component={ForgetPassword}
              exact
            ></Route>
            <Route path="/signup" component={Signup} exact></Route>
            <Route
              path="/reset-password/:username"
              component={ResetPassword}
            ></Route>
            <Route
              path="/confirm-email/:username"
              component={ConfirmEmail}
            ></Route>
            <Route path="/mutualfunds/:id" exact>
              <Redirect to="/"></Redirect>{" "}
            </Route>
            <Route path="/admin" exact>
              <Redirect to="/"></Redirect>{" "}
            </Route>
            <Route path="/userprofile" exact>
              <Redirect to="/"></Redirect>{" "}
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
