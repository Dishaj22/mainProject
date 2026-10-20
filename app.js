const questionInput = document.getElementById("question");
const askBtn = document.getElementById("askBtn");
const answerBox = document.getElementById("answer");

askBtn.addEventListener("click", async () => {

    const question = questionInput.value.trim();

    if (question === "") {
        answerBox.innerText = "⚠ Please enter a question!";
        return;
    }

    answerBox.innerText = "🤖 Gemini is thinking...";

    try {

        const response = await fetch("/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });

        const data = await response.json();

        answerBox.innerText = data.answer;

    } catch (error) {

        console.log(error);

        answerBox.innerText = "❌ Something went wrong!";

    }

});