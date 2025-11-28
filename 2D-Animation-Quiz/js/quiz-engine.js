class AnimationQuiz {
    constructor(quizData, moduleTitle = "Animation Quiz", randomize = false) {
        this.originalQuiz = [...quizData];
        this.quiz = randomize ? this.shuffleArray([...quizData]) : [...quizData];
        this.currentQuestion = 0;
        this.score = 0;
        this.answered = false;
        this.moduleTitle = moduleTitle;
        this.wrongAnswers = [];
        this.randomized = randomize;
        this.wrongAttempts = 0;
        this.selectedAnswer = null;
        this.init();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    updateNavigation() {
        const navigationHtml = `
            <div class="question-navigation">
                <button class="nav-btn" id="prev-btn" onclick="quizInstance.previousQuestion()" ${this.currentQuestion === 0 ? 'disabled' : ''}>
                    ← Previous
                </button>
                <span class="question-counter">${this.currentQuestion + 1} / ${this.quiz.length}</span>
                <button class="nav-btn" id="forward-btn" onclick="quizInstance.nextQuestionNav()">
                    Next →
                </button>
            </div>
        `;
        
        // Insert navigation after options
        const optionsContainer = document.getElementById("options");
        let navContainer = document.getElementById("navigation-container");
        if (!navContainer) {
            navContainer = document.createElement("div");
            navContainer.id = "navigation-container";
            optionsContainer.parentNode.insertBefore(navContainer, optionsContainer.nextSibling);
        }
        navContainer.innerHTML = navigationHtml;
    }
    
    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.loadQuestion();
        }
    }
    
    nextQuestionNav() {
        if (this.selectedAnswer === null && !this.answered) {
            alert("Please select an answer before proceeding to the next question.");
            return;
        }
        this.nextQuestion();
    }

    init() {
        this.loadQuestion();
    }

    loadQuestion() {
        this.answered = false;
        this.wrongAttempts = 0;
        this.selectedAnswer = null;
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
        
        // Add navigation
        this.updateNavigation();
    }

    checkAnswer(selected) {
        const q = this.quiz[this.currentQuestion];
        const buttons = document.querySelectorAll(".option-btn");
        const feedback = document.getElementById("feedback");
        
        // Allow reselection if not answered correctly yet
        if (!this.answered) {
            // Remove previous selections
            buttons.forEach(btn => {
                btn.classList.remove("selected", "correct", "wrong");
            });
            
            // Mark selected option
            buttons[selected].classList.add("selected");
            this.selectedAnswer = selected;
            
            if (selected === q.answer) {
                // Correct answer
                buttons[selected].classList.add("correct");
                feedback.innerHTML = "✅ Excellent! That's correct.";
                feedback.className = "feedback correct";
                this.score++;
                this.answered = true;
                feedback.style.display = "block";
                document.getElementById("next-btn").style.display = "inline-block";
                
                // Disable all buttons
                buttons.forEach(btn => btn.onclick = null);
            } else {
                // Wrong answer
                this.wrongAttempts++;
                buttons[selected].classList.add("wrong");
                
                if (this.wrongAttempts >= 2) {
                    // Show correct answer after 2nd wrong attempt
                    buttons[q.answer].classList.add("correct");
                    feedback.innerHTML = `❌ Not quite right. The correct answer is: ${q.options[q.answer]}`;
                    feedback.className = "feedback wrong";
                    this.answered = true;
                    document.getElementById("next-btn").style.display = "inline-block";
                    
                    // Store wrong answer for review
                    this.wrongAnswers.push({
                        question: q.q,
                        userAnswer: q.options[selected],
                        correctAnswer: q.options[q.answer],
                        questionNumber: this.currentQuestion + 1
                    });
                    
                    // Disable all buttons
                    buttons.forEach(btn => btn.onclick = null);
                } else {
                    // First wrong attempt - don't reveal answer
                    feedback.innerHTML = "❌ Incorrect. Try again!";
                    feedback.className = "feedback wrong";
                }
                
                feedback.style.display = "block";
            }
        }
    }
    
    updateNavigation() {
        const navigationHtml = `
            <div class="question-navigation" style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                <button class="nav-btn" onclick="quizInstance.previousQuestion()" ${this.currentQuestion === 0 ? 'disabled' : ''} 
                        style="padding: 8px 16px; border: none; border-radius: 6px; background: ${this.currentQuestion === 0 ? '#e9ecef' : '#6c5ce7'}; color: ${this.currentQuestion === 0 ? '#6c757d' : 'white'}; cursor: ${this.currentQuestion === 0 ? 'not-allowed' : 'pointer'};">
                    ← Previous
                </button>
                <span class="question-counter" style="font-weight: 500; color: #495057;">
                    ${this.currentQuestion + 1} / ${this.quiz.length}
                </span>
                <button class="nav-btn" onclick="quizInstance.nextQuestionNav()" 
                        style="padding: 8px 16px; border: none; border-radius: 6px; background: #6c5ce7; color: white; cursor: pointer;">
                    Next →
                </button>
            </div>
        `;
        
        // Insert navigation after options
        const optionsContainer = document.getElementById("options");
        let navContainer = document.getElementById("navigation-container");
        if (!navContainer) {
            navContainer = document.createElement("div");
            navContainer.id = "navigation-container";
            optionsContainer.parentNode.insertBefore(navContainer, optionsContainer.nextSibling);
        }
        navContainer.innerHTML = navigationHtml;
    }
    
    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.loadQuestion();
        }
    }
    
    nextQuestionNav() {
        if (this.selectedAnswer === null && !this.answered) {
            alert("Please select an answer before proceeding to the next question.");
            return;
        }
        this.nextQuestion();
    }

    nextQuestion() {
        if (this.selectedAnswer === null && !this.answered) {
            alert("Please select an answer before proceeding to the next question.");
            return;
        }
        
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
        
        // Show review button if there are wrong answers
        if (this.wrongAnswers.length > 0) {
            const reviewBtn = document.getElementById("review-btn");
            if (reviewBtn) {
                reviewBtn.style.display = "inline-block";
            }
        }
    }

    showWrongAnswers() {
        const wrongSection = document.getElementById("wrong-answers-section");
        const wrongList = document.getElementById("wrong-answers-list");
        
        if (!wrongSection || !wrongList) return;
        
        wrongList.innerHTML = "";
        
        this.wrongAnswers.forEach((wrong, index) => {
            const wrongCard = document.createElement("div");
            wrongCard.className = "wrong-answer-card";
            wrongCard.style.cssText = `
                background: #fef2f2; 
                border: 1px solid #fecaca; 
                border-radius: 10px; 
                padding: 20px; 
                margin: 15px 0;
            `;
            
            wrongCard.innerHTML = `
                <h5 style="color: #dc2626; margin-bottom: 10px;">Question ${wrong.questionNumber}</h5>
                <p style="font-weight: 600; margin-bottom: 10px;">${wrong.question}</p>
                <p style="color: #dc2626; margin: 5px 0;"><strong>Your Answer:</strong> ${wrong.userAnswer}</p>
                <p style="color: #059669; margin: 5px 0;"><strong>Correct Answer:</strong> ${wrong.correctAnswer}</p>
            `;
            
            wrongList.appendChild(wrongCard);
        });
        
        wrongSection.style.display = "block";
        wrongSection.scrollIntoView({ behavior: 'smooth' });
    }

    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.wrongAnswers = [];
        
        // Re-randomize if randomization was enabled
        if (this.randomized) {
            const randomizeCheck = document.getElementById('randomize');
            if (randomizeCheck && randomizeCheck.checked) {
                this.quiz = this.shuffleArray([...this.originalQuiz]);
            }
        }
        
        document.getElementById("quiz-content").style.display = "block";
        document.getElementById("quiz-complete").style.display = "none";
        
        const wrongSection = document.getElementById("wrong-answers-section");
        if (wrongSection) {
            wrongSection.style.display = "none";
        }
        
        const reviewBtn = document.getElementById("review-btn");
        if (reviewBtn) {
            reviewBtn.style.display = "none";
        }
        
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

function showWrongAnswers() {
    if (quizInstance) {
        quizInstance.showWrongAnswers();
    }
}