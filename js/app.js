import Pelicula from "./classPelicula.js";

//funciones
const abrirModal = () => {
  const modalPelicula = new bootstrap.Modal(
    document.getElementById("modalPelicula")
  );
  modalPelicula.show();
};

const crearPelicula = () => {
  //todo: tomar los datos del formulario y validarlos
  //con los datos voy a crear un objeto pelicula
  const peliculaNueva = new Pelicula(
    inputNombre.value,
    inputGenero.value,
    inputDirector.value,
    inputDuracion.value,
    inputImagen.value,
    inputDescripcion.value
  );
  //guardar la película en un array
  cartelera.push(peliculaNueva);
  console.log(cartelera);
  //guardar la cartelera en localstorage
  guardarLocalStorage();
  //dibujar esta pelicula nueva en la tabla
  dibujarFila(peliculaNueva, cartelera.length);
  limpiarFormulario();
  //mostrar un mensaje al usuario indicando que se creo la pelicula
  Swal.fire({
  title: "Pelicula creada",
  text: `La pelicula ${peliculaNueva.nombre}, fue creada correctamente`,
  icon: "success",
});

};

const limpiarFormulario = () => {
  formularioPelicula.reset();
};

const guardarLocalStorage = () => {
  localStorage.setItem("carteleraKey", JSON.stringify(cartelera));
};

const cargaDatosTabla = () => {
  //verificar si la lista tiene datos
  if (cartelera.length !== 0) {
    //dibujar una fila por cada pelicula de la lista
    cartelera.map((pelicula, indice) => dibujarFila(pelicula, indice + 1));
  }

  //si no hay datos en la lista mostrar un mensaje al usuario
};

const dibujarFila = (pelicula, indice) => {
  console.log(pelicula);
  //agregar una fila (tr) nueva al tbody de la tabla de peliculas
  tablaPeliculas.innerHTML += `<tr>
              <td>${indice}</td>
              <td>${pelicula.nombre}</td>
              <td>${pelicula.genero}</td>
              <td>${pelicula.director}</td>
              <td>${pelicula.duracion}</td>
              <td>
                <button class="btn btn-warning" onclick="prepararPelicula('${pelicula.id}')">Editar</button>
                <button class="btn btn-danger" onclick="borrarPelicula('${pelicula.id}')">Borrar</button>
                <button class="btn btn-info">Ver</button>
              </td>
            </tr>`;
};
window.borrarPelicula = (id)=>{
  console.log("aqui deberia borrar una pelicula")
  console.log(id)
  //aqui voy a mostrar un mensaje de confirmacion al borrar una pelicula
  /*Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});*/
  //buscar y borrar la pelicula del array cartelera
  const posicionPeliculaBuscada = cartelera.findIndex((pelicula)=> pelicula.id === id)
  cartelera.splice(posicionPeliculaBuscada, 1)
  //actualizar el localstorage
  guardarLocalStorage()
  //actualizar la tabla de peliculas
  console.log(posicionPeliculaBuscada)
  tablaPeliculas.children[posicionPeliculaBuscada].remove()
  //todo: corregir las celdas de la tabla cuando borramos una pelicula
}

window.prepararPelicula = (id)=>{
  console.log("aqui tengo que preparar la pelicula", id)
  //abrir el modal
  abrirModal()
  //cargar los datos en el modal
  const peliculaBuscada = cartelera.find((pelicula)=> pelicula.id === id)
  inputNombre.value = peliculaBuscada.nombre
  inputGenero.value = peliculaBuscada.genero
  inputDirector.value = peliculaBuscada.director
  inputDuracion.value = peliculaBuscada.duracion
  inputImagen.value = peliculaBuscada.imagen
  inputDescripcion.value = peliculaBuscada.descripcion
  
  //abrir el modal
  abrirModal()
}


//declarar variables
const btnAgregar = document.getElementById("btnAgregar");
const formularioPelicula = document.querySelector("form");
const inputNombre = document.querySelector("#nombre");
const inputGenero = document.querySelector("#género");
const inputDuracion = document.querySelector("#duracion");
const inputDirector = document.querySelector("#director");
const inputImagen = document.querySelector("#imagen");
const inputDescripcion = document.querySelector("#descripción");
const cartelera = JSON.parse(localStorage.getItem("carteleraKey")) || [];
const tablaPeliculas = document.querySelector("tbody");

//agrego los manejadores de eventos
btnAgregar.addEventListener("click", abrirModal);
formularioPelicula.addEventListener("submit", (e) => {
  e.preventDefault();
  //aqui voy a crear un pelicula
  crearPelicula();
  //algun dia aqui voy a editar un pelicula
});

//resto de la logica
cargaDatosTabla();
