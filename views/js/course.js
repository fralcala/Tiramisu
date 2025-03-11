import { GeneratePdf } from "./app.js";
console.log("it be workin");

const section = document.getElementById("section");

function checkAnswers() {
  const answers = {
    q1: "water",
    q2: "yes",
  };

  let score = 0;

  // loops through users responses and checks if they match the right answers
  for (let key in answers) {
    const selectedOption = document.querySelector(
      `input[name="${key}"]:checked`
    );
    if (selectedOption && selectedOption.value === answers[key]) {
      score++;
    }
  }

  document.getElementById("main").innerHTML = `
  <div class="passed">
    <h2>Congratulations, you Passed! &#127881</h2>

    <h3>You scored ${score} out of 2!</h3>
    
    <label for="name">Enter your name: </label>
    <input placeholder="Your Name" type="text" id="name" name="name">
  
      <button class="course-button" id="pdf-button">My Certificate</button>
  </div>
  `;

  document.getElementById;
}

/*const d = new Date("2021-03-25");
d.getFullYear();*/

const check = document.getElementById("submit-button");
check.addEventListener("click", checkAnswers);

class Certificate extends GeneratePdf {}

const myPdf = new GeneratePdf("pdf-preview");

myPdf.showPdf();
