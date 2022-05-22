var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var count = 30;
var questions = [
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'Hypertext Markup Language', correct: true },
      { text: 'Hyperlinks and Text Markup Language', correct: false },
      { text: 'Home Tool Markup Language', correct: false }

    ]
  },
  {
    question: 'What does CSS stand for?',
    answers: [
      { text: 'Communications Support Security', correct: false },
      { text: 'Computing Software Systems', correct: false },
      { text: 'Cascading Style Sheets', correct: true },
      { text: 'It does not stand for anything', correct: false }
    ]
  },
  {
    question: 'Which of the following is NOT a web broswer?',
    answers: [
      { text: 'Safari', correct: false },
      { text: 'Control Panal', correct: true },
      { text: 'Chrome', correct: false },
      { text: 'Microsoft Edge', correct: false }
    ]
  },
  {
    question: 'What is the purpose of Javascript',
    answers: [
      { text: 'It is to style and layout web pages', correct: false },
      { text: 'Allows you to make web pages interactive', correct: true }
    ]
  }
]
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', () => {
  startGame()
  startTimer()
})
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startTimer() {
  var interval = setInterval(function() {
    document.getElementById('time-display').innerHTML=count;
    count--;
    if (count < 0){
      clearInterval(interval);
      alert("You're out of time!");
    }
  },1000);
}

function startGame() {
  startButton.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    // If the answer obj has the property correct set to true,
    // add true to the data-correct property
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  // If the selected answer does not have the value
  // true in it's data-correct property, remove 5 seconds.
  if(!correct){
    count -= 5
    document.getElementById('time-display').innerHTML=count;
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}