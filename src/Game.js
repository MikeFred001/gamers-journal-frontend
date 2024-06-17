import "./Game.css";
import { useState, useEffect } from "react";
import GJApi from "./api";


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
    const { platforms, ...restOfGame } = game;
    const [formData, setFormData] = useState({
        ...restOfGame,
        platform: platforms[0],
        note: "",
    });

    // Displays fully updated states post-render.
    useEffect(() => {
        console.log("FORM DATA", formData);
        console.log("GAME", game);
    });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        await GJApi.wishlistGame(formData);
    }

    const imageStyling = {
        width: "150px",
        height: "200px",
        borderRadius: "5px",
        boxShadow: "0 0 5px 2px #ccc",
        margin: "25px 0px 5px"
    };

    const imageDesc = game.imageUrl.includes("default")
        ? `Default Giant Bomb placeholder image.`
        : `Cover art for the game: ${game.title}`;

    return (
        <div className="Game">
            <form>
                <img
                    src={game.imageUrl}
                    style={imageStyling}
                    alt={imageDesc}
                    title={imageDesc}
                />

                <p>{game.name}</p>
                <p>{game.releaseDate}</p>
                <p>{game.description}</p>

                <input
                    placeholder="Note"
                    name="note"
                    onChange={handleChange}
                />

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