let kleuren = ["red", "green", "blue, orange", "purple", "yellow"];
let bestanden = [
  "elephant",
  "giraffe",
  "hippo",
  "monkey",
  "panda",
  "parrot",
  "penguin",
  "pig",
  "rabbit",
  "snake",
];

let kleurKnoppen = [];
let dierKnoppen = [];
let afbeeldingen = [];

let huidigeAchtergrondKleur = "gray";
let actiefeDierIndex = -1;

function preload() {
  for (let i = 0; i < bestanden.length; i++) {
    afbeeldingen.push(loadImage("assets/" + bestanden[i] + ".png"));
  }
}

function setup() {
  createCanvas(800, 400);

  for (let i = 0; i < kleuren.length; i++) {
    let knop = createButton(kleuren[i]);

    knop.position(20 + i * 100, 40);
    knop.style("background-color", kleuren[i]);
    knop.style("color", "white");
    knop.mousePressed(() => wisselKleur(kleuren[i]));
    kleurKnoppen.push(knop);
  }
  for (let i = 0; i < bestanden.length; i++) {
    let knop = createButton(bestanden[i]);

    knop.position(20 + i * 75, 340);
    knop.mousePressed(() => wisselDier(i));
    dierKnoppen.push(knop);
  }
}

function draw() {
  background(huidigeAchtergrondKleur);

  if (actiefeDierIndex !== -1) {
    image(
      afbeeldingen[actiefeDierIndex],
      width / 2 - 100,
      height / 2 - 100,
      200,
      200,
    );
  }
}

function wisselKleur(gekozenKleur) {
  huidigeAchtergrondKleur = gekozenKleur;

  for (let i = 0; i < kleurKnoppen.length; i++) {
    if (kleuren[i] === gekozenKleur) {
      kleurKnoppen[i].show();
    }
  }
}

function wisselDier(index) {
  actiefeDierIndex = index;

  for (let i = 0; i < dierKnoppen.length; i++) {
    if (i === index) {
      dierKnoppen[i].hide();
    } else {
      dierKnoppen.show();
    }
  }
}
