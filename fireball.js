// Classe Fogo representa o projétil disparado pelo jogador
class Fogo {
  #forca; // atributo private (2 de 3 usos)

  constructor(x, y, direcao) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
    this.direcao = direcao;
    this.#forca = 1;
  }

  // get/set (2 de 3 usos)
  get forca() {
    return this.#forca;
  }

  set forca(valor) {
    this.#forca = valor;
  }

  mover() {
    if (this.direcao === "direita") this.x += 8;
    else this.x -= 8;
  }

  update() {
    this.mover();
  }

  draw() {
    const sprite = imageLoader.getImage('fireball');
    if (sprite) {
      ctx.drawImage(sprite, this.x, this.y, this.w, this.h);
    } else {
      ctx.fillStyle = "orange";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }

  desenhar(ctx) {
    const sprite = imageLoader.getImage('fireball');
    if (sprite) {
      ctx.drawImage(sprite, this.x, this.y, this.w, this.h);
    } else {
      ctx.fillStyle = "orange";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }

  outOfBounds() {
    return this.x > canvas.width || this.x + this.w < 0;
  }
}
