import { useState, useContext } from "react";
import userContext from './userContext';

/** SavedGame Component
 *
 * Props:
 *  - game: { id, name, releaseDate, description, platforms, imageUrl }
 *  - addGame()
 *  - displayLoginNotice()
 *
 * State:
 *  - formData: { ...gameData, platform, note }
 *  - isSaving: boolean
 *  - saveComplete: boolean
 *
 * { Home, GameSearch } -> GamesList -> [[ Game ]] */
function Game({ game, addGame, displayLoginNotice }) {
  const { user } = useContext(userContext);
  const { platforms, ...restOfGame } = game;
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveComplete, setSaveComplete] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  async function handleSave(evt) {
    evt.preventDefault();
    try {
      addGame(user.username, formData);
      setSaveComplete(true);
      toggleSaveMode();
      console.log('Game added to wishlist! \n', formData.title);
    } catch(err) {
      console.error('ERROR: Failed to add game to wishlist \n', err);
      setSaveComplete(false);
    }
  }

  function toggleSaveMode() {
    console.log('\n TOGGLESAVEMODE IN GAME COMPONENT \n',);
    if (!user) {
      console.log('User not logged in, showing login notice.');
      displayLoginNotice(false);
      return;
    }

    setIsSaving(isSaving => !isSaving);
    setFormData(
      formData
        ? null
        : { ...restOfGame, preferredSystem: platforms[0], note: '' }
    );
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

  if (isSaving) {
    return (
      <div className='Game'>
        <img
          src={game.imageUrl}
          style={imageStyling}
          alt={imageDesc}
          title={imageDesc}
        />

        <p>{game.name}</p>
        <p>{game.description}</p>

        <form>
          <input placeholder='Note' name='note' onChange={handleChange}/>

          <select name='preferredSystem' onChange={handleChange}>
            <option value=''>--Preferred System--</option>
            {game.platforms.map((p, idx) =>
              <option key={idx} value={p}>{p}</option>)}
          </select>

          <button onClick={handleSave}>Save Game</button>
          <button onClick={toggleSaveMode}>Cancel</button>
        </form>
      </div>
    );
  }

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
      <p>{`Available on: ${game.platforms.join(', ')}`}</p>

      {saveComplete
        ? <p>Game Saved!</p>
        : <button onClick={toggleSaveMode}>Add</button>}
    </div>
  );
}

export default Game;