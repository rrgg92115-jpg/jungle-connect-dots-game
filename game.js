// Game State
let gameState = {
    currentMode: null,
    currentQuestionIndex: 0,
    player1Score: 0,
    player2Score: 0,
    totalQuestions: 10,
    soundEnabled: true,
    musicEnabled: false,
    language: 'en',
    questions: [],
    customQuestions: []
};

// Default Questions for Spelling and Sentence Formation
const defaultQuestions = [
    {
        id: 1,
        type: 'spelling',
        language: 'en',
        question: 'Spell the word for a big yellow fruit',
        answer: 'BANANA',
        imageUrl: 'https://images.unsplash.com/photo-1587859211519-4f8f0b4c0d8d?w=300',
        clue: '🍌'
    },
    {
        id: 2,
        type: 'spelling',
        language: 'en',
        question: 'Spell the word for a red fruit',
        answer: 'APPLE',
        imageUrl: 'https://images.unsplash.com/photo-1560806e4195-0ab45b2b46d3?w=300',
        clue: '🍎'
    },
    {
        id: 3,
        type: 'spelling',
        language: 'en',
        question: 'Spell the word for a animal that roars',
        answer: 'LION',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
        clue: '🦁'
    },
    {
        id: 4,
        type: 'sentence',
        language: 'en',
        question: 'Arrange the words: THE ELEPHANT IS BIG',
        answer: 'THE ELEPHANT IS BIG',
        imageUrl: 'https://images.unsplash.com/photo-1564349303384-f5e80b52becc?w=300',
        clue: '🐘'
    },
    {
        id: 5,
        type: 'spelling',
        language: 'en',
        question: 'Spell the word for water with trees around',
        answer: 'JUNGLE',
        imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=300',
        clue: '🌿'
    },
    {
        id: 6,
        type: 'spelling',
        language: 'en',
        question: 'Spell the word for a striped horse-like animal',
        answer: 'ZEBRA',
        imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300',
        clue: '🦓'
    },
    {
        id: 7,
        type: 'sentence',
        language: 'en',
        question: 'Arrange: I LIKE TO PLAY',
        answer: 'I LIKE TO PLAY',
        imageUrl: 'https://images.unsplash.com/photo-1596395694314-73e06a5bbed0?w=300',
        clue: '🎮'
    },
    {
        id: 8,
        type: 'spelling',
        language: 'en',
        question: 'Spell the word for a spotted big cat',
        answer: 'LEOPARD',
        imageUrl: 'https://images.unsplash.com/photo-1516426122078-823edbbf3b09?w=300',
        clue: '🐆'
    },
    {
        id: 9,
        type: 'spelling',
        language: 'en',
        question: 'Spell the word for a tall animal with long neck',
        answer: 'GIRAFFE',
        imageUrl: 'https://images.unsplash.com/photo-1551801309-4ace5f27dc91?w=300',
        clue: '🦒'
    },
    {
        id: 10,
        type: 'sentence',
        language: 'en',
        question: 'Arrange: THE MONKEY IS CLEVER',
        answer: 'THE MONKEY IS CLEVER',
        imageUrl: 'https://images.unsplash.com/photo-1551605158-ec2d00a18e38?w=300',
        clue: '🐵'
    },
    // Arabic Questions
    {
        id: 11,
        type: 'spelling',
        language: 'ar',
        question: 'تهجي كلمة الموز',
        answer: 'موز',
        imageUrl: 'https://images.unsplash.com/photo-1587859211519-4f8f0b4c0d8d?w=300',
        clue: '🍌'
    },
    {
        id: 12,
        type: 'spelling',
        language: 'ar',
        question: 'تهجي كلمة التفاح',
        answer: 'تفاح',
        imageUrl: 'https://images.unsplash.com/photo-1560806e4195-0ab45b2b46d3?w=300',
        clue: '🍎'
    },
    {
        id: 13,
        type: 'spelling',
        language: 'ar',
        question: 'تهجي كلمة الأسد',
        answer: 'أسد',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
        clue: '🦁'
    },
    {
        id: 14,
        type: 'sentence',
        language: 'ar',
        question: 'رتب الكلمات: الفيل حيوان كبير',
        answer: 'الفيل حيوان كبير',
        imageUrl: 'https://images.unsplash.com/photo-1564349303384-f5e80b52becc?w=300',
        clue: '🐘'
    },
    {
        id: 15,
        type: 'spelling',
        language: 'ar',
        question: 'تهجي كلمة الغابة',
        answer: 'غابة',
        imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=300',
        clue: '🌿'
    }
];

