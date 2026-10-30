let pet = {
  hunger: 100,
  energy: 100,
  happiness: 100,
  health: 100,
};
const petName = "Emul";

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

let gameMenuOpen = false;
let minesweeperOpen = false;

let msRows = 8;
let msCols = 8;
let msCellSize = 50;

let msBoard = [];
let msGameOver = false;
let msWin = false;

let farmOpen = false;
let farmTiles = [];
let farmRows = 4;
let farmCols = 4;
let farmSize = 64;

let farmDirt;
let crop1;
let crop2;
let crop3;
let houseImg;
let chestImg;
let treeImg;
let roadImg;
let grassImg;

//  ALLE AFBEELDINGEN LADEN
function preload() {
  // Achtergrond
bgImg = loadImage("assets/psd/emul achtergrond.png");
sidebarImg = loadImage("assets/foto/zijde bare.png");

// Emul sprites
emulNormal = loadImage("assets/foto/emul character/emul.png");
emulHappy = loadImage("assets/foto/emul character/emul happy.png");
emulSad = loadImage("assets/foto/emul character/emul sad.png");
emulSick = loadImage("assets/psd/emul sick.png");
emulSleeping = loadImage("assets/foto/emul character/emul sleeping.png");
emulDead = loadImage("assets/foto/emul character/emul dood.png");
emulFood = loadImage("assets/foto/emul character/emul with food.png");

// Knoppen
foodBtnImg = loadImage("assets/foto/butten/food butten.png");
gameBtnImg = loadImage("assets/foto/butten/game butten.png");
healBtnImg = loadImage("assets/foto/butten/heal butten.png");
cleanBtnImg = loadImage("assets/foto/butten/schoonmaak butten.png");
sleepBtnImg = loadImage("assets/foto/butten/sleep butten.png");

// Actieve icoontjes
eatActive = loadImage("assets/foto/activiteit borden/eten actief.png");
healActive = loadImage("assets/foto/activiteit borden/genezen actief.png");
playActive = loadImage("assets/foto/activiteit borden/spelen actief.png");
cleanActive = loadImage("assets/foto/activiteit borden/schoonmaak actief.png");
sleepActive = loadImage("assets/foto/activiteit borden/slaap actief.png");

// Tomato crop
seedImg = loadImage("Tomato/1 - Tomato Seed.png");

crop1 = loadImage("Tomato/2 - Tomato Sprout.png");
crop2 = loadImage("Tomato/3 - Tomato Mid.png");
crop3 = loadImage("Tomato/4 - Tomato Full.png");

cropWilt = loadImage("Tomato/5 - Tomato Wilt.png");

cropInventory = loadImage("Tomato/6 - Tomato Inventory.png");
cropPouch = loadImage("Tomato/7 - Tomato Pouch.png");
cropSign = loadImage("Tomato/8 - Tomato Sign.png");

// Wheat
wheat1 = loadImage("Wheat/2 - Wheat Sprout.png");
wheat2 = loadImage("Wheat/3 - Wheat Mid.png");
wheat3 = loadImage("Wheat/4 - Wheat Full.png");

// Potato
potato1 = loadImage("Potato/2 - Potato Sprout.png");
potato2 = loadImage("Potato/3 - Potato Mid.png");
potato3 = loadImage("Potato/4 - Potato Full.png");

// Pumpkin
pumpkin1 = loadImage("Pumpkin/2 - Pumpkin Sprout.png");
pumpkin2 = loadImage("Pumpkin/3 - Pumpkin Mid.png");
pumpkin3 = loadImage("Pumpkin/4 - Pumpkin Full.png");

// Tomato
tomato1 = loadImage("Tomato/2 - Tomato Sprout.png");
tomato2 = loadImage("Tomato/3 - Tomato Mid.png");
tomato3 = loadImage("Tomato/4 - Tomato Full.png");

houseImg = loadImage("farm assets/House.png");
chestImg = loadImage("farm assets/Chest.png");
treeImg = loadImage("farm assets/Maple Tree.png");
roadImg = loadImage("farm assets/Road Corner.png");
grassImg = loadImage("farm assets/Tileset Grass Spring.png");

}

