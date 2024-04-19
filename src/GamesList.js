import Game from "./Game.js";


/** GamesList, renders Games
 *
 * Props:
 *  - games: [ { id, name, releaseDate, description, platforms, image }, ... ]
 *
 * State:
 *  - None
 *
 * GamesApp -> GamesList -> Game */
function GamesList({ games }) {
  return (
    <div className="GamesList">
      { games.map(game => < Game key={ game.id } game={ game } />) }
    </div>
  );
}

export default GamesList;