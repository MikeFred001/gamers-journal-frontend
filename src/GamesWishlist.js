import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GJApi from './api';
import GamesList from './GamesList';


/* Props:
 *   - None
 *
 * State:
 *   - savedGames [ { game }, ... ]
 *     - game is : { id, name, releaseDate, description, platforms, imageUrl }
 *
 * RoutesList -> [[ GamesWishlist ]] -> GamesList
 */
function GamesWishlist() {
  const { username } = useParams();
  const [savedGames, setSavedGames] = useState([]);

  useEffect(() => {
    async function fetchGamesOnMount() {
      try {
        const games = await GJApi.getWishlistedGames(username);
        console.log('useEffect in GamesWishlist Component results: \n', games);
        setSavedGames(games);
      } catch (err) {
        console.error("Failed to fetch wishlisted games:", err);
        setSavedGames([]);
      }
    }
    fetchGamesOnMount();
    console.log(
      'useEffect in GamesWishList \n savedGames State \n', savedGames,
      '\n Params Username:', username
    );
  }, [username]);

  async function deleteGame(id) {
    try {
      await GJApi.removeGame(id);
      setSavedGames(savedGames.filter(g => g.id !== id));
    } catch(err) {
      console.error('ERROR: Failed to remove game', err);
    }
  }

  async function editGame(id, gameData) {
    try {
      const updatedGame = await GJApi.updateGame(id, gameData);
      setSavedGames(savedGames.map(g => g.id === id ? updatedGame : g));
    } catch(err) {
      console.error('ERROR in < GamesWishlist /> Failed to update game \n', err);
    }
  }

  return (
    <div className="GamesWishlist">
      < GamesList
        games={savedGames}
        editableDefault={false}
        deleteGame={deleteGame}
        editGame={editGame} />
    </div>
  );
}

export default GamesWishlist;