// START VAN HET SPEL
function setup() {
  createCanvas(1280, 720);
  localStorage.clear();

  // Laad opgeslagen data
  loadGame();

  // Elke 5 seconden stats verversen
  setInterval(updateStats, 5000);
  // Elke 5 seconden autosave
  setInterval(saveGame, 5000);

  for (let r = 0; r < farmRows; r++) {
  farmTiles[r] = [];

  for (let c = 0; c < farmCols; c++) {
    farmTiles[r][c] = {
      stage: 0,
      timer: 0
    };
  }
}
}

// HOOFDLOOP
function draw() {
  background(0);
  // Dag/nacht systeem
  let currentHour = hour();

  if (currentHour >= 18 || currentHour < 6) {
    tint(120);
  } else {
    noTint();
  }

  // Titel
  fill(255);
  textSize(32);
  textAlign(CENTER);

  text("Emul", width / 2, 60);

  // Achtergrond tekenen
  image(bgImg, 0, 0, width, height);

  // Sidebar openen bij hover
  if (mouseX < 60) {
    menuOpen = true;
  }

  // Sidebar sluiten
  if (mouseX > 250) {
    menuOpen = false;
  }

  // Sidebar tekenen
  if (menuOpen) {
    image(sidebarImg, 0, 0, 220, height);
    drawButtons();
  }

  // Hoofdonderdelen tekenen
  drawPet();
  drawAction();
  drawStats();

  // Minigame menu
  if (gameMenuOpen) {
    drawGameMenu();
  }
  // Minesweeper scherm
  if (minesweeperOpen) {
    drawMinesweeper();
  }

  // Game over scherm
  if (pet.health <= 0) {
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(50);

    text("GAME OVER", width / 2, 100);
  }
  if (farmOpen) {
  drawFarm();
}
}

// Tekent alle knoppen in de zijbalk
function drawButtons() {
  image(foodBtnImg, 20, 120, 180, 80);
  image(gameBtnImg, 20, 220, 180, 80);
  image(healBtnImg, 20, 320, 180, 80);
  image(cleanBtnImg, 20, 420, 180, 80);
  image(sleepBtnImg, 20, 520, 180, 80);
}

// Tekent Emul afhankelijk van zijn huidige toestand
function drawPet() {
  let currentImage;

  if (pet.health <= 0) {
    currentImage = emulDead;
  } else if (currentAction === "food" && actionTimer > 0) {
    currentImage = emulFood;
  } else if (pet.health < 30) {
    currentImage = emulSick;
  } else if (pet.energy < 30) {
    currentImage = emulSleeping;
  } else if (pet.happiness < 40) {
    currentImage = emulSad;
  } else if (pet.happiness > 80) {
    currentImage = emulHappy;
  } else {
    currentImage = emulNormal;
  }

  image(currentImage, 420, 320, 350, 400);
}

// Toont de afbeelding van de huidige actie
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

