function setup() {
  createCanvas(800, 400);
  noLoop();
}

function draw() {
  background(220);

  // teken huisen
  tekenHuis(100, 200, 100);
  tekenHuis(300, 200, 150);
  tekenHuis(550, 250, 70);

  // teken cirkels, rechthoeken en lijnen
  tekenCirkel(700, 80, 50);
  tekenRechthoek(50, 50, 120, 60);
  tekenLijn("p5.js Functions", 50, 350, 24, color(0, 102, 153));

  // Rekenfuncties met return
  // voer de berekeningen uit en sla de resultaten op in variabelen
  let som = letOp(10, 5);
  let quotient = deel(20, 4);
  let product = vermenigvuldig(6, 7);
  let verschil = trekAf(15, 8);

  // teken de resultaten op het canvas
  fill(0);
  textSize(14);
  text("Berekeningen(Return):", 50, 140);
  text("10 + 5 = " + som, 50, 160);
  text("20 / 4 = " + quotient, 50, 180);
  text("6 * 7 = " + product, 50, 200);
  text("15 - 8 = " + verschil, 50, 220);
}

// Functies voor het tekenen van vormen en tekst
function tekenHuis(x, y, grootte) {
  //
  let dakHoogte = grootte * 0.5;

  // Teken het huis
  stroke(0);
  fill(255, 200, 200);
  rect(x, y, grootte, grootte);

  // Teken het dak
  fill(200, 50, 50);
  triangle(x + grootte / 2, y - dakHoogte, x + grootte, y, x, y);

  // Teken de deur
  fill(100, 50, 0);
  rect(x + grootte * 0.4, y + grootte * 0.5, grootte * 0.2, grootte * 0.5);

  // Teken de ramen
  fill(255);
  rect(x + grootte * 0.15, y + grootte * 0.2, grootte * 0.2, grootte * 0.2);
  rect(x + grootte * 0.65, y + grootte * 0.2, grootte * 0.2, grootte * 0.2);
}

// parameters: Functions voor een cirkel
function tekenCirkel(x, y, straal) {
  fill(100, 255, 100);
  circle(x, y, straal * 2);
}

// parameters: Functions voor een rechthoek
function tekenRechthoek(x, y, breedte, hoogte) {
  fill(255, 255, 100);
  rect(x, y, breedte, hoogte);
}

// parameters: Functions voor een lijn
function tekenLijn(x1, y1, x2, y2) {
  stroke(50);
  strokeWeight(3);
  line(x1, y1, x2, y2);
  strokeWeight(1);
}

// parameters: Functions voor tekst
function tekenText(tekstInhoud, x, y, grootte, kleur) {
  fill(kleur);
  noStroke();
  textSize(grootte);
  text(tekstInhoud, x, y);
}

// Return: Telt twee getallen op
function letOp(a, b) {
  return a + b;
}

// Return: Deelt twee getallen
function deel(a, b) {
  return a / b;
}

// Return: Vermenigvuldigt twee getallen
function vermenigvuldig(a, b) {
  return a * b;
}

// Return: Trekt twee getallen van elkaar af
function trekAf(a, b) {
  return a - b;
}