// Initialize Game
function initGame() {
    gameState.questions = [...defaultQuestions, ...gameState.customQuestions];
    gameState.currentQuestionIndex = 0;
    gameState.player1Score = 0;
    gameState.player2Score = 0;
    
    const questionsPerGame = parseInt(document.getElementById('questionsPerGame')?.value || 10);
    gameState.totalQuestions = Math.min(questionsPerGame, gameState.questions.length);
}

// Start Game
function startGame(mode) {
    gameState.currentMode = mode;
    initGame();
    
    document.getElementById('modeSelection').classList.add('hidden');
    document.getElementById('gameBoard').classList.remove('hidden');
    
    if (mode === 'team') {
        document.getElementById('player2ScoreDiv').classList.remove('hidden');
    } else {
        document.getElementById('player2ScoreDiv').classList.add('hidden');
    }
    
    loadQuestion();
    playSound('clickSound');
}

// Load Current Question
function loadQuestion() {
    const questionIndex = gameState.currentQuestionIndex;
    if (questionIndex >= gameState.totalQuestions) {
        endGame();
        return;
    }
    
    const question = gameState.questions[questionIndex];
    
    // Filter by language
    const filteredQuestions = gameState.questions.filter(q => q.language === gameState.language);
    if (filteredQuestions.length > 0) {
        const currentQuestion = filteredQuestions[Math.min(questionIndex, filteredQuestions.length - 1)];
        displayQuestion(currentQuestion);
    }
    
    updateQuestionNumber();
    clearFeedback();
}

// Display Question
function displayQuestion(question) {
    document.getElementById('questionText').textContent = question.question;
    
    // Display image clue if available
    const imageClueDiv = document.getElementById('imageClue');
    if (question.imageUrl) {
        imageClueDiv.innerHTML = `<img src="${question.imageUrl}" alt="Question clue" onerror="this.src='https://via.placeholder.com/300?text=Image+Not+Found'">`;
    } else {
        imageClueDiv.innerHTML = `<div style="font-size: 4em; padding: 20px;">${question.clue}</div>`;
    }
    
    // Create draggable elements
    createDraggables(question.answer);
    
    // Create answer boxes
    createAnswerBoxes(question.answer);
    
    // Draw canvas
    initializeCanvas();
}

// Create Draggable Elements
function createDraggables(answer) {
    const container = document.getElementById('draggablesContainer');
    container.innerHTML = '';
    
    // Shuffle answer
    const items = answer.split(/\s+/);
    const shuffled = items.sort(() => Math.random() - 0.5);
    
    shuffled.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'draggable';
        div.textContent = item;
        div.draggable = true;
        div.dataset.index = index;
        div.dataset.value = item;
        
        div.addEventListener('dragstart', dragStart);
        div.addEventListener('dragend', dragEnd);
        div.addEventListener('touchstart', touchStart, false);
        div.addEventListener('touchmove', touchMove, false);
        div.addEventListener('touchend', touchEnd, false);
        
        container.appendChild(div);
    });
}

// Create Answer Boxes
function createAnswerBoxes(answer) {
    const container = document.getElementById('answerBoxes');
    container.innerHTML = '';
    
    const items = answer.split(/\s+/);
    items.forEach((item, index) => {
        const box = document.createElement('div');
        box.className = 'answer-space';
        box.dataset.index = index;
        
        box.addEventListener('dragover', dragOver);
        box.addEventListener('drop', drop);
        
        container.appendChild(box);
    });
}

// Drag and Drop Functions
let draggedElement = null;

function dragStart(e) {
    draggedElement = this;
    this.classList.add('placed');
    e.dataTransfer.effectAllowed = 'move';
    playSound('clickSound');
}

function dragEnd(e) {
    if (draggedElement) {
        draggedElement.classList.remove('placed');
    }
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function drop(e) {
    e.preventDefault();
    if (!draggedElement) return;
    
    const targetBox = this;
    const value = draggedElement.dataset.value;
    
    // Clear existing content
    targetBox.innerHTML = '';
    
    // Add new answer box
    const answerBox = document.createElement('div');
    answerBox.className = 'answer-box';
    answerBox.textContent = value;
    answerBox.dataset.value = value;
    
    targetBox.appendChild(answerBox);
    targetBox.classList.add('filled');
    
    playSound('clickSound');
}

// Touch Support
let touchItem = null;
let touchOffset = { x: 0, y: 0 };

function touchStart(e) {
    touchItem = this;
    touchItem.classList.add('placed');
    const touch = e.touches[0];
    touchOffset.x = touch.clientX - this.getBoundingClientRect().left;
    touchOffset.y = touch.clientY - this.getBoundingClientRect().top;
}

function touchMove(e) {
    if (!touchItem) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    touchItem.style.position = 'fixed';
    touchItem.style.zIndex = '1000';
    touchItem.style.left = (touch.clientX - touchOffset.x) + 'px';
    touchItem.style.top = (touch.clientY - touchOffset.y) + 'px';
}

function touchEnd(e) {
    if (!touchItem) return;
    
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element && element.classList.contains('answer-space')) {
        const value = touchItem.dataset.value;
        element.innerHTML = '';
        const answerBox = document.createElement('div');
        answerBox.className = 'answer-box';
        answerBox.textContent = value;
        answerBox.dataset.value = value;
        element.appendChild(answerBox);
        element.classList.add('filled');
        touchItem.style.display = 'none';
        playSound('clickSound');
    }
    
    touchItem.style.position = '';
    touchItem.style.zIndex = '';
    touchItem.style.left = '';
    touchItem.style.top = '';
    touchItem.classList.remove('placed');
    touchItem = null;
}

