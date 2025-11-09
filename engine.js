
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let keys = {};
let gameState = "menu";
let selectedPlayer = 1;
let music = {
  play: () => {},
  pause: () => {},
  loop: true
};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);
