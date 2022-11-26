let losingButton = document.getElementById("losing");
let losingNumber = document.getElementsByClassName("lose-number")[0];
let losingNum;
let rollButton = document.getElementById("roll");
rollButton.style.visibility = "hidden";
let rollBox = document.getElementsByClassName("roll-number")[0];

let rollsSpan = document.getElementsByClassName("rolls")[0];
let rolls = 1;

let roundsInfo = document.getElementsByClassName("round-info")[0];
let rounds = roundsInfo.getAttribute("value");
let round = 1;

let roundPoints = 0;

let playerBox = document.getElementsByClassName("player-box");
let numberOfPlayers = document.getElementsByClassName("players-boxes")[0].getAttribute("value");
let container = document.getElementsByClassName("container")[0];

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
    updateOutButtons(false);
}

function rollTheDice() {
    let diceResult = getDiceResult(1, 6);
    rollBox.innerHTML = diceResult;

    if(checkIfLosing(diceResult) || rolls >= 10){
        removePoints();
        updateOutToFalse();
        rolls = 0;
        updateRolls();
        updateOutButtons(false);

        checkIfEnd();

    }else{
        updatePoints(diceResult);
        updateRolls();
    }
}

function outPlayer(player) {
    player.out = true;
    player.outButton.disabled = true;
}

function checkIfLosing(diceResult){
    return diceResult == losingNum;
}

function updatePoints(diceResult) {
    roundPoints+=diceResult;
    players.filter(player => !player.out).forEach(player => {
        player.points += diceResult;
        player.pointsSpan.innerHTML = player.points;
    })
}

function removePoints(){
    if(rolls >= 10){

    }else{
        players.filter(player => !player.out).forEach(player => {
            if (player.points - roundPoints < 0){
                player.points = 0;
            }else{
                player.points -= roundPoints;
            }
            player.pointsSpan.innerHTML = player.points;
        })
    }

    roundPoints = 0;
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

function updateOutButtons(boolean){
    for(let i = 0;i<numberOfPlayers;i++){
        players[i].outButton.disabled = boolean;
    }
}

function updateOutToFalse(){
    players.forEach(player => player.out = false)
}

function createResultView(){
    removeNotUsedDivs();
    hideOutButtons();
    let resultHeader = createResultHeader();
    container.prepend(resultHeader);
}

function removeNotUsedDivs(){
    let gameBox = document.getElementById("game-box");
    let roundInfo = document.getElementById("round-info");
    container.removeChild(gameBox);
    container.removeChild(roundInfo);
}

function checkIfEnd(){
    if(round+1<=rounds){
        round++;
        roundsInfo.children[0].innerHTML = "Round " + round + "/" + rounds;
    }else{
        createResultView();
    }
}

function hideOutButtons(){
    for(let i = 0;i<numberOfPlayers;i++){
        players[i].outButton.style.visibility = "hidden";
    }
}

function createResultHeader(){
    let resultHeader = document.createElement("h1");
    resultHeader.innerHTML = "Results"
    resultHeader.className = "result-header";
    return resultHeader;
}