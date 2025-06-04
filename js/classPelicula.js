export default class Pelicula{
  #id;
  #nombre;
  #genero;
  #plataforma;
  #desarrollador;
  #imagen;
  #descripcion;

  constructor(nombre, genero, plataforma, desarrollador, imagen, descripcion) {
    this.#id = crypto.randomUUID();
    this.#nombre = nombre;
    this.#genero = genero;
    this.#plataforma = plataforma;
    this.#desarrollador = desarrollador;
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

  get plataforma() {
    return this.#plataforma;
  }

  get desarrollador() {
    return this.#desarrollador;
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

  set plataforma(nuevaPlataforma) {
    this.#plataforma = nuevaPlataforma;
  }

  set desarrollador(nuevoDesarrollador) {
    this.#desarrollador = nuevoDesarrollador;
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
      plataforma: this.plataforma,
      desarrollador: this.desarrollador,
      imagen: this.imagen,
      descripcion: this.descripcion,
    };
  }
}