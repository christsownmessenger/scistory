const quiz = [
  { q: "The James Webb Space Telescope observes primarily in which spectrum?", options: ["Visible", "Infrared", "Ultraviolet", "X-ray"], answer: "Infrared" },
  { q: "CRISPR can be used to edit human DNA.", options: ["True", "False"], answer: "True" },
  { q: "Quantum computers use classical bits.", options: ["True", "False"], answer: "False" },
  { q: "Which scientist developed the smallpox vaccine?", options: ["Louis Pasteur", "Edward Jenner", "Alexander Fleming", "Marie Curie"], answer: "Edward Jenner" },
  { q: "The human brain has approximately 86 billion neurons.", options: ["True", "False"], answer: "True" }
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
