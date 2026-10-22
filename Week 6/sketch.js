let pet = {
  hunger: 100,
  energy: 100,
  happiness: 100,
  health: 100
};

let feedBtn;
let playBtn;
let sleepBtn;
let cleanBtn;

let emulHappy;
let emulSad;
let emulSick;
let emulSleeping;
let emulDead;

function preload() {

  emulHappy = loadImage("emul happy.png");
  emulSad = loadImage("emul sad.png");
  emulSick = loadImage("emul sick.png");
  emulSleeping = loadImage("emul sleeping.png");
  emulDead = loadImage("emul dood.png");

}

function setup() {

  createCanvas(1200, 700);

  loadGame();

  feedBtn = createButton("🍎 Voeden");
  feedBtn.position(30, 120);
  feedBtn.size(180, 50);
  feedBtn.mousePressed(feedPet);

  playBtn = createButton("⚔️ Spelen");
  playBtn.position(30, 190);
  playBtn.size(180, 50);
  playBtn.mousePressed(playPet);

  sleepBtn = createButton("🌙 Slapen");
  sleepBtn.position(30, 260);
  sleepBtn.size(180, 50);
  sleepBtn.mousePressed(sleepPet);

  cleanBtn = createButton("💧 Wassen");
  cleanBtn.position(30, 330);
  cleanBtn.size(180, 50);
  cleanBtn.mousePressed(cleanPet);

  setInterval(updateStats, 5000);

}

function draw() {

  background(20, 22, 30);

  drawSidebar();
  drawPet();
  drawStats();

}

function drawSidebar() {

  fill(35, 40, 55);
  noStroke();
  rect(0, 0, 240, height);

  fill(255);
  textSize(28);
  text("EMUL GX", 40, 60);

}

function drawPet() {

  let currentImage = emulHappy;

  if (pet.health <= 0) {
    currentImage = emulDead;
  }
  else if (pet.energy < 20) {
    currentImage = emulSleeping;
  }
  else if (pet.health < 30) {
    currentImage = emulSick;
  }
  else if (pet.happiness < 40) {
    currentImage = emulSad;
  }

  image(currentImage, 420, 150, 350, 350);

}

function drawStats() {

  fill(255);

  textSize(24);

  text("Honger: " + pet.hunger, 900, 170);
  text("Energie: " + pet.energy, 900, 220);
  text("Geluk: " + pet.happiness, 900, 270);
  text("Gezondheid: " + pet.health, 900, 320);

}

function feedPet() {

  pet.hunger += 20;
  pet.energy += 10;

  limitStats();
  saveGame();

}

function playPet() {

  pet.happiness += 20;
  pet.energy -= 15;
  pet.hunger -= 10;

  limitStats();
  saveGame();

}

function sleepPet() {

  pet.energy += 30;
  pet.health += 10;

  limitStats();
  saveGame();

}

function cleanPet() {

  pet.health += 15;

  limitStats();
  saveGame();

}

function updateStats() {

  if (pet.health <= 0) {
    return;
  }

  pet.hunger -= 5;
  pet.energy -= 3;
  pet.happiness -= 2;

  if (pet.hunger < 20 || pet.energy < 20) {
    pet.health -= 2;
  }

  limitStats();
  saveGame();

}

function limitStats() {

  pet.hunger = constrain(pet.hunger, 0, 100);
  pet.energy = constrain(pet.energy, 0, 100);
  pet.happiness = constrain(pet.happiness, 0, 100);
  pet.health = constrain(pet.health, 0, 100);

}

function saveGame() {

  localStorage.setItem("petData", JSON.stringify(pet));

}

function loadGame() {

  let savedData = localStorage.getItem("petData");

  if (savedData) {
    pet = JSON.parse(savedData);
  }

}