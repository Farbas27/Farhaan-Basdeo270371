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

function setup() {
  createCanvas(800, 600);

  loadGame();

  feedBtn = createButton("Voeden");
  feedBtn.position(50, 500);
  feedBtn.mousePressed(feedPet);

  playBtn = createButton("Spelen");
  playBtn.position(150, 500);
  playBtn.mousePressed(playPet);

  sleepBtn = createButton("Slapen");
  sleepBtn.position(250, 500);
  sleepBtn.mousePressed(sleepPet);

  cleanBtn = createButton("Schoonmaken");
  cleanBtn.position(350, 500);
  cleanBtn.mousePressed(cleanPet);

  setInterval(updateStats, 2000);
}

function draw() {
  background(220);

  drawPet();
  drawStats();
}

function drawPet() {
  fill(255, 200, 0);
  ellipse(width / 2, 250, 200, 200);

  fill(0);
  ellipse(width / 2 - 40, 220, 20);
  ellipse(width / 2 + 40, 220, 20);

  noFill();
  strokeWeight(4);

  if (pet.happiness > 70) {
    arc(width / 2, 280, 60, 40, 0, PI);
  } else if (pet.happiness > 30) {
    line(width / 2 - 20, 280, width / 2 + 20, 280);
  } else {
    arc(width / 2, 300, 60, 40, PI, TWO_PI);
  }

  if (pet.health < 30) {
    fill('green');
    textSize(30);
    text("ziek", width / 2 - 15, 180);
  }
}

function drawStats() {
  fill(0);
  textSize(20);

  text("Honger: " + pet.hunger, 50, 50);
  text("Energie: " + pet.energy, 50, 80);
  text("Geluk: " + pet.happiness, 50, 110);
  text("Gezondheid: " + pet.health, 50, 140);
}

function feedPet() {
  pet.hunger += 20;
  pet.energy += 10;

  if (pet.hunger > 120) {
    pet.health -= 10;
  }

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