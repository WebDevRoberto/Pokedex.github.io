// pokemon-page.html
function obtenerClaseTipo(tipo) {
  switch (tipo) {
    case "grass":
      return "grass";
    case "poison":
      return "poison";
    case "dragon":
      return "dragon";
    case "fire":
      return "fire";
    case "water":
      return "water";
    case "electric":
      return "electric";
    case "ice":
      return "ice";
    case "fighting":
      return "fighting";
    case "ground":
      return "ground";
    case "flying":
      return "flying";
    case "rock":
      return "rock";
    case "bug":
      return "bug"
    case "ghost":
      return "ghost"
    case "psychic":
      return "psychic"
    case "normal":
      return "normal"
    case "fairy":
      return "fairy"
    case "steel":
      return "steel"

  }
}



function mostrarPokemonInfo(pokemonData) {
  const cardFull = document.getElementById("pokemon-full-info");

  // Crear elementos para mostrar la información del Pokémon
  const titlePokemon = document.createElement("h3");
  const pokemonNumber = document.createElement("h4");
  const pokemonSprite = document.createElement("img");
  const stats = document.createElement("div");
  const typeList = document.createElement("ul");

  typeList.classList.add("pokemon-type-list")
  stats.classList.add("stats")



  
  // Obtener datos del Pokémon
  const pokemonName = pokemonData.name;
  const pokemonId = pokemonData.id;
  const pokemonSprites = pokemonData.sprites.other.dream_world.front_default;
  const pokemonStats = pokemonData.stats;
  const pokemonTypes = pokemonData.types.map(type => type.type.name);

  // Asignar clases y contenido a los elementos
  pokemonSprite.classList.add("pokemon-sprite-full");
  pokemonNumber.classList.add("pokemon-number");
  titlePokemon.classList.add("pokemon-name");

  pokemonSprite.src = pokemonSprites;
  pokemonNumber.textContent = "#" + pokemonId;
  titlePokemon.textContent = pokemonName;

  // Mostrar información de estadísticas
  pokemonStats.forEach(stat => {
    const statPokemon = document.createElement("div")
    statPokemon.classList.add("stat")
    const statName = document.createElement("div");
    statName.classList.add("stat-name")
    const statNumber = document.createElement("div");
    statNumber.classList.add("stat-number")


    statName.textContent = stat.stat.name
    statNumber.textContent = stat.base_stat

    statPokemon.appendChild(statName)
    statPokemon.appendChild(statNumber)
    stats.appendChild(statPokemon)
    
  });

  // Mostrar información de tipos
  pokemonTypes.forEach(pokemonType => {
    const typeListItem = document.createElement("li");
    const tipoClase = obtenerClaseTipo(pokemonType);
    typeListItem.classList.add("pokemon-type-class", tipoClase);
    typeListItem.textContent = pokemonType;
    typeList.appendChild(typeListItem);
  });

  // Limpiar el contenido existente en el contenedor
  cardFull.innerHTML = '';

  // Agregar elementos al contenedor
  cardFull.appendChild(pokemonSprite);
  cardFull.appendChild(titlePokemon);
  cardFull.appendChild(pokemonNumber);
  cardFull.appendChild(typeList);
  cardFull.appendChild(stats)
  
  
  
}


// Para mostrar la información del Pokémon seleccionado
const pokemonInfoSelected = JSON.parse(sessionStorage.getItem("pokemonSelected"));
if (pokemonInfoSelected) {
  mostrarPokemonInfo(pokemonInfoSelected);
} else {
  console.error("No se encontraron datos del Pokémon seleccionado.");
}



















