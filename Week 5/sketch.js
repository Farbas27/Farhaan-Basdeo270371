let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let gameStatus = "Start";
let gekozenAntwoord = -1;
let isAntwoordGoed = false;

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  quizData = [
    {
      vraag: "Wat betekent het woord 'phishing'?",
      opties: [
        "Een techniek om sneller te kunnen downloaden.",
        "Een poging om iemand te misleiden zodat ze gevoelige informatie geven.",
        "Het updaten van een antivirussoftware.",
        "Een manier om wifi-wachtwoorden te kraken."
      ],
      correct: 1
    },
    {
      vraag: "Wat is een sterk wachtwoord?",
      opties: [
        "je geboortedatum met uitroeptekens.",
        "Het woord 'wachtwoord123'.",
        "Een wachtwoord met lengte, hoofdletters, kleine letters, cijfers en symbolen.",
        "Een kort wachtwoord dat makkelijk te onthouden is."
      ],
      correct: 2
    },
    {
      vraag: "Wat doet een firewall?",
      opties: [
        "Het beveiligt een computer tegen malware.",
        "Het verbetert de internetverbinding.",
        "Het blokkeert ongewenste e-mailberichten.",
        "Het updatet het besturingssysteem."
      ],
      correct: 3
    },
    {
      vraag: "wat is malware?",
      opties: [
        "Schadelijke software zoals virussen, worms, ransomware of spyware.",
        "Een porgramma waarmee je hardware kunt repareren.",
        "Software die je computer helpt minder stroom te gebruiken.",
        "Een type computerbeeldscherm dat speciaal is voor gaming."
      ],
      correct: 0
    },
    {
      vraag: "waarom is 2FA belangrijk?",
      opties: [
        "omdat je computer dan sneller werkt.",
        "omdat het extra beveiliging biedt.",
        "omdat het de inlogtijd vermindert.",
        "omdat het de kosten voor beveiliging verlaagt."
      ],
      correct: 1
    },
    {
      vraag: "wat is ransomware?",
      opties: [
        "Software die je computer helpt minder stroom te gebruiken.",
        "Een type computerbeeldscherm dat speciaal is voor gaming.",
        "Schadelijke software die je bestanden versleutelt en een losgeld vraagt.",
        "Een programma waarmee je hardware kunt repareren."
      ],
      correct: 2
    },
    {
      vraag: "wat is social engineering?",
      opties: [
"Het bouwen van een sociaal netwerk zoals Facebook.",
"Manipulatie van mensen om toegang of informatie te krijgen.",
"Het herprogrammeren van een server.",
"Het beveiligen van je router tegen hackers."
],
      correct: 1
    },
    {
      vraag:"wat betekent encryptie?",
      opties: [
"Het versleutelen van data zodat alleen bevoegde personen het kunnen lezen.",
"Het permanent verwijderen van tijdelijke internetbestanden.",
"Het kopiëren van data naar een externe harde schijf.",
"Het opsporen van fouten in programmacode."
],
      correct: 0
    },
    {
    vraag: "wat is een VPN?",
    opties: [
      "Een virusscanner voor mobiele telefoon.",
      "een videospeler voor beveiligde media bestanden.",
      "Een type netwerkkabel voor sneller internet.",
      "Een beveiligde verbinding die je internetverkeer versleutelt en je IP-adres verbergt."
    ],
    correct: 3
  },
    {
      vraag: "waarom moet je software updaten?",
      opties: [
        "omdat het je computer sneller maakt.",
        "omdat het beveiliginglekken repareren en bescherming verbetert.",
        "omdat het de inlogtijd vermindert.",
        "omdat het de kosten voor beveiliging verlaagt."
      ],
      correct: 1
    }

 ];
}

function draw() {
  tekenAchtergrond();
  if( spelStatus === "START") {
    tekenStartScherm();
  } else if (spelStatus === "QUIZ") {
    toonvraagenopties();
  } else if (spelStatus === "FEEDBACK") {
    tekenFeedbackScherm();
  } else if (spelStatus === "EINDE") {
    tekenEindScherm();
  }
}

