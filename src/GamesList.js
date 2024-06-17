import Game from "./Game.js";


/** GamesList, renders Games
 *
 * Props:
 *  - games: [ { id, name, releaseDate, description, platforms, imageUrl }, ... ]
 *
 * State:
 *  - None
 *
 * GameSearch -> GamesList -> Game */
function GamesList({ games }) {
  return (
    <div className="GamesList">
      { games.map(game => < Game key={ game.id } game={ game } />) }
    </div>
  );
}

export default GamesList;