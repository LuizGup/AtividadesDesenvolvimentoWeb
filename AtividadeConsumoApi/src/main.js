// --- Selecionando os elementos do HTML ---
const pokemonInput = document.getElementById('pokemonInput');
const searchButton = document.getElementById('searchButton');
const pokemonList = document.getElementById('pokemonList');

async function getPokemonData(pokemonName) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
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

  const spriteUrl = pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default;
  
  const types = pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ');

  card.innerHTML = `
    <img src="${spriteUrl}" alt="Imagem do ${pokemonData.name}" class="card-image">
    <div class="card-info">
        <h2 class="card-title">${pokemonData.name} (#${pokemonData.id})</h2>
        <p class="card-subtitle">Tipo: ${types}</p>
    </div>
  `;
  
  pokemonList.appendChild(card);
}

searchButton.addEventListener('click', async () => {
  const pokemonName = pokemonInput.value.trim().toLowerCase();

  if (pokemonName === "") {
    alert("Por favor, digite o nome ou ID de um Pokémon.");
    return;
  }

  const pokemonData = await getPokemonData(pokemonName);

  if (pokemonData) {
    createPokemonCard(pokemonData);
    pokemonInput.value = ""; // Limpa o input
  }
});

pokemonInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});