function tekenAchtergrond() {
  for(let i = 0; i < height; i++){
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(15, 23, 42), color(30, 41, 59), inter);
    stroke(c);
    line(0, i, width, i);
  }
  stroke(51, 65, 85, 50);

  for(let x = 0; x < width; x += 40){
    line(0, x, 0, height);
  }
  for(let y = 0; y < height; y += 40){
    line(0, y, width, y);
  }
  }

  function tekenStartScherm(){
    fill(56, 189, 248);
    noStroke();
    textSize(40);
    textStyle(BOLD);
    text("CYBERSECURITY QUIZ", width / 2, 180);

    fill(226, 232, 240);
    textSize(18);
    textStyle(NORMAL);

    text(
      "Test ke kennis over online veiligheid. \nde quiz bevat 10 vragen.",
      width / 2,
      260
    );

    tekenKnop(
      width / 2,
      height / 2 + 100,
      200,
      50,
      "START QUIZ",
      color(14, 165, 233)
    );
  }

  function toonVraagEnOpties(){
    let huidigeData = quizData[huidigeVraagindex];

    fill(52, 65, 85);
    rect(50, 40, width - 100, 10, 5);

    fill(14, 165, 233);
    let voortgangBreedte = map(
    huidigeVraagindex + 1,
    0,
    quizData.length,
    0,
    width - 100
  );
  rect(50, 40, voortgangBreedte, 10, 5);

  fill(148, 163, 184);
  textSize(14);
  textStyle(BOLD);
  text(
  `VRAAG ${huidigeVraagIndex + 1} VAN ${quizData.length}`,
width / 2,
22
);

fill(255);
textSize(22);
textStyle(BOLD);

text(
  huidigeData.vraag,
  60,
  80,
  width - 120,
  80
);

let startY = 200;
let KnopHoogte = 70;
let tussenruimte = 15;

textStyle(NORMAL);
textSize(16);

for(let i = 0; i < huidigeData.opties.length; i++){
  let KnopY = startY + i * (KnopHoogte + tussenruimte);

let hover =
mouseX > 100 &&
mouseX < - 100 &&
mouseY > KnopY &&
mouseY < KnopY + KnopHoogte;

fill (hover ? color(47, 73, 117) : color(30, 41, 59));
stroke(71, 85, 105);
strokeWeight(2);

rect(100, KnopY, width - 200, KnopHoogte, 8);

noStroke();
fill(241, 245, 249);

text(
  huidigeData.opties[i],
  120,
  KnopY,
  width - 240,
  KnopHoogte
);
}
  }

  function tekenFeedbackScherm(){
    let huidigeData = quizeData[huidigeVraagIndex];

    if (isAntwoordGoed){
      fill(34, 197, 94);
      textSize(32);
      textStyle(BOLD);
      text("GOED GEDAAN!", width/ 2, 150)
    } else{
      fill(239, 68, 68);
      textSize(32);
      textStyle(BOLD);
      text("HELAAS, FOUT!", width / 2, 150);
    }
    fill(255);
textSize(18);
textStyle(NORMAL);
text("Het juiste antwoord was:", width / 2, 240);

fill(30, 41, 59);
stroke(34, 197, 94);
rect(100, 2700, 2700, width - 200, 80, 8)

noStroke();
fill(255);

text(
  huidigeData.opties[huidigeData.correct],
  120,
  270,
  width - 240,
  80
);

let knopText = 
huidigeVraagIndex === quizData.length - 1
? "BEKIJK SCORE"
: "VOLGENDE VRAAG";

tekenKnop(
  width / 2,
  470,
  220,
  50,
  knopTekst,
  color(14, 165, 233)
);
  }

  function tekenEindScherm(){
    fill(56, 189, 248);
    textSize(40);
    textStyle(BOLD);

    text("QUIZ AFGEROND!", width / 2, 180);

    fill(255);
    textStyle(NORMAL);
    textSize(24);

    text(
      `Score: ${score} / ${quizData.length}`,
width / 2,
260
    );

    textSize(18);

    if (score === quizData.length){
      text("goed gedaan", width / 2, 320);
    }

    tekenKnop(
      width / 2,
      450,
      220,
      50,
      "OPNIEUW SPELEN",
      color(34, 197, 94)
    );
  }

  function tekenKnop(x, y, w, h, label, knopKleur){
    let knopX = x - w / 2;
    let knopY = y - h / 2;

    let hover =
    mouseX > knopX &&
    mouseX < knopX + w &&
    mouseY > knopY &&
    mouseY < knopY + h;

    if (hover){
      fill(red(knopKleur) + 20, green(knopKleur) + 20, blue(knopKleur) + 20);
    }
    stroke ( 255, 50);
    rect(knopX, knopY, w, h, 25);

    fill(255, 50);
    rect(knopX, knopY, x, y);
  }

  function mousePressed(){
    if (spelStatus === "START"){
      if(
        mouseX > width / 2 - 100 &&
        mouseX < width / 2 + 100 &&
        mouseY >  height / 2 + 75 &&
        mouseY < height / 2 + 125
      ){
        spelStatus = "QUIZ";
      }
    }

    let 
  }