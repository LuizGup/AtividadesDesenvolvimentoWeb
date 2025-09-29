// --- Selecionando os elementos do HTML ---
const pokemonInput = document.getElementById('pokemonInput');
const searchButton = document.getElementById('searchButton');
const pokemonList = document.getElementById('pokemonList');

function savePokemons() {
  const pokemons = [];
  document.querySelectorAll('.card').forEach(card => {
    pokemons.push(card.dataset.pokemonId);
  });
  localStorage.setItem('savedPokemons', JSON.stringify(pokemons));
}

async function loadPokemons() {
  const savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
  for (const pokemonId of savedPokemons) {
    const pokemonData = await getPokemonData(pokemonId);
    if (pokemonData) {
      createPokemonCard(pokemonData);
    }
  }
}

async function getPokemonData(pokemonNameOrId) {
  const formattedQuery = String(pokemonNameOrId).toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${formattedQuery}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Pokémon não encontrado!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

function createPokemonCard(pokemonData) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.pokemonId = pokemonData.id;

  const spriteUrl = pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default;
  const types = pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ');

  card.innerHTML = `
    <img src="${spriteUrl}" alt="Imagem do ${pokemonData.name}" class="card-image">
    <div class="card-info">
      <h2 class="card-title">${pokemonData.name} (#${pokemonData.id})</h2>
      <p class="card-subtitle">Tipo: ${types}</p>
    </div>
    <div class="card-footer">
        <button class="delete-btn">Deletar</button>
    </div>
  `;
  
  const deleteButton = card.querySelector('.delete-btn');
  deleteButton.addEventListener('click', () => {
    card.remove();
    savePokemons();
  });

  pokemonList.appendChild(card);
}

searchButton.addEventListener('click', async () => {
  const pokemonName = pokemonInput.value.trim();

  if (pokemonName === "") {
    alert("Por favor, digite o nome ou ID de um Pokémon.");
    return;
  }

  const pokemonData = await getPokemonData(pokemonName);

  if (pokemonData) {
    createPokemonCard(pokemonData);
    savePokemons();
    pokemonInput.value = "";
  }
});

pokemonInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});

document.addEventListener('DOMContentLoaded', loadPokemons);