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

function mostrarFicha(datos) {
  if (!datos) {
    console.log("No hay datos para mostrar.");
    return;
  }

  const nombre = datos.name.toUpperCase();
  const tipos = datos.types.map((t) => t.type.name).join(" / ");

  console.log(`\n--- ${nombre} (#${datos.id}) ---`);
  console.log(`Tipos: ${tipos}`);
  console.log(`Altura: ${datos.height * 10} cm`);
  console.log(`Peso: ${datos.weight / 10} kg`);

  console.log("Stats:");
  for (const s of datos.stats) {
    console.log(`  ${s.stat.name}: ${s.base_stat}`);
  }

  console.log("Habilidades:");
  for (const a of datos.abilities) {
    const oculta = a.is_hidden ? " (oculta)" : "";
    console.log(`  ${a.ability.name}${oculta}`);
  }
}

function mostrarFicha(datos) {
  if (!datos) {
    console.log("No hay datos para mostrar.");
    return;
  }

  const nombre = datos.name.toUpperCase();
  const tipos = datos.types
    .map((tipo) => tipo.type.name)
    .join(" / ");

  console.log(`\n--- ${nombre} (#${datos.id}) ---`);
  console.log(`Tipos: ${tipos}`);
  console.log(`Altura: ${datos.height * 10} cm`);
  console.log(`Peso: ${datos.weight / 10} kg`);

  console.log("Stats:");
  for (const stat of datos.stats) {
    console.log(`  ${stat.stat.name}: ${stat.base_stat}`);
  }

  console.log("Habilidades:");
  for (const habilidad of datos.abilities) {
    const marcaOculta = habilidad.is_hidden ? " (oculta)" : "";
    console.log(`  ${habilidad.ability.name}${marcaOculta}`);
  }
}

function obtenerStat(datos, nombreStat) {
  for (const stat of datos.stats) {
    if (stat.stat.name === nombreStat) {
      return stat.base_stat;
    }
  }

  return null;
}

async function compararPokemon(nombre1, nombre2, nombreStat) {
  const pokemon1 = await buscarPokemon(nombre1);
  const pokemon2 = await buscarPokemon(nombre2);

  if (!pokemon1 || !pokemon2) {
    console.log("No se pueden comparar porque no se encontraron ambos Pokémon.");
    return;
  }

  const valor1 = obtenerStat(pokemon1, nombreStat);
  const valor2 = obtenerStat(pokemon2, nombreStat);

  if (valor1 === null || valor2 === null) {
    console.log(
      "Stat no válida. Usa: hp, attack, defense, special-attack, special-defense o speed."
    );
    return;
  }

  console.log(
    `${pokemon1.name}: ${nombreStat} = ${valor1} | ${pokemon2.name}: ${nombreStat} = ${valor2}`
  );

  if (valor1 > valor2) {
    console.log(`${pokemon1.name} tiene más ${nombreStat}.`);
  } else if (valor2 > valor1) {
    console.log(`${pokemon2.name} tiene más ${nombreStat}.`);
  } else {
    console.log(`Hay un empate en ${nombreStat}.`);
  }
}

async function probarFichas() {
  const datosGengar = await buscarPokemon("gengar");
  mostrarFicha(datosGengar);

  const datosEevee = await buscarPokemon("eevee");
  mostrarFicha(datosEevee);
}
async function probarComparaciones() {

  await compararPokemon("snorlax", "machamp", "attack");

  await compararPokemon("pikachu", "bulbasaur", "defense");

  await compararPokemon("pikachu", "bulbasaur", "fuerza");
}

async function pokemonMasFuerte(listaNombres, nombreStat) {
  let mejorNombre = null;
  let mejorValor = -1;

  for (const nombre of listaNombres) {
    const datos = await buscarPokemon(nombre);

    if (!datos) {
      continue;
    }

    const valor = obtenerStat(datos, nombreStat);

    if (valor === null) {
      continue;
    }

    if (valor > mejorValor) {
      mejorValor = valor;
      mejorNombre = datos.name;
    }
  }

  if (mejorNombre === null) {
    console.log("No se encontró un Pokémon válido para comparar.");
    return null;
  }

  console.log(
    `El más fuerte en ${nombreStat} es ${mejorNombre}, con ${mejorValor}.`
  );

  return mejorNombre;
}

async function completarDesafio() {
  const equipo = [
    "pikachu",
    "charizard",
    "bulbasaur",
    "snorlax",
    "machamp",
    "gengar",
  ];

  const ganadorAtaque = await pokemonMasFuerte(equipo, "attack");
  await pokemonMasFuerte(equipo, "defense");

  if (ganadorAtaque) {
    const datosGanador = await buscarPokemon(ganadorAtaque);
    mostrarFicha(datosGanador);
  }
}

completarDesafio();

probarComparaciones();

probarFichas();