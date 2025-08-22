// 5 easy 5 medium 5 hard pokemons for the computer
// then the computer loads a pokemon at random, out of these. if the player wants they can choose easy-hard
// pokemon's lists, rated over easy, medium and hard :)

// Pokemon grouped by their primary types


export let Easy = [
  'arbok',      // Easy
  'weezing',    // Easy
  'seviper',    // Easy
  'crobat',     // Medium (Poison/Flying)
  'nidoking',
  'psyduck'
];


export let Medium = [
  'wobbuffet',  // Medium
  'mewtwo',     // Hard
  'malamar',    // Hard (Dark/Psychic)
  'necrozma'    // Hard
];


export let Hard = [
  'sharpedo',   // Medium (Water/Dark)
  'spiritomb',  // Medium (Ghost/Dark)
  'darkrai',    // Hard
  'yveltal',    // Hard (Dark/Flying)
  'hydreigon',  // Hard (Dark/Dragon)
  'malamar',    // Hard (Dark/Psychic)
  'guzzlord'    // Hard (Dark/Dragon)
];



export  function randomPoke(Easy, Medium , Hard){
  const array1 = [...Easy, ...Medium, ...Hard];
  const index = Math.floor(Math.random()*array1.length);
  return array1[index];
}

export  async function fetchRandom(pokemon){
  const fetchedPoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await fetchedPoke.json();
  return data;
}
