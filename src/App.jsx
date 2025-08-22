import { useEffect, useState } from 'react';
import {Easy, Medium , Hard , randomPoke, fetchRandom} from './scripts/data.js'

function App() {
  const [error, setError] =  useState(null);
  const [loading, setLoading] =  useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [cPokemon, setcPokemon] = useState(null);
  const [input , setInput] = useState('gengar');
  const [result, setResult] = useState('User');
  const [displayr, setDisplayr] = useState(false);

  async function  returnPokemonDetails(){
    const computerPokemon = randomPoke(Easy , Medium , Hard);
    const returned = await fetchRandom(computerPokemon);
    {returned && setcPokemon(returned)};
  }

  function handlePlay(){
    if(pokemon && cPokemon){
      const sum1 = (pokemon.stats[0].base_stat +
        pokemon.stats[1].base_stat +
        pokemon.stats[2].base_stat+
        pokemon.stats[3].base_stat
      )
      const sum2 = (cPokemon.stats[0].base_stat +
        cPokemon.stats[1].base_stat +
        cPokemon.stats[2].base_stat+
        cPokemon.stats[3].base_stat
      )
      if(!(sum1>=sum2)){
        setResult('Computer');
        setDisplayr(true);
      }
      else{
        setResult('User');
        setDisplayr(true);
      }
    }
    else{
      setError('cant play rn, either pokemon is missing!')
    }
  }

  function handlePokemonRender(){
    // e.preventDefault();
    poke(input);
  }

  const poke = async (poki)=>{
    try{
      returnPokemonDetails();
      setLoading(true);
      setError(null);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poki}`)
      const data= await response.json();
      setPokemon(data);
      setLoading(false);
    }
    catch(err){
      setError(err.message);
      console.log(err.message);
    } 
    finally{
      setLoading(false);
    } 
  }

  useEffect(()=>{
    poke(input);
  } ,[]);
  return (
    <>
    
      <div className="card flex flex-col text-center rounded-md bg-lime-400 m-2 p-2 gap-3 sm:bg-lime-600">
        <h2 className='text-white'>PokeWar</h2>
        <p>
          <i className='color:black'>
            note : just click on find pokemon if you wanna play with an existing pokemon :) 
          </i>
        </p>
        <div className='flex flex-col rounded-md justify-center align-center gap-3 bg-pink-600 p-2'>

          <input type="text" 
          className='pokinput border-2 p-1 bg-transparent border-violet-500 rounded-md w-[150px] mx-auto placeholder-gray-700 focus:border-0'
          placeholder="enter a pokemon" 
          onChange={e => setInput(e.target.value)}/>

          <button 
            className="submit bg-sky-200 p-1 rounded-md w-[150px] mx-auto hover:bg-sky-500 transition" 
            onClick={handlePokemonRender}>
            find pokemon
          </button>
          {loading && <p>finding from pokidex</p>}
          <br/>
          
          {error && <p>pokidex break, we check wait here! maybe check the name once</p>}
          {error && <p>{error}</p>}
        </div>
        <div className='flex flex-row justify-center rounded-lg p-5 align-center gap-5  sm:bg-lime-900' >
          <div className='pokideets rounded-md flex flex-col p-2 justify-center align-center bg-red-900'>
            {pokemon &&  <p className='text-white mx-auto'>{(pokemon.name)}</p>}
            {pokemon && <img className='w-[300px]' src={pokemon.sprites.front_default}/>}
            {pokemon && <ul className='bg-white/40 px-1 h-[125px] truncate'>
                <li>
                  weight : {pokemon.weight}
                </li>
                <li>
                  {pokemon.stats[0].stat.name} : {pokemon.stats[0].base_stat}
                </li>
                <li>
                  {pokemon.stats[1].stat.name} : {pokemon.stats[1].base_stat}
                </li>
                <li>
                  {pokemon.stats[2].stat.name} : {pokemon.stats[2].base_stat}
                </li>
                <li>
                  {pokemon.stats[3].stat.name} : {pokemon.stats[3].base_stat}
                </li>
              </ul>}
          </div>

          <div className='computer-pokideets rounded-md flex flex-col p-2 justify-center align-center bg-red-900'>
            {cPokemon &&  <p className='text-white mx-auto'>{cPokemon.name}</p>}
            {cPokemon && <img className='w-[300px]' src={cPokemon.sprites.front_default}/>}
            {cPokemon && <ul className='bg-white/40 px-1 h-[125px] truncate'>
                <li>
                  weight : {cPokemon.weight}
                </li>
                <li>
                  {cPokemon.stats[0].stat.name} : {cPokemon.stats[0].base_stat}
                </li>
                <li>
                  {cPokemon.stats[1].stat.name} : {cPokemon.stats[1].base_stat}
                </li>
                <li>
                  {cPokemon.stats[2].stat.name} : {cPokemon.stats[2].base_stat}
                </li>
                <li>
                  {cPokemon.stats[3].stat.name} : {cPokemon.stats[3].base_stat}
                </li>
              </ul>}
          </div>
        </div>
      </div>
      
      <div className='flex justify-center mb-10'>
              <button className="playGame bg-green-600 rounded-md text-white max-w[120px] w-[30%]"
              onClick={handlePlay}
              >
                Play!
              </button>
              <br/>
              {displayr === true? <h1 className='mx-1'>{result} wins</h1> : ""}
      </div>
    </>
  )
}

export default App;
