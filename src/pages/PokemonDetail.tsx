import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPokemonByName } from "../utils/apiClient";
import { capitalizeFirstLetter, getImageUrl } from "../utils/helpers";
import "./index.css";
import pokeball from '../images/pokeball_gray.png'
import psyduck from '../images/psyduck.png'


const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(name || "", () =>
    fetchPokemonByName(name || "")
  );
  if (isLoading) {
    return <img src={pokeball} className="rotate" alt="pokeball"/>;
  }

  if(isError) {
    return <div>
      <div>Pagina no encontrada</div>
      <img src={psyduck} alt="psyduck"/>;
    </div>
  }
  return (
    <div className="flex flex-col h-screen items-center flex-wrap">
      <div className="bg-white rounded-lg border max-h-80 items-center mt-20 ">
        <div>
          <div className="flex justify-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {capitalizeFirstLetter(data.name)}
            </h5>
          </div>

          <div className="flex flex-col items-center  md:flex-row ">
            <div className="flex flex-col justify-between p-4 leading-normal ">
              <img
                className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg bg-zinc-200"
                alt="pokemon"
                src={getImageUrl(data.id)}
              />
            </div>

            <div className="flex flex-col justify-between p-4 leading-normal bg-cyan-300 rounded mr-20">
              <div>
                {" "}
                <span className="font-bold">Peso: </span>
                {data.weight}
              </div>
              <div>
                <span className="font-bold">Altura: </span> {data.height}
              </div>
              <div>
                <span className="font-bold">Experiencia Base: </span>{" "}
                {data.base_experience}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
    </div>
  );
};

export default PokemonDetail;
