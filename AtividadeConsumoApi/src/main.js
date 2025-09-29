// Função assíncrona para buscar os dados de um Pokémon
async function getPokemonData(pokemonName) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Não foi possível buscar os dados do Pokémon:", error);
  }
}

const pokemonName = 'ditto';

getPokemonData(pokemonName)
  .then(pokemonData => {
    if (pokemonData) {
      console.log("✅ Dados completos do Pokémon:", pokemonData);

      console.log(`Nome: ${pokemonData.name}`);
      console.log(`ID: ${pokemonData.id}`);
      console.log(`Primeira Habilidade: ${pokemonData.abilities[0].ability.name}`);
    }
  });