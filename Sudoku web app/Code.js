//Generate Board
import sudoku from "./BoardGenerator.js";

window.onload = function () {
  var k = 0;
  var cool = new sudoku();
  const buttonCheck = document.getElementById("Check");
  buttonCheck.addEventListener("click", function () {
    Testboard(cool, k);
  });
  const buttonGen = document.getElementById("Generate");
  buttonGen.addEventListener("click", function () {
    Generateor(cool, k);
  });
  const buttonEasy = document.getElementById("easy");
  buttonEasy.addEventListener("click", function () {
    k = setEasy(k);
  });
  const buttonMed = document.getElementById("medium");
  buttonMed.addEventListener("click", function () {
    k = setMed(k);
  });
  const buttonHard = document.getElementById("hard");
  buttonHard.addEventListener("click", function () {
    k = setHard(k);
  });
};

function setEasy(k) {
  var k = 40;
  let selected = document.getElementById("easy");
  let med = document.getElementById("medium");
  let hard = document.getElementById("hard");
  med.style.backgroundColor = "yellow";
  hard.style.backgroundColor = "red";
  selected.style.backgroundColor = "darkgreen";
  return k;
}
function setMed(k) {
  var k = 45;
  let selected = document.getElementById("easy");
  let med = document.getElementById("medium");
  let hard = document.getElementById("hard");
  med.style.backgroundColor = "gold";
  hard.style.backgroundColor = "red";
  selected.style.backgroundColor = "green";
  return k;
}
function setHard(k) {
  var k = 50;
  let selected = document.getElementById("easy");
  let med = document.getElementById("medium");
  let hard = document.getElementById("hard");
  med.style.backgroundColor = "yellow";
  hard.style.backgroundColor = "darkred";
  selected.style.backgroundColor = "green";
  return k;
}
//checks the current board vs the answer board to determain how many tiles you have left to answer correctly
function Testboard(cool, k) {
  //console.log(k);
  let numbwrong = k;
  if (document.getElementById("00") == null) {
    //console.log("There is no Generated Board");
    let check = document.getElementById("checker");
    check.innerHTML = "There is no Board to Check. Please choose a difficulity.";
  } else {
    for (let b = 0; b <= 8; b++) {
      for (let i = 0; i <= 8; i++) {
        //console.log(cool.board[b][i]);
        if (
          cool.board[b][i] === 0 &&
          document.getElementById(b.toString() + i.toString() + "text") != null
        ) {
          //console.log("bye");
          let lvar = document.getElementById(
            b.toString() + i.toString() + "text"
          ).value;
          //console.log(lvar);
          //console.log(cool.board[b][i]);
          //console.log(cool.answer[b][i]);
          if (cool.answer[b][i] == lvar) {
            //console.log("hi");
            numbwrong--;
            var list=["03","04","05","13","14","15","23","24","25",
                "30","31","32","40","41","42","50","51","52",
                "36","37","38","46","47","48","56","57","58",
                "63","64","65","73","74","75","83","84","85"];
            if(list.includes(b.toString() + i.toString())){
              document.getElementById(b.toString() + i.toString()).style.backgroundColor = "lightslategray";
            }else{
              document.getElementById(b.toString() + i.toString()).style.backgroundColor = "lightblue";
            }
            
          }else{
            document.getElementById(b.toString() + i.toString()).style.backgroundColor="coral";
          }
        }
      }
    }
    if (numbwrong === 0) {
      //console.log("you win");
      let check = document.getElementById("checker");
      check.innerHTML = "You Win!";
      check.style.backgroundColor = "lightgreen";
      setTimeout(() => { 
        check.innerHTML = "Press Generate to Play Again";
        check.style.backgroundColor = "lightsteelblue";
     }, 5000);
    } else {
      //console.log("you have " + numbwrong.toString() + " to go");
      let check = document.getElementById("checker");
      check.innerHTML =
        "There are " + numbwrong.toString() + " Cells Incorrect";
      check.style.backgroundColor = "lightcoral";
      setTimeout(() => { 
        check.style.backgroundColor = "lightsteelblue";
        check.innerHTML =
        "You have " + numbwrong.toString() + " Cells to Go";
     }, 5000);
    }
    
  }
}
//Takes a generated board and fills the grid then applies inputs to all of the empty spaces
function Generateor(cool, k) {
  cool.popBoard(k);
  //cool.logger();
  let check = document.getElementById("checker");
  check.innerHTML = "Use the Check Button to See How Many are Correct";
  const sizer = 8;
  const idth = 8;
  if (document.getElementById("00") != null) {
    for (let f = 0; f <= idth; f++) {
      for (let g = 0; g <= sizer; g++) {
        var stringb = f.toString();
        var stringi = g.toString();
        var cell = document.getElementById(stringb + stringi);
        //console.log(cell.innerText)
        if (document.getElementById(stringb + stringi + "text") != null) {
          var inputer = document.getElementById(stringb + stringi + "text");
          cell.removeChild(inputer);
          //console.log('Apple');
        }
        document.getElementById("Puzzle").removeChild(cell);
        //console.log('Apple');
      }
    }
  }
  for (let b = 0; b <= idth; b++) {
    for (let i = 0; i <= sizer; i++) {
      let tile = document.createElement("div");
      var strb = b.toString();
      var stri = i.toString();
      tile.id = strb + stri;
      //tile.innerText = strb + stri;
      var list=["03","04","05","13","14","15","23","24","25",
                "30","31","32","40","41","42","50","51","52",
                "36","37","38","46","47","48","56","57","58",
                "63","64","65","73","74","75","83","84","85"];
      if(list.includes(strb + stri)){
        tile.classList.add("tile2");
      }else{
        tile.classList.add("tile");
      }
      var textD = document.createElement("input");
      textD.type = "text";
      textD.inputMode="numeric";
      textD.min = 1;
      textD.max = 9;
      textD.id = strb + stri + "text";
      textD.classList.add("inputs");
      textD.value = "";
      document.getElementById("Puzzle").appendChild(tile);
      if (cool.board[b][i] === 0) {
        document.getElementById(strb + stri).appendChild(textD);
      } else {
        tile.innerText = cool.board[b][i];
      }
      //console.log('Apple');
    }
  }
  return cool;
}
