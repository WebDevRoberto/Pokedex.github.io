
// FUNCION PARA ABRIR Y CERRAR OPCIONES DE FILTRO CON ANIMACION


function toggleFilters() {
  const checkboxContainer = document.getElementById("checkboxContainer");

  if (checkboxContainer.classList.contains("hidden")) {
    
    checkboxContainer.classList.remove("hidden");
    checkboxContainer.classList.remove("fade-out-top");
    checkboxContainer.classList.add("fade-in-top");
  } else {
    
    checkboxContainer.classList.remove("fade-in-top");
    checkboxContainer.classList.add("fade-out-top");

   
    setTimeout(() => {
      checkboxContainer.classList.add("hidden");
      checkboxContainer.classList.remove("fade-out-top");
    }, 600); 
  }}




// FUNCION PARA OBTENER LA EL TIPO DE POKEMON Y ASIGNARLE UNA CLASE
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


// CODIGO PARA LA API POKEAPI E INTEGRACION
const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const pokemonListContainer = document.getElementById("pokemon-list-container");

// FUNCION PARA HACER UNA PETICION AL API
function fetchPokemon(url) {
  return fetch(url)
    .then(response => response.json());
}

// ALMACENAR ELEMENTOS DEL FORM PARA BUSCAR

const searchForm = document.querySelector("form");
const searchInput = document.getElementById("searchbox");
const searchBtn = document.getElementById("search-btn");


// FUNCION PARA CREAR EL CONTENEDOR DE CADA POKEMON CON PETICIONES A LA API

function createPokemonCard(pokemonData) {

          // CREAR ELEMENTOS DE LA TARJETA DEL POKEMON ADEMAS DE ASIGNAR CLASES Y LOS VALORES DESDE SU JSON
          const pokemonCard = document.createElement("div");
          pokemonCard.classList.add("pokemon-info");

          const pokemonName = document.createElement("h3");
          pokemonName.classList.add("pokemon-name");
          pokemonName.textContent = pokemonData.name;

          const pokemonSprite = document.createElement("img");
          pokemonSprite.classList.add("pokemon-sprite");
          pokemonSprite.src = pokemonData.sprites.other.dream_world.front_default;

          const pokemonNumber = document.createElement("h4")
          pokemonNumber.classList.add("pokemon-number")
          pokemonNumber.textContent = "#" + pokemonData.id

          
          const typeList = document.createElement("ul");
          typeList.classList.add("pokemon-type-list");


          // RECORRER JSON DE TIPOS Y AGREGARLOS A UNA LISTA ADEMAS DE ASIGNALES UNA CLASE
          const pokemonTypes = pokemonData.types.map(type => type.type.name);
          
          pokemonTypes.forEach(pokemonType => {
            const typeListItem = document.createElement("li");
            const tipoClase = obtenerClaseTipo(pokemonType);
            typeListItem.classList.add("pokemon-type", tipoClase);
            typeListItem.textContent = pokemonType;

            typeList.appendChild(typeListItem);

            });
          

            // CREACION DE ELEMENTOS LINK PARA CUANDO LE DE CLICK ME LLEVE A LA PAGINA UNICA DE CADA POKEMON Y LLEVE SU JSON AL JS DE LA PAGINA SECUNDARIA
            const linkSingle = document.createElement("a")
            linkSingle.classList.add("pokemon-page")
            linkSingle.addEventListener("click", () => {
            sessionStorage.setItem("pokemonSelected", JSON.stringify(pokemonData));
            window.location.href = "pokemon-page.html";

            });
            
            // ELEMENTO BOTON FILTRA Y FUNCION CUANDO SE HACE CLICK
            const filterBtn = document.getElementById("filter-btn");

            filterBtn.addEventListener("click", () => {
            const typeCheckboxes = document.querySelectorAll('input[type="checkbox"]');

            const selectedTypes = Array.from(typeCheckboxes)
              .filter(checkbox => checkbox.checked)
              .map(checkbox => checkbox.value);

            const pokemonCards = document.querySelectorAll(".pokemon-info");
            pokemonCards.forEach(card => {
              card.style.display = "none";
            });

            pokemonCards.forEach(card => {
              const typesInCard = Array.from(card.querySelectorAll(".pokemon-type"))
                .map(typeElement => typeElement.textContent.toLowerCase());
              if (selectedTypes.every(type => typesInCard.includes(type))) {
                card.style.display = "block";
              }
            });
          });

          
          // SE O SE UNEN AL ELEMENTO TODOS LOS ELEMENTOS PARA CREAR LA TARJETA


          linkSingle.appendChild(pokemonSprite);
          linkSingle.appendChild(pokemonName)
          linkSingle.appendChild(pokemonNumber)
          linkSingle.appendChild(typeList)

          pokemonCard.append(linkSingle)
          return pokemonCard;
}

// FUNCION PARA MOSTRAR SOLO EL POKEMON BUSCADO
function displaySearchResults(results) {
  pokemonListContainer.innerHTML = "";

  if (results.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No se encontraron resultados.";
    pokemonListContainer.appendChild(noResultsMessage);
  } else {
      results.forEach((pokemonData) => {
      const pokemonCard = createPokemonCard(pokemonData);
      pokemonListContainer.appendChild(pokemonCard);
    });
  }
}

// FUNCION BUSCAR POKEMON
function searchPokemonByName(name) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(pokemonsData => {
      
      const matchingPokemon = pokemonsData.results.find(pokemon => pokemon.name.toLowerCase() == name.toLowerCase());

      if (matchingPokemon) {
        const pokemonUrl = matchingPokemon.url;
        fetchPokemon(pokemonUrl)
          .then(pokemonData => {
            displaySearchResults([pokemonData]);
          })
          .catch(error => console.error('Error:', error));
      } else {
        displaySearchResults([]);
      }
    })
    .catch(error => console.error('Error:', error));
}


// FUNCIONALIDAD DEL FORM
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const searchText = searchInput.value.trim();
  if (searchText !== "") {
    searchPokemonByName(searchText);
  } else {
    loadAllPokemons();
  }
});


// Función para cargar todos los Pokémon y mostrarlos al inicio
function loadAllPokemons() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(pokemonsData => {
      const allPokemonData = pokemonsData.results.map(pokemon => {
        const pokemonUrl = pokemon.url;
        return fetchPokemon(pokemonUrl);
      });

      Promise.all(allPokemonData)
        .then(allPokemon => {
          displaySearchResults(allPokemon);
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
}

// CARGAR POKEMONES
loadAllPokemons();






