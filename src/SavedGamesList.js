import SavedGame from './SavedGame.js';


/* Props
 *   - removeGame()
 *   - games: [ { game }, { game } ... ]
 *     - game is : { id, name, releaseDate, description, platforms, imageUrl }
 *
 * State
 *   - None
 *
 * GamesWishlist -> (( SavedGamesList )) -> SavedGame */
function SavedGamesList({ games, removeGame }) {
  return (
    <div className="SavedGamesList">
      {games.map(game =>
        (<SavedGame key={game.id} game={game} removeGame={removeGame} />))}
    </div>
  );
}

export default SavedGamesList;