class AnimationQuiz {
    constructor(quizData, moduleTitle = "Animation Quiz") {
        this.quiz = quizData;
        this.currentQuestion = 0;
        this.score = 0;
        this.answered = false;
        this.moduleTitle = moduleTitle;
        this.init();
    }

    init() {
        this.loadQuestion();
    }

    loadQuestion() {
        this.answered = false;
        document.getElementById("feedback").style.display = "none";
        document.getElementById("next-btn").style.display = "none";
        
        const q = this.quiz[this.currentQuestion];
        document.getElementById("question-number").innerText = `Question ${this.currentQuestion + 1} of ${this.quiz.length}`;
        document.getElementById("question").innerText = q.q;
        
        // Update progress bar
        const progress = ((this.currentQuestion + 1) / this.quiz.length) * 100;
        document.getElementById("progress").style.width = progress + "%";
        
        const optionsDiv = document.getElementById("options");
        optionsDiv.innerHTML = "";
        
        q.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.innerText = opt;
            btn.onclick = () => this.checkAnswer(i);
            optionsDiv.appendChild(btn);
        });
    }

    checkAnswer(selected) {
        if (this.answered) return;
        this.answered = true;
        
        const q = this.quiz[this.currentQuestion];
        const buttons = document.querySelectorAll(".option-btn");
        const feedback = document.getElementById("feedback");
        
        buttons.forEach((btn, i) => {
            btn.onclick = null;
            if (i === q.answer) {
                btn.classList.add("correct");
            } else if (i === selected && i !== q.answer) {
                btn.classList.add("wrong");
            }
        });
        
        if (selected === q.answer) {
            feedback.innerHTML = "✅ Excellent! That's correct.";
            feedback.className = "feedback correct";
            this.score++;
        } else {
            feedback.innerHTML = `❌ Not quite right. The correct answer is: ${q.options[q.answer]}`;
            feedback.className = "feedback wrong";
        }
        
        feedback.style.display = "block";
        document.getElementById("next-btn").style.display = "inline-block";
    }

    nextQuestion() {
        this.currentQuestion++;
        if (this.currentQuestion >= this.quiz.length) {
            this.showResults();
        } else {
            this.loadQuestion();
        }
    }

    showResults() {
        document.getElementById("quiz-content").style.display = "none";
        document.getElementById("quiz-complete").style.display = "block";
        
        const percentage = Math.round((this.score / this.quiz.length) * 100);
        document.getElementById("final-score").innerText = `${percentage}%`;
        document.getElementById("correct-answers").innerText = this.score;
        document.getElementById("accuracy").innerText = `${percentage}%`;
        document.getElementById("total-questions").innerText = this.quiz.length;
        
        let message = "";
        if (percentage >= 90) {
            message = "Outstanding! You have mastered this module! 🌟";
        } else if (percentage >= 80) {
            message = "Excellent work! You have a strong understanding! 🎯";
        } else if (percentage >= 70) {
            message = "Good job! You're well on your way to mastering this! 👍";
        } else if (percentage >= 60) {
            message = "Not bad! Keep studying and you'll improve! 📚";
        } else {
            message = "Keep learning! This topic takes practice and study! 💪";
        }
        
        document.getElementById("score-message").innerText = message;
    }

    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        document.getElementById("quiz-content").style.display = "block";
        document.getElementById("quiz-complete").style.display = "none";
        this.loadQuestion();
    }
}

// Global functions for HTML onclick handlers
let quizInstance = null;

function nextQuestion() {
    if (quizInstance) {
        quizInstance.nextQuestion();
    }
}

function restartQuiz() {
    if (quizInstance) {
        quizInstance.restartQuiz();
    }
}