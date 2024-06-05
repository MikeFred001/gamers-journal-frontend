import "./Game.css";
import { useState, useEffect } from "react";
import GiantBombApi from "./GiantBombApi";


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

    const [formData, setFormData] = useState(
        {
            id: game.id,
            name: game.name,
            releaseDate: game.releaseDate,
            description: game.description,
            platform: game.platforms[0],
            note: "",
        }
    );

    useEffect(() => {
        console.log("FORM DATA", formData.note, formData.platform);
    });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    async function handleSubmit(evt) {
        await GiantBombApi.saveGame(formData);
    }

    const imageStyling = {
        width: "150px",
        height: "200px",
        borderRadius: "5px",
        boxShadow: "0 0 5px 2px #ccc",
        margin: "25px 0px 5px"
    };


    return (
        <div className="Game">
            <form>
                <img src={game.image} style={imageStyling}></img>
                <p>{game.name}</p>
                <p>{game.releaseDate}</p>
                <p>{game.description}</p>

                <input placeholder="Note" name="note" onChange={handleChange}></input>

                <select name="platform" onChange={handleChange}>
                    {game.platforms.map((p, idx) =>
                        <option key={idx} value={p}>{p}</option>)}
                </select>
                <button onClick={handleSubmit}>Save Game</button>
            </form>
        </div>
    );
}

export default Game;