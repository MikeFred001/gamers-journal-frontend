import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home.js";
import GameSearch from "./GameSearch.js";
import GamesWishlist from "./GamesWishlist.js";
import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";
// import ProfileForm from "./ProfileForm.js"; TODO: Implement and uncomment


/* Props:
 *  - user: { username, firstName, lastName, email, isAdmin }
 *  - login()
 *  - signup()
 *  - addGame()
 *
 * State:
 *  - none
 *
 * App ->
 * (( RoutesList )) ->
 * [ Home, GameSearch, GamesWishlist, SignupForm, LoginForm ]  */
function RoutesList({ user, signup, login, addGame }) {
  if (user) {
    return (
      <Routes>
        <Route path="/api/games"       element={< GameSearch addGame={addGame} />} />
        <Route path="/games/:username" element={< GamesWishlist />} />
        <Route path="/"                element={< Home addGame={addGame}/>} />
        <Route path="*"                element={< Navigate to="/" />} />
        {/* <Route path="/profile"   element={< ProfileForm />} /> */}
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/register" element={< SignupForm signup={signup}/>} />
      <Route path="/login"    element={< LoginForm login={login} />} />
      <Route path="/"         element={< Home addGame={addGame} />} />
      <Route path="*"         element={< Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;