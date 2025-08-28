const quiz = [
  { q: "The Roman Empire built extensive aqueducts for public water supply.", options: ["True", "False"], answer: "True" },
  { q: "The Industrial Revolution began in which country?", options: ["France", "United States", "Britain", "Germany"], answer: "Britain" },
  { q: "Ancient Egyptians used the lever and ramp systems to construct pyramids.", options: ["True", "False"], answer: "True" },
  { q: "Which medical practice did Romans contribute to?", options: ["Vaccination", "Surgery and sanitation", "Antibiotics", "MRI scans"], answer: "Surgery and sanitation" },
  { q: "The Great Pyramid of Giza was built as a tomb for Pharaoh Khufu.", options: ["True", "False"], answer: "True" }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');

function loadQuestion() {
  if(current >= quiz.length){
    questionEl.innerHTML = 'Quiz Completed!';
    optionsEl.innerHTML = '';
    scoreEl.innerHTML = `Your Score: ${score} / ${quiz.length}`;
    restartBtn.style.display = 'block';
    return;
  }

  const q = quiz[current];
  questionEl.innerHTML = q.q;
  optionsEl.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(opt);
    optionsEl.appendChild(btn);
  });
  scoreEl.innerHTML = `Current Score: ${score}`;
  restartBtn.style.display = 'none';
}

function selectAnswer(selected){
  if(selected === quiz[current].answer) score++;
  current++;
  loadQuestion();
}

restartBtn.onclick = () => {
  current = 0;
  score = 0;
  loadQuestion();
}

loadQuestion();
