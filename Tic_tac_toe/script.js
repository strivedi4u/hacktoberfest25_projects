console.log("hello");
let music = new Audio("buttonpress.mp3");
let turn = "X";

const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

const checkWin = () => {
  if (
    document.getElementById("1").innerText != "" &&
    document.getElementById("1").innerText ===
      document.getElementById("2").innerText &&
    document.getElementById("2").innerText ===
      document.getElementById("3").innerText
  )     {
    alert(document.getElementById("1").innerText + " is the winner");
location.reload();  
} else if (
    document.getElementById("4").innerText != "" &&
    document.getElementById("4").innerText ===
      document.getElementById("5").innerText &&
    document.getElementById("5").innerText ===
      document.getElementById("6").innerText
  ) {
    alert(document.getElementById("4").innerText + " is the winner");
      location.reload();}
   else if (
    document.getElementById("7").innerText != "" &&
    document.getElementById("7").innerText ===
      document.getElementById("8").innerText &&
    document.getElementById("8").innerText ===
      document.getElementById("9").innerText
  ) {
    alert(document.getElementById("7").innerText + " is the winner");
      location.reload();}
   else if (
    document.getElementById("7").innerText != "" &&
    document.getElementById("7").innerText ===
      document.getElementById("4").innerText &&
    document.getElementById("4").innerText ===
      document.getElementById("1").innerText
  ) {
    alert(document.getElementById("7").innerText + " is the winner");
      location.reload();}
   else if (
    document.getElementById("2").innerText != "" &&
    document.getElementById("2").innerText ===
      document.getElementById("8").innerText &&
    document.getElementById("8").innerText ===
      document.getElementById("5").innerText
  ) {
    alert(document.getElementById("2").innerText + " is the winner");
      location.reload();}
   else if (
    document.getElementById("3").innerText != "" &&
    document.getElementById("3").innerText ===
      document.getElementById("6").innerText &&
    document.getElementById("6").innerText ===
      document.getElementById("9").innerText
  ) {
    alert(document.getElementById("6").innerText + " is the winner");
    location.reload();  
}
  else if (
    document.getElementById("1").innerText != "" &&
    document.getElementById("1").innerText ===
      document.getElementById("5").innerText &&
    document.getElementById("5").innerText ===
      document.getElementById("9").innerText
  ) {
    alert(document.getElementById("1").innerText + " is the winner");
    location.reload();  
}
  else if (
    document.getElementById("3").innerText != "" &&
    document.getElementById("3").innerText ===
      document.getElementById("5").innerText &&
    document.getElementById("5").innerText ===
      document.getElementById("7").innerText
  ) {
    alert(document.getElementById("3").innerText + " is the winner");
    location.reload();  
}
 else if (
    document.getElementById("1").innerText != "" &&document.getElementById("2").innerText != ""&&document.getElementById("3").innerText != "" &&
document.getElementById("4").innerText != "" &&document.getElementById("5").innerText != ""&&document.getElementById("6").innerText != "" &&
document.getElementById("7").innerText != "" &&document.getElementById("8").innerText != ""&&document.getElementById("9").innerText != "" 
) {
    location.reload();
      alert("It's a draw");}
};
let but=document.querySelector("#rest");
but.addEventListener("click", () => {
location.reload();
});
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  element.addEventListener("click", async (e) => {
    if (element.firstChild.innerText === "") {
      element.firstChild.innerText = turn;
      console.log(element.firstChild.innerText);

      turn = changeTurn();
      await music.play();
      checkWin();
      document.getElementsByClassName("info")[0].innerText =
        "Turn for " + turn;
    }
  });
});
