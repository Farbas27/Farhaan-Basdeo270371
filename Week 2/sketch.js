
let horizon = 450;
let canvasBreedte = 800;
let canvasHoogte = 600;
let wolkx = 800;
let wolky = 100;
let zonx = 0;
let zony = 80;
let stoplichtx = canvasBreedte - 100;

let autos = [
    {
        x: -200, y: 405, basisSnelheid: 4, snelheid: 0, r: 200,
        g: 40, b: 50, nr: 120, ng: 20, nb: 30
    },
    {
        x: -400, y: 465, basisSnelheid: 6, snelheid: 0, r: 40,
        g: 100, b: 220, nr: 20, ng: 50, nb: 130
    },
    {
        x: -150, y: 525, basisSnelheid: 3, snelheid: 0, r: 230,
        g: 180, b: 40, nr: 140, ng: 110, nb: 20
    }
];

let stoplichtStatus = 0;
let isNight = false;
let cycleTimer = 0;
let cycleLengte = 15 * 60;
let overgangDuur = 120;
let nachtFactor = 0;

function setup() {
    createCanvas(canvasBreedte, canvasHoogte);
}

function draw() {
    // tijd bij houden
    zonx += 0.5
    if (zonx > canvasBreedte + 40) {
        zonx = -40;
    }
    let hoek = map(zonx, -100, canvasBreedte + 100, 0, PI);
    nachtFactor = map(sin(hoek), 0, 1, 1, 0);

    nachtFactor = constrain(nachtFactor, 0, 1);
    isNight = (nachtFactor > 0.5);

    // achtergrond overgang
    let dagLucht = color(135, 206, 235);
    let nachtLucht = color(20, 24, 43);
    background(lerpColor(dagLucht, nachtLucht, nachtFactor));

    // zon en maan
    noStroke();
    if (isNight) {
        fill(230, 230, 210, nachtFactor * 255);
        circle(zonx - 15, zony - 10, 15);
        circle(zonx + 10, zony + 15, 20);
        circle(zonx + 15, zony - 15, 12);
    } else {

        fill(255, 223, 0, (1 - nachtFactor) * 255);
        circle(zonx, zony, 80);
    }

    // vogel formatie
    let formatieX = zonx - 80;
    let formatieY = zony;
    // vogel
    tekenVogel(formatieX, formatieY - 20);
    tekenVogel(formatieX, formatieY + 20);
    tekenVogel(formatieX - 30, formatieY);
    tekenVogel(formatieX + 30, formatieY)

    // wolk
    if (isNight) {
        fill(80, 90, 110);
    } else {
        fill(255);
    }
    noStroke();
    rect(wolkx, wolky, 90, 30, 15);
    circle(wolkx + 25, wolky + 5, 40);
    circle(wolkx + 55, wolky + 5, 50);
    wolkx -= 1;
    if (wolkx < -100) {
        wolkx = canvasBreedte + 50;
    }
    // bergen
    if (isNight) {
        fill(40, 55, 45);
        triangle(100, horizon, 300, 200, 500, horizon);
        fill(30, 45, 35);
        triangle(350, horizon, 550, 150, 750, horizon)
    } else {
        fill(100, 130, 105);
        triangle(100, horizon, 300, 200, 500, horizon);
        fill(80, 110, 85);
        triangle(350, horizon, 550, 150, 750, horizon);
    }

    // bomen achter
    tekenBoom(60, horizon, 0.8);
    tekenBoom(140, horizon, 0.9);
    tekenBoom(canvasBreedte - 140, horizon, 0.9);
    tekenBoom(canvasBreedte - 60, horizon, 0.8);

    // lantaarenpalen
    tekenLantaarnpaal(200, horizon);
    tekenLantaarnpaal(550, horizon);

    // verkeerslicht
    tekenVerkeerslicht(canvasBreedte - 100, horizon - 200);

    //  de weg
    if (isNight) {
        fill(50);
    } else {
        fill(120);
    }
    rect(0, horizon, canvasBreedte, canvasHoogte - horizon);

    //wegmarkering
    fill(255);
    for (let i = 0; i < canvasBreedte; i += 60) {
        rect(i, horizon + 45, 30, 5);
        rect(i, horizon + 105, 30, 5)
    }
    // verkeerslicht logica en auto snelheid
    for (let i = 0; i < autos.length; i++) {
        let deAuto = autos[i];

        let stoplichtstreep = stoplichtx - 170;

        if (stoplichtStatus === 0 && deAuto.x >= stoplichtstreep - 10 && deAuto.x <= stoplichtstreep) {
            deAuto.snelheid = 0;
            deAuto.x = stoplichtstreep;
        }
        else if (stoplichtStatus === 2 && deAuto.x >= stoplichtstreep - 10 && deAuto.x <= stoplichtstreep) {
            deAuto.snelheid = deAuto.basisSnelheid * 0.4;
        } else {
            deAuto.snelheid = deAuto.basisSnelheid;
        }


        deAuto.x += deAuto.snelheid;
        if (deAuto.x > canvasBreedte + 50) {
            deAuto.x = -200;
        }
        tekenAuto(deAuto.x, deAuto.y, deAuto.r, deAuto.g, deAuto.b, deAuto.nr, deAuto.ng, deAuto.nb);
    }

    // bomen voor
    tekenBoom(50, canvasHoogte + 20, 1.3);
    tekenBoom(canvasBreedte - 50, canvasHoogte + 20, 1.3);

    // nacht overlay
    fill(0, 0, 40, nachtFactor * 120);
    rect(0, 0, canvasBreedte, canvasHoogte)
}