// Canvas Drawing
let canvas;
let ctx;
let isDrawing = false;

function initializeCanvas() {
    canvas = document.getElementById('drawingCanvas');
    ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#2D6A4F';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    canvas.addEventListener('touchstart', touchStartDraw, false);
    canvas.addEventListener('touchmove', touchMoveDraw, false);
    canvas.addEventListener('touchend', touchEndDraw, false);
}

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function touchStartDraw(e) {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
}

function touchMoveDraw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
}

function touchEndDraw() {
    isDrawing = false;
}

// Check Answer
function checkAnswer() {
    const question = gameState.questions[gameState.currentQuestionIndex];
    const expectedAnswer = question.answer.toUpperCase().trim();
    
    const answerBoxes = document.querySelectorAll('.answer-box');
    const userAnswer = Array.from(answerBoxes)
        .map(box => box.textContent)
        .join(' ')
        .toUpperCase()
        .trim();
    
    const feedback = document.getElementById('feedback');
    
    if (userAnswer === expectedAnswer) {
        feedback.className = 'feedback success';
        feedback.textContent = '🎉 Correct! Great job!';
        
        if (gameState.currentMode === 'single' || gameState.currentQuestionIndex % 2 === 0) {
            gameState.player1Score += 10;
        } else {
            gameState.player2Score += 10;
        }
        
        playSound('correctSound');
        updateScores();
        
        setTimeout(() => {
            gameState.currentQuestionIndex++;
            loadQuestion();
        }, 1500);
    } else {
        feedback.className = 'feedback error';
        feedback.textContent = `❌ Incorrect. The answer is: ${expectedAnswer}`;
        playSound('incorrectSound');
    }
}

// Reset Question
function resetQuestion() {
    const question = gameState.questions[gameState.currentQuestionIndex];
    createDraggables(question.answer);
    createAnswerBoxes(question.answer);
    initializeCanvas();
    clearFeedback();
    playSound('clickSound');
}

// Skip Question
function skipQuestion() {
    gameState.currentQuestionIndex++;
    loadQuestion();
    playSound('clickSound');
}

// Update Scores
function updateScores() {
    document.getElementById('score1').textContent = gameState.player1Score;
    document.getElementById('score2').textContent = gameState.player2Score;
}

// Update Question Number
function updateQuestionNumber() {
    const current = gameState.currentQuestionIndex + 1;
    const total = gameState.totalQuestions;
    document.getElementById('questionNumber').textContent = `Question ${current}/${total}`;
}

// Clear Feedback
function clearFeedback() {
    const feedback = document.getElementById('feedback');
    feedback.classList.add('hidden');
    feedback.textContent = '';
}

// End Game
function endGame() {
    document.getElementById('gameBoard').classList.add('hidden');
    document.getElementById('resultsScreen').classList.remove('hidden');
    
    const isTeamMode = gameState.currentMode === 'team';
    
    document.getElementById('finalPlayer1Label').textContent = isTeamMode ? 'Player 1' : 'Your Score';
    document.getElementById('finalScore1').textContent = gameState.player1Score;
    
    if (isTeamMode) {
        document.getElementById('finalPlayer2Div').classList.remove('hidden');
        document.getElementById('finalPlayer2Label').textContent = 'Player 2';
        document.getElementById('finalScore2').textContent = gameState.player2Score;
        
        const message = gameState.player1Score > gameState.player2Score 
            ? '🏆 Player 1 Wins!' 
            : gameState.player2Score > gameState.player1Score 
            ? '🏆 Player 2 Wins!' 
            : '🤝 It\'s a Tie!';
        document.getElementById('resultsMessage').textContent = message;
    } else {
        document.getElementById('finalPlayer2Div').classList.add('hidden');
        document.getElementById('resultsMessage').textContent = `🌟 You scored ${gameState.player1Score} points!`;
    }
    
    playSound('correctSound');
}

