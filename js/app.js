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
    inputDuracion.value,
    inputDirector.value,
    inputImagen.value,
    inputSinopsis.value
  );
  //guardar la película en un array
  cartelera.push(peliculaNueva);
  console.log(cartelera)
  //guardar la cartelera en localstorage
  guardarLocalStorage()
  limpiarFormulario();
  //mostrar un mensaje al usuario indicando que se creo la pelicula
};

const limpiarFormulario = () => {
  formularioPelicula.reset();
};

const guardarLocalStorage = () => {
    localStorage.setItem("carteleraKey", JSON.stringify(cartelera))
}

//declarar variables
const btnAgregar = document.getElementById("btnAgregar");
const formularioPelicula = document.querySelector("form");
const inputTitulo = document.querySelector("#nombre");
const inputGenero = document.querySelector("#género");
const inputDuracion = document.querySelector("#plataforma");
const inputDirector = document.querySelector("#desarrollador");
const inputImagen = document.querySelector("#imagen");
const inputSinopsis = document.querySelector("#descripción");
const cartelera = JSON.parse(localStorage.getItem("carteleraKey")) || [];

//agrego los manejadores de eventos
btnAgregar.addEventListener("click", abrirModal);
formularioPelicula.addEventListener("submit", (e) => {
  e.preventDefault();
  //aqui voy a crear un pelicula
  crearPelicula();
  //algun dia aqui voy a editar un pelicula
});