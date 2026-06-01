<script>
    const questions = [
        {text: "Какой результат выведет print(type(True))?", options: ["&lt;class 'int'&gt;", "&lt;class 'str'&gt;", "&lt;class 'bool'&gt;"], correct: 2},
        {text: "Что делает метод .append() для списка?", options: ["Вставляет в начало", "Добавляет в конец", "Удаляет последний"], correct: 1},
        {text: "Оператор целочисленного деления в Python?", options: ["/", "//", "%"], correct: 1},
        {text: "Что выведет print(3 * 'a' + 'b')?", options: ["'aaabbb'", "'aaab'", "'ab'"], correct: 1},
        {text: "Кортеж с одним элементом?", options: ["(1)", "(1,)", "[1]"], correct: 1},
        {text: "Что выдаст range(3, 10, 2)?", options: ["3,4,5,6,7,8,9", "3,5,7,9", "3,5,7,9,10"], correct: 1},
        {text: "Что получится при 'Python'[::-1] ?", options: ["'Python'", "'nohtyP'", "'Pyt'"], correct: 1},
        {text: "Какое слово ловит ошибки?", options: ["catch", "except", "handle"], correct: 1},
        {text: "Что делает функция zip()?", options: ["Сжимает список", "Соединяет в пары", "Сортирует"], correct: 1},
        {text: "Что вернёт bool([]) ?", options: ["True", "False", "Ошибку"], correct: 1}
    ];

    let current = 0;
    let answers = new Array(10).fill(null);
    let finished = false;

    const quizDiv = document.getElementById("quiz");

    function showWelcome() {
        quizDiv.innerHTML = `
            <div class="welcome">
                <h1>Привет, тест от Саши Меньшикова</h1>
                <p>Тест по Python состоит из ${questions.length} вопросов</p>
                <p>На каждый вопрос нужно выбрать один вариант ответа</p>
                <button class="start-btn" onclick="startQuiz()">Начать тест →</button>
            </div>
        `;
    }

    function startQuiz() {
        renderQuestion();
    }

    function showResult() {
        let correctCount = 0;
        for (let i = 0; i < questions.length; i++) {
            if (answers[i] === questions[i].correct) correctCount++;
        }
        let percent = Math.round((correctCount / questions.length) * 100);
        quizDiv.innerHTML = `
            <div class="result">
                <h2>Результаты</h2>
                <div class="score">${correctCount} из ${questions.length}</div>
                <div>${percent}%</div>
                <button onclick="restartQuiz()">Начать заново</button>
            </div>
        `;
        finished = true;
    }

    function nextQuestion() {
        if (answers[current] === null) return;
        if (current + 1 < questions.length) {
            current++;
            renderQuestion();
        } else {
            showResult();
        }
    }

    function answerQuestion(selected) {
        if (answers[current] !== null) return;
        answers[current] = selected;
        renderQuestion();
    }

    function renderQuestion() {
        if (finished) return;
        let q = questions[current];
        let selected = answers[current];
        
        let optionsHtml = "";
        for (let i = 0; i < q.options.length; i++) {
            let extraClass = "";
            if (selected !== null) {
                if (i === q.correct) extraClass = "correct";
                else if (i === selected && selected !== q.correct) extraClass = "wrong";
            }
            optionsHtml += `<div class="option ${extraClass}" onclick="answerQuestion(${i})">${q.options[i]}</div>`;
        }
        
        let btnText = current + 1 === questions.length ? "Завершить" : "Следующий";
        let btnDisabled = selected === null ? "disabled" : "";
        
        quizDiv.innerHTML = `
            <div class="question">${q.text}</div>
            ${optionsHtml}
            <button onclick="nextQuestion()" ${btnDisabled}>${btnText}</button>
            <button onclick="showResult()" style="background:#ff9800; margin-left:10px;">Результаты</button>
        `;
    }

    function restartQuiz() {
        current = 0;
        answers = new Array(10).fill(null);
        finished = false;
        showWelcome();
    }

    showWelcome();
</script>
