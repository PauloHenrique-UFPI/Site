// noticia.js

class Noticia {
  constructor(id, titulo, createdat, img, desccurta) {
    this.id = id;
    this.titulo = titulo;
    this.created_at = createdat;
    this.img = img;
    this.desc_curta = desccurta;
  }
}

export default Noticia;
