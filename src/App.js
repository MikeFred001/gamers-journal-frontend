import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import userContext from './userContext';
import useLocalStorage from './hooks/useLocalStorage';
import Navigation from './Navigation';
import RoutesList from './RoutesList';
import GJApi from './api';

const TOKEN_STORAGE_ID = 'GJ-Token';

/* PROPS
 *  - None
 *
 * STATE
 *  - user: { data, infoLoaded }
 *  - token: string
 *
 * root -> (( App )) -> [ Navigation, RoutesList ]  */
function App() {
  const [user, setUser] = useState({ data: null, infoLoaded: false });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug('APP COMPONENT \n Current User:', user, '\nTOKEN:', Boolean(token));

  useEffect(function loadUserInfo() {
    console.debug('App useEffect loadUserInfo \n', Boolean(token));

    async function getCurrentUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          GJApi.token = token;
          const currentUser = await GJApi.getUser(username);
          setUser({ infoLoaded: true, data: currentUser });
        } catch (err) {
          console.error(`App loadUserInfo: problem loading ${err}`);
          setUser({ data: null, infoLoaded: true });
        }
      } else {
        setUser({ data: null, infoLoaded: true });
      }
    }
    getCurrentUser();
  }, [token]);

  async function signup(formData) {
    const token = await GJApi.register(formData);
    setToken(token);
  }

  async function login(formData) {
    const token = await GJApi.login(formData);
    setToken(token);
  }

  function logout() {
    GJApi.token = undefined;
    setUser({ data: null, infoLoaded: true });
    setToken(null);
    localStorage.removeItem('userToken');
  }

  async function addGame(username, formData) {
    const newGame = await GJApi.wishlistGame(username, formData);
    if (!newGame) throw new Error('Failed to add game to wishlist.');
    console.log('New Game added to wishlist: \n', newGame);
  }


  // TODO: Implement along with profile-edit functionality.
  // async function updateProfile(formData) {
  //   const response = await GJApi.editProfile(formData);
  //   const updatedUserData = response.user;
  //   setUser(updatedUserData);
  // }

  if (!user.infoLoaded) return <div>Loading...</div>;

  return (
    < userContext.Provider value={{ user: user.data, setUser }} >
      < BrowserRouter >
        <div className="App">
          < Navigation logout={logout} />
          < RoutesList
            user={user.data}
            login={login}
            signup={signup}
            addGame={addGame} />
        </div>
      </ BrowserRouter >
    </ userContext.Provider >
  );
}

export default App;