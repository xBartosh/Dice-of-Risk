let saveButton = document.getElementById("save");
let players = document.getElementById("players");
let rounds = document.getElementById("rounds");
let playersInfo = document.getElementsByClassName("players")[0];

let playersButtons = document.getElementsByClassName("players-button")[0];
let playButton = createButton("play");
let resetButton = createButton("reset");
resetButton.type = "button";

let container = document.getElementsByClassName("container")[0];
let message = document.createElement("span");
message.innerHTML = "Choose valid number of rounds and number of players!"
message.className = "message";

saveButton.addEventListener("click", addPlayers)
resetButton.addEventListener("click", resetToDefault);

function createButton(name){
    let button = document.createElement("button");
    button.innerHTML = name.toUpperCase();
    button.className = name;
    return button;
}

function resetToDefault(){
    saveButton.style.visibility = "visible";
    players.readOnly = false;
    rounds.readOnly = false;
    playersInfo.replaceChildren();
    playersButtons.replaceChildren();
}

function addPlayers() {
    let noOfPlayers = players.value;
    let noOfRounds = rounds.value;

    if (noOfPlayers >= 2 && noOfRounds >= 1) {
        for (let i = 0; i < noOfPlayers; i++) {
            let player = createPlayerInput();
            document.getElementsByClassName("players")[0].appendChild(player);
        }

        saveButton.style.visibility = "hidden";
        players.readOnly = true;
        rounds.readOnly = true;

        playersButtons.appendChild(playButton);
        playersButtons.appendChild(resetButton);
        message.remove();
    } else {
        container.prepend(message);
    }

}

function createPlayerInput(){
    let player = document.createElement("input");
    player.type = "text";
    player.value = "";
    player.name = "players";
    player.className = "player";
    player.placeholder = "Player name";
    player.required = true;
    return player;
}

