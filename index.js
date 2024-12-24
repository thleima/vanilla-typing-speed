const testTextArray = [
  "The quick brown fox jumps over the lazy dog",
  "A phrase is a short selection of words which when put together create a concept",
  "My mom drove me to school 5 minutes late on Thursday",
  "African elephant have bigger ears than Asian elephant",
  "My shoes are blue with yellow stripes and green stars on the front",
];
let startTime, endTime;

async function startTest() {
  let outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";
  const button = document.getElementById("btn");
  button.classList.add("unvisible");
  // wait for the countdown modal to execute
  await starterModal();
  // Select a random sentence from the testTextArray
  let randomIndex = Math.floor(Math.random() * testTextArray.length);
  // display the sentence
  document.getElementById("inputText").value = testTextArray[randomIndex];
  // Reset previous output and start timer
  document.getElementById("output").innerHTML = "";
  startTime = new Date().getTime();
  // Change button text and function
  button.classList.remove("unvisible");
  button.innerHTML = "End Test";
  button.onclick = endTest;
}

function endTest() {
  // get the time when end
  endTime = new Date().getTime();
  // Disable user input - preventing from contine typing after the test ends
  document.getElementById("userInput").readOnly = true;
  // Split the text using regex to count words correctly
  const userTypedText = document.getElementById("userInput").value;
  const typedWords = userTypedText.split(/\s+/).filter(function (word) {
    return word !== "";
  }).length;
  // Calculate time elapsed and words per minute (WPM)
  const timeElapsed = (endTime - startTime) / 1000; // in seconds
  let wpm = 0; // Default value
  if (timeElapsed !== 0 && !isNaN(typedWords)) {
    wpm = Math.round((typedWords / timeElapsed) * 60);
  }

  // Display the results
  let outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `<h2>Typing Test Results:</h2>
  <p>Words Typed: ${typedWords}</p>
  <p>Time Elapsed: ${timeElapsed.toFixed(2)} seconds </p>
  <p>Words Per Minute (WPM): ${wpm} </p>
  `;
  // Set the button back to Start with its functionnality
  let button = document.getElementById("btn");
  button.innerHTML = "Start Test";
  button.onclick = startTest;
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
    // time out 4s for the interval to finish, make the modal unvisible and resole as a result
    setTimeout(() => {
      resolve(modal.classList.add("unvisible"));
    }, 3200);
  });
}
