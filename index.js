const testTextArray = [
  "The quick brown fox jumps over the lazy dog",
  "A phrase is a short selection of words which when put together create a concept",
  "My mom drove me to school 5 minutes late on Thursday",
  "African elephant have bigger ears than Asian elephant",
  "My shoes are blue with yellow stripes and green stars on the front",
];
let startTime, endTime;
let numOfPlay = 1;
let outputTestResults = document.getElementById("output");
let outputText = document.getElementById("outputText");
let userInput = document.getElementById("userInput");
const button = document.getElementById("btn");

// disable copy / paster in user input to avoid cheaters :)
window.onload = () => {
  userInput.onpaste = (e) => {
    e.preventDefault();
    alert("NO CHEATING");
  };
};

async function startTest() {
  if (numOfPlay > 1) {
    outputText.value = "";
    userInput.value = "";
    userInput.readOnly = false;
  }
  // hide Start button
  toggleClassList(button, "unvisible");
  // wait for the countdown modal to execute
  await countDownModal();
  // Select a random sentence from the testTextArray
  let randomIndex = Math.floor(Math.random() * testTextArray.length);
  // display the sentence
  outputText.value = testTextArray[randomIndex];
  // Start timer
  startTime = new Date().getTime();
  // Change button text and function to End when ready
  toggleClassList(button, "unvisible");
  changeInnerText(button, "End Test");
  button.onclick = endTest;
}

function endTest() {
  // get the time when end
  endTime = new Date().getTime();
  const timeElapsed = calculateSecondsElapsed(startTime, endTime);
  // Compare both sentences
  const userSentence = userInput.value.toLowerCase();
  if (userSentence === outputText.value.toLowerCase()) {
    // word per minutes
    let wpm = 0;
    const wordsCount = userSentence.split(" ").length;
    wpm = calculateWpm(wordsCount, timeElapsed);
    userInput.readOnly = true;
    outputTestResults.innerHTML += testResultsCard(timeElapsed, wpm);
    // Set the button back to Start for a new try
    changeInnerText(button, "Start Test");
    button.onclick = startTest;
    numOfPlay++;
  } else {
    changeInnerText(
      outputTestResults,
      "Both Sentences are not the same. Check your text !"
    );
  }
}

function countDownModal() {
  return new Promise((resolve, reject) => {
    const modal = document.getElementById("starter");
    let counter = document.getElementById("counter");
    let countDown = 3;
    toggleClassList(modal, "unvisible");
    changeInnerText(counter, String(countDown));
    //interval for the countdown to go down and display in the modal
    let interval = setInterval(() => {
      countDown--;
      changeInnerText(counter, String(countDown));
      if (countDown === 1) {
        clearInterval(interval);
      }
    }, 1000);
    // time out for the interval to finish, make the modal unvisible - resolve the promise
    setTimeout(() => {
      resolve(toggleClassList(modal, "unvisible"));
    }, 3200);
  });
}

/* ------- Helpers Functions --------- */

function testResultsCard(time, wordMinute) {
  return `
 <div class="resultCard">
    <p style="text-align: center; font-size: 18px; font-weight: 600;">Play n° ${numOfPlay}</p>
    <p><span style="text-decoration: underline;">Time Elapsed:</span> ${time.toFixed(
      2
    )}</p>
    <p><span style="text-decoration: underline;">Words Per Minute:</span> ${wordMinute} </p>
  </div>
  `;
}

function calculateSecondsElapsed(start, end) {
  return (end - start) / 1000;
}

function calculateWpm(numberOfWords, time) {
  if (time !== 0 && !isNaN(numberOfWords)) {
    return Math.round((numberOfWords / time) * 60);
  } else {
    return "error";
  }
}

function toggleClassList(element, classname) {
  element.classList.toggle(classname);
}

function changeInnerText(element, text) {
  element.innerText = text;
}
