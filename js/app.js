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
    inputTitulo.value,
    inputGenero.value,
    inputDirector.value,
    inputDuracion.value,
    inputImagen.value,
    inputSinopsis.value
  );
  //guardar la película en un array
  cartelera.push(peliculaNueva);
  console.log(cartelera)
  //guardar la cartelera en localstorage
  guardarLocalStorage()
  //dibujar esta pelicula nueva en la tabla
  dibujarFila(peliculaNueva, cartelera.length)
  limpiarFormulario();
  //mostrar un mensaje al usuario indicando que se creo la pelicula
};

const limpiarFormulario = () => {
  formularioPelicula.reset();
};

const guardarLocalStorage = () => {
    localStorage.setItem("carteleraKey", JSON.stringify(cartelera))
}

const cargaDatosTabla = () => {
    //verificar si la lista tiene datos
    if(cartelera.length !== 0){
        //dibujar una fila por cada pelicula de la lista
        cartelera.map((pelicula, indice)=> dibujarFila(pelicula, indice + 1))
    }

    //si no hay datos en la lista mostrar un mensaje al usuario
}

const dibujarFila = (pelicula, indice) => {
console.log(pelicula)
//agregar una fila (tr) nueva al tbody de la tabla de peliculas
tablaPeliculas.innerHTML += `<tr>
              <td>${indice}</td>
              <td>${pelicula.nombre}</td>
              <td>${pelicula.genero}</td>
              <td>${pelicula.director}</td>
              <td>${pelicula.duracion}</td>
              <td>
                <button class="btn btn-warning">Editar</button>
                <button class="btn btn-danger">Borrar</button>
                <button class="btn btn-info">Ver</button>
              </td>
            </tr>`
}

//declarar variables
const btnAgregar = document.getElementById("btnAgregar");
const formularioPelicula = document.querySelector("form");
const inputTitulo = document.querySelector("#nombre");
const inputGenero = document.querySelector("#género");
const inputDuracion = document.querySelector("#duracion");
const inputDirector = document.querySelector("#director");
const inputImagen = document.querySelector("#imagen");
const inputSinopsis = document.querySelector("#descripción");
const cartelera = JSON.parse(localStorage.getItem("carteleraKey")) || [];
const tablaPeliculas = document.querySelector("tbody")

//agrego los manejadores de eventos
btnAgregar.addEventListener("click", abrirModal);
formularioPelicula.addEventListener("submit", (e) => {
  e.preventDefault();
  //aqui voy a crear un pelicula
  crearPelicula();
  //algun dia aqui voy a editar un pelicula
});

//resto de la logica
cargaDatosTabla()