// Toont alle statistieken van Emul in RPG-stijl
function drawStats() {
  push();

  // BOVENSTE GEDEELTE (Naam, Level & Grote Gezondheidsbalk)
  fill(255);
  textAlign(LEFT, TOP);

  textSize(40);
  textStyle(BOLD);
  text("Emul", 900, 80);

  textSize(16);
  textStyle(NORMAL);
  fill(180);
  text("PET", 900, 125);

  // Level (bijv. gebaseerd op totale stats of vast level)
  fill(255);
  textSize(28);
  textStyle(BOLD);
  text("Lv1", 1080, 80);

  // Grote HP Tekst & Waarde
  textSize(36);
  textStyle(BOLD);
  text("HP  " + pet.health + "/100", 900, 150);

  // De grote boog/balk nabootsen onder de HP (Achtergrond + gevulde balk)
  noStroke();
  fill(80);
  rect(900, 200, 300, 12, 6);

  fill(255, 215, 0);
  let barWidth = map(pet.health, 0, 100, 0, 300);
  rect(900, 200, barWidth, 12, 6);

  // MIDDELSTE GEDEELTE (Job / Status beschrijving)
  fill(255);
  textSize(22);
  textStyle(BOLD);
  text("Job:", 900, 240);

  textStyle(NORMAL);
  textSize(20);
  text("Tamagotchi /\nCompanion", 960, 240);

  // ONDERSTE GEDEELTE (De overige statistieken in kolommen)
  textSize(22);
  let labelX1 = 900; // Eerste kolom labels
  let valueX1 = 1010; // Eerste kolom waardes
  let labelX2 = 1080; // Tweede kolom labels
  let valueX2 = 1190; // Tweede kolom waardes

  // Rij 1
  textStyle(BOLD);
  fill(200);
  text("HUNGER", labelX1, 330);
  textStyle(NORMAL);
  fill(255);
  text(pet.hunger, valueX1, 330);

  textStyle(BOLD);
  fill(200);
  text("ENERGY", labelX2, 330);
  textStyle(NORMAL);
  fill(255);
  text(pet.energy, valueX2, 330);

  // Rij 2
  textStyle(BOLD);
  fill(200);
  text("HAPPINESS", labelX1, 380);
  textStyle(NORMAL);
  fill(255);
  text(pet.happiness, valueX1, 380);

  textStyle(BOLD);
  fill(200);
  text("LUCK", labelX2, 380);
  textStyle(NORMAL);
  fill(255);
  text("85", valueX2, 380); // Extra RPG

  pop();
}

// Tekent het Minesweeper speelveld
function drawMinesweeper() {
  fill(0, 220);
  rect(0, 0, width, height);

  let startX = 440;
  let startY = 130;

  for (let r = 0; r < msRows; r++) {
    for (let c = 0; c < msCols; c++) {
      let cell = msBoard[r][c];

      let x = startX + c * msCellSize;
      let y = startY + r * msCellSize;

      if (cell.revealed) {
        fill(180);
      } else {
        fill(120);
      }

      rect(x, y, msCellSize, msCellSize);

      // Vlag tekenen
      if (cell.flagged && !cell.revealed) {
        fill(255, 0, 0);
        textSize(28);
        textAlign(CENTER, CENTER);
        text("Vlag", x + 25, y + 25);
      }

      if (cell.revealed) {
        if (cell.mine) {
          fill(255, 0, 0);

          ellipse(x + 25, y + 25, 20, 20);
        } else {
          fill(0);
          textSize(20);
          textAlign(CENTER, CENTER);

          if (cell.count > 0) {
            text(cell.count, x + 25, y + 25);
          }
        }
      }
    }
  }

  function drawFarm() {

  background(80, 170, 80);

  // Gras achtergrond
  if (grassImg) {
    image(grassImg, 0, 0, width, height);
  }

  // Titel
  fill(255);
  textAlign(CENTER);
  textSize(40);
  text("EMUL FARM", width / 2, 60);

  // Huis
  if (houseImg) {
    image(houseImg, 150, 120, 160, 160);
  }

  // Kist
  if (chestImg) {
    image(chestImg, 350, 210, 64, 64);
  }

  // Pad
  if (roadImg) {
    image(roadImg, 280, 280, 64, 64);
    image(roadImg, 344, 280, 64, 64);
    image(roadImg, 408, 280, 64, 64);
  }

  // Bomen
  if (treeImg) {

    image(treeImg, 20, 20, 96, 96);
    image(treeImg, 20, 550, 96, 96);

    image(treeImg, 1150, 20, 96, 96);
    image(treeImg, 1150, 550, 96, 96);

    image(treeImg, 1050, 20, 96, 96);
    image(treeImg, 1050, 550, 96, 96);
  }

  // Akker
  let startX = 500;
  let startY = 200;

  for (let r = 0; r < farmRows; r++) {
    for (let c = 0; c < farmCols; c++) {

      let x = startX + c * farmSize;
      let y = startY + r * farmSize;

      if (farmDirt) {
        image(farmDirt, x, y, farmSize, farmSize);
      } else {
        fill(120, 80, 40);
        rect(x, y, farmSize, farmSize);
      }

      let tile = farmTiles[r][c];

      if (tile.stage === 1 && crop1) {
        image(crop1, x, y, farmSize, farmSize);
      }

      if (tile.stage === 2 && crop2) {
        image(crop2, x, y, farmSize, farmSize);
      }

      if (tile.stage === 3 && crop3) {
        image(crop3, x, y, farmSize, farmSize);
      }
    }
  }

  // Instructies
  fill(255);
  textAlign(LEFT);
  textSize(20);

  text("Klik op een akker om te planten", 900, 180);
  text("Klik een volgroeide plant om te oogsten", 900, 210);
  text("F = Farm sluiten/openen", 900, 240);
}

  fill(255);

  textSize(40);

  text("Minesweeper", width / 2, 70);

  // Titel
  fill(255);
  textSize(40);
  text("Minesweeper", width / 2, 70);

  // INSTRUCTIES
  fill(255);
  textAlign(LEFT);
  textSize(22);

  text("INSTRUCTIES", 900, 150);

  textSize(18);
  text("Linkermuisknop:", 900, 190);
  text("Open een vakje", 900, 215);

  text("Rechtermuisknop:", 900, 260);
  text("Plaats een vlag", 900, 285);

  text("Doel:", 900, 330);
  text("Open alle veilige", 900, 355);
  text("vakjes zonder", 900, 380);
  text("een mijn te raken.", 900, 405);

  text("Mijnen: 10", 900, 460);
  text("Veilige vakjes: 54", 900, 490);

  if (msGameOver) {
    fill(255, 0, 0);

    text("VERLOREN", width / 2, 620);
  }

  if (msWin) {
    fill(0, 255, 0);

    text("GEWONNEN", width / 2, 620);
  }
}

