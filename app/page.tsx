'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Pokemon = {
  name: string;
  url: string;
};

export default function Home() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [currPage, setCurrPage] = useState(1);

  const pokemonPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await res.json();
      setPokemons(data.results);
    };
    fetchData();
  }, []);


  const filterData = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

 
  const totalPages = Math.ceil(filterData.length / pokemonPerPage);
  const startIndex = (currPage - 1) * pokemonPerPage;
  const paginatedPokemons = filterData.slice(startIndex, startIndex + pokemonPerPage);

  const goToPrevPage = () => setCurrPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrPage((prev) => Math.min(prev + 1, totalPages));

  
  useEffect(() => {
    setCurrPage(1);
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-black">Pokemon Explorer App</h1>

      <input
        type="text"
        placeholder="Search Pokemon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mx-auto block bg-white text-gray-700 p-2 px-4 outline-none rounded-3xl border-2 border-gray-700 mb-6"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {paginatedPokemons.map((pokemon) => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <Link href={`/pokemon/${id}`} key={pokemon.name}>
              <div className="bg-white rounded-3xl shadow p-4 text-center hover:bg-blue-100 cursor-pointer">
                <img src={image} alt={pokemon.name} className="w-20 h-20 mx-auto" />
                <p className="capitalize font-bold text-black mt-2">{pokemon.name}</p>
              </div>
            </Link>
          );
        })}
      </div>

     
      {filterData.length > pokemonPerPage && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={goToPrevPage}
            disabled={currPage === 1}
            className="bg-blue-600 text-white px-4 py-2 hover:cursor-pointer disabled:cursor-not-allowed rounded-full disabled:bg-blue-300"
          >
            Prev
          </button>
          <span className="text-black font-semibold">
            Page {currPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currPage === totalPages}
            className="bg-blue-600 text-white hover:cursor-pointer disabled:cursor-not-allowed px-4 py-2 rounded-full disabled:bg-blue-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
