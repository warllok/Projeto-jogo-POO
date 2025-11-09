
//  funções utilitárias gerais do jogo


 Classe utilitária com métodos estáticos
class Utils {
  //  atributo estático controla o número total de instâncias criadas
  static totalInstancias = 0;

  //  método estático 1
  static detectarColisao(obj1, obj2) {
    return (
      obj1.x < obj2.x + obj2.w &&
      obj1.x + obj1.w > obj2.x &&
      obj1.y < obj2.y + obj2.h &&
      obj1.y + obj1.h > obj2.y
    );
  }

  //  método estático 2
  static gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //  método estático 3
  static aumentarInstancias() {
    this.totalInstancias++; // uso do this() 
  }
}

export default Utils;
