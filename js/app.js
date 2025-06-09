import Pelicula from "./classPelicula.js";

//funciones
const abrirModal = () => {
  //aqui abro la ventana modal
  modalPelicula.show();
  //cambie la variable para que cree peliculas
  creandoPelicula = true;
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
  modalPelicula.hide()
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
window.borrarPelicula = (id) => {
  Swal.fire({
    title: "Estas por eliminar una pelicula",
    text: "si decides eliminar, no puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Salir",
  }).then((result) => {
    if (result.isConfirmed) {
      //buscar y borrar la pelicula del array cartelera
      const posicionPeliculaBuscada = cartelera.findIndex(
        (pelicula) => pelicula.id === id
      );
      cartelera.splice(posicionPeliculaBuscada, 1);
      //actualizar el localstorage
      guardarLocalStorage();
      //actualizar la tabla de peliculas
      console.log(posicionPeliculaBuscada);
      tablaPeliculas.children[posicionPeliculaBuscada].remove();
      //todo: corregir las celdas de la tabla cuando borramos una pelicula
      //Recorrer las filas restantes y actualizar sus indices
      const filasRestantes = tablaPeliculas.children;
      for (let i = 0; i < filasRestantes.length; i++) {
        const celdaIndice = filasRestantes[i].querySelector("td");
        if (celdaIndice) {
          celdaIndice.textContent = i + 1; //actualiza el texto con el nuevo indice
        }
      }
    }
  });
};
window.prepararPelicula = (id) => {
  console.log("aqui tengo que preparar la pelicula", id);
  //abrir el modal
  abrirModal();
  //cargar los datos en el modal
  const peliculaBuscada = cartelera.find((pelicula) => pelicula.id === id);
  inputNombre.value = peliculaBuscada.nombre;
  inputGenero.value = peliculaBuscada.genero;
  inputDirector.value = peliculaBuscada.director;
  inputDuracion.value = peliculaBuscada.duracion;
  inputImagen.value = peliculaBuscada.imagen;
  inputDescripcion.value = peliculaBuscada.descripcion;

  //abrir el modal
  abrirModal();
  //guardo el id del contacto que quiero editar
  idPeliculaEditar = id;
  creandoPelicula = false;
};

const editarPelicula = () => {
  console.log("aqui debo agregar la logica que edite la pelicula en el array");
  //agarrar los datos del formulario y actualizarlos dentro del array cartelera
  const posicionPelicula = cartelera.findIndex(
    (pelicula) => pelicula.id === idPeliculaEditar
  );
  console.log(posicionPelicula);
  cartelera[posicionPelicula].nombre = inputNombre.value;
  cartelera[posicionPelicula].genero = inputGenero.value;
  cartelera[posicionPelicula].director = inputDirector.value;
  cartelera[posicionPelicula].duracion = inputDuracion.value;
  cartelera[posicionPelicula].imagen = inputImagen.value;
  cartelera[posicionPelicula].descripcion = inputDescripcion.value;
  //actualizar el localstorage
  guardarLocalStorage();
  //limpiar el formulario
  limpiarFormulario();
  //cerrar el modal
  modalPelicula.hide();
  //actualizar la tabla de peliculas
  //actualizar SOLO la fila de la tabla correspondiente a la pelicula editada
  const filaEditada = tablaPeliculas.children[posicionPelicula];
  if (filaEditada) {
    filaEditada.children[1].textContent = cartelera[posicionPelicula].nombre;
    filaEditada.children[2].textContent = cartelera[posicionPelicula].genero;
    filaEditada.children[3].textContent = cartelera[posicionPelicula].director;
    filaEditada.children[4].textContent = cartelera[posicionPelicula].duracion;
  }
  //agregar un mensaje al usuario
  Swal.fire({
    title: "Pelicula modificada",
    text: `La pelicula ${cartelera[posicionPelicula].nombre}, fue modificada correctamente`,
    icon: "success",
  });
};

//declarar variables
const modalPelicula = new bootstrap.Modal(
  document.getElementById("modalPelicula")
);
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
let idPeliculaEditar = null;
let creandoPelicula = true;

//agrego los manejadores de eventos
btnAgregar.addEventListener("click", abrirModal);
formularioPelicula.addEventListener("submit", (e) => {
  e.preventDefault();
  if (creandoPelicula) {
    //aqui voy a crear un pelicula
    crearPelicula();
  } else {
    editarPelicula();
  }
  //algun dia aqui voy a editar un pelicula
});

//resto de la logica
cargaDatosTabla();
