// Bubble JS
var timex = 60;
var score = 0;
var hitrn = 0;
var timeInterval;  // Variable to hold the timer ID

function increseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

function Hit() {
    hitrn = Math.floor(Math.random() * 10)
    document.querySelector("#hitval").textContent = hitrn
}

function Timer() {
    timex = 60;
    document.querySelector("#time").textContent = timex;
    
    timeInterval = setInterval(function () {
        if (timex > 0) {
            timex--;
            document.querySelector("#time").textContent = timex
        }
        else {
            clearInterval(timeInterval);
            document.querySelector(".pbottom").innerHTML =  `<h1 class="msg">Game Over! Score = ${score}</h1><button id="btn">Try Again!</button>`;

            document.querySelector("#btn").addEventListener("click", function() {
                score = 0;
                document.querySelector("#scoreval").textContent = score;
                document.querySelector(".pbottom").innerHTML = "";
                start();
            });
        }
    }, 100)


}

function makeBubble() {
    var clutter = ""
    for (var i = 1; i <= 119; i++) {
        var rn = Math.floor(Math.random() * 10)
        clutter += `<div class="bubble">${rn}</div>`
    }
    document.querySelector(".pbottom").innerHTML = clutter
}

document.querySelector(".pbottom").addEventListener("click",function(details){
    var press = Number(details.target.textContent);
    if(hitrn === press){
        increseScore();
        makeBubble();
        Hit();
    }
})

document.querySelector("#btn").addEventListener("click",function(){
    document.querySelector(".pbottom").innerHTML = ""
    start()

})

function start(){
    makeBubble();
    Timer();
    Hit();
}
