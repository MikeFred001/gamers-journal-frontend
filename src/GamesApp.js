import { useState, useEffect } from "react";
import Game from "./Game.js";
import axios from "axios";

const API_KEY = "f6e5b9785044d3d47cec1ea6429fcd05d3c08b52";
const GAMES_API = `https://www.giantbomb.com/api/search/?api_key=${API_KEY}&
                     format=json&query=%22prince%20of%20persia%22&resource=%22
                     game%22&field_list=platforms,image,name,deck,original_release_date`;

function CardsApp() {
  const [games, setGames] = useState({data: [ ], isLoading: true});

  console.log("GAMES APP RENDERED");
  console.log("GAMES STATE", games);

  useEffect(function fetchGamesWhenMounted() {
    console.log("GAMES EFFECT");

    async function fetchGames() {
      const resp = await axios.get(GAMES_API);
      console.log("RESP", resp.data);

      setGames({
        deckId: resp.data,
        isLoading: false
      });
    }
    fetchGames();
  }, [ ]);

  if(deck.isLoading || card.isLoading) return (<p>Loading...</p>);

  if(card.isLoading) {
    setCard();
  }

  return (
    <div>
      <button>Get Game</button>
      <Games games={ games.data }/>
    </div>
  );
}

export default GamesApp;