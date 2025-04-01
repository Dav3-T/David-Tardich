//NOT DONE, make it so that it makes sense for rps and make it work lol
function game() {
    if (userInput == randNum) {
        updateHTML("ChangingText", "you got it right, the number was " + randNum);
        console.log("check1");
      } else {
        updateHTML("ChangingText", "you got it wrong.");
        console.log("they did bad");
      }
}





function getRandomString(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  
  
  const myArray = ["rock", "rock", "rock"];
  const randomString = getRandomString(myArray);
  console.log(randomString);


  function userInput() {
    let rock = document.getElementById("rockBut");
    if (randomString == "rock") {
      console.log("holy cow it work")
    }
  }