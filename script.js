const questions = [
    {
      question: "What is the capital of India?",
      answers: [
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "New Delhi", correct: true },
        { text: "Lisbon", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "Who is the CEO of Tesla?",
      answers: [
        { text: "Jeff Bezos", correct: false },
        { text: "Elon Musk", correct: true },
        { text: "Bill Gates", correct: false },
        { text: "Tony Stark", correct: false }
      ]
    },
    {
        question: "Which is the National bird of India?",
        answers: [
          { text: "Hen", correct: false },
          { text: "Peacock", correct: true },
          { text: "Pigeon", correct: false },
          { text: "Eagle", correct: false }
        ]
      },
      {
        question: "How many days are there in one week?",
        answers: [
          { text: "7", correct: true },
          { text: "5", correct: false },
          { text: "9", correct: false },
          { text: "4", correct: false }
        ]
      }
    
  ];
  
  const questionElement = document.getElementById('question');//to get questions 
  const answerButtons = document.getElementById('answer-buttons');//for getting  options button
  const nextButton = document.getElementById('next-btn');//for next function button
  const scoreDisplay = document.getElementById('score');//for getting score check
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {      //defining a function to check how many question attempted
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
  }
  
  function showQuestion() {     // function for dynamic question loading
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectAnswer(answer, button));
      answerButtons.appendChild(button);
    });
  }
  
  function resetState() {       //function to restart the quiz
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(answer, button) {   //function that use conditional statement to check whether it is wrong/right
    const correct = answer.correct;
    if (correct) {
      button.classList.add('correct');
      score++;
    } else {
      button.classList.add('wrong');
    }
  
    Array.from(answerButtons.children).forEach(btn => {
      btn.disabled = true;
      if (btn.innerText === questions[currentQuestionIndex].answers.find(a => a.correct).text) {
        btn.classList.add('correct');
      }
    });
  
    nextButton.style.display = 'block';
  }
  
  nextButton.addEventListener('click', () => { // for responsive 'next' button movement
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  });
  
  function showScore() { // display the score and finish the quiz
    resetState();
    questionElement.innerText = `Quiz Completed! Your score: ${score}/${questions.length}`;
    scoreDisplay.innerText = '';
    nextButton.innerText = 'Restart';
    nextButton.style.display = 'block';
    nextButton.onclick = () => startQuiz();
  }
  
  startQuiz();
  