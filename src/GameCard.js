import { useState, useEffect } from "react";
import GJApi from "./api";
import Game from "./Game";
import EditableGame from "./EditableGame";

/** Game Component
 *
 * Props:
 *  - game: { id, name, releaseDate, description, platforms, image }
 *  - editableDefault: boolean
 *
 * State:
 *  - formData: { gameData, platform, note }
 *  - isEditable: boolean
 *
 * GamesList -> [[ GameCard ]] -> { Game, EditableGame } */
function GameCard({ game, editableDefault, addGame, editGame, deleteGame }) {
  const [isEditable, setIsEditable] = useState(editableDefault);

  function toggleEdit() {
    setIsEditable(editable => !editable);
  }

  // Displays fully updated states post-render.
  useEffect(() => { console.log('< GameCard /> GAME \n', game); }, [game]);

  return (
    <div className='GameCard'>
      {isEditable
        ? < EditableGame game={game} addGame={addGame} editGame={editGame} />
        : < Game game={game} toggleEdit={toggleEdit} deleteGame={deleteGame} />}
    </div>
  );

}

export default GameCard;