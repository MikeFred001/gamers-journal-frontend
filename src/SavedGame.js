import './SavedGame.css';
import { useEffect } from "react";

//TODO: Add dateAdded to game object to allow for sorting by recency.
/* Props
 *  - game: { id, name, releaseDate, description, preferredSystem, imageUrl }
 *  - removeGame()
 *
 * State
 *   - None
 *
 * GamesWishlist -> SavedGamesList -> (( SavedGame )) */
function SavedGame({ game, removeGame }) {

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

      {game.preferredSystem
        ? <p>{game.preferredSystem}</p>
        : null}

      <button onClick={handleDelete}>Remove</button>
    </div>
  );
}

export default SavedGame;