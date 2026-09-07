import axios from "axios";
// const API_KEY = Meta.env.OMDB_API_KEY;
const API_KEY = "6656d67c";
const baseUrl=`https://www.omdbapi.com/?t=The%20Godfather&apikey=${API_KEY}`;

axios.get(baseUrl).then((res) => console.log(res.data.Poster));