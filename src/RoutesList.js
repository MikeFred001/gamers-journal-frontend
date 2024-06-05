import { Routes, Route, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import userContext from "./userContext";

import LoginForm from "./Users/LoginForm.js";
import SignUpForm from "./Users/SignUpForm.js";
import ProfileForm from "./Users/ProfileForm.js";
import Home from "./Home.js";
import GamesApp from "./GamesApp.js";

// Temporary assignment of user for testing and development stage
const user = "Temporary User";

/** Handles routing
 *
 * Props:
 *  - login(): callback function for use in LoginForm
 *  - signUp(): callback function for use in SignUpForm
 *  - update(): callback function for use in ProfileForm
 *
 * State:
 *  - none
 *
 * App -> RoutesList -> { CompanyList, JobList, CompanyDetail, Home }  */
function RoutesList({ login, signUp }) {
  // const { user } = useContext(userContext);

  if (user !== undefined) {
    // user is logged in
    return (
      <Routes>
        <Route path="/api/games" element={ <GamesApp /> } />
        {/* <Route
          path="/profile"
          element={<ProfileForm update={ update } />} /> */}
          {/* <Route
          path="/login"
          element={<LoginForm login={ login } />} /> */}
          {/* <Route
          path="/register"
          element={<ProfileForm update={ update } />} /> */}
        <Route path="/" element={ <Home /> } />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
    );
  }

  // user is logged out
  return (
    <Routes>
      <Route
        path="/signup"
        element={<SignUpForm signUp={ signUp } /> } />
      <Route
        path="/login"
        element={<LoginForm login={ login } /> } />
      <Route path="/" element={ <Home />} />
      <Route path="*" element={ <Navigate to="/" /> } />
    </Routes>
  );
}

export default RoutesList;