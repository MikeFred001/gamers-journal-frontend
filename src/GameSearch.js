import { useState } from "react";
import SearchForm from "./SearchForm.js";
import GamesList from "./GamesList.js";
import GJApi from "./api.js";


/* Props:
 *  - addGame()
 *
 * State:
 *  - games: { data[], isLoading }
 *    - game is : { id, title, releaseDate, description, platforms, imageUrl }
 *
 * RoutesList -> (( GameSearch )) -> [ SearchForm, GamesList ] */
function GameSearch({ addGame }) {
  const [games, setGames] = useState({ data: [], isLoading: true });

  async function searchGames(searchInput) {
    const games = await GJApi.searchGames(searchInput);
    setGames({ data: games, isLoading: false });
  }

  return (
    <div className="GameSearch">
      < SearchForm searchGames={searchGames} />
      < GamesList games={games.data} addGame={addGame} />
    </div>
  );
}

export default GameSearch;