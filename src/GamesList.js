import GameCard from "./GameCard.js";


/** GamesList, renders Games
 *
 * Props:
 *  - games: [ { game }, { game }, ... ]
 *    - game is : [ { id, name, releaseDate, description, platforms, imageUrl }, ... ]
 *
 * State:
 *  - None
 *
 * { GameSearch, GamesWishlist }  -> [[ GamesList ]] -> { EditableGame, Game } */
function GamesList({ games, editableDefault, addGame, editGame, deleteGame }) {
  console.log('< GamesList /> GAMES: \n', games);

  return (
    <div className="GamesList">
      {games.map(game =>
        < GameCard
          key={game.id}
          game={game}
          editableDefault={editableDefault}
          addGame={addGame}
          editGame={editGame}
          deleteGame={deleteGame} />)}
    </div>
  );
}

export default GamesList;