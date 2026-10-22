let pet = {
  hunger: 100,
  energy: 100,
  happiness: 100,
  health: 100
};

let currentAction = "";
let actionTimer = 0;
let menuOpen = false;

let bgImg;
let sidebarImg;

let emulNormal;
let emulHappy;
let emulSad;
let emulSick;
let emulSleeping;
let emulDead;
let emulFood;

let foodBtnImg;
let gameBtnImg;
let healBtnImg;
let cleanBtnImg;
let sleepBtnImg;

let eatActive;
let healActive;
let playActive;
let cleanActive;
let sleepActive;

function preload() {

  bgImg = loadImage("emul achtergrond.png");
  sidebarImg = loadImage("zijde bare.png");

  emulNormal = loadImage("emul.png");
  emulHappy = loadImage("emul happy.png");
  emulSad = loadImage("emul sad.png");
  emulSick = loadImage("emul sick.png");
  emulSleeping = loadImage("emul sleeping.png");
  emulDead = loadImage("emul dood.png");
  emulFood = loadImage("emul with food.png");

  foodBtnImg = loadImage("food butten.png");
  gameBtnImg = loadImage("game butten.png");
  healBtnImg = loadImage("heal butten.png");
  cleanBtnImg = loadImage("schoonmaak butten.png");
  sleepBtnImg = loadImage("sleep butten.png");

  eatActive = loadImage("eten actief.png");
  healActive = loadImage("genezen actief.png");
  playActive = loadImage("spelen actief.png");
  cleanActive = loadImage("schoonmaak actief.png");
  sleepActive = loadImage("slaap actief.png");
}

function setup() {
  createCanvas(1280, 720);

  setInterval(updateStats, 5000);
}

function draw() {

  background(0);

  image(bgImg, 0, 0, width, height);

  if (mouseX < 60) {
    menuOpen = true;
  }

  if (mouseX > 250) {
    menuOpen = false;
  }

  if (menuOpen) {
    image(sidebarImg, 0, 0, 220, height);
    drawButtons();
  }

  drawPet();
  drawAction();
  drawStats();

  if (pet.health <= 0) {

    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(50);

    text(
      "GAME OVER",
      width / 2,
      100
    );
  }
}

function drawButtons() {

  image(foodBtnImg, 20, 120, 180, 80);
  image(gameBtnImg, 20, 220, 180, 80);
  image(healBtnImg, 20, 320, 180, 80);
  image(cleanBtnImg, 20, 420, 180, 80);
  image(sleepBtnImg, 20, 520, 180, 80);
}

function drawPet() {

  let currentImage;

  if (pet.health <= 0) {

    currentImage = emulDead;

  } else if (
    currentAction === "food" &&
    actionTimer > 0
  ) {

    currentImage = emulFood;

  } else if (
    pet.health < 30
  ) {

    currentImage = emulSick;

  } else if (
    pet.energy < 30
  ) {

    currentImage = emulSleeping;

  } else if (
    pet.happiness < 40
  ) {

    currentImage = emulSad;

  } else if (
    pet.happiness > 80
  ) {

    currentImage = emulHappy;

  } else {

    currentImage = emulNormal;
  }

  image(
    currentImage,
    420,
    320,
    350,
    400
  );
}

function drawAction() {

  if (actionTimer <= 0) {
    return;
  }

  let img;

  if (currentAction === "food") {
    img = eatActive;
  }

  if (currentAction === "play") {
    img = playActive;
  }

  if (currentAction === "heal") {
    img = healActive;
  }

  if (currentAction === "clean") {
    img = cleanActive;
  }

  if (currentAction === "sleep") {
    img = sleepActive;
  }

  if (img) {
    image(img, 450, 80, 300, 80);
  }

  actionTimer--;
}

function drawStats() {

  fill(255);
  textSize(24);
  textAlign(LEFT);

  text("Honger: " + pet.hunger, 950, 180);
  text("Energie: " + pet.energy, 950, 240);
  text("Geluk: " + pet.happiness, 950, 300);
  text("Gezondheid: " + pet.health, 950, 360);
}

function mousePressed() {

  if (pet.health <= 0) {
    return;
  }

  if (
    mouseX > 20 &&
    mouseX < 200
  ) {

    if (
      mouseY > 120 &&
      mouseY < 200
    ) {
      feedPet();
    }

    if (
      mouseY > 220 &&
      mouseY < 300
    ) {
      playPet();
    }

    if (
      mouseY > 320 &&
      mouseY < 400
    ) {
      healPet();
    }

    if (
      mouseY > 420 &&
      mouseY < 500
    ) {
      cleanPet();
    }

    if (
      mouseY > 520 &&
      mouseY < 600
    ) {
      sleepPet();
    }
  }
}

function feedPet() {

  pet.hunger += 25;
  pet.energy += 15;

  currentAction = "food";
  actionTimer = 180;

  limitStats();
}

function playPet() {

  pet.happiness += 20;
  pet.energy -= 10;
  pet.hunger -= 10;

  currentAction = "play";
  actionTimer = 180;

  limitStats();
}

function healPet() {

  pet.health += 25;

  currentAction = "heal";
  actionTimer = 180;

  limitStats();
}

function cleanPet() {

  pet.health += 15;

  currentAction = "clean";
  actionTimer = 180;

  limitStats();
}

function sleepPet() {

  pet.energy += 25;
  pet.health += 15;

  currentAction = "sleep";
  actionTimer = 180;

  limitStats();
}

function updateStats() {

  if (pet.health <= 0) {
    return;
  }

  pet.hunger -= 5;
  pet.energy -= 4;
  pet.happiness -= 3;

  if (
    pet.hunger < 20 ||
    pet.energy < 20
  ) {
    pet.health -= 3;
  }

  limitStats();
}

function limitStats() {

  pet.hunger = constrain(
    pet.hunger,
    0,
    100
  );

  pet.energy = constrain(
    pet.energy,
    0,
    100
  );

  pet.happiness = constrain(
    pet.happiness,
    0,
    100
  );

  pet.health = constrain(
    pet.health,
    0,
    100
  );
}