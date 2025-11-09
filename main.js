let jogo = new Jogo();
gameState = "loading"; // começa carregando

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameState === "loading") {
    // tela de carregamento
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px monospace";
    ctx.fillText("Carregando...", 320, 220);
    
    // barra de progresso
    const progress = imageLoader.getProgress();
    ctx.fillStyle = "#333";
    ctx.fillRect(250, 260, 400, 30);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(250, 260, 400 * progress, 30);
    
    ctx.font = "16px monospace";
    ctx.fillText(`${Math.floor(progress * 100)}%`, 420, 282);
    
    // quando tudo carregar ira pro menu
    if (imageLoader.isReady) {
      gameState = "menu";
    }
  } else if (gameState === "menu") drawMenu();
  else if (gameState === "select") drawSelect();
  else if (gameState === "play") {
    jogo.update();
    jogo.draw();
  } else if (gameState === "gameover") {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "40px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, 220);
    
    ctx.fillStyle = "white";
    ctx.font = "20px monospace";
    ctx.fillText("Tente de novo", canvas.width / 2, 260);
    ctx.textAlign = "left";

    // botão de voltar
    ctx.fillStyle = "#444";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 350, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.fillText("VOLTAR", canvas.width / 2, 355);
    ctx.textAlign = "left";
  } else if (gameState === "win") {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lime";
    ctx.font = "40px monospace";
    ctx.fillText(" VOCÊ VENCEU!", 250, 250);

    // botão de voltar
    ctx.fillStyle = "#444";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 350, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.fillText("VOLTAR", canvas.width / 2, 355);
    ctx.textAlign = "left";
  }

  requestAnimationFrame(loop);
}
loop();