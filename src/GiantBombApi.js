import axios from "axios";

const BASE_URL = "http://localhost:3001";

class GiantBombApi {
    // Remember, the backend needs to be authorized with a token
    // We're providing a token you can use to interact with the backend API
    // DON'T MODIFY THIS TOKEN
    static token = undefined;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        // const headers = { Authorization: `Bearer ${GiantBombApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params })).data;
        } catch (err) {
            console.error("API Error:", err.response);
        }
    }

    static async searchGames(searchInput) {
        const res = await this.request("api/games", { searchTerm: searchInput });
        console.log("RESULT OF SEARCHGAMES FRONTEND API>>>", res);
        return res;
    }

    static async saveGame(formData) {
        const res = await this.request("/games", formData, "post");
        console.log("RESULT OF SAVEGAME FRONTEND API>>>", res);
        return res;
    }

    static async removeGame(id) {
        const res = await this.request(`/games/${id}`, {}, "delete");
        console.log("RESULT OF REMOVEGAME FRONTEND API>>>", res);
        return res;
    }

    static async getGames(id) {
        const res = await this.request(`/games/${id}`);
        console.log("RESULT OF GETGAMES FRONTEND API>>>", res);
        return res;
    }
}

export default GiantBombApi;