function tekenLantaarnpaal(x, y) {
    push();
    fill(255, 255, 150, nachtFactor * 40);
    noStroke();
    triangle(x, y - 180, x - 100, y + 150, x + 100, y + 150);

    stroke(40);
    strokeWeight(6)
    line(x, y, x, y - 180);
    line(x, y - 180, x + 20, y - 180);

    noStroke();
    fill(50);
    rect(x + 10, y - 183, 20, 3);

    // lamp gloed
    fill(255, 255, 180, nachtFactor * 255);
    ellipse(x + 20, y - 175, 16, 8);
    pop();
}

function tekenVogel(x, y) {
    push();
    stroke(lerpColor(color(0), color(40), nachtFactor));
    strokeWeight(2);
    noFill();

    beginShape();
    vertex(x - 10, y + 5);
    quadraticVertex(x - 5, y - 5, x, y);
    quadraticVertex(x + 5, y - 5, x + 10, y + 5);
    endShape();
    pop();
}

function tekenBoom(x, y, schaal) {
    push();
    translate(x, y);
    scale(schaal);

    if (isNight) {
        fill(50, 25, 0);
        rect(-10, -60, 20, 60);
        fill(15, 70, 15)
    } else {
        fill(102, 51, 0);
        rect(-10, -60, 20, 60);
        fill(34, 139, 34);
    }

    let wind = sin(frameCount * 0.05 + x) * 4;

    circle(0 + wind, -80, 60);
    circle(-20 + wind * 0.8, -60, 50);
    circle(20 + wind * 1.2, -60, 50);
    pop();
}

function tekenAuto(x, y, r, g, b, nr, ng, nb) {
    push();
    translate(x, y);
    // koplamp straal
    fill(255, 255, 200, nachtFactor * 70)
    noStroke();
    triangle(165, 30, 320, 5, 320, 65);

    // autolak
    let dagKleur = color(r, g, b);
    let nachtkleur = color(nr, ng, nb);
    fill(lerpColor(dagKleur, nachtkleur, nachtFactor));
    rect(0, 10, 170, 40, 10);

    // geen idee hoe dit heet
    fill(180);
    ellipse(40, 55, 25, 24);
    ellipse(130, 55, 25, 25);

    // onderkant
    if (isNight)
        fill(nr, ng, nb);
    else fill(r, g, b);
    rect(0, 10, 170, 40, 10);

    // dak
    rect(30, -10, 110, 35, 10);

    // wielen
    fill(20);
    ellipse(40, 55, 45, 45);
    ellipse(130, 55, 45, 45);

    // vlegen
    fill(180);
    ellipse(40, 55, 25, 24);
    ellipse(130, 55, 25, 25);

    // ramen
    let dagRaam = color(160, 210, 255);
    let nachtRaam = color(70, 90, 120);
    fill(lerpColor(dagRaam, nachtRaam, nachtFactor));
    rect(40, -5, 40, 25, 5);
    rect(95, -5, 40, 25, 5);

    // kop lamp
    let dagLamp = color(255, 255, 120);
    let nachtLamp = color(255, 255, 200);
    fill(lerpColor(dagLamp, nachtLamp, nachtFactor));
    rect(155, 25, 12, 10, 3);
    pop();
}

function tekenVerkeerslicht(x, y) {
    push();
    fill(30);
    rect(x, y, 40, 120, 5);

    fill(50);
    rect(x + 15, y + 120, 10, 80);

    // als het nacht is gloeien lantaarens
    fill(255, 255, 180, nachtFactor * 30);
    ellipse(x + 20, y, 30, 15);

    let roodKleur = color(100, 0, 0);
    let geelKleur = color(100, 100, 0);
    let groenKleur = color(0, 100, 0);

    if (stoplichtStatus === 0) roodKleur = color(255, 0, 0);
    if (stoplichtStatus === 1) groenKleur = color(0, 255, 0);
    if (stoplichtStatus === 2) geelKleur = color(255, 255, 0);

    fill(roodKleur);
    circle(x + 20, y + 25, 25);
    fill(geelKleur);
    circle(x + 20, y + 65, 25);
    fill(groenKleur);
    circle(x + 20, y + 105, 25);
    pop();
}
function keyPressed() {
    if (keyCode === ENTER) {
        if (stoplichtStatus === 0) {
            stoplichtStatus = 1;
        } else if (stoplichtStatus === 1) {
            stoplichtStatus = 2;
        } else if (stoplichtStatus === 2) {
            stoplichtStatus = 0;
        }
    }
}

