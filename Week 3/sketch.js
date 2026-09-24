let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];


let spelers = ['Blauw', 'Rood'];
let actieveSpeler;
let spelActief = true
let winnaar = null;
let w, h;
let clickGeluid;
let winLijn = null;


let fase = 'selectie';
// de kleuren die je kan kieze
let beschikbareKleur = [
    { naam: 'Blauw', rgb: [0, 100, 255] },
    { naam: 'Rood', rgb: [255, 50, 50] },
    { naam: 'Groen', rgb: [40, 180, 100] },
    { naam: 'Paars', rgb: [150, 50, 250] },
    { naam: 'Orangje', rgb: [255, 130, 0] },
];

let spelerKleuren = [null, null];
let selectieBeurt = 0;

function preload() {
    soundFormats('mp3');
    clickGeluid = loadSound('matthewvakaliuk73627-mouse-click-290204.mp3');
}

function setup() {
    createCanvas(400, 450);
    clickGeluid.setVolume(0.3);
    w = width / 3;
    h = (height - 50) / 3;
    resetSpel();
}

function draw() {
    if (fase === 'selectie') {
        tekenSelectieScherm();
    } else if (fase === 'game') {
        bepaalAchtergrond();
        tekenHoverEffect();
        tekenRaster();
        tekenZetten();
        tekenWinLijn();
        tekenStatus();
    }
}

// selectie scherm
function tekenSelectieScherm() {
    background(245);
    textAlign(CENTER, CENTER);
    noStroke();

    fill(40);
    textSize(24);
    text("Kies je kleur", width / 2, 40);

    textSize(18);
    fill(80);
    text("Speler" + (selectieBeurt + 1) + ", Kies een kleur:", width / 2, 80);

    // kleur knoppen
    textSize(16)
    for (let i = 0; i < beschikbareKleur.length; i++) {
        let k = beschikbareKleur[i];
        let y = 130 + i * 55;
        let alGekozen = (selectieBeurt === 1 && spelerKleuren[0] === k);

        if (alGekozen) {
            fill(200);
            rect(50, y, width - 100, 45, 10);
            fill(130);
            text(k.naam + "(Al gekozen)", width / 2, y + 22);
        } else {
            fill(k.rgb[0], k.rgb[1], k.rgb[2]);
            rect(50, y, width - 100, 45, 10);
            fill(255);
            text(k.naam, width / 2, y + 22);
        }
    }

}

// veranderd achtergrond kleur
function bepaalAchtergrond() {
    background
    let k1 = spelerKleuren[0].rgb; // kleur speler 1
    let k2 = spelerKleuren[1].rgb; // kleur speler 2

    // actieve speler bebaalt achtergrond
    if (spelActief) {
        if (actieveSpeler === spelers[0]) {
            background(k1[0], k1[1], k1[2], 20);
        } else {
            background(k2[0], k2[1], k2[2], 20);
        }
    } else {
        // spel afgelopen
        if (winnaar === 'Gelijkspel') {
            background(230);
        } else if (winnaar === spelers[0]) {
            background(k1[0], k1[1], k1[2], 60);
        } else {
            background(k2[0], k2[1], k2[2], 60);
        }
    }
}

// hover effect
function tekenHoverEffect() {
    if (!spelActief) return;

    let j = floor(mouseX / w); // kolom
    let i = floor(mouseY / h); // rij

    if (i >= 0 && i < 3 && j >= 0 && j < 3 && board[i][j] === '') {
        noStroke();
        let k = (actieveSpeler === spelers[0]) ? spelerKleuren[0].rgb : spelerKleuren[1].rgb;
        fill(k[0], k[1], k[2], 40);
        rect(j * w, i * h, w, h);
    }
}
// teken raster
function tekenRaster() {
    stroke(40);
    strokeWeight(4);
    for (let i = 1; i < 3; i++) {
        line(i * w, 0, i * w, height - 50); // verticale
        line(0, i * h, width, i * h); // horuzontale
    }
}

//teken cirkels en kruiszen
function tekenZetten() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = j * w + w / 2;
            let y = i * h + h / 2;
            let spot = board[i][j];
            let k1 = spelerKleuren[0].rgb
            let k2 = spelerKleuren[1].rgb

            if (spot === spelers[0]) {
                noFill();

                stroke(0);
                strokeWeight(14);
                ellipse(x, y, w * 0.6);

                stroke(k1[0], k1[1], k1[2]);
                strokeWeight(10);
                ellipse(x, y, w * 0.6);

            } else if (spot === spelers[1]) {
                let xr = w * 0.3;
                stroke(0);
                strokeWeight(14);
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);

                stroke(k2[0], k2[1], k2[2]);
                strokeWeight(10);
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);
            }
        }
    }
}

