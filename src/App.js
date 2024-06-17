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

/** App, renders GamesApp
 *
 * Props:
 *  - None
 *
 * State:
 *  - None
 *
 * root -> App -> { Navigation, RoutesList }  */
function App() {
  const [user, setUser] = useState({ data: null, infoLoaded: false });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(`APP COMPONENT \n Current User: ${user} \n token: ${token}`);

  useEffect(function loadUserInfo() {
    console.debug(`App useEffect loadUserInfo. Token: ${token}`);

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
          < RoutesList login={login} signup={signup} />
        </div>
      </ BrowserRouter >
    </ userContext.Provider >
  );
}

export default App;



// function App() {
//   const [user, setUser] = useState({ data: null, infoLoaded: false });
//   const [stateInitialized, setStateInitialized] = useState(false);

//   useEffect(function fetchTokenAndUpdateUserState() {
//     if (localStorage.getItem('userToken') !== null) {
//       const userToken = localStorage.getItem('userToken');
//       GJApi.token = userToken;

//       const username = jwtDecode(userToken).username;

//       fetchUser(username);
//       console.log(`Username from token: ${username}`);
//     } else {
//       setStateInitialized(true);
//     }

//     async function fetchUser(username) {
//       try {
//         const userRes = await GJApi.getUser(username);
//         console.log('User received from API in fetchUser()');
//         setUser(userRes);
//         setStateInitialized(true);
//       } catch (err) {
//         console.log('Caught error attempting to get user with localStorage token.');
//         setStateInitialized(true);

//         // Clear token if the error is a 401
//         if (err.response && err.response.status === 401) {
//           console.log('Error 401: Unauthorized. Clearing token.');
//           localStorage.removeItem('userToken');
//         } else {
//           console.log(`Error: ${err.message}`);
//         }
//       }
//     }
//   }, []);

//   async function login(formData) {
//     await GJApi.login(formData);
//     const userRes = await GJApi.getUser(formData.username);
//     localStorage.setItem('userToken', GJApi.token);
//     setUser(userRes);
//   }

//   function logout() {
//     GJApi.token = undefined;
//     localStorage.removeItem('userToken');
//     setUser(undefined);
//   }

//   async function signup(formData) {
//     console.log({formData});

//     await GJApi.register(formData);
//     const userRes = await GJApi.getUser(formData.username);
//     localStorage.setItem('userToken', GJApi.token);
//     setUser(userRes);
//   }

//   // TODO: Implement along with profile-edit functionality.
//   // async function updateProfile(formData) {
//   //   const response = await GJApi.editProfile(formData);
//   //   const updatedUserData = response.user;
//   //   setUser(updatedUserData);
//   // }

//   if (stateInitialized === false) return <div>Loading...</div>;

//   return (
//     < userContext.Provider value={{ user: user }} >
//       < BrowserRouter >
//         <div className="App">
//           < Navigation logout={logout} />
//           < RoutesList login={login} signup={signup} />
//         </div>
//       </ BrowserRouter >
//     </ userContext.Provider >
//   );
// }

// export default App;