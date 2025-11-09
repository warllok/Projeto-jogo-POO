//  classe PAI
class Inimigo {
  #dano; // atributo private (1 de 3 usos)

  constructor(x, y, w, h, dano) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.#dano = dano;
  }

  //  get/set (1 de 3)
  get dano() {
    return this.#dano;
  }
  set dano(valor) {
    this.#dano = valor;
  }

  mover(speed) {
    this.x -= speed;
  }

  desenhar(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

// 1 classe filha e herda de inimigo
class Fantasma extends Inimigo {
  constructor() {
    //  uso do super() (1 de 3 usos) onde chama o construtor da classe pai
    // vai variar altura aleatoriamente entre 80 e 180 pixels (mais variação)
    const random = Math.random();
    let alturaAleatoria;
    let yPosicao;
    
    if (random < 0.3) {
      // 30% dos fantasmas bem alto
      alturaAleatoria = 180;
      yPosicao = canvas.height - 240;
    } else if (random < 0.6) {
      // 30% dos fantasmas médio
      alturaAleatoria = 130;
      yPosicao = canvas.height - 190;
    } else {
      // 40% dos fantasmas baixo
      alturaAleatoria = 80;
      yPosicao = canvas.height - 140;
    }
    
    super(canvas.width, yPosicao, 120, alturaAleatoria, 1);
    this.speed = 3.5; //  novo atributo da classe filha
    this.sprite = imageLoader.getImage('ghost');
  }

  update(player) {
    this.mover();

    // verifica a colisão com o jogador
    if (Utils.detectarColisao(this, player)) {
      player.takeDamage(this.dano);
      return true;
    }
    return false;
  }

  mover() {
    // uso do this() (1 de 3 usos) onde chama método da própria instância
    this.moverBase(this.speed);
  }

  moverBase(speed) {
    this.x -= speed;
  }

  draw() {
    if (this.sprite) {
      ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }
  }
}

// 2 classe filha onde  herda de Inimigo
class MonstroBig extends Inimigo {
  constructor() {
    // uso do super() (2 de 3 usos)
    super(canvas.width, canvas.height - 160, 120, 120, 2);
    this.speed = 2; // novo atributo
    this.sprite = imageLoader.getImage('bigMonster');
  }

  update(player) {
    this.mover();

    // Verificar colisão com o jogador em que vai tirar 2 vidas
    if (Utils.detectarColisao(this, player)) {
      player.takeDamage(this.dano);
      return true;
    }
    return false;
  }

  mover() {
    // uso do this() (2 de 3 usos)
    this.moverBase(this.speed);
  }

  moverBase(speed) {
    this.x -= speed;
  }

  draw() {
    if (this.sprite) {
      ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }
  }
}

// # classe filha  herda de Inimigo
class FantasmaBranco extends Inimigo {
  constructor() {
    // uso do super() (3 de 3 usos)
    // varia a altura entre 90 e 110 pixels
    const alturaAleatoria = 90 + Math.floor(Math.random() * 20);
    const yPosicao = canvas.height - 150 - (alturaAleatoria - 90);
    super(canvas.width, yPosicao, 90, alturaAleatoria, 0);
    this.speed = 3; //  novo atributo
    this.sprite = imageLoader.getImage('whiteGhost');
  }

  update(player) {
    this.mover();

    // verifica a  colisão com o jogador e recupera 1 vida
    if (Utils.detectarColisao(this, player)) {
      player.gainHealth(1);
      return true;
    }
    return false;
  }

  mover() {
    // uso do this() (3 de 3 usos)
    this.moverBase(this.speed);
  }

  moverBase(speed) {
    this.x -= speed;
  }

  draw() {
    if (this.sprite) {
      ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }
  }
}