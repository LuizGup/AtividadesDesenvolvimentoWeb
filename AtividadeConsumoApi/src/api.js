// api.js

export async function getPokemonData(pokemonNameOrId) {
  const formattedQuery = String(pokemonNameOrId).toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${formattedQuery}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Em vez de um alert, a função agora "joga" o erro para quem a chamou.
      throw new Error("Pokémon não encontrado!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Relança o erro para que a função que chamou possa tratá-lo.
    throw error;
  }
}