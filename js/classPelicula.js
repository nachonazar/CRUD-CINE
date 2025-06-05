export default class Pelicula{
  #id;
  #nombre;
  #genero;
  #director;
  #duracion;
  #imagen;
  #descripcion;

  constructor(nombre, genero, director, duracion, imagen, descripcion) {
    this.#id = crypto.randomUUID();
    this.#nombre = nombre;
    this.#genero = genero;
    this.#director = director;
    this.#duracion = duracion;
    this.#imagen = imagen;
    this.#descripcion = descripcion;
  }

  // Getters
  get id() {
    return this.#id;
  }

  get nombre() {
    return this.#nombre;
  }

  get genero() {
    return this.#genero;
  }

  get director() {
    return this.#director;
  }

  get duracion() {
    return this.#duracion;
  }

  get imagen() {
    return this.#imagen;
  }

  get descripcion() {
    return this.#descripcion;
  }

  // Setters
  set nombre(nuevoNombre) {
    this.#nombre = nuevoNombre;
  }

  set genero(nuevoGenero) {
    this.#genero = nuevoGenero;
  }

  set director(nuevoDirector) {
    this.#director = nuevoDirector;
  }

  set duracion(nuevaDuracion) {
    this.#duracion = nuevaDuracion;
  }

  set imagen(nuevaImagen) {
    this.#imagen = nuevaImagen;
  }

  set descripcion(nuevaDescripcion) {
    this.#descripcion = nuevaDescripcion;
  }

  // Método para stringify
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      genero: this.genero,
      director: this.director,
      duracion: this.duracion,
      imagen: this.imagen,
      descripcion: this.descripcion,
    };
  }
}