// Play Again
function playAgain() {
    gameState.currentQuestionIndex = 0;
    gameState.player1Score = 0;
    gameState.player2Score = 0;
    
    document.getElementById('resultsScreen').classList.add('hidden');
    document.getElementById('gameBoard').classList.remove('hidden');
    
    loadQuestion();
}

// Go Back to Mode Selection
function goBackToMode() {
    document.getElementById('gameBoard').classList.add('hidden');
    document.getElementById('resultsScreen').classList.add('hidden');
    document.getElementById('modeSelection').classList.remove('hidden');
    
    gameState.player1Score = 0;
    gameState.player2Score = 0;
    updateScores();
}

// Settings Panel
function openSettings() {
    document.getElementById('settingsPanel').classList.remove('hidden');
    updateCustomQuestionsList();
}

function closeSettings() {
    document.getElementById('settingsPanel').classList.add('hidden');
}

// Export Questions
function exportQuestions() {
    const dataToExport = {
        timestamp: new Date().toISOString(),
        totalQuestions: gameState.customQuestions.length,
        questions: gameState.customQuestions
    };
    
    const json = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jungle-questions-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    playSound('clickSound');
    alert('Questions exported successfully!');
}

// Import Questions
function importQuestions() {
    document.getElementById('fileInput').click();
}

function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.questions && Array.isArray(data.questions)) {
                gameState.customQuestions = data.questions;
                updateCustomQuestionsList();
                alert(`Imported ${data.questions.length} questions successfully!`);
                playSound('correctSound');
            } else {
                alert('Invalid JSON format. Expected questions array.');
            }
        } catch (error) {
            alert('Error parsing JSON: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// Add Custom Question
function addCustomQuestion() {
    const question = document.getElementById('editorQuestion').value;
    const answer = document.getElementById('editorAnswer').value;
    const imageUrl = document.getElementById('editorImageUrl').value;
    const type = document.getElementById('editorActivityType').value;
    
    if (!question || !answer) {
        alert('Please fill in the question and answer fields.');
        return;
    }
    
    const newQuestion = {
        id: gameState.customQuestions.length + 1,
        type: type,
        language: gameState.language,
        question: question,
        answer: answer.toUpperCase(),
        imageUrl: imageUrl || '',
        clue: '✨'
    };
    
    gameState.customQuestions.push(newQuestion);
    
    // Clear inputs
    document.getElementById('editorQuestion').value = '';
    document.getElementById('editorAnswer').value = '';
    document.getElementById('editorImageUrl').value = '';
    
    updateCustomQuestionsList();
    playSound('correctSound');
}

// Update Custom Questions List
function updateCustomQuestionsList() {
    const list = document.getElementById('customQuestionsList');
    list.innerHTML = '';
    
    gameState.customQuestions.forEach((q, index) => {
        const item = document.createElement('div');
        item.className = 'question-item';
        item.innerHTML = `
            <div class="question-item-text">
                <strong>${q.question}</strong><br>
                Answer: ${q.answer}
            </div>
            <button class="question-item-delete" onclick="deleteCustomQuestion(${index})">Delete</button>
        `;
        list.appendChild(item);
    });
}

// Delete Custom Question
function deleteCustomQuestion(index) {
    gameState.customQuestions.splice(index, 1);
    updateCustomQuestionsList();
}

// Sound Control
function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    const btn = document.querySelector('.btn-sound');
    btn.textContent = gameState.soundEnabled ? '🔊 Sound' : '🔇 Mute';
    playSound('clickSound');
}

function toggleBackgroundMusic() {
    gameState.musicEnabled = !gameState.musicEnabled;
    const bgMusic = document.getElementById('bgMusic');
    if (gameState.musicEnabled) {
        bgMusic.play().catch(() => console.log('Audio playback not allowed'));
    } else {
        bgMusic.pause();
    }
}

function toggleSFX() {
    // SFX toggle handled by gameState.soundEnabled
}

// Play Sound
function playSound(soundId) {
    if (!gameState.soundEnabled) return;
    
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => console.log('Sound playback not allowed'));
    }
}

// Language Support
function changeLanguage(lang) {
    gameState.language = lang;
    
    if (lang === 'ar') {
        document.body.classList.add('arabic');
        document.documentElement.lang = 'ar';
    } else {
        document.body.classList.remove('arabic');
        document.documentElement.lang = 'en';
    }
    
    // Reload current question if in game
    if (!document.getElementById('gameBoard').classList.contains('hidden')) {
        loadQuestion();
    }
    
    playSound('clickSound');
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', function() {
    updateScores();
    initGame();
});
