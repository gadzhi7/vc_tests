const finalBlock = document.querySelector('.final'),
      answerBlock = document.querySelector('.answer'),
      questionBlock = document.querySelector('.question'),
      questionOptions = document.querySelector('.question_options'),
      questionCurrentText = document.querySelector('.question_count__current'),
      questionTotalText = document.querySelector('.question_count__total'),
      questionText = document.querySelector('.question_text'),
      answerOption = document.querySelector('.answer_option');
      answerText = document.querySelector('.answer_text');


const startBtn = document.querySelector('.start_button'),
      nextBtn = document.querySelector('.question_next');


let tests,
    testTotalCount = 0,
    rightAnswers = 0,
    currentQuestion = 0;


document.addEventListener("DOMContentLoaded", function() {
  //получаю тесты
  let promise = fetch('test.json')
  .then((response) => response.status === 200 ? response.json() : null)
  .then((json) =>  {
    json !== null ? tests = json : tests = null
    show(startBtn);
  })

  // показывает вопрос
  function showQustion() {
    hide([document.querySelector('.start'), answerBlock, nextBtn, finalBlock])

    if(!(tests.length < currentQuestion + 1)) {
      questionTotalText.innerText = tests.length
      questionCurrentText.innerText = currentQuestion + 1
      questionText.innerText = tests[currentQuestion].question
      questionOptions.innerHTML = ''

      tests[currentQuestion].options.forEach( (item) => {
        questionOptions.insertAdjacentHTML('beforeend', `<li data-id="${item.id}">${item.title}</li>`)
      })
      show([questionBlock, questionOptions])
    } else {
      // если вопросы завершились выводит финальный экран
      hide(questionBlock)
      show(finalBlock)

      document.querySelector('.final_point__right').innerText = rightAnswers
      document.querySelector('.final_point__total').innerText = tests.length

      result.some(function(item) {
        if(rightAnswers >= item.point) {
          document.querySelector('.final_text').innerText = item.text
          document.querySelector('.final_img img').setAttribute('src', item.imgLink)
          return true
        }
      });
    }
  }

// Начать тест
  startBtn.addEventListener('click', function () {
    showQustion()
  })

//выбор ответа
  questionOptions.addEventListener('click', (e) => {
    if(e.target.tagName === "LI") {
      tests[currentQuestion].right === Number(e.target.dataset.id) ? trueAnswer(answerOption) : falseAnswer(answerOption)

      tests[currentQuestion].options.forEach((item) => {
        if(item.id === Number(e.target.dataset.id)) {
          answerOption.innerText = item.title
          answerText.innerHTML = item.text
        }
      })

      hide(questionOptions)
      show([answerBlock, nextBtn])
    }
  })

// следующий вопрос
  nextBtn.addEventListener('click', () => {
    currentQuestion++
    showQustion()
  })

  //начать тест заново
  document.querySelector('.final_again').addEventListener('click', () => {
    rightAnswers = currentQuestion = 0;
    showQustion()
  })

})


// отображать элемент(ы)
function show(el) {
  Array.isArray(el) ? el.forEach((i) => i.classList.remove('hidden')) : el.classList.remove('hidden')
}

// скрывать елемент(ы)
function hide(el) {
  Array.isArray(el) ? el.forEach((i) => i.classList.add('hidden')) : el.classList.add('hidden')
}

// верный ответ
function trueAnswer(el) {
  el.classList.remove('wrong')
  el.classList.add('right')
  rightAnswers++
}

// непрвильный ответ
function falseAnswer(el) {
  el.classList.remove('right')
  el.classList.add('wrong')
}


const result = [
  {
    point: 8,
    text: 'Я работаю в редакции vc.ru',
    imgLink: 'img/8.png'
  },
  {
    point: 7,
    text: 'Читаю vc.ru каждый день, но работать тоже нужно',
    imgLink: 'img/7.png'
  },
  {
    point: 5,
    text: 'Бизнес это интересно, но где взять столько времени?',
    imgLink: 'img/5.png'
  },
  {
    point: 3,
    text: 'Читаю vc.ru с экрана попутчика в метро',
    imgLink: 'img/3.png'
  },
  {
    point: 0,
    text: 'Мне больше интересен футбол',
    imgLink: 'img/0.png'
  }
]
