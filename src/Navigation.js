import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import userContext from './userContext';


/* PROPS
 *   - logout()
 *
 * STATE
 *   - none
 *
 * App -> (( Navigation )) -> [ NavLink, ... ]  */
function Navigation({ logout }) {
  const { user } = useContext(userContext);

  const activeStyle = {
    fontFamily: "Impact",
    color: "red",
  };

  if (user == undefined) {
    return (
      <div className="Navigation">
        <NavLink
          className="Navigation-link Navigation-home"
          to="/"
          style={({ isActive }) => isActive ? activeStyle : undefined }>
            Home
        </NavLink>

      <div className="Navigation-login">
        <NavLink
          className="Navigation-link Navigation-login"
          to="/login"
          style={({ isActive }) => isActive ? activeStyle : undefined }>
            Login
        </NavLink>

        <NavLink
          className="Navigation-link Navigation-signup"
          to="/register"
          style={({ isActive }) => isActive ? activeStyle : undefined }>
            Sign Up
        </NavLink>
      </div>
    </div>
    )
  }

  return (
    <div className="Navigation">
      <NavLink
        className="Navigation-link Navigation-home"
        to="/"
        style={({ isActive }) => isActive ? activeStyle : undefined }>
          Home
      </NavLink>

      <div className="Navigation-right">
        <NavLink
          className="Navigation-link"
          to="/api/games"
          style={({ isActive }) => isActive ? activeStyle : undefined }>
            Game Search
        </NavLink>

        <NavLink
          className="Navigation-link"
          to={`/games/${user.username}`}
          style={({ isActive }) => isActive ? activeStyle : undefined }>
            Wishlist
        </NavLink>

        <NavLink
          className="Navigation-link Navigation-profile"
          to="/profile"
          style={({ isActive }) => isActive ? activeStyle : undefined }>
            Profile
        </NavLink>

        <Link
          className="Navigation-link Navigation-logout"
          to="/"
          onClick={logout}>
            Logout
        </Link>
        {user ? <div className="Navigation-username">{user.username}</div> : null}
      </div>
    </div>
  );
}

export default Navigation;