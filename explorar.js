async function obtenerInfo() {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

  if (!respuesta.ok) {
    console.log("Algo salió mal. Código:", respuesta.status);
    return;
  }

  const datos = await respuesta.json();
  console.log("Datos de Picachu:", datos.name,);
}

obtenerInfo();