import { GeneratePdf } from "./app.js";
console.log("it be workin");

function checkAnswers() {
  const answers = {
    q1: "water",
    q2: "yes",
  };

  let score = 0;

  for (let key in answers) {
    const selectedOption = document.querySelector(
      `input[name="${key}"]:checked`
    );
    if (selectedOption && selectedOption.value === answers[key]) {
      score++;
    }
  }

  document.getElementById("result").innerText = `You scored ${score} out of 2!`;
}

const check = document.getElementById("submit-button");
check.addEventListener("click", checkAnswers);

class Certificate extends GeneratePdf {}

const myPdf = new GeneratePdf("pdf-preview");

myPdf.showPdf();
