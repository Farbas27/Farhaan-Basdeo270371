let positiesX = [];
let positiesY = [];
let groottes = [];
let kleuren = [];
let types = [];
let aantalVormen;


function setup() {
  createCanvas(800, 600);
  aantalVormen = random(20, 60);

  for (let i = 0; i < aantalVormen; i++) {

    // maak de eigenschapen van een vorm
    positiesX.push(random(0, width));
    positiesY.push(random(0, height))
    groottes.push(random(20, 150));

    // maak een willekeurige kleur
    let randomKleur = color(random(0, 255), random(0, 255), random(0, 255), random(100, 200));
    kleuren.push(randomKleur);

    // kies een vorm
    let ramdomType = int(random(0, 4)); // kiest een random getal van 0 tot 4 een getal staat gelijk aan een vorm
    types.push(ramdomType);
  }
}

function draw() {
  background(240);
  noStroke();

  // taken de vormen op basis van hun opgeslagen aigenschapen
  for (let i = 0; i < aantalVormen; i++) {
    fill(kleuren[i]);
    if (types[i] === 0) {
      ellipse(positiesX[i], positiesY[i], groottes[i]);
    } else if (types[i] === 1) {
      rect(positiesX[i], positiesY[i], groottes[i], groottes[i]);
    } else if (types[i] === 2) {
      let r = groottes[i] / 2;

      // Teken een gelijkzijdige driehoek:
      // - Bovenste punt: recht boven het middelpunt (y - r)
      // - Linksonder: 30° naar links onder het middelpunt
      // - Rechtsonder: 30° naar rechts onder het middelpunt
      // cos(PI/6) = 0.866 en sin(PI/6) = 0.5, waardoor alle zijden even lang zijn
      triangle(
        positiesX[i], positiesY[i] - r,
        positiesX[i] - r * cos(PI / 6), positiesY[i] + r * sin(PI / 6), // Linksonder
        positiesX[i] + r * cos(PI / 6), positiesY[i] + r * sin(PI / 6)  // Rechtsonder
      );
    } else if (types[i] === 3) {
      let r = groottes[i] / 2;
      beginShape();
      for (let a = 0; a < TWO_PI; a += TWO_PI / 6) {
        // Voor elke hoek a bereken je een punt op een cirkel
        // cosa geeft de X offset, sina de Y offset
        // positiesX[i] en positiesY[i] zijn het middelpunt van de vorm
        // r is de straal van de cirkel
        let sx = positiesX[i] + cos(a) * r;
        let sy = positiesY[i] + sin(a) * r;
        // vertex() tekent dat punt als onderdeel van de polygon
        vertex(sx, sy);
      }
      endShape(CLOSE);
    }
  }
}

function keyPersses() {
  if (keyCode === BACKSPACE) {
    for (let i = 0; i < aantalVormen; i++) {
      kleuren[i] = color(random(0, 255), random(0, 255), random(0, 255), random(100, 200));
    }
    redraw();
  }
}

