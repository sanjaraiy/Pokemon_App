import Image from 'next/image';

export async function generateStaticParams() {

  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await res.json();
  
 

  return data.results.map((_: any, index: number) => ({
    id: (index + 1).toString(),
  }));
}

export default async function PokemonDetail({ params }: { params: { id: string } }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const pokemon = await res.json();

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-700 capitalize">{pokemon.name}</h1>
      <div className="flex flex-col items-center mt-6">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={150}
          height={150}
        />
        <p className="mt-4 text-gray-700 font-semibold">Types: {pokemon.types.map((t: any) => t.type.name).join(', ')}</p>
        <p className='text-gray-700'>Abilities: {pokemon.abilities.map((a: any) => a.ability.name).join(', ')}</p>
        <div className="mt-4">
          <h2 className="text-lg font-bold text-gray-700">Stats</h2>
          <ul>
            {pokemon.stats.map((s: any) => (
              <li className='text-gray-700' key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold text-gray-700">Moves</h2>
          <p className='text-gray-700'>{pokemon.moves.slice(0, 6).map((m: any) => m.move.name).join(', ')}</p>
        </div>
      </div>
    </div>
  );
}
