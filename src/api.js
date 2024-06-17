import axios from "axios";

const BASE_URL = "http://localhost:3001";

class GJApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
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
    console.log("searchGames frontend API result>>>", res);
    return res;
  }

  static async wishlistGame(formData) {
    const res = await this.request("/games", formData, "post");
    console.log("wishlistGame frontend API result >>>", res);
    return res;
  }

  static async removeGame(id) {
    const res = await this.request(`/games/${id}`, {}, "delete");
    console.log("removeGame frontend API result >>>", res);
    return res;
  }

  static async getWishlistedGames(username) {
    const res = await this.request(`/games/${username}`);
    console.log("getWishlistedGames frontend API result >>>", res);
    return res.games;
  }

  static async getUser(username) {
    const res = await this.request(`/users/${username}`);
    console.log("getUser Frontend API result>>>", res);
    return res.user;
  }

  static async register(formData) {
    const res = await this.request("/auth/register", formData, "post");
    console.log("register Frontend API result>>>", res);
    return res.token;
  }

  static async login(formData) {
    const res = await this.request("/auth/login", formData, "post");
    console.log("login Frontend API result>>>", res);
    return res.token;
  }
}

export default GJApi;