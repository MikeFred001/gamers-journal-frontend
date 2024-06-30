import { useState, useEffect, useContext } from 'react';
import userContext from './userContext';
import GamesList from './GamesList';
import LoginNotice from './LoginNotice';
import GJApi from './api';


/* Props:
 *   - addGame()
 *
 * State:
 *   - games [ { game }, { game } ... ]
 *     - game: { id, title, releaseDate, description, platforms, imageUrl }
 *
 * RoutesList -> (( Home )) -> [ GamesList, LoginNotice ]
 */
function Home({ addGame }) {
  const [games, setGames] = useState({ data: [], isLoading: true });
  const [showLoginNotice, setShowLoginNotice] = useState(false);

  useEffect(() => {
    async function fetchGamesOnMount() {
      try {
        const games = await GJApi.getFeaturedGames();
        setGames({data: games, isLoading: false});
      } catch (err) {
        console.error('Failed to fetch featured games:', err);
        setGames([]);
      }
    }
    fetchGamesOnMount();
  }, []);

  function displayLoginNotice() {
    console.log('Toggling login notice, current state: \n', showLoginNotice);
    setShowLoginNotice(true);
  }

  function closeLoginNotice() {
    console.log('Toggling login notice, current state: \n', showLoginNotice);
    setShowLoginNotice(false);
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