// teken de win streep
function tekenWinLijn() {
    if (spelActief || !winLijn || winnaar === 'Gelijkspel') return;


    let k = (winnaar === spelers[0]) ? spelerKleuren[0].rgb : spelerKleuren[1].rgb;
    stroke(0);
    strokeWeight(16)

    // de type lijnen
    if (winLijn.type === 'rij') {
        let y = winLijn.index * h + h / 2;
        line(20, y, width - 20, y);
    }

    if (winLijn.type === 'kolom') {
        let x = winLijn.index * w + w / 2;
        line(x, 20, x, height - 70);
    }

    if (winLijn.type === 'diagonaal1') {
        line(20, 20, width - 20, height - 70);
    }

    if (winLijn.type === 'diagonaal2') {
        line(width - 20, 20, 20, height - 70);
    }
    // kleurlaag
    stroke(k[0], k[1], k[2]);
    strokeWeight(10);

    if (winLijn.type === 'rij') {
        let y = winLijn.index * h + h / 2;
        line(20, y, width - 20, y);
    }

    if (winLijn.type === 'kolom') {
        let x = winLijn.index * w + w / 2;
        line(x, 20, x, height - 70);
    }

    if (winLijn.type === 'diagonaal1') {
        line(20, 20, width - 20, height - 70);
    }

    if (winLijn.type === 'diagonaal2') {
        line(width - 20, 20, 20, height - 70);
    }
}

// toon status
function tekenStatus() {
    textAlign(CENTER, CENTER);
    textSize(20);
    noStroke();
    fill(0);

    if (spelActief) {
        text(
            "Beurt: " + (actieveSpeler === spelers[0] ? "Speler 1 (Blauw)" : "Speler 2 (Rood)"),
            width / 2,
            height - 25
        );
    } else {
        if (winnaar === 'Gelijkspel') {
            text("Het is een gelijkspel Klik om te herstarten.", width / 2, height - 25);
        } else {
            let winnaarTekst = winnaar === spelers[0] ? "Speler 1 (blauw)" : "Spelers 2 (Rood)";
            text(winnaarTekst + "wint klik om te herstarten.", width / 2, height - 25);
        }
    }
}

// klik logica per fase
function mousePressed() {
    //  logica voor het kleur scherm
    if (fase === 'selectie') {
        for (let i = 0; i < beschikbareKleur.length; i++) {
            let y = 130 + i * 55;
            // check of klik op knop is
            if (mouseX > 55 && mouseX < width - 55 && mouseY > y && mouseY < y + 45) {
                let gekozenKleur = beschikbareKleur[i];
                // speler 2 mag niet de zelfde kleur
                if (selectieBeurt === 1 && spelerKleuren[0] === gekozenKleur) {
                    return;
                }
                if (clickGeluid) {
                    clickGeluid.stop(); clickGeluid.play();
                }
                //geluid afspelen succesvolle
                spelerKleuren[selectieBeurt] = gekozenKleur;
                if (selectieBeurt === 0) {
                    selectieBeurt = 1; // nu is speler 2
                } else {
                    fase = 'game';
                }
                return;
            }
        }
    }

    // logica voor spel zelf
    else if (fase === 'game') {
        // als het spel is afgelopen reset
        if (!spelActief) {
            resetSpel();
            fase = 'selectie';
            selectieBeurt = 0;
            spelerKleuren = [null, null];
            return;
        }
        let j = floor(mouseX / w);
        let i = floor(mouseY / h);

        // check of klik in het bord is
        if (i >= 0 && i < 3 && j >= 0 && j < 3) {
            if (board[i][j] === '') {
                if (clickGeluid) { clickGeluid.stop(); clickGeluid.play(); }
                board[i][j] = actieveSpeler; // set plaats
                controleerEindeSpel();
                if (spelActief) {
                    wisselSpeler();
                }
            }

        }
    }
}

function wisselSpeler() {
    actieveSpeler = actieveSpeler === spelers[0] ? spelers[1] : spelers[0];
}

function resetSpel() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    actieveSpeler = spelers[0];
    spelActief = true;
    winnaar = null;
    winLijn = null;
}

function controleerEindeSpel() {
    // horizontaal
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' &&
            board[i][0] === board[i][1] &&
            board[i][1] === board[i][2]) {

            winLijn = { type: 'rij', index: i };
            kondigWinnaar(board[i][0]);
            return;
        }
    }
    // verticaal
    for (let j = 0; j < 3; j++) {
        if (board[0][j] !== '' &&
            board[0][j] === board[1][j] &&
            board[1][j] === board[2][j]) {

            winLijn = { type: 'kolom', index: j };
            kondigWinnaar(board[0][j]);
            return;
        }
    }
    // controleer diagonaal
    if (board[0][0] !== '' &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]) {

        winLijn = { type: 'diagonaal1' };
        kondigWinnaar(board[0][0]);
        return;
    }
    if (board[0][2] !== '' &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]) {

        winLijn = { type: 'diagonaal2' };
        kondigWinnaar(board[0][2]);
        return;
    }
    //controleer op gelijkspel
    let legeCellen = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                legeCellen++;
            }
        }
    }
    if (legeCellen === 0) {
        winnaar = 'Gelijkspel';
        spelActief = false;
    }
}
function kondigWinnaar(s) {
    winnaar = s;
    spelActief = false;
}