// Verwerkt alle muisklikken in het spel
function mousePressed() {
  if (pet.health <= 0) {
    return;
  }

  if (mouseX > 20 && mouseX < 200) {
    if (mouseY > 120 && mouseY < 200) {
      feedPet();
    }

    if (mouseY > 220 && mouseY < 300) {
      playPet();
    }

    if (mouseY > 320 && mouseY < 400) {
      healPet();
    }

    if (mouseY > 420 && mouseY < 500) {
      cleanPet();
    }

    if (mouseY > 520 && mouseY < 600) {
      sleepPet();
    }
  }
  if (gameMenuOpen) {
    if (mouseX > 350 && mouseX < 600 && mouseY > 250 && mouseY < 350) {
      startMinesweeper();
    }

    if (mouseX > 680 && mouseX < 930 && mouseY > 250 && mouseY < 350) {
      startGuessGame();
    }
    return;
  }
  if (minesweeperOpen) {
    handleMinesweeperClick();

    return;
  }
  if (farmOpen) {
  handleFarmClick();
  return;
}
}

// Geeft Emul eten en verhoogt honger en energie
function feedPet() {
  pet.hunger += 25;
  pet.energy += 15;

  // Te veel eten is ongezond
  if (pet.hunger > 90) {
    pet.health -= 10;
  }

  currentAction = "food";
  actionTimer = 180;

  limitStats();

  saveGame();
}

// Opent het minigame menu
function playPet() {
  gameMenuOpen = true;
}

// Geneest Emul en verhoogt gezondheid
function healPet() {
  pet.health += 25;

  currentAction = "heal";
  actionTimer = 180;

  limitStats();
  saveGame();
}

// Maakt Emul schoon en verhoogt gezondheid
function cleanPet() {
  pet.health += 15;

  currentAction = "clean";
  actionTimer = 180;

  limitStats();
  saveGame();
}

