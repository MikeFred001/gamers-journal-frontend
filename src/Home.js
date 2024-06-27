import { useState, useEffect, useContext } from 'react';
import userContext from './userContext';
import GamesList from './GamesList';
import LoginNotice from './LoginNotice';
import GJApi from './api';


/* Props:
 *   - addGame()
 *
 * State:
 *   - games [ { game }, ... ]
 *     - game is : { id, name, releaseDate, description, platforms, imageUrl }
 *
 * RoutesList -> [[ Home ]] -> GamesList
 */
function Home({ addGame }) {
  const { user } = useContext(userContext);
  const [games, setGames] = useState({ data: [], isLoading: true });
  const [showLoginNotice, setShowLoginNotice] = useState(false);

  console.log('Component - Home, Var - user >>> \n', user);

  useEffect(() => {
    async function fetchGamesOnMount() {
      try {
        const games = await GJApi.getFeaturedGames();
        console.log('useEffect in Home Component results: \n', games);
        setGames({data: games, isLoading: false});
      } catch (err) {
        console.error('Failed to fetch featured games:', err);
        setGames([]);
      }
    }
    fetchGamesOnMount();
    console.log(
      'useEffect in Home \n games State \n', games,
      '\n User:', user ? user.username : 'No User Logged In'
    );
  }, []);

  function closeLoginNotice() {
    console.log('Toggling login notice, current state: \n', showLoginNotice);
    setShowLoginNotice(false);
  }

  function displayLoginNotice() {
    console.log('Toggling login notice, current state: \n', showLoginNotice);
    setShowLoginNotice(true);
  }

  return (
    <div className='Home'>
      < GamesList
        games={games.data}
        addGame={addGame}
        displayLoginNotice={displayLoginNotice} />

        {showLoginNotice
          ? < LoginNotice closeLoginNotice={closeLoginNotice} />
          : null}
    </div>
  );
}

export default Home;