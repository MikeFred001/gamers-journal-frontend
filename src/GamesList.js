import Game from "./Game.js";


/* PROPS
 *  - addGame()
 *  - displayLoginNotice()
 *  - games: [ { game }, { game }, ... ]
 *    - game: { id, title, releaseDate, description, platforms, imageUrl }
 *
 * STATE
 *  - None
 *
 * [ Home, GameSearch ] -> (( GamesList )) -> Game */
function GamesList({ games, addGame, displayLoginNotice }) {
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