// Laat Emul slapen en herstelt energie
function sleepPet() {
  pet.energy += 25;
  pet.health += 15;

  currentAction = "sleep";
  actionTimer = 180;

  limitStats();
  saveGame();
}

// Verlaagt automatisch de stats van Emul
function updateStats() {
  if (pet.health <= 0) {
    return;
  }

  pet.hunger -= 5;
  pet.energy -= 4;
  pet.happiness -= 3;

  let currentHour = hour();

  if (currentHour >= 18 || currentHour < 6) {
    pet.energy -= 2;
  }

  // Slechte stats verminderen gezondheid
  if (pet.hunger < 20 || pet.energy < 20) {
    pet.health -= 3;
  }

  // Kans om ziek te worden
  if (random(100) < 5) {
    pet.health -= 10;

    currentAction = "heal";
    actionTimer = 180;
  }
  for (let r = 0; r < farmRows; r++) {
  for (let c = 0; c < farmCols; c++) {

    let tile = farmTiles[r][c];

    if (tile.stage > 0 && tile.stage < 3) {

      tile.timer++;

      if (tile.timer >= 3) {
        tile.stage++;
        tile.timer = 0;
      }
    }
  }
}

  limitStats();

  saveGame();
}

// Zorgt dat alle stats tussen 0 en 100 blijven
function limitStats() {
  pet.hunger = constrain(pet.hunger, 0, 100);

  pet.energy = constrain(pet.energy, 0, 100);

  pet.happiness = constrain(pet.happiness, 0, 100);

  pet.health = constrain(pet.health, 0, 100);
}

// Slaat het spel op in Local Storage
function saveGame() {
  localStorage.setItem("petData", JSON.stringify(pet));

  localStorage.setItem("lastSavedTime", Date.now());
}

// Laadt opgeslagen data en verwerkt offline voortgang
function loadGame() {
  let savedPet = localStorage.getItem("petData");

  let savedTime = localStorage.getItem("lastSavedTime");

  if (savedPet) {
    pet = JSON.parse(savedPet);
  }

  if (savedTime) {
    let secondsPassed = (Date.now() - Number(savedTime)) / 1000;

    let cycles = floor(secondsPassed / 5);

    // maximaal 24 cycli verwerken (2 minuten)
    cycles = min(cycles, 24);

    pet.hunger -= cycles * 5;
    pet.energy -= cycles * 4;
    pet.happiness -= cycles * 3;

    if (pet.hunger < 20 || pet.energy < 20) {
      pet.health -= cycles * 3;
    }

    limitStats();
  }
}

// Simpele raadspel beloning
function startGuessGame() {
  pet.happiness += 15;

  currentAction = "play";
  actionTimer = 180;

  limitStats();
  saveGame();

  gameMenuOpen = false;
}

// Start een nieuwe Minesweeper game
function startMinesweeper() {
  gameMenuOpen = false;
  minesweeperOpen = true;
  msGameOver = false;
  msWin = false;

  msBoard = [];

  for (let r = 0; r < msRows; r++) {
    let row = [];

    for (let c = 0; c < msCols; c++) {
      row.push({
        mine: false,
        revealed: false,
        flagged: false,
        count: 0,
      });
    }

    msBoard.push(row);
  }

  let minesPlaced = 0;

  // Willekeurig mijnen plaatsen
  while (minesPlaced < 10) {
    let r = floor(random(msRows));
    let c = floor(random(msCols));

    if (!msBoard[r][c].mine) {
      msBoard[r][c].mine = true;
      minesPlaced++;
    }
  }

  // Aantal mijnen rondom elk vakje berekenen
  for (let r = 0; r < msRows; r++) {
    for (let c = 0; c < msCols; c++) {
      let total = 0;

      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          let nr = r + y;
          let nc = c + x;

          if (nr >= 0 && nr < msRows && nc >= 0 && nc < msCols) {
            if (msBoard[nr][nc].mine) {
              total++;
            }
          }
        }
      }

      msBoard[r][c].count = total;
    }
  }
}

