let randomKleuren = [];
let randomGetallen = [];
let totaalGetallen = 0;
let gemiddeldeGetallen;

function setup() {
  createCanvas(400, 400);
  noLoop();

  // 6 random kleuren genereren
  for (let i = 0; i < 6; i++) {
    randomKleuren.push(color(random(255), random(255), random(255)));
  }

  // 12 getalen genereren
  for (let i = 0; i < 12; i++) {
    let getal = round(random(0, 100));
    randomGetallen.push(getal);
    totaalGetallen += getal;
  }
  // gemiddelde berekenen
  gemiddeldeGetallen = round(totaalGetallen / randomGetallen.length);
}

function draw() {
  background(240);
  textSize(12);
  textAlign(LEFT, TOP);

  // 1 kleuren lijst printen
  text("1.", 20, 15);
  let colors1 = ["red", "green", "blue", "purple", "yellow"];

  for (let i = 0; i < colors1.length; i++) {
    fill(colors1[i]);
    text(colors1[i], 20, 30 + i * 12);
  }

  // 2 eerste kleur naar achter schuiven
  fill(0);
  text("2.", 20, 100);
  let colors2 = ["red", "green", "blue", "purple", "yellow"];
  let eersteKleur = colors2.shift();
  colors2.push(eersteKleur);

  for (let i = 0; i < colors2.length; i++) {
    fill(colors2[i]);
    text(colors2[i], 20, 115 + (i * 12));
  }
  // 3 kleuren tekenen
  fill(0);
  text("3.", 20, 190);

  let colors3 = ["green", "yellow", "red"];


  for (let i = 0; i < colors3.length; i++) {
    fill(colors3[i]);
    text(colors3[i], 20, 205 + (i * 12));
  }

  // alleen getallen < 300 tonen
  fill(0);
  text("4.", 20, 250);

  let getallen4 = [400, 240, 10, 490, 30, 60, 244, 500, 301, 300];
  let regelTeller4 = 0;

  for (let i = 0; i < getallen4.length; i++) {
    if (getallen4[i] < 300) {
      text(getallen4[i], 20, 265 + (regelTeller4 * 12));
      regelTeller4++;
    }
  }

  // som van twee arrays
  fill(0);
  text("5.", 120, 15);

  let arrA = [3, 55, 93, 20, 102, 6];
  let arrB = [14, 22, 80, 5];

  let totaal5 = 0;

  for (let i = 0; i < arrA.length; i++) {
    totaal5 += arrA[i];
  }

  for (let i = 0; i < arrB.length; i++) {
    totaal5 += arrB[i];
  }

  text(totaal5, 120, 30);

  // tel aantal e in word
  fill(0);
  text("6.", 120, 100);

  let woord = "Overheidsfinancieringstekort.";
  let eTeller = 0;

  for (let i = 0; i < woord.length; i++) {
    if (woord[i] === 'e' || woord[i] == 'E') {
      eTeller++;
    }
  }
  text(eTeller + "x", 120, 115);

  // 7 kleuren alfabetisch sorteren
  fill(0);
  text("7.", 120, 190);

  let colors7 = ["red", "green", "blue", "purple", "yellow"];
  colors7.sort();

  for (let i = 0; i < colors7.length; i++) {
    fill(colors7[i]);
    text(colors7[i], 120, 205 + (i * 12));
  }

  //8 random kleur bloken tekenen
  fill(0);
  text("8.", 120, 280);

  for (let i = 0; i < randomKleuren.length; i++) {
    fill(randomKleuren[i]);
    rect(120 + i * 25, 300, 20, 20);
  }

  // 9. Random getallen + totaal + gemiddelde tonen
  fill(0);
  text("9.", 240, 15);

  for (let i = 0; i < randomGetallen.length; i++) {
    text(randomGetallen[i], 240, 30 + (i * 12));
  }
  text("Totaal: " + totaalGetallen, 240, 180);
  text("Gemiddelde: " + gemiddeldeGetallen, 240, 195);
}