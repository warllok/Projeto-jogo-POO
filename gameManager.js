class Utils {
  // 3 metodos estáticos exigidos
  static gerarNumeroAleatorio(min, max) {
    return Math.random() * (max - min) + min;
  }

  static detectarColisao(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  static tocarSom(nome) {
    console.log(`Som ${nome} tocado!`);
  }
}

class Jogo {
  #kills; // privado

  constructor(playerType = 1) {
    this.player = new Jogador(playerType);
    this.fantasmas = [];
    this.#kills = 0;
    this.spawnCounter = 0;
    this.bigMonsterSpawned = 0;
    this.whiteGhostSpawned = 0;
    this.backgroundSprite = imageLoader.getImage('background');
  }

  get kills() {
    return this.#kills;
  }

  set kills(value) {
    this.#kills = Math.max(0, value);
  }

  update() {
    this.player.update();
    this.spawnCounter++;

    // big monsters
    if ((this.kills === 12 || this.kills === 24 || this.kills === 36 || this.kills === 48 || this.kills === 58) && this.bigMonsterSpawned < 5) {
      let alreadyHasBigMonster = this.fantasmas.some(f => f instanceof MonstroBig);
      if (!alreadyHasBigMonster) {
        this.fantasmas.push(new MonstroBig());
        this.bigMonsterSpawned++;
      }
    }

    // white ghost
    if ((this.kills === 20 || this.kills === 40) && this.whiteGhostSpawned < 2) {
      let alreadyHasWhiteGhost = this.fantasmas.some(f => f instanceof FantasmaBranco);
      if (!alreadyHasWhiteGhost) {
        this.fantasmas.push(new FantasmaBranco());
        this.whiteGhostSpawned++;
      }
    }

    // fantasmas comuns
    if (this.spawnCounter % 90 === 0 && this.kills < 60) {
      this.fantasmas.push(new Fantasma());
    }

    // atualizar fantasmas
    for (let i = this.fantasmas.length - 1; i >= 0; i--) {
      const fantasma = this.fantasmas[i];
      
      // verificando colisão com bolas de fogo primeiro
      let hitByFireball = false;
      for (let j = this.player.fireballs.length - 1; j >= 0; j--) {
        const fireball = this.player.fireballs[j];
        if (Utils.detectarColisao(fantasma, fireball)) {
          // incrementando kills apenas se NÃO for os fantasma branco
          if (!(fantasma instanceof FantasmaBranco)) {
            this.kills++;
          }
          this.explosao(fantasma.x, fantasma.y);
          this.fantasmas.splice(i, 1);
          this.player.fireballs.splice(j, 1);
          Utils.tocarSom("explosao");
          hitByFireball = true;
          break;
        }
      }
      
      // se não foi atingido por bola de fogo atualizar  normalmente
      if (!hitByFireball && this.fantasmas[i]) {
        const colidiu = this.fantasmas[i].update(this.player);
        
        // remove inimigos que colidiram com o jogador (exceto os fantasmaBranco que só cura)
        if (colidiu) {
          this.fantasmas.splice(i, 1);
        }
      }
      
      // remove fantasmas que saíram da tela
      if (this.fantasmas[i] && this.fantasmas[i].x + this.fantasmas[i].w < 0) {
        this.fantasmas.splice(i, 1);
      }
    }

    if (this.kills >= 60 && this.player.health > 0) {
      gameState = "win";
      music.pause();
    }
  }

  draw() {
    ctx.drawImage(this.backgroundSprite, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 100, 0, 0.3)";
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    this.player.draw();
    this.fantasmas.forEach(f => f.draw());
    this.drawHUD();
  }

  drawHUD() {
    ctx.fillStyle = "white";
    ctx.font = "16px monospace";
    ctx.fillText(`Inimigos derrotados: ${this.kills}/60`, 20, 20);
    this.drawHearts();
  }

  drawHearts() {
    const heartSprite = imageLoader.getImage('heart');
    for (let i = 0; i < 4; i++) {
      if (i < this.player.health) {
        ctx.drawImage(heartSprite, 20 + i * 35, 30, 30, 30);
      }
    }
  }

  explosao(x, y) {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  }
}
