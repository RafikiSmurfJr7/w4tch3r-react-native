import axios from "axios";

export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 1000,
  //headers: { "X-Custom-Header": "foobar" },
  params: {
    include_adult: false,
    api_key: "1898ce38519e6949e40c504995b866a0",
  },
});
