import React from 'react';
import Link from 'next/link';

// Components
import Layout from '../src/components/Layout';

export default function pokemon({ pokeman }) {
  return (
   <Layout title={pokeman.name}>
    <h1 className="text-4xl mb-2 text-center capitalize font-extrabold">{pokeman.name}</h1>

    <img className="mx-auto bg-gray-300 rounded-xl border-4 border-gray-500 mb-8" src={pokeman.image} alt={pokeman.name} />

    <div className="flex align-center justify-around w-full">
     <p><span className="font-bold mr-2">Weight: </span> {pokeman.weight}</p>
     <p><span className="font-bold mr-2">Height: </span> {pokeman.height}</p>
    </div>

    <h2 className="text-2xl mt-6 mb-2">Types</h2>
    {pokeman.types.map((type, index) => <p key={index}>{type.type.name}</p> )}

    <p className="mt-8 text-center">
     <Link href="/">
      <a className="
       text-1xl p-4 bg-gray-300 hover:bg-gray-200 rounded-md
      "> Home
      </a>
     </Link>
    </p>

   </Layout>
  );
}

export async function getServerSideProps({ query }) {
 const id = query.id
 try {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokeman = await res.json();

  const paddedIndex = ("00" + (id)).slice(-3);
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;

  pokeman.image = image;

  return { props: { pokeman } }

 } catch (err) {
  console.log(err)
 }
}

