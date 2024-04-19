import { useState, useEffect } from "react";
import SearchForm from "./SearchForm.js";
import GiantBombApi from "./GiantBombApi.js";

import GamesList from "./GamesList.js";



/** App, renders SearchForm and GamesList
 *
 * Props:
 *  - None
 *
 * State:
 *  - games: { data, isLoading }
 *
 * App -> GamesApp -> { SearchForm, GamesList }  */
function GamesApp() {
  const [games, setGames] = useState({ data: [], isLoading: true });

  console.log("GAMES APP RENDERED");
  console.log("GAMES STATE", games);

  async function filterList(searchInput) {
    console.log("SEARCH TERM", searchInput);
    const games = await GiantBombApi.searchGames(searchInput);

    setGames({ data: games, isLoading: false });
  }

  // useEffect(function fetchGamesWhenMounted() {
  //   console.log("GAMES EFFECT");

  //   async function fetchGames() {
  //     try {
  //       const resp = await axios.get(GAMES_API);
  //       console.log("RESP", JSON.parse(resp.data));

  //       setGames({ data: resp.data, isLoading: false });
  //     } catch (error) {
  //       console.error("Error fetching games:", error);
  //       setGames({ data: [], isLoading: false });
  //     }
  //   }
  //   fetchGames();
  // }, []);

  // if(games.isLoading) { setGames(); }

  return (
    <div className="GamesApp">
      < SearchForm filterList={ filterList } />
      < GamesList games={ games.data } />
    </div>
  );
}

export default GamesApp;