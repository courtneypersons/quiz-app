'use strict';
// setting variables 
let counter = 0;
let incorrectNum = 0;
let correctNum = 0;
let questionNum = 1;
// start quiz on click and remove div with class title-page.

function startQuiz() {
  $('#start-button').on('click',function(e){
    $('.title-page').remove();
    $('.form-questions').html(showQuestion());
    $('.form-questions').hide().fadeIn(1000);

  });
}
// shows the questions with the different answers, also shows how many correct or wrong. 


function showQuestion(){
  $(".form-questions").html(`
    <fieldset>
      <legend class="question-num">question ${questionNum} out of ${quizQuestions.length}</legend>
    <div class="quiz-question">
        ${quizQuestions[counter].question}
    </div>

      <label class="answerOption">
      <input type="radio" value="${quizQuestions[counter].answers[0]}" name="answer" required>
      <span>${quizQuestions[counter].answers[0]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${quizQuestions[counter].answers[1]}" name="answer" required>
      <span>${quizQuestions[counter].answers[1]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${quizQuestions[counter].answers[2]}" name="answer" required>
      <span>${quizQuestions[counter].answers[2]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${quizQuestions[counter].answers[3]}" name="answer" required>
      <span>${quizQuestions[counter].answers[3]}</span>
      </label>
    <input type="submit" name="submit" id="submit-button" value="check answer">
   </fieldset>   
  <div class="score">
   <span class="score">Correct: ${correctNum}, Incorrect: ${incorrectNum}</span>
  </div>
`)};

// gets user selected input and if user input is correct or incorrect you add 1 to the counter,
// questionNum and correctNum or incorrectNum.

function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = `${quizQuestions[counter].correct}`;
    if (answer === correct) {
     userAnswerCorrect();
     counter++;
     questionNum++;
     correctNum++;
      
    } else {
      userAnswerIncorrect();
      counter++;
      questionNum++;
      incorrectNum++;
    }
    isGameOver()
  });
}

//  when counter reach the last question , show the results 

function isGameOver(){
console.log(counter, quizQuestions.length)
  if (counter === quizQuestions.length){

    $("#results").addClass("show")
    $('#results span').html(
      `<h2> you got ${correctNum} out of ${quizQuestions.length} correct!</h2>
      `)
    $(".next-button").remove()
    $(".goto-next").remove()
  }

  // the quiz reset when the user clicks on try again

}
$('#tryagain').click(function(){
  counter = 0;
  correctNum = 0;
  incorrectNum = 0;
  questionNum = 1;
  $("#results").removeClass("show")

  $('.form-questions').html(showQuestion());

})


// if correct remove form and alert thats the correct answer.
function userAnswerCorrect() {
  $('form').empty().html(alertCorrect());
}

function alertCorrect() { 
  if (counter < quizQuestions.length){
    return `<form class="next-question-form"><h2>Nice Job!</h2><p class="goto-next">Let's go for the next one!</p><input type="submit" value="Next Question" class="next-button" role="button"/></form>`;
  }else if (counter === quizQuestions.length) {
    return `<form class="next-question-form"><h2>Nice Job!</h2><p class="goto-next">Let's go for the next one!</p><input type="submit" value="next question" class="next-button" role="button"/>`;
  }
};

// if incorrect remove form and alert whats the right answer.

function userAnswerIncorrect() {
  $('form').empty().html(alertIncorrect());
}


function alertIncorrect() {
  if (counter < quizQuestions.length){
    return `<form class="next-question-form"><p>Nope, the correct answer was ${quizQuestions[counter].correct}</p><input type="submit" value="Next Question" class="next-button" role="button"/></form>`;
  }else if(counter === quizQuestions.length) {
    return `<form class="next-question-form"><p>Nope, the correct answer was ${quizQuestions[counter].correct}</p><input type="submit" value="next question" class="next-button" role="button"/>`;
  }
};

// moves on to the next question when clicked

function nextQuestion() {
  $('form').on('click', '.next-button', function(event){
    event.preventDefault();
    $('.next-question-form').remove();
    $('form').append(showQuestion());
    $('.form-questions').hide().fadeIn(1000);

  });
}


// put the quiz together  

function renderQuiz(){
  startQuiz();
  userSelectAnswer();
  nextQuestion();
}
renderQuiz();