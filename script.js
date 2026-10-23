
/* ==========================================
   CUSTOMISE YOUR QUIZ HERE
   ========================================== */

const questions = [
    { word: "Pœľ-ß§hã", translation: "Poland" },
    { word: "Ķæř", translation: "Crimea" },
    { word: "Ïñ", translation: "one" },
    { word: "Đəďœ", translation: "two" },
    { word: "Þťő", translation: "three" },
    { word: "Jõřťtø", translation: "four" },
    { word: "Pįiff", translation: "five" },
    { word: "ß§œñ", translation: "six" },
    { word: "Śì", translation: "seven" },
    { word: "Œþtto", translation: "eight" },
    { word: "Ñő", translation: "nine" },
    { word: "Œß§", translation: "zero" },
    { word: "Đœŕřø", translation: "ten" },
    { word: "Ïññæç", translation: "eleven" },
    { word: "Ññæç", translation: "suffix" },
    { word: "Öbťț", translation: "the same" },
    { word: "Bæñęçā", translation: "infinity" },
    { word: "Çıįæ", translation: "digit" },
    { word: "Đöđœññæç", translation: "twelve" },
    { word: "Þtőññæç", translation: "thirteen" },
    { word: "Jõřťtœññæç", translation: "fourteen" },
    { word: "Ññæç-æť", translation: "fifteen" },
    { word: "ß§œññæç", translation: "sixteen" },
    { word: "Síññæç", translation: "seventeen" },
    { word: "Œþttoññæç", translation: "eighteen" },
    { word: "Ñőññæç", translation: "nineteen" },
    { word: "Çæť", translation: "suffix" },
    { word: "Đəďœçæť", translation: "twenty" },
    { word: "Þťőçæť", translation: "thirty" },
    { word: "Jõřťtøçæť", translation: "forty" },
    { word: "Pįiffçæť", translation: "fifty" },
    { word: "ß§œñçæť", translation: "sixty" },
    { word: "Śìçæť", translation: "seventy" },
    { word: "Œþttoçæť", translation: "eighty" },
    { word: "Ñőçœ", translation: "ninety" },
    { word: "Çœ", translation: "hundred" },
    { word: "Çæć", translation: "suffix" },
    { word: "Đəďœçæć", translation: "two hundred" },
    { word: "Þťőçæć", translation: "thirty" },
    { word: "Jõřťtøçæć", translation: "four hundred" },
    { word: "Pįiffçæć", translation: "five hundred" },
    { word: "ß§œñçæć", translation: "six hundred" },
    { word: "Śìçæć", translation: "seven hundred" },
    { word: "Œþttoçæć", translation: "eight hundred" },
    { word: "Ñőçæć", translation: "nine hundred" },
    { word: "Þťæjø", translation: "thousand" },
    { word: "Læŕ", translation: "suffix" }
];

/*
You can also accept multiple correct translations:

{
    word: "márë",
    translation: "water",
    acceptedAnswers: ["water", "the water"]
}

The translation property is the answer displayed
when the visitor submits an incorrect answer.
*/


/* ==========================================
   QUIZ LOGIC
   ========================================== */

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionCounter =
    document.getElementById("question-counter");

const scoreCounter =
    document.getElementById("score-counter");

const progressFill =
    document.getElementById("progress-fill");

const questionWord =
    document.getElementById("question-word");

const answerForm =
    document.getElementById("answer-form");

const answerInput =
    document.getElementById("answer-input");

const submitButton =
    document.getElementById("submit-button");

const feedback =
    document.getElementById("feedback");

const feedbackMessage =
    document.getElementById("feedback-message");

const correctAnswer =
    document.getElementById("correct-answer");

const nextButton =
    document.getElementById("next-button");

const finalScore =
    document.getElementById("final-score");

const resultMessage =
    document.getElementById("result-message");

const restartButton =
    document.getElementById("restart-button");

let currentQuestion = 0;
let score = 0;
let answered = false;


/* Normalise Unicode and ignore case and
   accidental spaces around an answer. */

function normaliseAnswer(answer) {
    return answer
        .normalize("NFC")
        .trim()
        .toLowerCase();
}


/* Display the current question. */

function showQuestion() {
    const question = questions[currentQuestion];

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreCounter.textContent = `Score: ${score}`;

    progressFill.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    questionWord.textContent = question.word;

    answerInput.value = "";
    answerInput.disabled = false;
    submitButton.disabled = false;

    feedback.hidden = true;
    feedback.className = "feedback";

    nextButton.hidden = true;
    submitButton.hidden = false;

    answered = false;

    answerInput.focus();
}


/* Check the visitor's translation. */

answerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Prevent submitting the same question twice.
    if (answered) return;

    const question = questions[currentQuestion];
    const userAnswer = normaliseAnswer(answerInput.value);

    if (!userAnswer) return;

    const acceptedAnswers = [
        question.translation,
        ...(question.acceptedAnswers || [])
    ].map(normaliseAnswer);

    const isCorrect = acceptedAnswers.includes(userAnswer);

    answered = true;

    if (isCorrect) {
        score++;

        feedback.className = "feedback correct";
        feedbackMessage.textContent = "Correct! Well done.";
    } else {
        feedback.className = "feedback incorrect";
        feedbackMessage.textContent = "Incorrect. Better luck next time.";
    }

    // Always reveal the main correct translation.
    correctAnswer.textContent =
        `Correct translation: ${question.translation}`;

    feedback.hidden = false;

    answerInput.disabled = true;
    submitButton.hidden = true;

    scoreCounter.textContent = `Score: ${score}`;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "See results"
            : "Next question";

    nextButton.hidden = false;
    nextButton.focus();
});


/* Move to the next question or show results. */

nextButton.addEventListener("click", function () {
    if (!answered) return;

    if (currentQuestion + 1 < questions.length) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
});


/* Display the final score. */

function showResults() {
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    progressFill.style.width = "100%";

    finalScore.textContent =
        `${score} / ${questions.length}`;

    const percentage =
        Math.round((score / questions.length) * 100);

    if (percentage === 100) {
        resultMessage.textContent =
            "Perfect score! You have mastered this vocabulary set.";
    } else if (percentage >= 75) {
        resultMessage.textContent =
            "Excellent work! You know most of these words.";
    } else if (percentage >= 50) {
        resultMessage.textContent =
            "Not bad! A little more practice will help.";
    } else {
        resultMessage.textContent =
            "Keep practising. Every mistake is a chance to learn.";
    }
}


/* Restart the entire quiz. */

restartButton.addEventListener("click", function() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    quizScreen.hidden = false;
    resultScreen.hidden = true;

    showQuestion();
});


/* Start the quiz. */

if (questions.length === 0) {
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    finalScore.textContent = "No questions available";
    resultMessage.textContent =
        "Add at least one question to the questions array.";
    restartButton.hidden = true;
} else {
    showQuestion();
}
