import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

import { useNavigate } from "react-router-dom";
import "./index.css";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemon } from "../utils/apiClient";

const LandPage = (): JSX.Element => {
  const navigate = useNavigate();

  const { data, fetchNextPage} = useInfiniteQuery(
    "pages",
    fetchPokemon,
    {
      getNextPageParam: (lastPage, pages) => {
        return pages.length * 12;
      },
    }
  );

  const [firstPage, setFirstPage] = useState(true);

  const handleClickDetail = (name: string) => {
    navigate(`/${name}`);
  };

  const handleClickFetch = () => {
    setFirstPage(false);
    fetchNextPage();
  };

  useEffect(() => {
    if (data !== undefined && data.pages.length > 1) {
      setFirstPage(false);
    }
    const onScroll = async (event: Event) => {
      if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
        console.log(firstPage);
        if (!firstPage) {
          await fetchNextPage();
        }
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [firstPage]);

  return (
    <div className="container m-auto mt-10 ">
      <div className="flex justify-center flex-wrap justify-content">
        {data?.pages.map((page) =>
          page.results.map((pokemon: { name: any; url: any }) => (
            <div
              onClick={() => handleClickDetail(pokemon.name)}
              className="cursor-pointer"
            >
              <PokemonCard name={pokemon.name} url={pokemon.url} />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center">
        {data?.pages.length === 1 ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClickFetch}
          >
            Cargar más Pokémon
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default LandPage;
