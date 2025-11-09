// herança de classe
class Jogador {
  
  #vida; // atributo private (3 de 3)
  constructor(type = 1) {
    this.w = 80;
    this.h = 80;
    this.x = 100;
    this.groundY = canvas.height - this.h - 30;
    this.y = this.groundY;

    this.speed = 6;
    this.jumpPower = 15;
    this.gravity = 0.8;
    this.velocityY = 0;
    this.isJumping = false;
    this.isCrouching = false;

    this.health = 4;
    this.fireballs = [];
    this.lastShot = 0;

    this.type = type;
    
    // carregar sprite correto 
    if (type === 1) {
      this.sprite = imageLoader.getImage('robot_idle');
    } else {
      this.sprite = imageLoader.getImage('cowboy_idle');
    }
  }

  update() {
    // movimento horizontal
    if (keys["ArrowLeft"]) {
      this.x -= this.speed;
    }
    if (keys["ArrowRight"]) {
      this.x += this.speed;
    }

    // abaixar
    if (keys["ArrowDown"]) {
      this.isCrouching = true;
      this.h = 60;
      this.y = canvas.height - this.h - 30;
    } else {
      this.isCrouching = false;
      this.h = 80;
      if (!this.isJumping) {
        this.y = this.groundY;
      }
    }

    // pular
    if (keys["ArrowUp"] && !this.isJumping) {
      this.velocityY = -this.jumpPower;
      this.isJumping = true;
    }

    // aqui tem física do pulo
    if (this.isJumping) {
      this.velocityY += this.gravity;
      this.y += this.velocityY;

      if (this.y >= this.groundY) {
        this.y = this.groundY;
        this.isJumping = false;
        this.velocityY = 0;
      }
    }

    // atirar (espaço ou seta para a esquerda)
    if (keys[" "] || keys["ArrowLeft"]) {
      const now = Date.now();
      if (now - this.lastShot > 300) {
        this.atirar();
        this.lastShot = now;
      }
    }

    // atualizar as bolas de fogo
    for (let i = this.fireballs.length - 1; i >= 0; i--) {
      const fireball = this.fireballs[i];
      fireball.mover();
      
      if (fireball.outOfBounds()) {
        this.fireballs.splice(i, 1);
      }
    }

    // limites da tela
    if (this.x < 0) this.x = 0;
    if (this.x + this.w > canvas.width) this.x = canvas.width - this.w;
  }

  draw() {
    // desenhar o sprite do jogador
    if (this.sprite) {
      ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    } else {
      // fallback se sprite não carregar
      ctx.fillStyle = "blue";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    // desenhar bolas de fogo
    for (let i = 0; i < this.fireballs.length; i++) {
      this.fireballs[i].desenhar(ctx);
    }
  }

  atirar() {
    this.fireballs.push(new Fogo(this.x + this.w - 10, this.y + this.h / 2 - 10, "direita"));
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      gameState = "gameover";
      music.pause();
    }
  }

  gainHealth(amount) {
    this.health = Math.min(4, this.health + amount);
  }
}