// Tekent het minigame keuzemenu
function drawGameMenu() {
  fill(0, 180);
  rect(250, 100, 780, 500);

  fill(255);
  textAlign(CENTER);
  textSize(40);

  text("Kies een Minigame", width / 2, 180);

  fill(100);
  rect(350, 250, 250, 100);
  rect(680, 250, 250, 100);

  fill(255);
  textSize(24);

  text("Minesweeper", 475, 310);
  text("Raad Getal", 805, 310);
}

// Verwerkt klikken op Minesweeper vakjes
function handleMinesweeperClick() {
  if (msGameOver || msWin) {
    minesweeperOpen = false;

    return;
  }

  let startX = 440;
  let startY = 130;

  let c = floor((mouseX - startX) / msCellSize);

  let r = floor((mouseY - startY) / msCellSize);

  if (r < 0 || c < 0 || r >= msRows || c >= msCols) {
    return;
  }

  let cell = msBoard[r][c];

  cell.revealed = true;

  // Controleer of speler op een mijn heeft geklikt
  if (cell.mine) {
    msGameOver = true;

    pet.happiness -= 10;

    limitStats();

    saveGame();

    return;
  }

  checkWin();
}

// Controleert of alle veilige vakjes geopend zijn
function checkWin() {
  let revealedCount = 0;

  for (let r = 0; r < msRows; r++) {
    for (let c = 0; c < msCols; c++) {
      if (msBoard[r][c].revealed) {
        revealedCount++;
      }
    }
  }

  // Speler wint wanneer alle veilige vakjes geopend zijn
  if (revealedCount >= 54) {
    msWin = true;

    pet.happiness += 25;

    currentAction = "play";

    actionTimer = 180;

    limitStats();

    saveGame();
  }
}

function mouseReleased() {
  if (!minesweeperOpen) return;

  if (mouseButton === RIGHT) {
    let startX = 440;
    let startY = 130;

    let c = floor((mouseX - startX) / msCellSize);
    let r = floor((mouseY - startY) / msCellSize);

    if (r >= 0 && r < msRows && c >= 0 && c < msCols) {
      let cell = msBoard[r][c];

      if (!cell.revealed) {
        cell.flagged = !cell.flagged;
      }
    }

    return false;
  }
}

function drawFarm() {

  fill(0, 200);
  rect(0, 0, width, height);

  textAlign(CENTER);
  textSize(40);
  fill(255);
  text("Farm", width / 2, 80);

  let startX = 450;
  let startY = 150;

  for (let r = 0; r < farmRows; r++) {
    for (let c = 0; c < farmCols; c++) {

      let x = startX + c * farmSize;
      let y = startY + r * farmSize;

      image(farmDirt, x, y, farmSize, farmSize);

      let tile = farmTiles[r][c];

      if (tile.stage === 1) {
        image(crop1, x, y, farmSize, farmSize);
      }

      if (tile.stage === 2) {
        image(crop2, x, y, farmSize, farmSize);
      }

      if (tile.stage === 3) {
        image(crop3, x, y, farmSize, farmSize);
      }
    }
  }
}

function handleFarmClick() {

  let startX = 450;
  let startY = 150;

  let c = floor((mouseX - startX) / farmSize);
  let r = floor((mouseY - startY) / farmSize);

  if (r < 0 || c < 0 || r >= farmRows || c >= farmCols) {
    return;
  }

  let tile = farmTiles[r][c];

  if (tile.stage === 0) {

    tile.stage = 1;
    tile.timer = 0;

  } else if (tile.stage === 3) {

    pet.hunger += 15;
    pet.happiness += 5;

    tile.stage = 0;
    tile.timer = 0;

    limitStats();
  }
}

function keyPressed() {
  if (key === "f" || key === "F") {
    farmOpen = !farmOpen;
  }
}