var myQuestions = [
  {
    question: "1.Which one of the following actors did not play James Bond?",
    answers: {
      a: "Daniel Craig",
      b: "Pierce Brosman",
      c: "Colin Firth",
      d: "Sean Connery",
    },
    correctAnswer: "c",
  },
  {
    question: "2.What is the boiling point temperature (water)?",
    answers: {
      a: "50 °C",
      b: "100 °C",
      c: "150 °C",
      d: "200 °C",
    },
    correctAnswer: "b",
  },
  {
    question: "3.Which fruit is associated with Isaac Newton?",
    answers: {
      a: "Apple",
      b: "Pear",
      c: "Pineapple",
      d: "Banana",
    },
    correctAnswer: "a",
  },
  {
    question: "4.What is the capital city of Australia?",
    answers: {
      a: "Sydney",
      b: "Melbourne",
      c: "Canberra",
      d: "Brisbane",
    },
    correctAnswer: "c",
  },
];

var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(
  questions,
  quizContainer,
  resultsContainer,
  submitButton
) {
  function showQuestions(questions, quizContainer) {
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for (var i = 0; i < questions.length; i++) {
      // first reset the list of answers
      answers = [];

      // for each available answer...
      for (letter in questions[i].answers) {
        // ...add an html radio button
        answers.push(
          "<label>" +
            '<input type="radio" name="question' +
            i +
            '" value="' +
            letter +
            '">' +
            letter +
            ": " +
            questions[i].answers[letter] +
            "</label>"
        );
      }

      // add this question and its answers to the output
      output.push(
        '<div class="question">' +
          questions[i].question +
          "</div>" +
          '<div class="answers">' +
          answers.join("") +
          "</div>"
      );
    }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults(questions, quizContainer, resultsContainer) {
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    var userAnswer = "";
    var numCorrect = 0;

    // for each question...
    for (var i = 0; i < questions.length; i++) {
      // find selected answer
      userAnswer = (
        answerContainers[i].querySelector(
          "input[name=question" + i + "]:checked"
        ) || {}
      ).value;
      console.log("Question:", questions[i]);
      console.log("User:", userAnswer);

      // if answer is correct
      if (userAnswer === questions[i].correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[i].style.color = "rgb(89, 188, 89)";
        console.log("grr", answerContainers);
      }

      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[i].style.color = "red";
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + " out of " + questions.length;
  }

  // show questions right away
  showQuestions(questions, quizContainer);

  // on submit, show results
  submitButton.onclick = function () {
    showResults(questions, quizContainer, resultsContainer);
  };
}
