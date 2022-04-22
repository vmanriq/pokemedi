import React from "react";
import { useQuery } from "react-query";
import { fetchPokemonDetail } from "../utils/apiClient";
import "./index.css";
import pokeball from "../images/pokeball_gray.png";
import { capitalizeFirstLetter, getImageUrl } from "../utils/helpers";

type PokemonCardProps = {
  name: string;
  url: string;
};

const PokemonCard = ({ name, url }: PokemonCardProps) => {

  const { data, isLoading } = useQuery(name, () => fetchPokemonDetail(url));

  if (isLoading) {
    return <img src={pokeball} className="rotate" alt="pokeball loading" />;
  }

  return (
    <div className="rounded shadow-lg mb-20 mr-10 hover:animate-bounce">
      <div className=" bg-zinc-200 ">
        <img
          className="w-52 h-52 mx-auto"
          src={getImageUrl(data.id)}
          alt="Pokemon"
        />
      </div>

      <span className="text-sm text-gray-600 flex items-center ml-3 font-bold">
        N.{data.id}
      </span>
      <span className="font-bold ml-4 mt-2">{capitalizeFirstLetter(name)}</span>
      <div className="px-6 pt-4 pb-2">
        {data.types.map(
          (type: { slot: number; type: { url: string; name: string } }) => (
            <span
              className={`inline-block ${type.type.name} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}
            >
              {capitalizeFirstLetter(type.type.name)}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
