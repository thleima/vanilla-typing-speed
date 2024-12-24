const testTextArray = [
  "The quick brown fox jumps over the lazy dog",
  "A phrase is a short selection of words which when put together create a concept",
  "My mom drove me to school 5 minutes late on Thursday",
  "African elephant have bigger ears than Asian elephant",
  "My shoes are blue with yellow stripes and green stars on the front",
];
let startTime, endTime;

let outputTestResults = document.getElementById("output");
let outputText = document.getElementById("outputText");
let userInput = document.getElementById("userInput");
const button = document.getElementById("btn");

// disable pasting in user input to avoid cheaters :)
window.onload = () => {
  userInput.onpaste = (e) => {
    e.preventDefault();
    alert("NO CHEATING");
  };
};

async function startTest() {
  // empty the output when second try
  outputTestResults.innerHTML = "";
  outputText.value = "";
  userInput.value = "";
  userInput.readOnly = false;
  // undisplay to button to avoid multi click (for countdown bugs)
  button.classList.add("unvisible");
  // wait for the countdown modal to execute
  await starterModal();
  // Select a random sentence from the testTextArray
  let randomIndex = Math.floor(Math.random() * testTextArray.length);
  // display the sentence
  outputText.value = testTextArray[randomIndex];
  // Start timer
  startTime = new Date().getTime();
  // Change button text and function
  button.classList.remove("unvisible");
  button.innerHTML = "End Test";
  button.onclick = endTest;
}

function endTest() {
  // get the time when end
  endTime = new Date().getTime();
  // Split the text as a array
  const typedWordsArray = userInput.value.toLowerCase().split(" ");
  // Compare both sentences
  if (typedWordsArray.join(" ") === outputText.value.toLowerCase()) {
    // Calculate time elapsed and words per minute (WPM)
    const timeElapsed = (endTime - startTime) / 1000; // in seconds
    let wpm = 0; // Default value
    if (timeElapsed !== 0 && !isNaN(typedWordsArray.length)) {
      wpm = Math.round((typedWordsArray.length / timeElapsed) * 60);
    }
    // Disable user input - preventing from contine typing after the test ends
    userInput.readOnly = true;
    // Display the results
    outputTestResults.innerHTML = `<h2>Typing Test Results</h2>
  <p>Congratulations ! Here are your stats :</p>
  <p>Time Elapsed: ${timeElapsed.toFixed(2)} seconds </p>
  <p>Words Per Minute (WPM): ${wpm} </p>
  `;
    // Set the button back to Start with its functionnality
    button.innerHTML = "Start Test";
    button.onclick = startTest;
  } else {
    outputTestResults.innerHTML =
      "Both Sentences are not the same ! Check again";
  }
}

function starterModal() {
  return new Promise((resolve, reject) => {
    const modal = document.getElementById("starter");
    modal.classList.remove("unvisible");
    let countDown = 3;
    document.getElementById("counter").innerText = String(countDown);
    //interval for the countdown to go down and display in the modal
    let interval = setInterval(() => {
      countDown--;
      document.getElementById("counter").innerText = String(countDown);
      if (countDown === 1) {
        clearInterval(interval);
      }
    }, 1000);
    // time out for the interval to finish, make the modal unvisible - resolve the promise
    setTimeout(() => {
      resolve(modal.classList.add("unvisible"));
    }, 3200);
  });
}
