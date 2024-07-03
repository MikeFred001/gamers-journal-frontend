import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SavedGamesList from './SavedGamesList';
import GJApi from './api';


/* PROPS
 *   - None
 *
 * STATE
 *   - games [ { game }, { game } ... ]
 *     - game: { id, title, releaseDate, description, platforms, imageUrl }
 *
 * RoutesList -> (( GamesWishlist )) -> SavedGamesList */
function GamesWishlist() {
  const { username } = useParams();
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGamesOnMount() {
      try {
        const games = await GJApi.getWishlistedGames(username);
        setGames(games);
      } catch (err) {
        console.error("Failed to fetch wishlisted games:", err);
        setGames([]);
      }
    }
    fetchGamesOnMount();
  }, [username]);

  async function removeGame(id) {
    try {
      await GJApi.removeGame(id);
      setGames(games.filter(g => g.id !== id));
    } catch(err) {
      console.error('ERROR: Failed to remove game', err);
    }
  }

  return (
    <div className="GamesWishlist">
      < SavedGamesList games={games} removeGame={removeGame} />
    </div>
  );
}

export default GamesWishlist;