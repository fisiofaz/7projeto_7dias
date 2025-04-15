let currentQuestion = 0;
let correctAnswer = 0;
let wrongAnswer = 0;

showQuestion();

function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector(".progress--bar").style.width = `${pct}%`;

        document.querySelector(".scoreArea").style.display = "none";
        document.querySelector(".questionArea").style.display = "block";

        document.querySelector(".question").innerHTML = q.question;
        document.querySelector(".options").innerHTML = "";

        for (let i in q.options) {
            let optionEl = document.createElement("div");
            optionEl.classList.add("option");
            optionEl.setAttribute("data-op", i);
            optionEl.innerHTML = `<span>${parseInt(i) + 1}</span> ${q.options[i]}`;
            optionEl.addEventListener("click", optionClickEvent);
            document.querySelector(".options").appendChild(optionEl);
        }
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.currentTarget.getAttribute("data-op"));
    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswer++;
    } else {
        wrongAnswer++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswer / questions.length) * 100);

    document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`;
    document.querySelector(".scoreText2").innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}.`;

    document.querySelector(".questionArea").style.display = "none";
    document.querySelector(".scoreArea").style.display = "block";
    document.querySelector(".progress--bar").style.width = `100%`;
}

document.querySelector(".scoreArea button").addEventListener("click", resetQuiz);

function resetQuiz() {
    currentQuestion = 0;
    correctAnswer = 0;
    wrongAnswer = 0;
    showQuestion();
}
