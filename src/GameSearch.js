import { useState, useContext } from "react";
import SearchForm from "./SearchForm.js";
import GJApi from "./api.js";
import GamesList from "./GamesList.js";
import userContext from "./userContext.js";



/** App, renders SearchForm and GamesList
 *
 * Props:
 *  - None
 *
 * State:
 *  - games: { data, isLoading }
 *
 * App -> [[ GameSearch ]] -> { SearchForm, GamesList } */
function GameSearch() {
  const { user } = useContext(userContext);
  const [games, setGames] = useState({ data: [], isLoading: true });

  async function filterList(searchInput) {
    const games = await GJApi.searchGames(searchInput);
    setGames({ data: games, isLoading: false });
  }

  async function addGame(formData) {
    try {
      const newGame = await GJApi.wishlistGame(user.username, formData);
      console.log('New Game added to wishlist: \n', newGame);
    } catch(err) {
      console.error('ERROR in < GameSearch /> Failed to add game \n', err);
    }
  }

  return (
    <div className="GamesApp">
      < SearchForm filterList={filterList} />
      < GamesList games={games.data} editableDefault={true} addGame={addGame} />
    </div>
  );
}

export default GameSearch;