async function buscarPokemon(nombre) {
  const nombrePokemon = nombre.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    console.log(`No se encontró el Pokémon. Código: ${respuesta.status}`);
    return null;
  }

  return await respuesta.json();
}

async function probarBusqueda() {
  const nombres = ["pikachu", "charizard", "bulbasaur", "noexiste"];

  for (const nombre of nombres) {
    const datos = await buscarPokemon(nombre);

    if (datos !== null) {
      console.log(`Nombre: ${datos.name}, ID: ${datos.id}`);
    }
  }
}

probarBusqueda();
