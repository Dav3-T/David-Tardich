function getRandomString(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  
  
  const myArray = ["rock", "scissors", "paper"];
  const randomString = getRandomString(myArray);
  console.log(randomString);


  function rockInput() {
    let rock = document.getElementById("rockBut");
    if (randomString == "rock") {
      document.write("You did it! It was in fact rock.");
    } else {
      document.write("You got it wrong. Refresh and try again. <br/> Your punishment is dropping a rock on your foot.");
    }
  }

  function paperInput() {
    let rock = document.getElementById("paperBut");
    if (randomString == "paper") {
      document.write("You did it! It was in fact paper.");
    } else {
      document.write("You got it wrong. Refresh and try again. <br/> Your punishment is a papercut.");
    }
  }

  function scissorInput() {
    let rock = document.getElementById("scissorBut");
    if (randomString == "scissors") {
      document.write("You did it! It was in fact scissors.");
    } else {
      document.write("You got it wrong. Refresh and try again. <br/> Your punishment is ripping wrapping paper when you try to cut it.");
    }
  }