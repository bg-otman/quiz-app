const showQuestion = document.querySelector(".show-js-questions");
const question = document.querySelector(".qst");
const answersElement = document.querySelector(".answers");
const answer1 = document.querySelector(".ans1");
const answer2 = document.querySelector(".ans2");
const answer3 = document.querySelector(".ans3");
const answer4 = document.querySelector(".ans4");

const scoreElement = document.querySelector(".score");
const correctAnsScore = document.querySelector(".correct-ans-num");
const wrongAnsScore = document.querySelector(".wrong-ans-num");
const tryAgainBtn = document.querySelector(".try-again-btn");
const categoryMenu = document.querySelector(".category-menu");

const currentQst = document.querySelector(".current-qst-num");
const currentQstNum = document.querySelector(".current-qst-num span");

//////////////
const jsQuiz = document.getElementById("js-quiz");
const choseCategory = document.querySelector(".choose-category");
const geoQuiz = document.getElementById("Geography-quiz");
const generalQuiz = document.getElementById("general-culture");
const footballQuiz = document.getElementById("football-quiz");
//////////////
let urlContainer = "./quiz/js-quiz.json";
///////////
const bullets = document.querySelectorAll(".circle");

bullets.forEach((circle, index) => {
  circle.classList.add(`circle-${index}`);
});

let index = 0;

function getQuestion() {
  let randomNum = Math.round(Math.random() * 12);

  fetch(urlContainer)
    .then((resp) => {
      let data = resp.json();
      return data;
    })
    .then((data) => {
      question.innerHTML = data[index].question;

      if (randomNum >= 0 && randomNum < 3) {
        answer1.innerHTML = data[index].correct;
        answer2.innerHTML = data[index].wrong1;
        answer3.innerHTML = data[index].wrong2;
        answer4.innerHTML = data[index].wrong3;

        answerCheckCorrect(answer1, data);
        answerCheckWrong(answer2, data);
        answerCheckWrong(answer3, data);
        answerCheckWrong(answer4, data);
      } else if (randomNum >= 3 && randomNum < 6) {
        answer1.innerHTML = data[index].wrong1;
        answer2.innerHTML = data[index].correct;
        answer3.innerHTML = data[index].wrong2;
        answer4.innerHTML = data[index].wrong3;

        answerCheckCorrect(answer2, data);
        answerCheckWrong(answer1, data);
        answerCheckWrong(answer3, data);
        answerCheckWrong(answer4, data);
      } else if (randomNum >= 6 && randomNum < 9) {
        answer1.innerHTML = data[index].wrong1;
        answer2.innerHTML = data[index].wrong2;
        answer3.innerHTML = data[index].correct;
        answer4.innerHTML = data[index].wrong3;

        answerCheckCorrect(answer3, data);
        answerCheckWrong(answer2, data);
        answerCheckWrong(answer1, data);
        answerCheckWrong(answer4, data);
      } else {
        answer1.innerHTML = data[index].wrong1;
        answer2.innerHTML = data[index].wrong2;
        answer3.innerHTML = data[index].wrong3;
        answer4.innerHTML = data[index].correct;

        answerCheckCorrect(answer4, data);
        answerCheckWrong(answer2, data);
        answerCheckWrong(answer3, data);
        answerCheckWrong(answer1, data);
      }
    })
    .catch((reason) => console.log(Error(reason)));

  currentQstNum.innerHTML = +currentQstNum.innerHTML + 1;
}

function answerCheckCorrect(answer, data) {
  answer.onclick = function () {
    if (answer.innerHTML === data[index].correct) {
      if (index === 9) {
        document.querySelector(`.circle-${index}`).style.backgroundColor =
          "green";
        setTimeout(() => {
          correctAnsScore.innerHTML = +correctAnsScore.innerHTML + 1;
          scoreElement.style.display = "flex";
          tryAgainBtn.style.display = "block";
          categoryMenu.style.display = "block";

          currentQst.style.display = "none";
          showQuestion.style.display = "none";
        }, 1000);
      } else {
        correctAnsScore.innerHTML = +correctAnsScore.innerHTML + 1;

        document.querySelector(`.circle-${index}`).style.backgroundColor =
          "green";

        index += 1;
        getQuestion();
      }
    }
  };
}
function answerCheckWrong(answer, data) {
  answer.onclick = function () {
    if (answer.innerHTML !== data[index].correct) {
      if (index === 9) {
        document.querySelector(`.circle-${index}`).style.backgroundColor =
          "red";

        setTimeout(() => {
          wrongAnsScore.innerHTML = +wrongAnsScore.innerHTML + 1;
          scoreElement.style.display = "flex";
          tryAgainBtn.style.display = "block";
          categoryMenu.style.display = "block";

          currentQst.style.display = "none";
          showQuestion.style.display = "none";
        }, 1000);
      } else {
        wrongAnsScore.innerHTML = +wrongAnsScore.innerHTML + 1;

        document.querySelector(`.circle-${index}`).style.backgroundColor =
          "red";

        index += 1;
        getQuestion();
      }
    }
  };
}

tryAgainBtn.addEventListener("click", () => {
  scoreElement.style.display = "none";
  tryAgainBtn.style.display = "none";
  categoryMenu.style.display = "none";

  displayLoader();

  setTimeout(() => {
    hideLoader();
    currentQst.style.display = "block";
    showQuestion.style.display = "flex";

    bullets.forEach((bullet) => {
      bullet.style.backgroundColor = "#ffffff";
    });

    backToZero();
    getQuestion();
  }, 2000);
});

categoryMenu.addEventListener("click", () => {
  categoryMenu.style.display = "none";
  tryAgainBtn.style.display = "none";
  scoreElement.style.display = "none";

  displayLoader();
  setTimeout(() => {
    hideLoader();
    choseCategory.style.display = "flex";
    currentQst.style.display = "block";

    bullets.forEach((bullet) => {
      bullet.style.backgroundColor = "#ffffff";
    });

    backToZero();
  }, 1500);
});

jsQuiz.onclick = function () {
  urlContainer = "./quiz/js-quiz.json";
  displayQst();
};
footballQuiz.onclick = function () {
  urlContainer = "./quiz/football-quiz.json";
  displayQst();
};
generalQuiz.onclick = function () {
  urlContainer = "./quiz/general-culture-quiz.json";
  displayQst();
};
geoQuiz.onclick = function () {
  urlContainer = "./quiz/geography-quiz.json";
  displayQst();
};

function backToZero() {
  correctAnsScore.innerHTML = 0;
  wrongAnsScore.innerHTML = 0;

  currentQstNum.innerHTML = 0;
  index = 0;
}

function displayLoader() {
  document.querySelector(".loader").style.cssText =
    "display: block; animation: showElement 0.2s ease;";
}
function hideLoader() {
  document.querySelector(".loader").style.cssText =
    "display: none; animation: showElement 0.1s ease;";
}

function displayQst() {
  choseCategory.style.display = "none";
  displayLoader();
  setTimeout(() => {
    hideLoader();
    getQuestion();
    showQuestion.style.cssText =
      "display: flex; animation: showElement 0.3s ease-in-out;";
  }, 3000);
}
