const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

const myQuestions = [
  {
    question: "Which scientist proposed the heliocentric model of the solar system?",
    answers: {
      a: "Galileo Galilei",
      b: "Nicolaus Copernicus",
      c: "Isaac Newton"
    },
    correctAnswer: "b"
  },
  {
    question: "In what year did the Berlin Wall fall?",
    answers: {
      a: "1989",
      b: "1991",
      c: "1975"
    },
    correctAnswer: "a"
  },
  {
    question: "What is the powerhouse of the cell?",
    answers: {
      a: "Nucleus",
      b: "Mitochondria",
      c: "Ribosome"
    },
    correctAnswer: "b"
  },
  {
    question: "Who was the first emperor of Rome?",
    answers: {
      a: "Julius Caesar",
      b: "Augustus",
      c: "Nero"
    },
    correctAnswer: "b"
  },
  {
    question: "Which element has the chemical symbol O?",
    answers: {
      a: "Oxygen",
      b: "Osmium",
      c: "Oganesson"
    },
    correctAnswer: "a"
  }
];

function buildQuiz() {
  const output = [];

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];

    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${letter} :
          ${currentQuestion.answers[letter]}
        </label>`
      );
    }

    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
       <div class="answers"> ${answers.join("")} </div>`
    );
  });

  quizContainer.innerHTML = output.join("");
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");

  let numCorrect = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainers[questionNumber].style.color = "lightgreen";
    } else {
      answerContainers[questionNumber].style.color = "salmon";
    }
  });

  resultsContainer.innerHTML = `You got ${numCorrect} out of ${myQuestions.length} correct.`;
}

buildQuiz();
submitButton.addEventListener("click", showResults);

document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quiz-form");
  const resultsContainer = document.getElementById("results");
  const restartBtn = document.getElementById("restart");

  quizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const answers = quizForm.querySelectorAll("input[type=radio]:checked");
    let score = 0;

    answers.forEach((answer) => {
      if (answer.dataset.correct === "true") {
        score++;
      }
    });

    const totalQuestions = quizForm.querySelectorAll(".question").length;
    const scorePercent = Math.round((score / totalQuestions) * 100);

    // Reset classes
    resultsContainer.className = "";
    resultsContainer.style.display = "block";

    // Apply styling based on performance
    if (scorePercent >= 70) {
      resultsContainer.classList.add("good");
      resultsContainer.textContent = `🎉 Excellent! You scored ${score} out of ${totalQuestions} (${scorePercent}%).`;
    } else if (scorePercent >= 40) {
      resultsContainer.classList.add("medium");
      resultsContainer.textContent = `🙂 Not bad! You scored ${score} out of ${totalQuestions} (${scorePercent}%). Keep learning!`;
    } else {
      resultsContainer.classList.add("bad");
      resultsContainer.textContent = `😢 You scored ${score} out of ${totalQuestions} (${scorePercent}%). Try again and improve!`;
    }

    // Show restart button
    restartBtn.style.display = "inline-block";
  });

  // Restart quiz
  restartBtn.addEventListener("click", () => {
    quizForm.reset();
    resultsContainer.textContent = "";
    resultsContainer.className = "";
    resultsContainer.style.display = "none";
    restartBtn.style.display = "none";
  });
});

