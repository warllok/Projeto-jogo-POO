
class ImageLoader {
  constructor() {
    this.images = {};
    this.totalImages = 0;
    this.loadedImages = 0;
    this.isReady = false;
  }

  addImage(key, src) {
    this.totalImages++;
    const img = new Image();
    img.onload = () => {
      this.loadedImages++;
      if (this.loadedImages === this.totalImages) {
        this.isReady = true;
      }
    };
    img.onerror = () => {
      console.error(`Erro ao carregar imagem: ${src}`);
      this.loadedImages++;
      if (this.loadedImages === this.totalImages) {
        this.isReady = true;
      }
    };
    img.src = src;
    this.images[key] = img;
  }

  getImage(key) {
    return this.images[key];
  }

  getProgress() {
    return this.totalImages > 0 ? this.loadedImages / this.totalImages : 0;
  }
}

// instancia global do loader
const imageLoader = new ImageLoader();

// pre carregar todas as imagens do jogo
imageLoader.addImage('menuBackground', 'TELA INICIAL GAME/Gemini_Generated_Image_fcx4dgfcx4dgfcx4.png');
imageLoader.addImage('background', 'FUNDO JOGO/Free-Halloween-2D-Game-Backgrounds4.jpg');
imageLoader.addImage('heart', 'heart.png/heart pixel art 48x48.png');
imageLoader.addImage('fireball', 'fireball sprite/fireball.png');
imageLoader.addImage('ghost', 'GhostSprites.png/fantasma.png');
imageLoader.addImage('bigMonster', 'Monstro BIG/EnemyBig_1.png');
imageLoader.addImage('whiteGhost', 'fantasma branco/ghost.gif');

// Sprites Robô
imageLoader.addImage('robot_idle', 'robo.png/robotIdle (10).png');
imageLoader.addImage('robot_run1', 'robo.png/robotRunShoot (7).png');
imageLoader.addImage('robot_run2', 'robo.png/robot.png');
imageLoader.addImage('robot_jump', 'robo.png/robotJump (7).png');
imageLoader.addImage('robot_attack', 'robo.png/JumpShoot (1).png');
imageLoader.addImage('robot_crouch', 'robo.png/agaixarSlide (10).png');

// Sprites Cowboy
imageLoader.addImage('cowboy_idle', 'assets/cowboy.png/cowboyIdle__000.png');
imageLoader.addImage('cowboy_run1', 'assets/cowboy.png/cowboyRun__008.png');
imageLoader.addImage('cowboy_run2', 'assets/cowboy.png/cowboy.png');
imageLoader.addImage('cowboy_jump', 'assets/cowboy.png/cowboyjump.png');
imageLoader.addImage('cowboy_attack', 'assets/cowboy.png/cowboySlide__009.png');
imageLoader.addImage('cowboy_crouch', 'assets/cowboy.png/cowboySlide__009.png');
