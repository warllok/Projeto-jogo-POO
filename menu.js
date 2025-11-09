
function drawMenu() {
  // Desenhar sprite de fundo da tela inicial
  const menuBackground = imageLoader.getImage('menuBackground');
  if (menuBackground) {
    ctx.drawImage(menuBackground, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = "MidnightBlue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  ctx.fillStyle = "RED";
  ctx.font = "30px monospace";
  ctx.fillText(" Ghost Hunter 👻", 274, 150);
  ctx.font = "20px monospace";
  
  // Opção 1 jogar
  if (hoveredOption === 1) {
    ctx.fillStyle = "#FFD700"; // Dourado quando hover
    ctx.fillRect(340, 230, 220, 35);
    ctx.fillStyle = "black";
  } else {
    ctx.fillStyle = "white";
  }
  ctx.fillText("Jogar", 350, 250);
  
  // Opção 2  escolher personagem
  if (hoveredOption === 2) {
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(340, 280, 280, 35);
    ctx.fillStyle = "black";
  } else {
    ctx.fillStyle = "GreenYellow";
  }
  ctx.fillText("Personagens", 350, 300);
  
  // opção 3 sair
  if (hoveredOption === 3) {
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(340, 330, 160, 35);
    ctx.fillStyle = "black";
  } else {
    ctx.fillStyle = "purple";
  }
  ctx.fillText("Sair", 350, 350);
}

function drawSelect() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "20px monospace";
  ctx.fillText("Personagens:", 300, 150);
  
  // Opção 1 - robô
  if (hoveredOption === 1) {
    ctx.fillStyle = "#00BFFF"; // Azul quando hover
    ctx.fillRect(340, 230, 160, 35);
    ctx.fillStyle = "black";
  } else {
    ctx.fillStyle = "white";
  }
  ctx.fillText("1 - Robô", 350, 250);
  
  // Opção 2 - cowboy
  if (hoveredOption === 2) {
    ctx.fillStyle = "#FF8C00"; // laranja quando tiver
    ctx.fillRect(340, 280, 200, 35);
    ctx.fillStyle = "black";
  } else {
    ctx.fillStyle = "white";
  }
  ctx.fillText("2 - Cowboy", 350, 300);
  
  // botão de voltar
  if (hoveredOption === 3) {
    ctx.fillStyle = "#FF6347"; // vermelho quando tiver
    ctx.fillRect(310, 380, 280, 35);
    ctx.fillStyle = "white";
  } else {
    ctx.fillStyle = "white";
  }
  ctx.fillText("Voltar", 320, 400);
}

let hoveredOption = 0;

// detectar movimento do mouse
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  if (gameState === "menu") {
    hoveredOption = 0;
    // Jogar
    if (x >= 340 && x <= 560 && y >= 230 && y <= 265) {
      hoveredOption = 1;
    }
    // escolher personagem
    else if (x >= 340 && x <= 620 && y >= 280 && y <= 315) {
      hoveredOption = 2;
    }
    // Sair
    else if (x >= 340 && x <= 500 && y >= 330 && y <= 365) {
      hoveredOption = 3;
    }
  } else if (gameState === "select") {
    hoveredOption = 0;
    // Robô
    if (x >= 340 && x <= 500 && y >= 230 && y <= 265) {
      hoveredOption = 1;
    }
    // Cowboy
    else if (x >= 340 && x <= 540 && y >= 280 && y <= 315) {
      hoveredOption = 2;
    }
    // Voltar
    else if (y >= 380 && y <= 415 && x >= 310 && x <= 590) {
      hoveredOption = 3;
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (gameState === "menu") {
    if (e.key === "1") {
      jogo = new Jogo(selectedPlayer);
      gameState = "play";
      music.play();
    } else if (e.key === "2") {
      gameState = "select";
    } else if (e.key === "3") {
      window.close();
    }
  } else if (gameState === "select") {
    if (e.key === "1") {
      selectedPlayer = 1;
      gameState = "menu";
    } else if (e.key === "2") {
      selectedPlayer = 2;
      gameState = "menu";
    } else if (e.key === "b" || e.key === "B") {
      gameState = "menu";
    }
  }
});

// adicionar o clique no botão voltar e no menu
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // o menu principal
  if (gameState === "menu") {
    // Jogar
    if (x >= 340 && x <= 560 && y >= 230 && y <= 265) {
      jogo = new Jogo(selectedPlayer);
      gameState = "play";
      music.play();
    }
    // Escolher personagem
    else if (x >= 340 && x <= 620 && y >= 280 && y <= 315) {
      gameState = "select";
    }
    // Sair
    else if (x >= 340 && x <= 500 && y >= 330 && y <= 365) {
      window.close();
    }
  }
  
  // Menu de seleção
  if (gameState === "select") {
    // Robô
    if (x >= 340 && x <= 500 && y >= 230 && y <= 265) {
      selectedPlayer = 1;
      gameState = "menu";
    }
    // Cowboy
    else if (x >= 340 && x <= 540 && y >= 280 && y <= 315) {
      selectedPlayer = 2;
      gameState = "menu";
    }
    // voltar
    else if (y >= 380 && y <= 415 && x >= 310 && x <= 590) {
      gameState = "menu";
    }
  }
  
  // verificando  se clicou no botão circular "Voltar" nas telas de game over ou win
  if (gameState === "gameover" || gameState === "win") {
    const buttonX = canvas.width / 2;
    const buttonY = 350;
    const buttonRadius = 50;
    
    const distance = Math.sqrt((x - buttonX) ** 2 + (y - buttonY) ** 2);
    
    if (distance <= buttonRadius) {
      // resetar o jogo
      jogo = new Jogo(selectedPlayer);
      gameState = "menu";
      music.pause();
    }
  }
});
