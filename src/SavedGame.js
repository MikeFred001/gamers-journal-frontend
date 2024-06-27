import './SavedGame.css';
import { useEffect } from "react";

/** SavedGame Component
 *
 * Props:
 *  - game: { id, name, releaseDate, description, preferredSystem, imagUrl }
 *  - removeGame()
 *
 * State:
 *  - formData: { gameData, platform, note }
 *  - isEditable: boolean
 *
 * GamesWishlist -> GamesList -> [[ SavedGame ]] */
function SavedGame({ game, removeGame }) {
  console.log('< SavedGame /> GAME \n', game);

  async function handleDelete() {
    try {
      removeGame(game.id);
      console.log('Game deleted: \n', game.title);
    } catch(err) {
      console.error('ERROR: Failed to add game to wishlist \n', err);
    }
  }

  // Displays fully updated states post-render.
  useEffect(() => {
    console.log('< SavedGame /> GAME \n', game);
  }, [game]);

  const imageStyling = {
    width: '150px',
    height: '200px',
    borderRadius: '5px',
    boxShadow: '0 0 5px 2px #ccc',
    margin: '25px 0px 5px'
  };

  const imageDesc = game.imageUrl.includes('default')
    ? 'Default Giant Bomb placeholder image.'
    : `Cover art for the game: ${game.title}.`;

  return (
    <div className='SavedGame'>
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

      <button onClick={handleDelete}>Remove</button>
    </div>
  );
}

export default SavedGame;