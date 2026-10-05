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
        "Soft"
    }
  ];
}

function draw() {
  background(220);
}
