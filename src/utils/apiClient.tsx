import axios from "axios";

const pokeClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const fetchPokemon = async ({ pageParam = 0 }) => {
  const res = await pokeClient.get(`pokemon?offset=${pageParam}&limit=12`);
  return res.data;
};

export const fetchPokemonDetail = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

export const fetchPokemonByName = async (name: string) => {
    const res = await pokeClient.get(`pokemon/${name}`)
    return res.data
}
