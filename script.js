var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', () => {
  startGame()
  timer()
})
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
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
  console.log(correct)
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
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
    decrementTime()
  }
} 

function decrementTime() {
    var penaltyTime = 5;
    document.getElementById('time-display').innerHTML=count-=penaltyTime;
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')

}

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

var count = 60;
var interval = setInterval(timer,1000);

   // if (document.getElementById('wrong')) {
  //   console.log('wrong')
  //   document.getElementById('wrong').addEventListener('click', function() {
  //     sec -= 5;
  //     document.getElementById('time-display').innerHTML='00:'+sec;
  //   });
  // }

function timer() {
  document.getElementById('time-display').innerHTML=count;
  count--;
  if (count === 0){
    clearInterval(interval);
    // document.getElementById('start-btn').innerHTML='Done';
    // or...
    alert("You're out of time!");
  }
}