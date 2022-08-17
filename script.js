const questionContainer = document.querySelector('.question')
const choices = document.querySelectorAll('.choice')
const resultsPage = document.querySelector('.results-page')
const gamePlay = document.querySelector('.game-play')
const replayBtn = document.querySelector('.replay')
const timer = document.querySelector('.timer')
const scoreContainer = document.querySelector('.current-score')
const finalScore = document.querySelector('.final-score')
const correctAnswersContainer = document.querySelector('.correct-answers')
const wrongAnswersContainer = document.querySelector('.wrong-answers')
const chancesContainer = document.querySelector('.chances')

//QUIZ CONSTRUCTOR FUNCTIONS
function Questions(question, choices, answer) {
    this.question = question
    this.choices = choices
    this.answer = answer
}

function Quiz() {

}

//QUIZ OBJECTS

const quiz = new Quiz()
const questions = [
    new Questions ('Which of the following is a low level language',['python', 'Kotlin', 'Java', 'Assembly'], 'Assembly'),
    new Questions ('Which one is the language of the web', ['Ruby', 'Carbon lang', 'Javascript', 'Flutter'], 'Javascript'),
    new Questions ('Which framework is used for website development', ['Angular', 'React','Vuejs', 'All the above'], 'All the above'),
    new Questions ('Which of the following organisations is resposible for the development and maintainace of JavaScript',['Facebook', 'ECMA','Google','World wide web consortinum'], 'ECMA'),
    new Questions ('Where in the following can deploy your site',['Bitbucket', 'Codepen','Heroku','Twitter'], 'Heroku'),
    new Questions ('Git is used for?',['Version Control', 'Deployment','Storage','Coding'], 'Version Control'),
    new Questions ('The dart programming language is owned by?',['Facebook', 'Bjarne Stroustroup','Google','Netscape'], 'Google'),
    new Questions ('Flutter is a framework for the _________ language',['Dart', 'Javascript','C++','None of the above'], 'Dart'),
    new Questions ('In how many days was javascript created?',['10', '100','1 year','1'],'10'),
    new Questions ('React is a javascript framework used for developing frontend UI, which company is responsible for maintaining react',['Facebook', 'ECMA','Google','Amazin'], 'Facebook')
]

// QUIZ GAME

let time = 10
let questionNumber = 0
let score = 0
let correctAnswers = 0
let wrongAnswers = 0
let chances = 2

Questions.prototype.generateQuestion = function() {
    time = 10
    if (quiz.isEnded()) {
    }
    questionContainer.textContent = this.question
}

Questions.prototype.generateChoices = function() {
    choices.forEach((choice, index) => {
        choice.textContent = this.choices[index]
    });
}
Questions.prototype.checkAnswer = function(e) {
   if (quiz.isEnded()) {
        quiz.displayResults()
        return
    }
    if(e.target.textContent === this.answer) {
        questionNumber++
        correctAnswers++
        time = 10
        score+=10
        scoreContainer.textContent = score
        questions[questionNumber].generateQuestion()
        questions[questionNumber].generateChoices()
    } else {
        questionNumber++
        wrongAnswers++
        time = 10
        questions[questionNumber].generateQuestion()
        questions[questionNumber].generateChoices()
    } 
    
}

Quiz.prototype.isEnded = function() {
    if(questionNumber === 9) return true
}

Quiz.prototype.displayResults = function() {
    correctAnswersContainer.textContent = +correctAnswers + 1
    wrongAnswersContainer.textContent = wrongAnswers
    resultsPage.style.display = 'block'
    gamePlay.style.display = 'none'
} 

Quiz.prototype.init = function() {
    score = 0
    time = 10
    chances = 2
    correctAnswers = 0
    wrongAnswers = 0
    scoreContainer.textContent = score
    timer.textContent = time
    chancesContainer.children[0].style.display = 'inline'
    chancesContainer.children[1].style.display = 'inline'
    chancesContainer.children[2].style.display = 'inline'
    resultsPage.style.display = 'none'
    gamePlay.style.display = 'block'    
}


Quiz.prototype.timer = function() {
   let timing = setInterval(() => {
        time--
        timer.textContent = time

        if(quiz.isEnded() && time < 0) {
            clearInterval(timing)
            quiz.displayResults()
        } else if (chances === 0 && time < 0) {
            clearInterval(timing)
            quiz.displayResults()
        } else if(time < 0) {
            time = 10
            timer.textContent = time
            questionNumber++
            if(score === 0) {
                score = 0
            } else {
                score-=4
            }
            scoreContainer.textContent = score
            questions[questionNumber].generateQuestion()
            questions[questionNumber].generateChoices()
            chancesContainer.children[chances].style.display = 'none'
            chances--
        }  
    }, 1000);
}
Quiz.prototype.score = function () {
    if(score < 0) score = 0
    return score
}


questions[questionNumber].generateQuestion()
questions[questionNumber].generateChoices()
quiz.timer()
choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        questions[questionNumber].checkAnswer(e)
    })
});
replayBtn.addEventListener('click', () => {
    questionNumber = 0
    quiz.init()
    questions[questionNumber].generateQuestion()
    questions[questionNumber].generateChoices()
    quiz.timer( )
})