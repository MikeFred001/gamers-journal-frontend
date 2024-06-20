import axios from "axios";

const BASE_URL = "http://localhost:3001";


/** Gamer's Journal Api Class
 *  Provides methods to interact with the Gamer's Journal Backend API
 */
class GJApi {
  static token = undefined;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${GJApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
    }
  }

  static async searchGames(searchInput) {
    const res = await this.request("api/games", { searchTerm: searchInput });
    console.log('searchGames frontend API result \n', res);
    return res;
  }

  static async wishlistGame(username, formData) {
    const res = await this.request(`games/${username}`, formData, "post");
    console.log('wishlistGame frontend API result \n', res);
    return res;
  }

  static async removeGame(id) {
    const res = await this.request(`games/${id}`, {}, "delete");
    console.log('removeGame frontend API result \n', res);
    return res;
  }

  static async getWishlistedGames(username) {
    const res = await this.request(`games/${username}`);
    console.log('getWishlistedGames frontend API result \n', res);
    return res.games;
  }

  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    console.log('getUser frontend API result \n', res);
    return res.user;
  }

  static async register(formData) {
    const res = await this.request("auth/register", formData, "post");
    console.log('searchGames frontend API result \n', res);
    return res.token;
  }

  static async login(formData) {
    const res = await this.request("auth/login", formData, "post");
    console.log('searchGames frontend API result \n', res);
    return res.token;
  }

  static async updateGame(id, gameData) {
    const res = await this.request(`games/${id}`, gameData, "patch");
    console.log('updateGame frontend API result \n', res);
    return res;
  }
}

export default GJApi;