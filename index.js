let testTextArray = ["The quick brown fox jumps over the lazy dog", "A phrase is a short selection of words which when put together create a concept", "My mom drove me to school 5 minutes late on Thursday", "African elephant have bigger ears than Asian elephant", "My shoes are blue with yellow stripes and green stars on the front"]; 
let startTime, endTime;

function startTest() {
  // Select a random sentence from the testTextArray
  let randomIndex = Math.floor(Math.random() * testTextArray.length + 1)
  document.getElementById("inputText").value = testTextArray[randomIndex];
  
  // Reset results and timer
  document.getElementById("output").innerHTML = "";
  startTime = new Date().getTime();
  
  // Change button text and functionality
  var button = document.getElementById("btn");
  button.innerHTML = "End Test";
  button.onclick = endTest;
          }

function endTest(){
  console.log('hello')
}