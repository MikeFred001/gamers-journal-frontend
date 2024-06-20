import './EditableGame.css';
import { useState, useEffect } from "react";
import GJApi from "./api";

/** Game Component
 *
 * Props:
 *  - game: { id, name, releaseDate, description, platforms, imagUrl }
 *  - editableDefault: boolean
 *
 * State:
 *  - formData: { gameData, platform, note }
 *  - isEditable: boolean
 *
 * GamesList -> GameCard ->[[ EditableGame ]] */
function EditableGame({ game, addGame, editGame }) {
  console.log('< EditableGame /> GAME \n', game);

  const { platforms, ...restOfGame } = game;
  const [formData, setFormData] = useState({
    ...restOfGame,
    preferredSystem: platforms[0],
    note: ''
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  async function handleSave(evt) {
    try {
      evt.preventDefault();
      addGame(formData);
      console.log('Game added to wishlist! \n', formData.title);
    } catch(err) {
      console.error('ERROR: Failed to add game to wishlist \n', err);
    }
  }

  // Displays fully updated states post-render.
  useEffect(() => {
    console.log('< EditableGame /> FORM DATA \n', formData);
    console.log('< EditableGame /> GAME \n', game);
  }, [formData, game]);

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
    <div className='EditableGame'>
      <img
        src={game.imageUrl}
        style={imageStyling}
        alt={imageDesc}
        title={imageDesc}
      />

      <p>{game.name}</p>
      <p>{game.releaseDate}</p>
      <p>{game.description}</p>

      <form>
        <input placeholder='Note' name='note' onChange={handleChange}/>

        <select name='preferredSystem' onChange={handleChange}>
          {game.platforms.map((p, idx) =>
            <option key={idx} value={p}>{p}</option>)}
        </select>

        <button onClick={handleSave}>Save Game</button>
      </form>
    </div>
  );
}

export default EditableGame;