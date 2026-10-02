async function obtenerInfo() {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

  if (!respuesta.ok) {
    console.log("Algo salió mal. Código:", respuesta.status);
    return;
  }

  const datos = await respuesta.json();
  console.log("Datos de Picachu:", datos.name,);
  console.log("ID:", datos.id);

  console.log("Tipos:");
  for (const t of datos.types) {
    console.log(t.type.name);
  }

  console.log("Stats:");
  for (const s of datos.stats) {
    console.log(s.stat.name, ":", s.base_stat);
  }

  console.log("Habilidades:");
  for (const a of datos.abilities) {
    console.log(a.ability.name);
  }
}

obtenerInfo();