let losingButton = document.getElementById("losing");
let losingNumber = document.getElementsByClassName("lose-number")[0];
let losingNum;
let rollButton = document.getElementById("roll");
rollButton.style.visibility = "hidden";
let rollBox = document.getElementsByClassName("roll-number")[0];

let rollsSpan = document.getElementsByClassName("rolls")[0];
let rolls = 1;

let round = 1;

let playerBox = document.getElementsByClassName("player-box");
let numberOfPlayers = document.getElementsByClassName("players-boxes")[0].getAttribute("value");


let players = [];

for (let i = 0; i < numberOfPlayers; i++) {
    let playerName = playerBox[i].children[0].innerHTML;
    let playerPoints = 0;
    let playerOut = false;
    players[i] = {
        name: playerName,
        points: playerPoints,
        out: playerOut,
        outButton: playerBox[i].children[2],
        pointsSpan: playerBox[i].children[1]
    }
    players[i].outButton.addEventListener("click", function () {
        outPlayer(players[i])
    })

    players[i].outButton.disabled = true;
}


losingButton.addEventListener("click", rollLosingNumber);
rollButton.addEventListener("click", rollTheDice);

function rollLosingNumber() {
    losingNumber.innerHTML = getDiceResult(1, 6);
    losingNum = losingNumber.innerHTML;
    losingButton.remove();
    rollButton.style.visibility = "visible";
    for(let i = 0;i<numberOfPlayers;i++){
        players[i].outButton.disabled = false;
    }
}

function rollTheDice() {
    let diceResult = getDiceResult(1, 6);
    rollBox.innerHTML = diceResult;
    if(checkIfLosing(diceResult)){
        players.filter(player => !player.out).forEach(player => player.points = 0);
        updatePoints(0);
        
    }else{
        updatePoints(diceResult);
        updateRolls();
    }


    console.log(players)
}

function outPlayer(player) {
    player.out = true;
    player.outButton.disabled = true;
}

function checkIfLosing(diceResult){
    return diceResult == losingNum
}

function updatePoints(diceResult) {
    players.filter(player => !player.out).forEach(player => {
        player.points += diceResult;
        player.pointsSpan.innerHTML = player.points
    })
}

function updateRolls() {
    rolls++;
    rollsSpan.innerHTML = rolls + "/10";
}

function getDiceResult(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}