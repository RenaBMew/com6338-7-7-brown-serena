// Use Array 5 Questions, at least two choices
var questionsArr = [
    {
      question: 'What country has the most islands in the world?',
      answer: 'Sweden',
      options: [
        'Finland',
        'Greece',
        'Sweden',
        'Indonesia',
      ]
    },
    {
      question: 'What’s the smallest country in the world?',
      answer: 'The Vatican',
      options: [
        'San Marino',
        'Malta',
        'Monaco',
        'The Vatican',
      ]
    },
    {
      question: 'What’s the capital of Canada?',
      answer: 'Ottawa',
      options: [
        'Toronto',
        'Ottawa',
        'Montreal',
        'Vancouver',
      ]
    },
    {
      question: 'Name the largest mountain range in the world?',
      answer: 'The Andes',
      options: [
        'Transarctic Mountains',
        'Himalayas',
        'Rocky Mountains',
        'The Andes',
      ]
    },
    {
      question: 'Which is the deepest place on planet Earth?',
      answer: 'Challenger Deep',
      options: [
        'Mariana Trench',
        'Challenger Deep',
        'Tonga Trench',
        'Phillipine Trench',
      ]
    },
  ]

var quizGame = document.querySelector('#quiz')
var score = 0
var currentQuestion = 0
var countDown
var quizTimer


quizGame.onclick = function(e) {
    if (e.target.id === 'start-quiz') {
        displayQuestion()
    } else if (e.target.parentElement.id === 'choices'
    && e.target.tagName === 'BUTTON'){
        if(e.target.textContent === questionsArr[currentQuestion].answer){
            score++
        }
        clearInterval(quizTimer)
        currentQuestion++
        if (currentQuestion < questionsArr.length){
            displayQuestion()
        } else {
            endQuiz()
        }
    }
}

// 'start-quiz' function, initial 0, show previous score

function startQuiz(){
    score = 0
    currentQuestion = 0
    quizGame.innerHTML = ''
    var previousScore = localStorage.getItem('previous-score')
    if (previousScore){
        var previousScoreEl = document.createElement('p')
        previousScoreEl.textContent = 'Welcome back! Your previous score was: ' + previousScore
        quizGame.appendChild(previousScoreEl)
    }
    var startBtn = document.createElement('button')
    startBtn.id = 'start-quiz'
    startBtn.textContent = 'Start Quiz'
    quizGame.appendChild(startBtn)

}

// Display Question with choice buttons and 30 second countdown using setInterval and clearInterval.

function displayQuestion(){
    var questionText = questionsArr[currentQuestion]
    quizGame.innerHTML = ''
    var questionTextEl = document.createElement('p')
    questionTextEl.textContent = questionText.question
    quizGame.appendChild(questionTextEl)
    var quizChoices = document.createElement('div')
    quizChoices.id = 'choices'
    quizGame.appendChild(quizChoices)
    questionText.options.forEach(function(choice){
        var btn = document.createElement('button')
        btn.textContent = choice
        quizChoices.appendChild(btn)
    })
    countDown = 30
    var timerEl = document.createElement('p')
    timerEl.id = 'timer'
    timerEl.textContent = countDown
    quizGame.appendChild(timerEl)
    startTimer()
}

// Timer function
// Selection or time runout leads to next question
// After last question/time out, display 'start-quiz' button + score % (nearest whole #).

function startTimer() {
    var timerEl = document.querySelector('#timer')
    quizTimer = setInterval(function() {
        countDown--
        if (countDown >= 0){
            timerEl.textContent = countDown
        } else {
            clearInterval(quizTimer)
            currentQuestion++
            if(currentQuestion < questionsArr.length){
                displayQuestion()
            } else {
              endQuiz()
              }
          }
      }, 1000)
    }

// Show score
// If played before, page load shows previous score % with localStorage / previous-score

function endQuiz() {
    quizGame.innerHTML = ''
    var percent = Math.round(score / questionsArr.length * 100) + '%'
    localStorage.setItem('previous-score', percent)
    startQuiz()
}

// 'start-quiz' on load.

startQuiz()