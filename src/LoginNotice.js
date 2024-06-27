import { Link } from "react-router-dom";

/** LoginNotice
 *
 * Props:
 *  - closeLoginNotice()
 *
 * State:
 *  - None
 *
 * RoutesList -> Home -> [[ LoginNotice ]] */
function LoginNotice({ closeLoginNotice }) {

  const styling = {
    backgroundColor: 'white',
    boxShadow: '4px 4px 10px gray',
    padding: '20px',
    borderRadius: '10px',
  }

  const noticeWrapperStyling = {
    position: 'fixed',
    top: 0,
    left: 0,

    backdropFilter: 'blur(10px)',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div className="LoginNotice" style={noticeWrapperStyling}>
      <div className='LoginNotice-alert' style={styling}>
        <p>Log in or register to start saving games to your personal wishlist!</p>

        <Link className="LoginNotice-Login-btn" to="/login">
          Log In
        </Link>

        <Link className="LoginNotice-register-btn" to="/register">
          Register
        </Link>

        <button onClick={closeLoginNotice}>No Thanks!</button>
      </div>
    </div>
  );
}

export default LoginNotice;