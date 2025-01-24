let score = 0; // Initialize score
const scoreBox = document.getElementById('score-box');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const resultElement = document.getElementById('result');
const nextButton = document.getElementById('next');
let scoreCounter = 0;
let choosen = false;
let questionData;  
let response;
        
let currentQuestionIndex = 0;

async function loadQuestion() {
    resultElement.textContent = '';
    nextButton.style.display = 'none';
    choicesElement.innerHTML = '';
            
        
    try {
        const apiUrl = `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data.results[0]);
        questionData = data.result[0];
        questionElement.textContent = "[ Question " + currentQuestionIndex  +  " ] " +  questionData[currentQuestionIndex].question;
                
        for ( let i = 0; i < 4; i++)
        {
            createChoice(i,questionData[currentQuestionIndex]);
        }
        currentQuestionIndex++;
    } catch (error) {
        questionElement.textContent = 'Error loading question. Please try again.';
        console.log(error);
    }
}

        function loadNextQuestion() {
            resultElement.textContent = '';
            nextButton.style.display = 'none';
            choicesElement.innerHTML = '';
            questionElement.textContent = "[ Question " + currentQuestionIndex +  " ] " + questionData[currentQuestionIndex].question;
                
            for ( let i = 0; i < 4; i++)
                {
                    createChoice(i,questionData[currentQuestionIndex]);
                }
                currentQuestionIndex++;    
        }

        function createChoice(index , questionData){
            let letter = 'A';
            const button = document.createElement('button');
            switch(index) {
                case 0:
                    
                    button.className = 'choice';
                    button.textContent = questionData.A;
                    button.onclick = () => checkAnswer('A', questionData.answer);
                    choicesElement.appendChild(button);
                  break;
                case 1:
                    button.className = 'choice';
                    button.textContent = questionData.B;
                    button.onclick = () => checkAnswer('B', questionData.answer);
                    choicesElement.appendChild(button);
                  break;
                case 2:;
                    button.className = 'choice';
                    button.textContent = questionData.C;
                    button.onclick = () => checkAnswer('C', questionData.answer);
                    choicesElement.appendChild(button);
                  break;
                case 3:
                    button.className = 'choice';
                    button.textContent = questionData.D;
                    button.onclick = () => checkAnswer('D', questionData.answer);
                    choicesElement.appendChild(button);
                  break;
              }
        }

        function checkAnswer(selectedIndex, correctIndex) {
            if (selectedIndex === correctIndex) {
                score += 1;
                resultElement.textContent = 'Correct! ';
                resultElement.style.color = 'green';
            } else {
                resultElement.textContent = 'Wrong! ❌';
                resultElement.style.color = 'red';
            }
            nextButton.style.display = 'block';

            scoreBox.textContent = `Score: ${score}`;
            nextButton.style.display = 'block';
        }

        // Load the first question
        loadQuestion();