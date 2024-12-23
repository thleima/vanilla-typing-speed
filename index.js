let testTextArray = [
  "The quick brown fox jumps over the lazy dog",
  "A phrase is a short selection of words which when put together create a concept",
  "My mom drove me to school 5 minutes late on Thursday",
  "African elephant have bigger ears than Asian elephant",
  "My shoes are blue with yellow stripes and green stars on the front",
];
let startTime, endTime;

async function startTest() {
  await starterModal();
  // Select a random sentence from the testTextArray
  let randomIndex = Math.floor(Math.random() * testTextArray.length + 1);
  document.getElementById("inputText").value = testTextArray[randomIndex];

  // Reset results and timer
  document.getElementById("output").innerHTML = "";
  startTime = new Date().getTime();

  // Change button text and functionality
  var button = document.getElementById("btn");
  button.innerHTML = "End Test";
  button.onclick = endTest;
}

function endTest() {
  endTime = new Date().getTime();

  // Disable user input - preventing from contine typing after the test ends
  document.getElementById("userInput").readOnly = true;

  // Calculate time elapsed and words per minute (WPM)
  var timeElapsed = (endTime - startTime) / 1000; // in seconds
  var userTypedText = document.getElementById("userInput").value;

  // Split the text using regex to count words correctly
  var typedWords = userTypedText.split(/\s+/).filter(function (word) {
    return word !== "";
  }).length;

  var wpm = 0; // Default value

  if (timeElapsed !== 0 && !isNaN(typedWords)) {
    wpm = Math.round((typedWords / timeElapsed) * 60);
  }

  // Display the results
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML =
    "<h2>Typing Test Results:</h2>" +
    "<p>Words Typed: " +
    typedWords +
    "</p>" +
    "<p>Time Elapsed: " +
    timeElapsed.toFixed(2) +
    " seconds</p>" +
    "<p>Words Per Minute (WPM): " +
    wpm +
    "</p>";

  // Reset the button
  var button = document.getElementById("btn");
  button.innerHTML = "Start Test";
  button.onclick = startTest;
}

function starterModal() {
  return new Promise((resolve, reject) => {
    const modal = document.getElementById("starter");
    modal.classList.remove("unvisible");
    let countDown = 4;
    //interval
    let interval = setInterval(() => {
      countDown--;
      document.getElementById("counter").innerText = String(countDown);
      if (countDown === 0) {
        clearInterval(interval);
      }
    }, 1000);
    //time out + resolve
    setTimeout(() => {
      resolve(modal.classList.add("unvisible"));
    }, 4000);
  });
}
