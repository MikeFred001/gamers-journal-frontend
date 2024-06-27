import { useEffect } from "react";
import Game from "./Game.js";


/** GamesList, renders Games
 *
 * Props:
 *  - addGame()
 *  - toggleLoginNotice()
 *  - games: [ { game }, { game }, ... ]
 *    - game is : [ { id, name, releaseDate, description, platforms, imageUrl }, ... ]
 *
 * State:
 *  - None
 *
 * { Home, GameSearch } -> [[ GamesList ]] -> Game */
function GamesList({ games, addGame, displayLoginNotice }) {
  useEffect(() => console.log('< GamesList /> GAMES: \n', games), [games]);

  return (
    <div className="GamesList">
      {games.map(game =>
        < Game
          key={game.id}
          game={game}
          addGame={addGame}
          displayLoginNotice={displayLoginNotice} />)}
    </div>
  );
}

export default GamesList;