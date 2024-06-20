import { useEffect } from "react";
import GJApi from "./api";

/** SavedGame Component
 *
 * Props:
 *  - game: { id, name, releaseDate, description, platforms, image }
 *  - editableDefault: boolean
 *
 * State:
 *  - formData: { gameData, platform, note }
 *  - isEditable: boolean
 *
 * GameCard -> [[ SavedGame ]] */
function Game({ game, toggleEdit, deleteGame }) {

  console.log('< Game /> GAME \n', game);

  // Displays fully updated game state post-render.
  useEffect(() => { console.log('< Game /> GAME \n', game); }, [game]);

  async function handleDelete(evt) {
    evt.preventDefault();
    deleteGame(game.id);
  }

  const imageStyling = {
    width: '150px',
    height: '200px',
    borderRadius: '5px',
    boxShadow: '0 0 5px 2px #ccc',
    margin: '25px 0px 5px',
  };

  const imageDesc = game.imageUrl.includes('default')
    ? `Default Giant Bomb placeholder image.`
    : `Cover art for the game: ${game.title}.`;

  return (
    <div className="Game">
      <img
        src={game.imageUrl}
        style={imageStyling}
        alt={imageDesc}
        title={imageDesc}
      />

      <p>{game.name}</p>
      <p>{game.releaseDate}</p>
      <p>{game.description}</p>
      <p>{game.preferredSystem}</p>
      <p>{game.note}</p>

      <button onClick={handleDelete}>Remove Game</button>
      <button onClick={toggleEdit}>Edit</button>
    </div>
  );
}

export default Game;