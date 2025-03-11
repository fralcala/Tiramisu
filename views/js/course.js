import { GeneratePdf } from "./app.js";
console.log("it be workin");

class Certificate extends GeneratePdf {}

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

    <div id="pdf-holder">
    
      <label for="name">Enter your name: </label>
      <input placeholder="Your Name" type="text" id="name" name="name">
  
      <button id="pdf-button">My Certificate</button>
    </div>
  </div>
  `;
  function getName() {
    let name = document.getElementById("name");

    let value = name.value;

    console.log(value);
    return name;
  }
  const userName = document.getElementById("pdf-button");
  userName.addEventListener("click", function () {
    getName();

    document.getElementById("pdf-holder").innerHTML = `<iframe
          class="course-pdf"
          id="pdf-preview"
          src=""
          frameborder="0"
        ></iframe>`;
    const myPdf = new GeneratePdf("pdf-preview");

    myPdf.addHeader("Tiramisu Course");
    myPdf.addHeader("Certificate Of Completion");
    myPdf.addText(`To: ${name.value}`);

    myPdf.showPdf();
  });
}
const check = document.getElementById("submit-button");
check.addEventListener("click", checkAnswers);

/*const d = new Date("2021-03-25");
d.getFullYear();*/
