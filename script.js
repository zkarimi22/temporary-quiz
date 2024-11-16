const questions = [
    {
        quote: "The only way to do great work is to love what you do.",
        isAI: false,
        author: "Steve Jobs"
    },
    {
        quote: "In the symphony of existence, each moment is a note that contributes to the melody of our collective consciousness.",
        isAI: true,
        author: "AI Generated"
    },
    {
        quote: "The future belongs to those who believe in the beauty of their dreams.",
        isAI: false,
        author: "Eleanor Roosevelt"
    },
    {
        quote: "Life is like a neural network - it learns from experiences, adapts to patterns, and evolves through iterations of trial and error.",
        isAI: true,
        author: "AI Generated"
    }
];

let currentQuestion = 0;
let score = 0;

const quoteElement = document.getElementById('quote');
const aiButton = document.getElementById('ai-btn');
const humanButton = document.getElementById('human-btn');
const questionContainer = document.getElementById('question-container');
const resultsContainer = document.getElementById('results-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

function showQuestion() {
    quoteElement.textContent = questions[currentQuestion].quote;
}

function checkAnswer(isAIGuess) {
    const correct = questions[currentQuestion].isAI === isAIGuess;
    if (correct) score++;
    
    // Show feedback
    const author = questions[currentQuestion].author;
    const feedback = correct ? 
        `Correct! This quote was by ${author}.` :
        `Wrong! This quote was by ${author}.`;
    
    quoteElement.innerHTML = `
        ${questions[currentQuestion].quote}
        <p style="color: ${correct ? '#28a745' : '#dc3545'}; margin-top: 1rem; font-style: normal;">
            ${feedback}
        </p>
    `;
    
    // Disable buttons temporarily
    aiButton.disabled = true;
    humanButton.disabled = true;
    
    // Wait 2 seconds before moving to next question
    setTimeout(() => {
        currentQuestion++;
        aiButton.disabled = false;
        humanButton.disabled = false;
        
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

function showResults() {
    questionContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    scoreElement.textContent = `You got ${score} out of ${questions.length} correct!`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    questionContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    showQuestion();
}

aiButton.addEventListener('click', () => checkAnswer(true));
humanButton.addEventListener('click', () => checkAnswer(false));
restartButton.addEventListener('click', restartQuiz);

// Start the quiz
showQuestion(); 