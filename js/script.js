// Array of trivia questions, each containing the question text, possible answers, and the index of the correct answer
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

/**
 * Initializes the trivia game by setting up variables, rendering the initial question, and handling user input.
 */
function iniciarTrivia() {
    // Current question index and player's score
    let currentQuestionIndex = 0;
    let score = 0;

    // Selects the container element where the trivia game will be displayed
    const juegoDiv = document.getElementById("juego");
    juegoDiv.innerHTML = ''; // Clears any previous content

    // Sets up the HTML structure for the trivia game
    juegoDiv.innerHTML = `
        <div id="trivia">
            <div id="question"></div>
            <div id="answers"></div>
            <div id="score"></div>
        </div>
    `;

    /**
     * Displays the current question and its answer options.
     */
    function showQuestion() {
        // Get the current question object
        const question = triviaQuestions[currentQuestionIndex];
        // Display the question text
        document.getElementById("question").innerText = question.question;

        // Clear previous answers and render new ones as buttons
        const answersDiv = document.getElementById("answers");
        answersDiv.innerHTML = "";

        question.answers.forEach((answer, index) => {
            // Create a button for each answer option
            const button = document.createElement("button");
            button.innerText = answer;
            button.onclick = () => selectAnswer(index); // Set click handler to check the answer
            answersDiv.appendChild(button);
        });
    }

    /**
     * Handles the selection of an answer, checks correctness, and proceeds to the next question.
     * @param {number} index - The index of the selected answer.
     */
    function selectAnswer(index) {
        const question = triviaQuestions[currentQuestionIndex];
        const buttons = document.querySelectorAll("#answers button");

        // Disable all buttons to prevent multiple answers and show correct/incorrect feedback
        buttons.forEach((button, idx) => {
            button.disabled = true;
            if (idx === question.correct) {
                button.style.color = "green"; // Highlight correct answer
            } else if (idx === index) {
                button.style.color = "red"; // Highlight incorrect selection
            }
        });

        // Update score if the selected answer is correct
        if (index === question.correct) {
            score++;
        }
        currentQuestionIndex++;

        // Wait for a short duration to allow the player to see feedback, then proceed
        setTimeout(() => {
            if (currentQuestionIndex < triviaQuestions.length) {
                showQuestion(); // Show the next question
            } else {
                showScore(); // Display the final score
            }
        }, 1000); // Delay to show feedback before moving to next question
    }

    /**
     * Displays the final score after all questions have been answered.
     */
    function showScore() {
        // Replace the game content with the final score
        juegoDiv.innerHTML = `
            <h2 id="question">Your score is: ${score} / ${triviaQuestions.length}</h2>
            <div id="answers" > 
                <button onclick="iniciarTrivia()">Restart Trivia</button>
            </div> 
        `;
    }

    // Start by showing the first question
    showQuestion();
}

// Bind the start trivia function to the "btn-trivia" button click event
document.getElementById("btn-trivia").onclick = iniciarTrivia;
