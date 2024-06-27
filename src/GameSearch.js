import { useState, useContext } from "react";
import userContext from "./userContext.js";
import SearchForm from "./SearchForm.js";
import GamesList from "./GamesList.js";
import GJApi from "./api.js";



/** App, renders SearchForm and GamesList
 *
 * Props:
 *  - None
 *
 * State:
 *  - games: { data, isLoading }
 *    - game is : { id, name, releaseDate, description, platforms, imageUrl }
 *
 * RoutesList -> [[ GameSearch ]] -> { SearchForm, GamesList } */
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