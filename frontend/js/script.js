const triviaQuestions = [
    { question: "What is the largest star in the solar system?", answers: ["Star", "Sun", "Moon", "Earth"], correct: 1 },
    { question: "What is the largest planet in the solar system?", answers: ["Jupiter", "Earth", "Venus", "Neptune"], correct: 0 },
    { question: "Which planet is closest to the sun?", answers: ["Mars", "Earth", "Mercury", "Jupiter"], correct: 2 },
    { question: "Which planet has 62 moons, one of them being 'Titan'?", answers: ["Saturn", "Earth", "Venus", "Neptune"], correct: 0 },
    { question: "What is known as the dwarf planet?", answers: ["Pluto", "Neptune", "Earth", "Venus"], correct: 0 },
    { question: "Which planet has immense oceans of diamonds?", answers: ["Neptune", "Mars", "Saturn", "Mercury"], correct: 0 },
    { question: "Which is the furthest planet from the sun?", answers: ["Jupiter", "Saturn", "Neptune", "Uranus"], correct: 2 },
    { question: "Which is the hottest planet in the solar system?", answers: ["Mars", "Earth", "Venus", "Mercury"], correct: 2 },
    { question: "What is the natural satellite of Earth?", answers: ["Moon", "Europa", "Phobos", "Triton"], correct: 0 },
    { question: "What is known as the blue planet?", answers: ["Earth", "Neptune", "Uranus", "Mars"], correct: 0 },
    { question: "What is known as the red planet?", answers: ["Mars", "Earth", "Venus", "Jupiter"], correct: 0 },
];

function iniciarTrivia() {
    let currentQuestionIndex = 0;
    let score = 0;

    const juegoDiv = document.getElementById("juego");
    juegoDiv.innerHTML = ''; // Limpiar el contenido anterior
    juegoDiv.innerHTML = `
        <div id="trivia">
            <div id="question"></div>
            <div id="answers"></div>
            <div id="score"></div>
        </div>
    `;

    function showQuestion() {
        const question = triviaQuestions[currentQuestionIndex];
        document.getElementById("question").innerText = question.question;
        const answersDiv = document.getElementById("answers");
        answersDiv.innerHTML = "";

        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.innerText = answer;
            button.onclick = () => selectAnswer(index);
            answersDiv.appendChild(button);
        });
    }

    function selectAnswer(index) {
        if (index === triviaQuestions[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < triviaQuestions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    function showScore() {
        juegoDiv.innerHTML = `<h2>Your score is: ${score} de ${triviaQuestions.length}</h2>`;
    }

    showQuestion();
}

document.getElementById("btn-trivia").onclick = iniciarTrivia;
