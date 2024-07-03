import SavedGame from './SavedGame.js';


/* PROPS
 * - removeGame()
 * - sortByDate()
 * - games: [ { game }, { game } ... ]
 *   - game is : { id, name, releaseDate, description, platforms, imageUrl, dateAdded }
 *
 * STATE
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