import { useState, useEffect, useContext } from "react";
import userContext from "./userContext";
import GJApi from "./api";

import SavedGame from "./SavedGame";
import GamesList from "./GamesList";


/* Props:
 *   - None
 *
 * State:
 *   - savedGames [ { game }, ... ]
 *
 * RoutesList -> GamesWishlist -> SavedGame
 */
function GamesWishlist() {
  const user = useContext(userContext);
  console.log(`USER CONTEXT WITHIN GAMESWISHLIST COMPONENT:\n${{ user }}`);
  const [savedGames, setSavedGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const games = await GJApi.getWishlistedGames(user.username);
      console.log({ games });
      setSavedGames(games);
    }
    console.log({ savedGames });
    fetchGames();
  }, []);


  return (
    <div className="GamesWishlist">
      < GamesList games={ savedGames } />
    </div>
  );
}

export default GamesWishlist;