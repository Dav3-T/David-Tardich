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


function generator() {
    const radomIndex = Math.floor(Math.random() * Array.length) ;
    return array[randomIndex];

}
const myArray = ["rock", "paper", "scissors"];
const randomString = Generator(myArray);
document.write(randomString);
