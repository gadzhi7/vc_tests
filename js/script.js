document.addEventListener("DOMContentLoaded", function() {

  const final = document.querySelector('.final'),
        startBlock = document.querySelector('.start'),
        questionBlock = document.querySelector('.question'),
        questionOptions = document.querySelector('.question_options'),
        questionAnswer = document.querySelector('.question_answer'),
        currentQuestionText = document.querySelector('.question_count__current'),
        totalQuestionText = document.querySelector('.question_count__total'),
        questionText = document.querySelector('.question_text');


  const startBtn = document.querySelector('.start_button'),
        nextBtn = document.querySelector('.question_next'),
        againBtn = document.querySelector('.again_button');


  let tests,
      testTotalCount = 0,
      rightAnswers = 0,
      currentQuestion = 0;



  //получаю тесты
  let promise = fetch('test.json')
  .then((response) => response.status === 200 ? response.json() : null)
  .then((json) =>  {

    json !== null ? tests = json : tests = null
    show(startBtn);
  })

startBtn.addEventListener('click', function () {
  
  console.log(tests[0]);
})



})



function show(el) {
  el.classList.remove('hidden')
}

function hide(el) {
  el.classList.add('hidden')
}
