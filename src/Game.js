import "./Game.css";


/** Game Component
 *
 * Props:
 *  - game: { id, name, releaseDate, description, platforms, image }
 *
 * State:
 *  - None
 *
 * GamesList -> Game */
function Game({ game }) {
  const imageStyling = {
    width: "150px",
    height: "200px",
  }


  return (
    <div className="Game">
      <img src={ game.image } style={ imageStyling }></img>
      <p>{ game.name }</p>
      <p>{ game.releaseDate }</p>
      <p>{ game.description }</p>
      <select>
        { game.platforms.map((p, idx) =>
            <option key={ idx } value={ p }>{ p }</option>) }
      </select>

    </div>
  );
}

export default Game;